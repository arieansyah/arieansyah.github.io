import { motion } from 'framer-motion'
import { ArrowDown, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from './ui/Container'
import { Button } from './ui/Button'
import { GithubIcon, LinkedinIcon } from './icons'
import { profile } from '../data/content'
import { easeBrand } from '../lib/motion'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeBrand } },
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/3 rounded-full bg-accent-2/15 blur-[110px]" />
      </div>

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="mx-auto flex max-w-3xl flex-col items-center pb-20 text-center sm:pb-28"
        >
          <motion.div variants={item} className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-border-strong sm:h-28 sm:w-28">
            <picture>
              <source srcSet="/avatar.webp" type="image/webp" />
              <img
                src="/avatar.jpg"
                alt={profile.name}
                width={320}
                height={320}
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </motion.div>

          <motion.p variants={item} className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Software Engineer
          </motion.p>

          <motion.h1 variants={item} className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-[3.4rem] md:leading-[1.05]">
            Reliable backend, DevOps &amp; mobile systems
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-balance text-lg text-muted">
            I'm {profile.name}, {profile.role} at{' '}
            <a href={profile.companyUrl} target="_blank" rel="noopener" className="font-medium text-ink underline decoration-accent/50 underline-offset-4 hover:text-accent">
              {profile.company}
            </a>
            . I design and ship backend services, cloud infrastructure, and mobile products — and take on select freelance engagements.
          </motion.p>

          <motion.p variants={item} className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {profile.location}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={`mailto:${profile.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" /> Get in touch
            </Button>
            <Button href="#experience" variant="ghost">
              View my work <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex items-center gap-4">
            {[
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
              { icon: Phone, href: profile.phoneHref, label: 'Phone' },
              { icon: GithubIcon, href: profile.github, label: 'GitHub' },
              { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener' : undefined}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-accent"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  )
}
