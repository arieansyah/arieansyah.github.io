import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { Eyebrow } from './SectionHeading'

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-80 w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <Container className="pt-16 pb-10 sm:pt-24 sm:pb-14">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          {description ? <p className="mt-4 max-w-2xl text-lg text-body">{description}</p> : null}
          {children}
        </Reveal>
      </Container>
    </section>
  )
}
