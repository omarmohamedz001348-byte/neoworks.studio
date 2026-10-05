# AGENTS.md

NeoWorks is the games and community site for NeoWorks Studio, built with TanStack Start
on Netlify. **Continue work from [PLAN.md](./PLAN.md)**, which lists the milestones
in order. Milestone 1 (the public UI) is complete.

## Non-negotiable product rule

Never add fabricated content: no sample games, users, posts, reviews, ratings,
download counts, statistics or testimonials, and no seed data in migrations.
When data is missing, render `EmptyState` or "Not available". Show ratings only
when `reviewCount > 0`. Download counts start at 0 and only go up from real events.

## Architecture

- `src/routes/`: file-based routes. Each page loads data in its route `loader`
  through `src/lib/content.ts`.
- `src/lib/content.ts`: the one data access layer. Its types (`Game`,
  `Announcement`, `ForumCategory`, `ForumThread`) are the contract the UI depends on.
  It currently returns empty results. Milestone 2 replaces the function bodies with
  Netlify Database (Drizzle) queries wrapped in server functions; pages should not
  need to change.
- `src/components/ui.tsx`: primitives (`Container`, `PageHeader`, `SectionHeading`,
  `EmptyState`, `ErrorState`, `Badge`, `ComingSoon`, `buttonClass`).
- `src/components/`: `SiteHeader` (responsive nav), `SiteFooter`, `GameCard`
  (+ skeleton/grid), `AnnouncementList`, `Logo`.
- `src/config/site.ts`: site name and nav items. Add a nav item only when its page
  actually works.

## Conventions

- Design tokens live in `src/styles.css` under `@theme`: `base/surface/raised`
  backgrounds, `line` borders, `ink/muted/faint` text, `ember` accent, `signal`
  secondary accent. Fonts: Chakra Petch (`font-display`) for headings, IBM Plex Sans for body.
- Keep glow effects subtle; respect `prefers-reduced-motion` (handled globally).
- Use `@/` imports, PascalCase components, and `type` imports where possible.
- Controls whose backend doesn't exist yet stay visibly disabled with a
  `ComingSoon` note (for example forum "New discussion"). Never fake a success.

## Security decisions (for upcoming milestones)

- Auth: Netlify Identity (`@netlify/identity`). Admin email:
  omarmohamedz001348@gmail.com, granted the `admin` role server-side. Never
  hard-code passwords.
- Every admin or mutating server function must verify the user and role on the
  server. Frontend role checks only control visibility.
- Uploaded files go to Netlify Blobs, never into database rows. Validate MIME type and size.
