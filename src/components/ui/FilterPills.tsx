import { motion } from 'framer-motion'

export function FilterPills<T extends string>({
  label,
  options,
  active,
  onChange,
  count,
  layoutId,
}: {
  label: string
  options: readonly T[]
  active: T
  onChange: (option: T) => void
  count: (option: T) => number
  /** Unique per group so the sliding highlight doesn't jump between groups. */
  layoutId: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option === active
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={`relative isolate inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
              selected ? 'border-transparent text-bg' : 'border-border text-body hover:border-border-strong hover:text-ink'
            }`}
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                className="absolute inset-0 -z-10 rounded-full bg-ink"
              />
            ) : null}
            {option}
            <span className={`font-mono text-[11px] ${selected ? 'text-bg/70' : 'text-muted'}`}>{count(option)}</span>
          </button>
        )
      })}
    </div>
  )
}
