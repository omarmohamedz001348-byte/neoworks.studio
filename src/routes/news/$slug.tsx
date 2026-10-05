import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, Megaphone } from 'lucide-react'
import { formatDate, listPublishedAnnouncements } from '@/lib/content'
import { Container, EmptyState, buttonClass } from '@/components/ui'

export const Route = createFileRoute('/news/$slug')({
  loader: async ({ params }) => {
    const item = (await listPublishedAnnouncements()).find((a) => a.slug === params.slug)
    if (!item) throw notFound()
    return item
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData?.title ?? 'News' }] }),
  notFoundComponent: () => (
    <Container className="py-24">
      <EmptyState icon={Megaphone} title="Announcement not found" description="It may have been removed or unpublished.">
        <Link to="/news" className={buttonClass('secondary')}>
          Back to news
        </Link>
      </EmptyState>
    </Container>
  ),
  component: AnnouncementPage,
})

function AnnouncementPage() {
  const a = Route.useLoaderData()
  return (
    <Container className="max-w-3xl py-14">
      <Link to="/news" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden="true" /> All news
      </Link>
      <article className="mt-8">
        <time dateTime={a.publishedAt} className="text-sm font-medium uppercase tracking-wider text-faint">
          {formatDate(a.publishedAt)}
        </time>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{a.title}</h1>
        <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-muted">{a.body}</div>
      </article>
    </Container>
  )
}
