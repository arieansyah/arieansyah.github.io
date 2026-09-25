import { Mail } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { buttonClass } from './ui/button'
import { CopyEmailButton } from './CopyEmailButton'
import { profile } from '../data/content'

export function CtaBanner() {
  return (
    <Container className="mt-24">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-bg-subtle px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 h-64 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent/25 to-accent-2/25 blur-3xl"
          />
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/70 px-3 py-1 text-xs font-medium text-body backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something <span className="text-gradient">reliable</span> together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body">
            Hiring for a backend, DevOps, or mobile role? I usually reply within a day.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`mailto:${profile.email}`} className={buttonClass('primary')}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <CopyEmailButton />
          </div>
        </div>
      </Reveal>
    </Container>
  )
}
