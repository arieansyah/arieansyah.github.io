import type { LucideIcon } from 'lucide-react'
import { Reveal } from './Reveal'

export function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon?: LucideIcon
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
        {Icon ? <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> : null}
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-base text-muted">{description}</p> : null}
    </Reveal>
  )
}
