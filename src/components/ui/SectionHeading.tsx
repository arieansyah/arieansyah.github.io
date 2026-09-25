import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">{children}</p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: ReactNode
  action?: { label: string; to: string }
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {description ? <p className="mt-3 text-body">{description}</p> : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  )
}
