import { Reveal } from './ui/Reveal'
import { Container } from './ui/Container'
import { clients } from '../data/content'

export function SocialProof() {
  const loop = [...clients, ...clients]

  return (
    <section aria-label="Companies and clients" className="border-y border-border bg-surface/60 py-12">
      <Container>
        <Reveal className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Trusted by teams &amp; products including
        </Reveal>
      </Container>

      <div className="relative mt-7 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-32"
        />
        <div className="flex w-max animate-marquee items-center gap-10 [animation-play-state:running] hover:[animation-play-state:paused]">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 whitespace-nowrap font-display text-lg font-semibold text-ink/60 transition-colors hover:text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
