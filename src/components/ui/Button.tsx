import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { easeBrand } from '../../lib/motion'

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
> & {
  children: ReactNode
  variant?: 'primary' | 'ghost'
}

export function Button({ children, variant = 'primary', className = '', ...rest }: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-accent to-accent-2 text-[#070b16] hover:brightness-110'
      : 'border border-border-strong text-ink hover:bg-surface-2'

  return (
    <motion.a
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: easeBrand }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </motion.a>
  )
}
