import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, Download, ExternalLink, Gamepad2, Star } from 'lucide-react'
import { formatDate, getPublishedGame, type Game } from '@/lib/content'
import { Badge, Container, EmptyState, buttonClass } from '@/components/ui'

export const Route = createFileRoute('/games/$slug')({
  loader: async ({ params }) => {
    const game = await getPublishedGame(params.slug)
    if (!game) throw notFound()
    return game
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData?.title ?? 'Game' }] }),
  notFoundComponent: () => (
    <Container className="py-24">
      <EmptyState icon={Gamepad2} title="Game not found" description="This game doesn't exist or hasn't been published.">
        <Link to="/games" className={buttonClass('secondary')}>
          Back to games
        </Link>
      </EmptyState>
    </Container>
  ),
  component: GamePage,
})

function GamePage() {
  const game = Route.useLoaderData()

  const facts: [string, string | null][] = [
    ['Developer', game.developer],
    ['Version', game.version],
    ['Release date', game.releaseDate && formatDate(game.releaseDate)],
    ['Platforms', game.platforms.join(', ') || null],
    ['Downloads', game.downloadCount.toLocaleString()],
  ]

  return (
    <article>
      <div className="relative overflow-hidden border-b border-line">
        {game.coverUrl && (
          <img src={game.coverUrl} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-base/40 to-base" aria-hidden="true" />
        <Container className="relative py-10 sm:py-14">
          <Link to="/games" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
            <ArrowLeft size={16} aria-hidden="true" /> All games
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-raised">
              {game.coverUrl ? (
                <img src={game.coverUrl} alt={`${game.title} cover art`} className="aspect-[16/9] w-full object-cover" />
              ) : (
                <div className="grid aspect-[16/9] place-items-center text-faint">
                  <Gamepad2 size={48} aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                {game.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {game.genres.map((g) => (
                      <Badge key={g}>{g}</Badge>
                    ))}
                  </div>
                )}
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{game.title}</h1>
                {game.summary && <p className="text-lg text-muted">{game.summary}</p>}
              </div>
              <Rating game={game} />
              <div className="flex flex-wrap gap-3">
                {game.downloadUrl && (
                  <a href={game.downloadUrl} className={buttonClass('primary')} rel="noopener">
                    <Download size={16} aria-hidden="true" /> Download
                  </a>
                )}
                {game.websiteUrl && (
                  <a href={game.websiteUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
                    Official website <ExternalLink size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {facts.map(([label, value]) => (
                  <div key={label} className="bg-surface px-4 py-3">
                    <dt className="text-xs uppercase tracking-wider text-faint">{label}</dt>
                    <dd className="mt-1 text-sm font-medium">{value ?? 'Not available'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </div>

      <Container className="grid gap-12 pt-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-12">
          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold">About this game</h2>
            <p className="whitespace-pre-line leading-relaxed text-muted">
              {game.description ?? 'No description has been added yet.'}
            </p>
          </section>
          {game.screenshotUrls.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold">Screenshots</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {game.screenshotUrls.map((src, i) => (
                  <img key={src} src={src} alt={`${game.title} screenshot ${i + 1}`} loading="lazy" className="aspect-video w-full rounded-xl border border-line object-cover" />
                ))}
              </div>
            </section>
          )}
          {game.reviewCount === 0 && (
            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold">Reviews</h2>
              <EmptyState compact icon={Star} title="No reviews yet." />
            </section>
          )}
        </div>
        <aside>
          <h2 className="mb-4 font-display text-xl font-semibold">System requirements</h2>
          <p className="whitespace-pre-line rounded-xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
            {game.requirements ?? 'Not available'}
          </p>
        </aside>
      </Container>
    </article>
  )
}

/** Shows an average only when real reviews exist. */
function Rating({ game }: { game: Game }) {
  if (game.reviewCount === 0 || game.ratingAverage === null) {
    return <p className="text-sm text-faint">No reviews yet.</p>
  }
  return (
    <p className="flex items-center gap-2 text-sm">
      <Star size={16} className="fill-ember text-ember" aria-hidden="true" />
      <span className="font-semibold">{game.ratingAverage.toFixed(1)}</span>
      <span className="text-muted">
        from {game.reviewCount.toLocaleString()} {game.reviewCount === 1 ? 'review' : 'reviews'}
      </span>
    </p>
  )
}
