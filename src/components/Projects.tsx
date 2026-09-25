import { ExternalLink, FolderOpenDot } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { projects } from '../data/content'

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          icon={FolderOpenDot}
          eyebrow="Portfolio"
          title="Selected projects"
          description="A sample of the products and platforms I've built or shipped features for."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={(i % 3) * 0.08}>
              <article className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-2">
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 hover:text-accent"
                    >
                      {project.name}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
