/**
 * Content access layer.
 *
 * Every page reads its data through these functions, so the UI never holds
 * content of its own. Right now they return only what really exists — which,
 * before the database is connected, is nothing. When Netlify Database is wired
 * up (see PLAN.md, milestone 2), only the bodies of these functions change;
 * the types and the pages that call them stay the same.
 *
 * Never add sample or placeholder records here.
 */

export type GameStatus = 'released' | 'early-access' | 'in-development'

export interface Game {
  id: string
  slug: string
  title: string
  summary: string | null
  description: string | null
  developer: string | null
  genres: string[]
  platforms: string[]
  version: string | null
  releaseDate: string | null
  status: GameStatus | null
  coverUrl: string | null
  screenshotUrls: string[]
  downloadUrl: string | null
  websiteUrl: string | null
  requirements: string | null
  downloadCount: number
  reviewCount: number
  ratingAverage: number | null
}

export interface Announcement {
  id: string
  slug: string
  title: string
  excerpt: string | null
  body: string
  publishedAt: string
}

export interface ForumCategory {
  id: string
  slug: string
  name: string
  description: string | null
  threadCount: number
}

export interface ForumThread {
  id: string
  title: string
  categorySlug: string
  authorName: string
  createdAt: string
  replyCount: number
  locked: boolean
}

export async function listPublishedGames(): Promise<Game[]> {
  return []
}

export async function getPublishedGame(_slug: string): Promise<Game | null> {
  return null
}

export async function listPublishedAnnouncements(): Promise<Announcement[]> {
  return []
}

export async function listForumCategories(): Promise<ForumCategory[]> {
  return []
}

export async function listRecentThreads(): Promise<ForumThread[]> {
  return []
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
