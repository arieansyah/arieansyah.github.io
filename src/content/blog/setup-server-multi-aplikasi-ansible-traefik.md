---
title: "Setup VPS untuk Banyak Aplikasi dengan Ansible, Traefik, dan Cloudflare"
date: 2026-09-26
description: Panduan langkah demi langkah menyiapkan satu VPS 2 GB untuk beberapa aplikasi Docker. Semuanya otomatis lewat Ansible, dengan hardening, Traefik, PostgreSQL bersama, dan backup harian.
category: Tutorial
tags: [ansible, devops, docker, traefik, cloudflare]
lang: id
---

Punya satu VPS kecil dan ingin menjalankan beberapa aplikasi di dalamnya? Setup manual lewat SSH cepat dibuat, tapi susah diulang dan mudah lupa apa saja yang pernah diubah. Di artikel ini saya bagikan cara saya menyiapkan server dengan **Ansible**, sehingga server baru bisa siap dalam satu perintah.

Template lengkapnya ada di repo `server-setup-public`. Di bawah ini penjelasan alur dan cara memakainya dari nol.

## Arsitektur

```
Cloudflare (proxied) ──► Traefik :80/:443 ──► app-a ─┐
  hanya IP Cloudflare                └──────► app-b ─┤
                                                     ▼
                                   PostgreSQL bersama (network internal)
```

Tugasnya dibagi menjadi tiga lapis:

| Lapis | Dijalankan | Isi |
|---|---|---|
| `site.yml` | Sekali per server | OS, user `deploy`, SSH hardening, UFW, fail2ban, Docker, Traefik, PostgreSQL, backup |
| `app.yml` | Sekali per aplikasi | Folder aplikasi, database + user, file env, secret |
| CI/CD | Setiap rilis | Test, build image ke GHCR, deploy, healthcheck, rollback otomatis |

Pemisahan ini penting. Ansible tidak ikut merilis kode, jadi mengubah aplikasi tidak menyentuh konfigurasi server.

## Prasyarat

- VPS Ubuntu 24.04+ dengan akses SSH key sebagai user `ubuntu`. 2 vCPU dan 2 GB RAM cukup untuk 3–4 aplikasi kecil.
- Domain yang dikelola di Cloudflare, dengan record DNS **proxied**.
- Ansible di mesin lokal.

```bash
brew install ansible pre-commit gitleaks
```

## 1. Ambil template

```bash
git clone https://github.com/<username>/server-setup-public.git server-setup
cd server-setup
cp -R ansible-example-server ansible-<nama-server>
cd ansible-<nama-server>
ansible-galaxy collection install -r collections/requirements.yml
```

Satu folder mewakili satu server, dan satu server bisa menampung banyak aplikasi.

## 2. Isi konfigurasi lokal

Repo ini public, jadi nilai asli seperti IP dan secret **tidak boleh** masuk ke Git. Semuanya ditaruh di file yang sudah di-gitignore.

```bash
# Target server
cp inventory.ini.example inventory.ini
# ubah YOUR_SERVER_IP, ansible_user, ansible_ssh_private_key_file

# Nilai khusus Anda
mkdir -p group_vars/docker_hosts
cat > group_vars/docker_hosts/local.yml <<'EOF'
---
ghcr_username: <username-github>
ci_authorized_keys:
  - "ssh-ed25519 AAAA... github-actions <app>"
platform_tls_certificates: [example.com]
EOF

# Secret, dienkripsi dengan Ansible Vault
cp vault.yml.example group_vars/docker_hosts/vault.yml
ansible-vault encrypt group_vars/docker_hosts/vault.yml
```

Isi vault: token GHCR (scope `read:packages` saja), password PostgreSQL, dan secret per aplikasi. Kalau dikosongkan, password PostgreSQL dan `APP_KEY` digenerate otomatis pada run pertama.

## 3. Buat SSH key khusus CI/CD

Jangan pakai key pribadi untuk pipeline. Buat satu key per aplikasi:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/<app>_ci -N "" -C "github-actions <app>"
```

Isi file `.pub` ke `ci_authorized_keys`. Bagian privat disimpan di GitHub secret `SSH_PRIVATE_KEY` pada repo aplikasi.

> `authorized_keys` milik user `deploy` dikelola penuh oleh Ansible. Key yang ditambahkan manual di server akan dihapus pada run berikutnya.

## 4. Pasang sertifikat origin Cloudflare

Buat di Cloudflare → SSL/TLS → Origin Server untuk `*.domain` dan `domain`. Simpan sebagai `files/ssl/<domain>.pem` dan `files/ssl/<domain>.key`, lalu ubah mode SSL/TLS ke **Full (strict)**.

Tanpa sertifikat, Traefik memakai self-signed. Mode Full tetap jalan, tapi koneksi Cloudflare ke server tidak terverifikasi.

## 5. Jalankan playbook server

```bash
ansible docker_hosts -m ping
ansible-playbook site.yml --check --diff --ask-vault-pass
ansible-playbook site.yml --ask-vault-pass -e allow_reboot=true
```

Urutannya: tes koneksi, dry-run untuk melihat apa yang akan berubah, baru jalankan sungguhan. Setelah selesai, kondisi server menjadi seperti ini:

- Login root dan password SSH dimatikan, fail2ban aktif.
- UFW menyala. Port 80 dan 443 hanya bisa diakses dari IP Cloudflare, termasuk untuk port yang di-publish Docker (lewat guard di chain `DOCKER-USER`).
- Docker, Traefik, dan PostgreSQL bersama berjalan di `/opt/platform`.
- Backup harian jam 02:00 dengan retensi 14 hari.

Mulai sekarang masuk lewat `ssh deploy@<SERVER_IP>`.

## 6. Daftarkan aplikasi

```bash
cp apps/example.yml apps/<app>.yml
# ubah app_name, app_domain, dan app_env
ansible-playbook app.yml -e app=<app> --ask-vault-pass
```

Playbook membuat folder `/opt/apps/<app>`, database dan user PostgreSQL, serta file `app.env`. Variabel `DB_*`, `TRUSTED_PROXIES`, dan `APP_KEY` untuk Laravel terisi otomatis dan hanya digenerate sekali.

Lalu:

1. Tambahkan record DNS `A <app>.domain → <SERVER_IP>` (proxied), atau satu wildcard `*.domain`. Pakai subdomain satu tingkat karena sertifikat Cloudflare tidak mencakup `a.b.domain`.
2. Di repo aplikasi, buat `docker-compose.prod.yml` dengan network eksternal `proxy` dan `db`, tanpa `ports:`, plus label Traefik `Host(...)`. Nama router harus unik di server.
3. Isi secret `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`, dan variable `DEPLOY_HOST`, lalu push ke branch utama.

Rilis dijalankan oleh script `app-deploy`. Script ini menarik image bertag SHA, menjalankan `docker compose up --wait`, dan bila ada container yang tidak sehat dalam 180 detik, versi sebelumnya dipulihkan otomatis.

## 7. Verifikasi

```bash
ssh deploy@<SERVER_IP> 'docker ps && ls /opt/platform /opt/apps'
curl -I https://<app>.<domain>
curl -I --connect-timeout 5 http://<SERVER_IP>
```

Perintah pertama harus menampilkan container Traefik, PostgreSQL, dan aplikasi. Yang kedua mengembalikan `200`. Yang ketiga **harus gagal**, dan itu tandanya akses langsung lewat IP sudah diblokir dengan benar.

## Masalah yang sering muncul

| Gejala | Solusi |
|---|---|
| `Permission denied (publickey)` saat `ping` | Key belum ada di user `ubuntu`, atau `ansible_ssh_private_key_file` salah |
| `REMOTE HOST IDENTIFICATION HAS CHANGED` | Server di-rebuild, jalankan `ssh-keygen -R <SERVER_IP>` |
| Error 525/526 dari Cloudflare | Sertifikat origin belum terpasang atau mode SSL tidak cocok, jalankan `--tags traefik` |
| Gagal pull image privat | `vault_ghcr_token` kosong atau tanpa scope `read:packages` |

## Hal yang perlu diingat

- User `deploy` ada di grup `docker`, artinya setara root. Kalau key CI bocor, seluruh server ikut terbuka. Simpan hanya di GitHub secrets dan rotasi berkala.
- Backup masih tersimpan lokal di server. Salin ke luar server, misalnya dengan restic ke Cloudflare R2.
- Daftar IP Cloudflare ada di `group_vars/all.yml`. Perbarui bila Cloudflare mengubahnya.
- Pasang `pre-commit install` supaya gitleaks memindai setiap commit, dan aktifkan Secret scanning + Push protection di GitHub.

## Penutup

Dengan cara ini server jadi *reproducible*: bila VPS rusak atau pindah provider, cukup ubah IP di `inventory.ini` dan jalankan ulang playbook. Menambah aplikasi baru pun tinggal satu file `apps/<app>.yml` dan satu perintah.
