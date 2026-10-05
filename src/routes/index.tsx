import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Gamepad2, Megaphone, MessagesSquare } from 'lucide-react'
import { site } from '@/config/site'
import { listPublishedAnnouncements, listPublishedGames } from '@/lib/content'
import { Container, EmptyState, Eyebrow, SectionHeading, buttonClass } from '@/components/ui'
import { LogoMark } from '@/components/Logo'
import { GameCard, GameGrid } from '@/components/GameCard'
import { AnnouncementList } from '@/components/AnnouncementList'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [games, news] = await Promise.all([listPublishedGames(), listPublishedAnnouncements()])
    return { games: games.slice(0, 3), news: news.slice(0, 3) }
  },
  component: Home,
})

function Home() {
  const { games, news } = Route.useLoaderData()

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-ember/10 blur-[120px]"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
          <div className="animate-rise space-y-7">
            <Eyebrow>{site.fullName}</Eyebrow>
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Our games.
              <br />
              <span className="text-ember">Your community.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              The official home for our games, studio news, and the community that plays them.
              Download releases, follow development, and join the conversation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/games" className={buttonClass('primary')}>
                Browse games <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/forum" className={buttonClass('secondary')}>
                Visit the forum
              </Link>
            </div>
          </div>

          <div className="relative hidden aspect-square max-w-md justify-self-end lg:block" aria-hidden="true">
            <div className="absolute inset-0 rotate-6 rounded-[2.5rem] border border-line bg-surface/40" />
            <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] border border-line-strong bg-gradient-to-br from-raised to-surface shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]" />
            <div className="absolute inset-0 grid place-items-center text-ink">
              <LogoMark className="h-40 w-40 drop-shadow-[0_0_40px_rgb(255_106_61/0.25)]" />
            </div>
          </div>
        </Container>
      </section>

      <Container className="space-y-20 pt-20">
        <section aria-labelledby="latest-games">
          <SectionHeading
            title="Latest games"
            action={
              games.length > 0 && (
                <Link to="/games" className="text-sm font-medium text-muted hover:text-ink">
                  View all →
                </Link>
              )
            }
          />
          {games.length > 0 ? (
            <GameGrid>
              {games.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </GameGrid>
          ) : (
            <EmptyState
              compact
              icon={Gamepad2}
              title="No games have been published yet."
              description="Published games will appear here as soon as they're released."
            />
          )}
        </section>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <section aria-labelledby="latest-news">
            <SectionHeading title="News" />
            {news.length > 0 ? (
              <AnnouncementList items={news} />
            ) : (
              <EmptyState compact icon={Megaphone} title="No announcements yet." />
            )}
          </section>

          <section aria-labelledby="community">
            <SectionHeading title="Community" />
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-7">
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-signal/10 blur-3xl" aria-hidden="true" />
              <MessagesSquare className="text-signal" size={26} aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl font-semibold">Talk with other players</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Share feedback, report bugs, and discuss the games with the people who make them.
              </p>
              <Link to="/forum" className={`${buttonClass('secondary')} mt-6`}>
                Open the forum
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}
