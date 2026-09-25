import { Mail, Phone } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { PageHeader } from '../components/ui/PageHeader'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import { profile } from '../data/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const links = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/arieansyah', href: profile.github },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/in/arieansyah', href: profile.linkedin },
]

export function Contact() {
  useDocumentTitle(`Contact — ${profile.name}`)

  return (
    <Container className="py-14 sm:py-20">
      <PageHeader
        title="Get in touch"
        description="Open to full-time opportunities and select engagements. Usually replies within a day."
      />

      <ul className="mt-10 max-w-md divide-y divide-border border-t border-border">
        {links.map(({ icon: Icon, label, value, href }) => (
          <Reveal as="li" key={label}>
            <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="group flex items-center gap-4 py-4">
              <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wide text-muted">{label}</span>
                <span className="block truncate text-sm text-ink group-hover:text-accent group-hover:underline">
                  {value}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Container>
  )
}
