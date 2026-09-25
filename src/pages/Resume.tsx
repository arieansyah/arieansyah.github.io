import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { buttonClass } from '../components/ui/button'
import { certifications, education, experience, profile, projects, skills } from '../data/content'
import { formatMonth } from '../lib/date'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const contactLine = [
  { label: profile.email, href: `mailto:${profile.email}` },
  { label: profile.phone, href: profile.phoneHref },
  { label: 'linkedin.com/in/arieansyah', href: profile.linkedin },
  { label: 'github.com/arieansyah', href: profile.github },
  { label: 'arieansyah.github.io', href: 'https://arieansyah.github.io/' },
]

/**
 * One-page CV rendered as "paper": fixed light colors regardless of theme,
 * so it looks the same on screen and when saved as PDF via the print dialog.
 */
export function Resume() {
  useDocumentTitle(`${profile.name} — Resume`)

  return (
    <Container className="pt-10 sm:pt-14 print:max-w-none print:p-0">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link to="/" className={buttonClass('ghost', 'sm', '-ml-3')}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to site
        </Link>
        <button type="button" onClick={() => window.print()} className={buttonClass('primary', 'sm')}>
          <Download className="h-4 w-4" aria-hidden="true" />
          Download PDF
        </button>
      </div>

      <Reveal>
        <article className="mx-auto max-w-[210mm] rounded-2xl border border-border bg-white p-7 text-[13px] leading-relaxed text-zinc-700 shadow-xl shadow-black/5 sm:p-12 print:max-w-none print:rounded-none print:border-0 print:p-0 print:text-[11.5px] print:shadow-none">
          <header className="border-b border-zinc-200 pb-5">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{profile.name}</h1>
            <p className="mt-1 text-base font-medium text-indigo-600">
              {profile.role} · {profile.tagline}
            </p>
            <p className="mt-1 text-zinc-500">{profile.location}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-zinc-600">
              {contactLine.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-indigo-600 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <ResumeSection title="Summary">
            <p>{profile.summary}</p>
          </ResumeSection>

          <ResumeSection title="Experience">
            <div className="space-y-5">
              {experience.map((job) => (
                <div key={job.company} className="break-inside-avoid">
                  <h3 className="text-sm font-semibold text-zinc-900">{job.company}</h3>
                  {job.roles.map((role) => (
                    <p key={role.title} className="flex flex-wrap justify-between gap-x-4">
                      <span className="font-medium text-zinc-800">{role.title}</span>
                      <span className="text-zinc-500 tabular-nums">
                        {formatMonth(role.start)} – {formatMonth(role.end)}
                      </span>
                    </p>
                  ))}
                  <ul className="mt-2 list-disc space-y-1 pl-4 marker:text-zinc-400">
                    {job.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-1.5 text-zinc-500">
                    <span className="font-medium text-zinc-600">Stack:</span> {job.stack.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Selected projects">
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.name} className="break-inside-avoid">
                  <span className="font-semibold text-zinc-900">{project.name}</span>
                  <span className="text-zinc-500"> — {project.context}. </span>
                  {project.description}
                </li>
              ))}
            </ul>
          </ResumeSection>

          <ResumeSection title="Skills">
            <dl className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[140px_1fr] print:grid-cols-[140px_1fr]">
              {skills.map((group) => (
                <div key={group.group} className="contents">
                  <dt className="font-semibold text-zinc-900">{group.group}</dt>
                  <dd>{group.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          <ResumeSection title="Education">
            <div className="break-inside-avoid">
              <p className="flex flex-wrap justify-between gap-x-4">
                <span className="font-semibold text-zinc-900">{education.school}</span>
                <span className="text-zinc-500">{education.period}</span>
              </p>
              <p>
                {education.degree} · GPA {education.gpa}
              </p>
              <p className="mt-1 text-zinc-500 italic">Thesis: {education.thesis}</p>
            </div>
          </ResumeSection>

          <ResumeSection title="Certifications">
            <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 print:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  {cert.name}
                  {cert.year ? <span className="text-zinc-500"> ({cert.year})</span> : null}
                </li>
              ))}
            </ul>
          </ResumeSection>
        </article>
      </Reveal>
    </Container>
  )
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2.5 text-[11px] font-semibold tracking-[0.16em] text-indigo-600 uppercase">{title}</h2>
      {children}
    </section>
  )
}
