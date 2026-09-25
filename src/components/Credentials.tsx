import { Award, GraduationCap } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { certifications, education } from '../data/content'

export function Credentials() {
  return (
    <section id="education" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <GraduationCap className="h-4 w-4 text-accent" aria-hidden="true" />
              Education
            </div>
            <article className="mt-5 rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-bold text-ink">{education.school}</h3>
              <p className="mt-2 text-sm text-muted">{education.degree}</p>
              <p className="mt-3 text-sm italic leading-relaxed text-muted">{education.thesis}</p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <Award className="h-4 w-4 text-accent" aria-hidden="true" />
              Certifications
            </div>
            <ul className="mt-5 space-y-2 rounded-2xl border border-border bg-surface p-2">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm hover:bg-surface-2"
                >
                  <span className="text-ink">{cert.name}</span>
                  {cert.year ? <span className="shrink-0 text-xs text-muted">{cert.year}</span> : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
