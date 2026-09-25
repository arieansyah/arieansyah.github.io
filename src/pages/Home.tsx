import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import { clients, features, profile, projects } from '../data/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const socials = [
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  { icon: Phone, href: profile.phoneHref, label: 'Phone' },
  { icon: GithubIcon, href: profile.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
]

export function Home() {
  useDocumentTitle(`${profile.name} — ${profile.role}`)

  return (
    <Container className="py-14 sm:py-20">
      <Reveal className="flex items-center gap-4">
        <img
          src="/avatar.webp"
          alt={profile.name}
          width={72}
          height={72}
          className="h-16 w-16 rounded-full object-cover sm:h-[72px] sm:w-[72px]"
        />
        <div>
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">{profile.name}</h1>
          <p className="text-sm text-muted">{profile.tagline}</p>
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-6 max-w-xl">
        <p className="text-body">{profile.bio}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {profile.location}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-6 flex items-center gap-4">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener' : undefined}
            aria-label={label}
            title={label}
            className="text-muted transition-colors hover:text-ink"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        ))}
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">What I do</h2>
        <dl className="mt-4 divide-y divide-border border-t border-border">
          {features.map((feature) => (
            <div key={feature.title} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
              <dt className="text-sm font-medium text-ink">{feature.title}</dt>
              <dd className="text-sm text-body">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.05} className="mt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Selected work</h2>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            All projects <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-border border-t border-border">
          {projects.slice(0, 3).map((project) => (
            <li key={project.name} className="py-4">
              <p className="text-sm font-medium text-ink">{project.name}</p>
              <p className="mt-1 text-sm text-body">{project.description}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Worked with</h2>
        <p className="mt-4 text-sm leading-loose text-body">
          {clients.map((client, i) => (
            <span key={client}>
              {client}
              {i < clients.length - 1 ? <span className="px-2 text-border-strong">·</span> : null}
            </span>
          ))}
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-14 border-t border-border pt-10">
        <p className="text-sm text-body">
          Open to full-time opportunities and select engagements.{' '}
          <Link to="/contact" className="font-medium text-accent hover:underline">
            Get in touch
          </Link>
        </p>
      </Reveal>
    </Container>
  )
}
