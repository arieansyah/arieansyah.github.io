import { Container } from './ui/Container'
import { GithubIcon, LinkedinIcon } from './icons'
import { navLinks, profile } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-ink">
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-accent"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-accent"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </Container>

      <p className="mt-8 text-center text-xs text-muted">
        &copy; {year} {profile.name}. Built with React, Tailwind CSS &amp; Framer Motion.
      </p>
    </footer>
  )
}
