import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function PageHeader({ title, description }: { title: string; description?: ReactNode }) {
  return (
    <Reveal>
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
      {description ? <p className="mt-3 max-w-xl text-body">{description}</p> : null}
    </Reveal>
  )
}
