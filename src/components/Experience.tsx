import { Briefcase } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { experience } from '../data/content'

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <Container>
        <SectionHeading icon={Briefcase} eyebrow="Career" title="Experience" />

        <ol className="relative mx-auto mt-14 max-w-3xl border-l border-border pl-8">
          {experience.map((role, i) => (
            <Reveal as="li" key={role.company} delay={i * 0.08} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-bg bg-gradient-to-br from-accent to-accent-2" />
              <article className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                <h3 className="text-lg font-bold text-ink">{role.company}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {role.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        badge.current
                          ? 'border-accent/40 bg-accent/10 text-accent'
                          : 'border-border text-muted'
                      }`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm italic text-muted">{role.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{role.description}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
