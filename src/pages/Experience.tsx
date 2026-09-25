import { ArrowUpRight, Award, GraduationCap } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { PageHeader } from '../components/ui/PageHeader'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { Tag } from '../components/ui/Tag'
import { CtaBanner } from '../components/CtaBanner'
import { certifications, education, experience, profile } from '../data/content'
import { formatDuration, formatMonth, yearsSince } from '../lib/date'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Experience() {
  useDocumentTitle(`Experience — ${profile.name}`)

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Where I've worked."
        description={`${yearsSince(profile.careerStart)}+ years across backend, DevOps, and mobile — from startups to enterprise clients.`}
      />

      <Container>
        <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-accent/60 before:via-border before:to-transparent sm:before:left-[9px]">
          {experience.map((job, i) => {
            const current = job.roles[0].end === null
            return (
              <Reveal as="li" key={job.company} delay={i * 0.06} className="relative pl-8 sm:pl-12">
                <span
                  aria-hidden="true"
                  className={`absolute top-7 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 sm:h-[19px] sm:w-[19px] ${
                    current ? 'border-accent bg-bg' : 'border-border-strong bg-bg'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${current ? 'bg-accent' : 'bg-border-strong'}`} />
                </span>

                <Card className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2 className="text-xl font-semibold tracking-tight">
                      {job.url ? (
                        <a href={job.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-accent">
                          {job.company}
                          <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                        </a>
                      ) : (
                        job.company
                      )}
                    </h2>
                    {current ? (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                        Current
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.summary}</p>

                  <ul className="mt-5 space-y-2">
                    {job.roles.map((role) => (
                      <li
                        key={role.title}
                        className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                      >
                        <span className="font-medium text-ink">{role.title}</span>
                        <span className="font-mono text-xs text-muted">
                          {formatMonth(role.start)} — {formatMonth(role.end)} · {formatDuration(role.start, role.end)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-body">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            )
          })}
        </ol>
      </Container>

      <Container as="section" className="mt-28">
        <Reveal>
          <SectionHeading eyebrow="Education" title="Academic background." />
        </Reveal>
        <Reveal delay={0.05} className="mt-10">
          <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:p-8">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-bg text-accent shadow-sm">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-lg font-semibold tracking-tight">{education.school}</h3>
                <span className="font-mono text-xs text-muted">{education.period}</span>
              </div>
              <p className="mt-1 text-body">
                {education.degree} · <span className="text-muted">GPA {education.gpa}</span>
              </p>
              <p className="mt-4 rounded-xl border border-border bg-bg p-4 text-sm leading-relaxed text-body">
                <span className="font-medium text-ink">Thesis — </span>
                <span className="italic">{education.thesis}</span>
              </p>
            </div>
          </Card>
        </Reveal>
      </Container>

      <Container as="section" className="mt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Certifications"
            title="Always learning."
            description="Courses and certifications in cloud, DevOps, mobile, and machine learning."
          />
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal as="li" key={cert.name} delay={(i % 3) * 0.05}>
              <Card className="flex h-full items-start gap-3 p-4">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="flex-1 text-sm leading-snug text-ink">{cert.name}</span>
                {cert.year ? <span className="shrink-0 font-mono text-xs text-muted">{cert.year}</span> : null}
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>

      <CtaBanner />
    </>
  )
}
