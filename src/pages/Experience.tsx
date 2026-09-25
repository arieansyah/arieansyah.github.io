import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { PageHeader } from '../components/ui/PageHeader'
import { certifications, education, experience, profile } from '../data/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Experience() {
  useDocumentTitle(`Experience — ${profile.name}`)

  return (
    <Container className="py-14 sm:py-20">
      <PageHeader title="Experience" description="Where I've worked and what I built there." />

      <ol className="mt-10 space-y-10">
        {experience.map((role, i) => (
          <Reveal as="li" key={role.company} delay={i * 0.06}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-base font-semibold text-ink">{role.company}</h2>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
              {role.badges.map((badge) => (
                <span key={badge.label} className={badge.current ? 'text-accent' : ''}>
                  {badge.label}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm italic text-muted">{role.summary}</p>
            <p className="mt-2 text-sm leading-relaxed text-body">{role.description}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1} className="mt-16 border-t border-border pt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Education</h2>
        <div className="mt-4">
          <h3 className="text-base font-semibold text-ink">{education.school}</h3>
          <p className="mt-1 text-sm text-muted">{education.degree}</p>
          <p className="mt-2 text-sm italic leading-relaxed text-body">{education.thesis}</p>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-16 border-t border-border pt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Certifications</h2>
        <ul className="mt-4 divide-y divide-border">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex items-center justify-between gap-4 py-2.5 text-sm">
              <span className="text-body">{cert.name}</span>
              {cert.year ? <span className="shrink-0 font-mono text-xs text-muted">{cert.year}</span> : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  )
}
