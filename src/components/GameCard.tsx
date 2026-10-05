import { Link } from '@tanstack/react-router'
import { Gamepad2 } from 'lucide-react'
import type { Game } from '@/lib/content'
import { Badge } from './ui'

const statusLabel = {
  released: 'Released',
  'early-access': 'Early access',
  'in-development': 'In development',
} as const

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      to="/games/$slug"
      params={{ slug: game.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_106_61/0.15)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-raised">
        {game.coverUrl ? (
          <img
            src={game.coverUrl}
            alt={`${game.title} cover art`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-faint">
            <Gamepad2 size={32} aria-hidden="true" />
          </div>
        )}
        {game.status && (
          <span className="absolute left-3 top-3 rounded-md bg-base/80 px-2 py-1 text-xs font-semibold backdrop-blur">
            {statusLabel[game.status]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-ember-soft">
          {game.title}
        </h3>
        {game.summary && <p className="line-clamp-2 text-sm text-muted">{game.summary}</p>}
        {game.genres.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {game.genres.slice(0, 3).map((g) => (
              <Badge key={g}>{g}</Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export function GameCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface" aria-hidden="true">
      <div className="skeleton aspect-[16/9]" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-2/3 rounded" />
        <div className="skeleton h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-4/5 rounded" />
      </div>
    </div>
  )
}

export function GameGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
}
