import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Gamepad2, Search } from 'lucide-react'
import { listPublishedGames } from '@/lib/content'
import { Container, EmptyState, PageHeader } from '@/components/ui'
import { GameCard, GameCardSkeleton, GameGrid } from '@/components/GameCard'

export const Route = createFileRoute('/games/')({
  head: () => ({ meta: [{ title: 'Games' }] }),
  loader: () => listPublishedGames(),
  pendingComponent: () => (
    <>
      <PageHeader eyebrow="Library" title="Games" />
      <Container className="pt-10">
        <GameGrid>
          {Array.from({ length: 6 }, (_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </GameGrid>
      </Container>
    </>
  ),
  component: GamesPage,
})

function GamesPage() {
  const games = Route.useLoaderData()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')

  // Filter options come only from genres that published games actually use.
  const genres = useMemo(() => [...new Set(games.flatMap((g) => g.genres))].sort(), [games])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return games.filter(
      (g) =>
        (!genre || g.genres.includes(genre)) &&
        (!q || [g.title, g.summary, g.developer].some((f) => f?.toLowerCase().includes(q))),
    )
  }, [games, query, genre])

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Games"
        description="Every game released by the studio, with downloads, details and system requirements."
      />
      <Container className="pt-10">
        {games.length === 0 ? (
          <EmptyState
            icon={Gamepad2}
            title="No games have been published yet."
            description="When a game is released it will be listed here with its details and download links."
          />
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search games</span>
                <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search games"
                  className="w-full rounded-lg border border-line-strong bg-surface py-2.5 pl-11 pr-4 text-sm placeholder:text-faint focus:border-ember focus:outline-none"
                />
              </label>
              {genres.length > 0 && (
                <label>
                  <span className="sr-only">Filter by genre</span>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm focus:border-ember focus:outline-none sm:w-52"
                  >
                    <option value="">All genres</option>
                    {genres.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            {filtered.length > 0 ? (
              <GameGrid>
                {filtered.map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </GameGrid>
            ) : (
              <EmptyState compact icon={Search} title="No results found." description="Try a different search or genre." />
            )}
          </>
        )}
      </Container>
    </>
  )
}
