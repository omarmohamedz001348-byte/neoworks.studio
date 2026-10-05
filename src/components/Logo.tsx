import { site } from '@/config/site'

export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 26V6l12 13V6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="square" />
      <path d="M20 6h8v20h-8" fill="none" stroke="var(--color-ember)" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="square" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-lg font-semibold uppercase tracking-[0.18em]">
        {site.name}
      </span>
    </span>
  )
}
