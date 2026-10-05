import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { formatDate, type Announcement } from '@/lib/content'

export function AnnouncementList({ items }: { items: Announcement[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {items.map((a) => (
        <li key={a.id}>
          <Link
            to="/news/$slug"
            params={{ slug: a.slug }}
            className="group flex items-start justify-between gap-6 px-5 py-5 transition-colors hover:bg-raised sm:px-6"
          >
            <div className="min-w-0 space-y-1.5">
              <time dateTime={a.publishedAt} className="text-xs font-medium uppercase tracking-wider text-faint">
                {formatDate(a.publishedAt)}
              </time>
              <h3 className="font-display text-lg font-semibold group-hover:text-ember-soft">{a.title}</h3>
              {a.excerpt && <p className="line-clamp-2 text-sm text-muted">{a.excerpt}</p>}
            </div>
            <ArrowUpRight size={18} className="mt-1 shrink-0 text-faint group-hover:text-ember" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
