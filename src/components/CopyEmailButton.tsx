import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { profile } from '../data/content'
import { buttonClass } from './ui/button'

export function CopyEmailButton({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(id)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button type="button" onClick={copy} className={buttonClass('secondary', 'md', className)}>
      {copied ? (
        <Check className="h-4 w-4 text-success" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
    </button>
  )
}
