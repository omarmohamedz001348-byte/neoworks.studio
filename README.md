# NeoWorks

The official games and community website for NeoWorks Studio: a games library,
studio news, and a community forum, with a dark gaming-focused look.

The site has no sample content of any kind. Each section shows an honest empty
state until real games, announcements or discussions are added.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router, SSR)
- TypeScript, Tailwind CSS 4, lucide-react icons
- Deployed on Netlify (Netlify Database, Identity and Blobs planned, see roadmap)

## Running locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

## Project structure

- `src/routes/`: pages (file-based routing)
- `src/components/`: shared UI (header, footer, cards, empty/error states)
- `src/lib/content.ts`: the single data access layer for all public content
- `src/config/site.ts`: site name, description and navigation

## Roadmap

The public site is live. Still to build: the database, accounts and profiles,
the admin dashboard (games, news, forum moderation, users), forum posting,
reviews, download tracking, and site-wide search. See [PLAN.md](./PLAN.md).
