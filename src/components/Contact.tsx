import { Mail, Phone } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { profile } from '../data/content'

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          icon={Mail}
          eyebrow="Get in touch"
          title="Let's build something reliable"
          description="Open to full-time opportunities, consulting, and freelance engagements. Usually replies within a day."
        />

        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
          <Reveal className="flex-1">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[#070b16]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wide text-muted">Email</span>
                <span className="block truncate font-medium text-ink">{profile.email}</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="flex-1">
            <a
              href={profile.phoneHref}
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[#070b16]">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wide text-muted">Phone</span>
                <span className="block truncate font-medium text-ink">{profile.phone}</span>
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
