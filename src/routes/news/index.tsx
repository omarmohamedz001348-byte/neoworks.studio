import { createFileRoute } from '@tanstack/react-router'
import { Megaphone } from 'lucide-react'
import { listPublishedAnnouncements } from '@/lib/content'
import { Container, EmptyState, PageHeader } from '@/components/ui'
import { AnnouncementList } from '@/components/AnnouncementList'

export const Route = createFileRoute('/news/')({
  head: () => ({ meta: [{ title: 'News' }] }),
  loader: () => listPublishedAnnouncements(),
  component: NewsPage,
})

function NewsPage() {
  const items = Route.useLoaderData()
  return (
    <>
      <PageHeader eyebrow="Announcements" title="News" description="Release notes, updates and announcements from the studio." />
      <Container className="max-w-4xl pt-10">
        {items.length > 0 ? (
          <AnnouncementList items={items} />
        ) : (
          <EmptyState icon={Megaphone} title="No announcements yet." description="Studio news and updates will be posted here." />
        )}
      </Container>
    </>
  )
}
