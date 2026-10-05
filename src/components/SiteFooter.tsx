import { Link } from '@tanstack/react-router'
import { navItems, site } from '@/config/site'
import { Wordmark } from './Logo'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Wordmark />
          <p className="text-sm text-faint">© {new Date().getFullYear()} {site.fullName}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
