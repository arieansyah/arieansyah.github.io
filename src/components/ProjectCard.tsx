import { ArrowUpRight } from 'lucide-react'
import { Card } from './ui/Card'
import { Tag } from './ui/Tag'
import type { projects } from '../data/content'

type Project = (typeof projects)[number]

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{project.context}</p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener"
                className="after:absolute after:inset-0 after:rounded-2xl hover:text-accent"
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
        </div>
        {project.url ? (
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{project.description}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>
    </Card>
  )
}
