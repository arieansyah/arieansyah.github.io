import { Container } from './ui/Container'
import { GithubIcon, LinkedinIcon } from './icons'
import { profile } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-muted">
          &copy; {year} {profile.name}. Built with React, Tailwind CSS &amp; Framer Motion.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-ink"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-ink"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
