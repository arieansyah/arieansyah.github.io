import { ArrowUpRight } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { PageHeader } from '../components/ui/PageHeader'
import { expertise, profile, projects } from '../data/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Projects() {
  useDocumentTitle(`Projects — ${profile.name}`)

  return (
    <Container className="py-14 sm:py-20">
      <PageHeader
        title="Projects"
        description="A sample of the products and platforms I've built or shipped features for."
      />

      <ul className="mt-10 divide-y divide-border border-t border-border">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.name} delay={Math.min(i, 6) * 0.04}>
            <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
              <h2 className="shrink-0 text-sm font-semibold text-ink sm:w-56">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1 hover:text-accent hover:underline"
                  >
                    {project.name}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  project.name
                )}
              </h2>
              <p className="text-sm text-body sm:flex-1">{project.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1} className="mt-14 border-t border-border pt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Tech I work with</h2>
        <p className="mt-4 text-sm leading-loose text-body">
          {expertise.map((skill, i) => (
            <span key={skill}>
              {skill}
              {i < expertise.length - 1 ? <span className="px-2 text-border-strong">·</span> : null}
            </span>
          ))}
        </p>
      </Reveal>
    </Container>
  )
}
