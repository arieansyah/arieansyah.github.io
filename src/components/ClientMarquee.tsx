import { clients } from '../data/content'

export function ClientMarquee() {
  return (
    <div className="marquee-wrap marquee-mask overflow-hidden">
      <ul aria-label="Companies and clients" className="marquee flex w-max">
        {[...clients, ...clients].map((client, i) => (
          <li
            key={`${client}-${i}`}
            aria-hidden={i >= clients.length ? true : undefined}
            className="flex items-center gap-8 pr-8 text-lg font-semibold tracking-tight whitespace-nowrap text-muted/80 sm:text-xl"
          >
            {client}
            <span className="h-1.5 w-1.5 rounded-full bg-border-strong" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  )
}
