import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { site } from '@/config/site'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Container, ErrorState, buttonClass } from '@/components/ui'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#0a0c10' },
      { title: `${site.name} — Games & Community` },
      { name: 'description', content: site.description },
      { property: 'og:title', content: site.fullName },
      { property: 'og:description', content: site.description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: ({ error, reset }) => (
    <Container className="py-24">
      <ErrorState message={error.message || 'The page could not be loaded.'} onRetry={reset} />
    </Container>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ember focus:px-4 focus:py-2 focus:text-base"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-ember">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className={`${buttonClass('secondary')} mt-8`}>
        Back to home
      </Link>
    </Container>
  )
}
