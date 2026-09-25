import { Cloud, Server, Smartphone, type LucideIcon } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { features } from '../data/content'

const icons: Record<string, LucideIcon> = {
  server: Server,
  cloud: Cloud,
  smartphone: Smartphone,
}

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What I do"
          title="Three areas I go deep on"
          description="A decade of shipping production systems, from backend architecture to the infrastructure and apps that run on top of it."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = icons[feature.icon]
            return (
              <Reveal key={feature.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-accent/20 to-accent-2/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[#070b16]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
