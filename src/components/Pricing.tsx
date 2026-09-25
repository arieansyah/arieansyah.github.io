import { Check, Sparkles } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Button } from './ui/Button'
import { pricing, profile } from '../data/content'

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          icon={Sparkles}
          eyebrow="Work with me"
          title="Freelance & consulting packages"
          description="Available for select engagements alongside my full-time role. Every project starts with a scoping call — these tiers are a starting point, not a fixed menu."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  tier.highlighted
                    ? 'border-accent/50 bg-gradient-to-b from-accent/10 to-surface shadow-[0_0_60px_-15px_rgba(124,156,255,0.35)]'
                    : 'border-border bg-surface'
                }`}
              >
                {tier.highlighted ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-1 text-xs font-bold text-[#070b16]">
                    Most popular
                  </span>
                ) : null}

                <h3 className="text-lg font-bold text-ink">{tier.name}</h3>
                <p className="mt-1 font-display text-3xl font-extrabold text-ink">{tier.price}</p>
                <p className="mt-3 text-sm text-muted">{tier.tagline}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(`${tier.name} inquiry`)}`}
                  variant={tier.highlighted ? 'primary' : 'ghost'}
                  className="mt-7 w-full"
                >
                  {tier.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
