const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-(--ease-brand) active:scale-[0.98] disabled:pointer-events-none'

const variants = {
  primary: 'bg-ink text-bg shadow-sm hover:opacity-90 hover:shadow-md',
  secondary: 'border border-border bg-bg text-ink hover:border-border-strong hover:bg-surface',
  ghost: 'text-body hover:bg-surface hover:text-ink',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
}

export function buttonClass(
  variant: keyof typeof variants = 'primary',
  size: keyof typeof sizes = 'md',
  className = '',
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}
