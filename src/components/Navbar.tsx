import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Container } from './ui/Container'
import { ThemeToggle } from './ThemeToggle'
import { buttonClass } from './ui/button'
import { navLinks, profile } from '../data/content'
import { easeBrand } from '../lib/motion'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 print:hidden ${
        scrolled || open ? 'border-b border-border bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="relative">
              <img
                src="/avatar.webp"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-border transition group-hover:ring-accent/60"
              />
              <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-success" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink">{profile.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-border bg-bg/60 p-1 md:flex">
            {navLinks.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={`relative isolate rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-surface"
                    />
                  ) : null}
                  {link.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/resume" className={buttonClass('primary', 'sm', 'max-sm:hidden')}>
              <FileText className="h-4 w-4" aria-hidden="true" />
              Resume
            </Link>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: easeBrand }}
            className="overflow-hidden md:hidden"
          >
            <Container className="flex flex-col gap-1 pt-2 pb-4">
              {[...navLinks, { label: 'Resume', href: '/resume' }].map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm ${isActive ? 'bg-surface font-medium text-ink' : 'text-body'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
