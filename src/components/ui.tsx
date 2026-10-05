import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-ember">
      {children}
    </p>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative flex flex-col gap-6 py-14 sm:py-20 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl animate-rise space-y-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          {description && <p className="text-lg leading-relaxed text-muted">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
      </Container>
    </div>
  )
}

export function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      {action}
    </div>
  )
}

/**
 * Shown wherever there is no real content yet. Pages must use this rather
 * than filling space with sample data.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
  compact = false,
}: {
  icon: LucideIcon
  title: string
  description?: string
  children?: ReactNode
  compact?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-surface/60 text-center ${
        compact ? 'px-6 py-10' : 'px-6 py-16 sm:py-24'
      }`}
    >
      <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-line-strong bg-raised text-faint">
        <Icon size={22} aria-hidden="true" />
      </span>
      <p className="font-display text-lg font-semibold">{title}</p>
      {description && <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{description}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/5 px-6 py-10 text-center">
      <p className="font-display text-lg font-semibold text-red-300">Something went wrong</p>
      <p className="mt-2 text-sm text-muted">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className={`${buttonClass('secondary')} mt-6`}>
          Try again
        </button>
      )}
    </div>
  )
}

export function buttonClass(variant: 'primary' | 'secondary' | 'ghost' = 'primary') {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50'
  const variants = {
    primary:
      'bg-ember text-base hover:bg-ember-soft shadow-[0_0_0_1px_rgb(255_106_61/0.4),0_8px_24px_-8px_rgb(255_106_61/0.6)] hover:shadow-[0_0_0_1px_rgb(255_138_99/0.6),0_10px_32px_-8px_rgb(255_106_61/0.8)]',
    secondary: 'border border-line-strong bg-raised text-ink hover:border-faint hover:bg-line',
    ghost: 'text-muted hover:bg-raised hover:text-ink',
  }
  return `${base} ${variants[variant]}`
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line-strong bg-raised px-2 py-0.5 text-xs font-medium text-muted">
      {children}
    </span>
  )
}

/** Honest notice for features whose backend is not connected yet. */
export function ComingSoon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-raised px-3 py-1 text-xs font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
      {children}
    </span>
  )
}
