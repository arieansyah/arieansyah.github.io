import { useEffect, useState } from 'react'
import { ArrowUpRight, Clock, FileText, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { buttonClass } from '../components/ui/button'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import { CopyEmailButton } from '../components/CopyEmailButton'
import { profile } from '../data/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const channels = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/arieansyah', href: profile.linkedin },
  { icon: GithubIcon, label: 'GitHub', value: '@arieansyah', href: profile.github },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
]

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: profile.timezone,
})

function useLocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return timeFormat.format(now)
}

export function Contact() {
  useDocumentTitle(`Contact — ${profile.name}`)
  const localTime = useLocalTime()

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        description="Open to full-time roles and select engagements in backend, DevOps, and mobile engineering. I usually reply within a day."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className={buttonClass('primary')}>
            <Mail className="h-4 w-4" aria-hidden="true" />
            Send an email
          </a>
          <CopyEmailButton />
          <Link to="/resume" className={buttonClass('ghost')}>
            <FileText className="h-4 w-4" aria-hidden="true" />
            View resume
          </Link>
        </div>
      </PageHeader>

      <Container className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {channels.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal as="li" key={label} delay={i * 0.05}>
              <Card className="group h-full">
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener' : undefined}
                  className="flex h-full items-center gap-4 p-5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-bg text-ink shadow-sm transition-colors group-hover:text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block truncate text-sm font-medium text-ink">{value}</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </a>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <Card className="h-full p-6">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {profile.availability}
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-muted">Based in</dt>
                  <dd className="text-ink">{profile.location}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-muted">Local time</dt>
                  <dd className="text-ink">
                    <span className="font-mono tabular-nums">{localTime}</span> · {profile.timezoneLabel}
                  </dd>
                </div>
              </div>
            </dl>
          </Card>
        </Reveal>
      </Container>
    </>
  )
}
