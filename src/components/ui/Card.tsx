import type { PointerEvent, ReactNode } from 'react'

function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--x', `${event.clientX - rect.left}px`)
  el.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      onPointerMove={trackPointer}
      className={`spotlight rounded-2xl border border-border bg-bg-subtle/70 transition-colors duration-300 hover:border-border-strong ${className}`}
    >
      {children}
    </div>
  )
}
