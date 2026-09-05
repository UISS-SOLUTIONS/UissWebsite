import 'server-only'

import { and, asc, desc, eq, gte, lt } from 'drizzle-orm'

import { db, hasDatabaseUrl } from '@/app/db'
import { clubs, events, leaders, projects } from '@/app/db/schema'
import { getCatalogClub } from '@/lib/club-catalog'

async function safely<T>(label: string, query: Promise<T>, fallback: T): Promise<T> {
  try {
    return await query
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`[UISS public data] ${label} unavailable: ${message}`)
    return fallback
  }
}

export async function getClubs() {
  if (!hasDatabaseUrl) return []

  return safely(
    'clubs',
    db.query.clubs.findMany({
      where: eq(clubs.status, 'active'),
      orderBy: asc(clubs.title),
      with: { coverMedia: true },
    }),
    [],
  )
}

export async function getClub(slug: string) {
  const fallback = getCatalogClub(slug)
  if (!hasDatabaseUrl) return fallback

  const published = await safely(
    `club ${slug}`,
    db.query.clubs.findFirst({
      where: and(eq(clubs.slug, slug), eq(clubs.status, 'active')),
      with: { coverMedia: true },
    }),
    undefined,
  )

  return published ?? fallback
}

export async function getEvents() {
  if (!hasDatabaseUrl) return []

  const now = new Date()
  const [upcoming, past] = await Promise.all([
    safely(
      'upcoming events',
      db.query.events.findMany({
        where: gte(events.startsAt, now),
        orderBy: asc(events.startsAt),
        with: { club: true, coverMedia: true },
      }),
      [],
    ),
    safely(
      'past events',
      db.query.events.findMany({
        where: lt(events.startsAt, now),
        orderBy: desc(events.startsAt),
        with: { club: true, coverMedia: true },
      }),
      [],
    ),
  ])

  return [...upcoming, ...past]
}

export async function getEvent(slug: string) {
  if (!hasDatabaseUrl) return null

  return safely(
    `event ${slug}`,
    db.query.events.findFirst({
      where: eq(events.slug, slug),
      with: { club: true, coverMedia: true },
    }),
    undefined,
  )
}

export async function getProjects() {
  if (!hasDatabaseUrl) return []

  return safely(
    'projects',
    db.query.projects.findMany({
      where: eq(projects.publicationStatus, 'published'),
      orderBy: [desc(projects.year), desc(projects.createdAt)],
      with: {
        club: true,
        coverMedia: true,
        gallery: { with: { media: true } },
      },
    }),
    [],
  )
}

export async function getProject(slug: string) {
  if (!hasDatabaseUrl) return null

  return safely(
    `project ${slug}`,
    db.query.projects.findFirst({
      where: and(
        eq(projects.slug, slug),
        eq(projects.publicationStatus, 'published'),
      ),
      with: {
        club: true,
        coverMedia: true,
        gallery: { with: { media: true } },
      },
    }),
    undefined,
  )
}

export async function getLeaders() {
  if (!hasDatabaseUrl) return []

  const all = await safely(
    'leaders',
    db.query.leaders.findMany({
      orderBy: [
        desc(leaders.year),
        asc(leaders.lastName),
        asc(leaders.firstName),
      ],
      with: { position: true },
    }),
    [],
  )
  const year = all[0]?.year

  return year ? all.filter((leader) => leader.year === year) : []
}
