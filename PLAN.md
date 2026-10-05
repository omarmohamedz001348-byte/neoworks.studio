# NeoWorks — Product Roadmap

Guiding rule for every milestone: **empty is better than fake.** No seeded games,
users, posts, reviews, statistics or download counts — ever. Every record comes
from a real admin or user action.

Target architecture (all Netlify-native, no third-party backend required):

| Layer | Choice |
|-------|--------|
| Frontend | TanStack Start (React 19, TypeScript, Tailwind 4) |
| API | TanStack Start server functions / server routes on Netlify Functions |
| Auth | Netlify Identity via `@netlify/identity` (secure, provider-managed passwords) |
| Database | Netlify Database (managed Postgres) + Drizzle ORM |
| File storage | Netlify Blobs (covers, screenshots, avatars), served via Netlify Image CDN |

---

## ✅ Milestone 1 — Public product surface (done)

Branded dark gaming UI: Home, Games library, Game detail, Forum, News, News
article, About, 404/error screens. Responsive header with mobile menu, loading
skeletons, empty states and error states. All pages read from `src/lib/content.ts`,
which returns only real data (currently none).

## Milestone 2 — Database schema & real content reads

- `db/schema.ts` with Drizzle: `profiles`, `games`, `game_screenshots`,
  `announcements`, `forum_categories`, `forum_threads`, `forum_posts`,
  `reviews`, `reports`, `download_events`.
- Replace the bodies of `src/lib/content.ts` with server functions that query
  published rows only. Pagination on list queries.
- No seed data.

## Milestone 3 — Authentication & profiles

- Enable Netlify Identity (run the skill's `enable.cjs`), sign up, log in,
  log out, password reset, change password, persistent sessions.
- `/login`, `/signup`, `/account`, `/u/$username` profile pages; avatar upload
  to Blobs; editable bio.
- Roles: `user` (default) and `admin`. **omarmohamedz001348@gmail.com** receives
  `admin` server-side (Identity role via app_metadata, assigned on signup by a
  server hook — no password is created or stored in code). Suspended flag on
  profiles.
- Header account menu; "Admin" link only when the server reports the admin role.

## Milestone 4 — Admin dashboard: games

- `/admin` layout guarded server-side (every admin server function re-checks
  the role; client checks are cosmetic only).
- Game CRUD: title, slug, summary, description, developer, genres, platforms,
  version, release date, status, requirements, download URL, website URL.
- Cover + screenshot upload to Blobs with type/size validation.
- Save draft / Publish / Unpublish / Delete (deletes associated blobs).
- Real statistics panel: counts straight from the database (shows 0 when 0).

## Milestone 5 — Forum

- Categories (admin-managed), threads, replies, timestamps, pagination.
- Posting requires sign-in; authors may edit/delete their own posts.
- Report button → `reports` table.
- Admin moderation: delete posts/replies, lock/unlock threads, resolve reports.

## Milestone 6 — News management

- Admin create/edit/publish/unpublish/delete announcements; public pages list
  published items only.

## Milestone 7 — Reviews, downloads & search

- One review/rating per signed-in user per game; averages computed in SQL.
- Download button routes through a server endpoint that records a
  `download_event` before redirecting; counts start at 0.
- Site-wide `/search` across games, threads, news and usernames (Postgres
  full-text search). "No results found." when empty.

## Milestone 8 — User management & hardening

- Admin user list, profile view, suspend/unsuspend, role changes (admins only,
  cannot demote the last admin).
- Input validation with Zod on every server function, rate limiting on posting,
  accessibility and performance pass.
