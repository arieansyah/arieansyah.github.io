import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Container } from './ui/Container'
import { navLinks, profile } from '../data/content'
import { easeBrand } from '../lib/motion'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-border bg-bg/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <img src="/avatar.webp" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
            <span className="text-sm font-semibold text-ink">{profile.name}</span>
          </NavLink>

          <nav aria-label="Primary" className="hidden items-center gap-7 sm:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `text-sm transition-colors ${isActive ? 'font-medium text-ink' : 'text-muted hover:text-ink'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center text-ink sm:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
            className="overflow-hidden border-b border-border sm:hidden"
          >
            <Container className="flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-2 py-2.5 text-sm ${isActive ? 'font-medium text-ink' : 'text-muted'}`
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
