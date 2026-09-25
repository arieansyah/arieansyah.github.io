import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { faqs } from '../data/content'
import { easeBrand } from '../lib/motion'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <SectionHeading icon={HelpCircle} eyebrow="FAQ" title="Frequently asked questions" />

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-surface">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={faq.question} delay={i * 0.05}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-ink">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: easeBrand }}
                      className="shrink-0 text-muted"
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: easeBrand }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
