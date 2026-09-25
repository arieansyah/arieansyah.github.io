import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeBrand } from '../../lib/motion'

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li'
}) {
  const MotionTag = as === 'li' ? motion.li : motion.div
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      variants={variants}
      transition={{ duration: 0.55, delay, ease: easeBrand }}
    >
      {children}
    </MotionTag>
  )
}
