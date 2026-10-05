import { Link, createFileRoute } from '@tanstack/react-router'
import { site } from '@/config/site'
import { Container, PageHeader, buttonClass } from '@/components/ui'

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: 'About' }] }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={site.fullName} />
      <Container className="max-w-3xl pt-12">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <p>
            This site is the official home of {site.fullName}. It's where our games are published,
            where studio news is announced, and where players can talk with each other and with us.
          </p>
          <p>
            Everything you see here is real: games appear when they're released, news when it's
            announced, and discussions when players start them.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/games" className={buttonClass('primary')}>
            Browse games
          </Link>
          <Link to="/news" className={buttonClass('secondary')}>
            Read the news
          </Link>
        </div>
      </Container>
    </>
  )
}
