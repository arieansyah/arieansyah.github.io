import { Link } from 'react-router-dom'
import { ArrowUp, Mail } from 'lucide-react'
import { Container } from './ui/Container'
import { GithubIcon, LinkedinIcon } from './icons'
import { navLinks, profile } from '../data/content'

const socials = [
  { icon: GithubIcon, href: profile.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border print:hidden">
      <Container className="py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="font-semibold tracking-tight text-ink">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">
              {profile.role} · {profile.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener' : undefined}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-ink"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm">
            {[...navLinks, { label: 'Resume', href: '/resume' }].map((link) => (
              <Link key={link.href} to={link.href} className="text-muted transition-colors hover:text-ink">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {year} {profile.name}. Built with React, Tailwind CSS &amp; Framer Motion.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
