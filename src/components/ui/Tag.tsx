import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface/60 px-2 py-0.5 font-mono text-[11px] leading-5 text-body">
      {children}
    </span>
  )
}
