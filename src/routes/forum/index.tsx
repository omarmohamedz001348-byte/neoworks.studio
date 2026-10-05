import { createFileRoute } from '@tanstack/react-router'
import { Lock, MessageSquare, MessagesSquare } from 'lucide-react'
import { formatDate, listForumCategories, listRecentThreads } from '@/lib/content'
import { ComingSoon, Container, EmptyState, PageHeader, SectionHeading, buttonClass } from '@/components/ui'

export const Route = createFileRoute('/forum/')({
  head: () => ({ meta: [{ title: 'Forum' }] }),
  loader: async () => {
    const [categories, threads] = await Promise.all([listForumCategories(), listRecentThreads()])
    return { categories, threads }
  },
  component: ForumPage,
})

function ForumPage() {
  const { categories, threads } = Route.useLoaderData()

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Forum"
        description="Feedback, bug reports, and conversation about the games."
        actions={
          <div className="flex flex-col items-start gap-2 md:items-end">
            {/* Enabled once accounts are live — posting requires a signed-in user. */}
            <button type="button" disabled className={buttonClass('primary')}>
              New discussion
            </button>
            <ComingSoon>Accounts open soon</ComingSoon>
          </div>
        }
      />
      <Container className="grid gap-12 pt-10 lg:grid-cols-[1fr_320px]">
        <section aria-labelledby="recent">
          <SectionHeading title="Recent discussions" />
          {threads.length > 0 ? (
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {threads.map((t) => (
                <li key={t.id} className="flex items-center gap-4 px-5 py-4">
                  <MessageSquare size={18} className="shrink-0 text-faint" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 truncate font-medium">
                      {t.locked && <Lock size={14} className="text-faint" aria-label="Locked" />}
                      {t.title}
                    </p>
                    <p className="text-xs text-faint">
                      {t.authorName} · {formatDate(t.createdAt)}
                    </p>
                  </div>
                  <span className="text-sm text-muted">{t.replyCount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={MessagesSquare} title="No discussions yet. Be the first to start one." />
          )}
        </section>

        <aside aria-labelledby="categories">
          <SectionHeading title="Categories" />
          {categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.id} className="rounded-xl border border-line bg-surface px-4 py-3">
                  <p className="font-medium">{c.name}</p>
                  {c.description && <p className="mt-0.5 text-sm text-muted">{c.description}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-line-strong px-4 py-6 text-center text-sm text-muted">
              No categories have been created yet.
            </p>
          )}
        </aside>
      </Container>
    </>
  )
}
