import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Clock, FileText, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Card } from '../components/ui/Card'
import { CountUp } from '../components/ui/CountUp'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Tag } from '../components/ui/Tag'
import { buttonClass } from '../components/ui/button'
import { iconFor } from '../components/ui/icons'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import { ClientMarquee } from '../components/ClientMarquee'
import { ProjectCard } from '../components/ProjectCard'
import { CtaBanner } from '../components/CtaBanner'
import { certifications, clients, experience, features, profile, projects, skills } from '../data/content'
import { formatMonth, yearsSince } from '../lib/date'
import { easeBrand } from '../lib/motion'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const LatestPosts = lazy(() => import('../components/LatestPosts'))

const socials = [
  { icon: GithubIcon, href: profile.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
]

const stats = [
  { value: yearsSince(profile.careerStart), suffix: '+', label: 'Years of experience' },
  { value: projects.length, suffix: '+', label: 'Projects shipped' },
  { value: clients.length, suffix: '', label: 'Companies & clients' },
  { value: certifications.length, suffix: '', label: 'Certifications' },
]

export function Home() {
  useDocumentTitle(`${profile.name} — ${profile.role}`)
  const featured = projects.filter((p) => p.featured)

  return (
    <>
      <Hero />

      {/* Stats */}
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-bg-subtle/70 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col-reverse justify-end p-6 sm:p-8 ${i % 2 === 1 ? 'border-l border-border' : ''} ${i >= 2 ? 'border-t border-border lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
              >
                <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* Clients */}
      <section className="mt-20" aria-labelledby="clients-heading">
        <Container>
          <p id="clients-heading" className="text-center font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Trusted by teams at
          </p>
        </Container>
        <div className="mx-auto mt-6 max-w-6xl">
          <ClientMarquee />
        </div>
      </section>

      {/* What I do */}
      <Container as="section" className="mt-28">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            title="End-to-end engineering, from API to app store."
            description="I'm most at home where backend, infrastructure, and product meet — shipping systems that stay fast and maintainable in production."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = iconFor(feature.icon)
            return (
              <Reveal key={feature.title} delay={i * 0.08}>
                <Card className="h-full p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg text-accent shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{feature.description}</p>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Container>

      {/* Featured projects */}
      <Container as="section" className="mt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects I've built and shipped."
            description="Enterprise platforms, fintech, and mobile products — a few highlights."
            action={{ label: 'All projects', to: '/projects' }}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.name} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>

      <Suspense fallback={null}>
        <LatestPosts />
      </Suspense>

      {/* Experience snapshot */}
      <Container as="section" className="mt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked."
            action={{ label: 'Full experience', to: '/experience' }}
          />
        </Reveal>
        <Reveal delay={0.05} className="mt-10">
          <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-subtle/70">
            {experience.map((job) => {
              const latest = job.roles[0]
              const earliest = job.roles[job.roles.length - 1]
              const current = latest.end === null
              return (
                <li key={job.company} className="grid gap-2 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${current ? 'bg-accent ring-4 ring-accent/20' : 'bg-border-strong'}`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold tracking-tight text-ink">{latest.title}</p>
                      <p className="text-sm text-body">
                        {job.company}
                        {job.roles.length > 1 ? (
                          <span className="text-muted"> · promoted from {job.roles[1].title}</span>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <p className="pl-6.5 font-mono text-xs text-muted sm:pl-0 sm:text-right">
                    {formatMonth(earliest.start)} — {formatMonth(latest.end)}
                  </p>
                </li>
              )
            })}
          </ol>
        </Reveal>
      </Container>

      {/* Skills */}
      <Container as="section" className="mt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Tech stack"
            title="Tools I use to ship."
            description="Production experience across the stack — languages, infrastructure, data, and mobile."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const Icon = iconFor(group.icon)
            return (
              <Reveal key={group.group} delay={(i % 3) * 0.06}>
                <Card className="h-full p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Container>

      <CtaBanner />
    </>
  )
}

function Hero() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: easeBrand },
  })

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[28rem] w-[min(1000px,100%)] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent/20 via-accent-2/10 to-accent/20 blur-3xl"
      />

      <Container className="grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-28 lg:pb-24">
        <div className="order-2 lg:order-1">
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/70 px-3 py-1 text-xs font-medium text-body backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {profile.name}.
            <br />
            <span className="text-gradient">{profile.role}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            {profile.bio}
          </motion.p>

          <motion.ul
            {...fadeUp(0.22)}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
            aria-label="Quick facts"
          >
            <li className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" aria-hidden="true" />
              Currently at{' '}
              <a href={profile.companyUrl} target="_blank" rel="noopener" className="font-medium text-ink hover:text-accent">
                {profile.company}
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.shortLocation}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {profile.timezoneLabel}
            </li>
          </motion.ul>

          <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/contact" className={buttonClass('primary', 'md', 'group')}>
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link to="/resume" className={buttonClass('secondary')}>
              <FileText className="h-4 w-4" aria-hidden="true" />
              View resume
            </Link>
            <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener' : undefined}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-ink"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: easeBrand }}
          className="relative order-1 mx-auto w-44 sm:w-56 lg:order-2 lg:w-80"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-accent/50 to-accent-2/40 opacity-70 blur-2xl"
          />
          <div className="relative rounded-[2rem] bg-gradient-to-br from-accent/60 via-border to-accent-2/60 p-px">
            <img
              src="/avatar.webp"
              alt={`Portrait of ${profile.name}`}
              width={320}
              height={320}
              fetchPriority="high"
              className="aspect-square w-full rounded-[calc(2rem-1px)] bg-surface object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-border bg-bg/90 px-4 py-3 shadow-lg backdrop-blur sm:block lg:-left-10">
            <p className="text-xl font-semibold tracking-tight text-ink">{yearsSince(profile.careerStart)}+ yrs</p>
            <p className="text-xs text-muted">shipping to production</p>
          </div>
          <div className="absolute -top-3 -right-3 hidden rounded-full border border-border bg-bg/90 px-3 py-1.5 font-mono text-[11px] text-body shadow-lg backdrop-blur sm:block lg:-right-8">
            Go · K8s · Flutter
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
