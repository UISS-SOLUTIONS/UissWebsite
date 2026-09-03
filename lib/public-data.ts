import 'server-only'
import { and, asc, desc, eq, gte, lt } from 'drizzle-orm'
import { db, hasDatabaseUrl } from '@/app/db'
import { clubs, events, projects, leaders } from '@/app/db/schema'

export async function getClubs() { if (!hasDatabaseUrl) return []; return db.query.clubs.findMany({ where: eq(clubs.status, 'active'), orderBy: asc(clubs.title), with: { coverMedia: true } }) }
export async function getClub(slug: string) { if (!hasDatabaseUrl) return null; return db.query.clubs.findFirst({ where: and(eq(clubs.slug, slug), eq(clubs.status, 'active')), with: { coverMedia: true } }) }
export async function getEvents() { if (!hasDatabaseUrl) return []; const now = new Date(); const upcoming = await db.query.events.findMany({ where: gte(events.startsAt, now), orderBy: asc(events.startsAt), with: { club: true, coverMedia: true } }); const past = await db.query.events.findMany({ where: lt(events.startsAt, now), orderBy: desc(events.startsAt), with: { club: true, coverMedia: true } }); return [...upcoming, ...past] }
export async function getEvent(slug: string) { if (!hasDatabaseUrl) return null; return db.query.events.findFirst({ where: eq(events.slug, slug), with: { club: true, coverMedia: true } }) }
export async function getProjects() { if (!hasDatabaseUrl) return []; return db.query.projects.findMany({ where: eq(projects.publicationStatus, 'published'), orderBy: [desc(projects.year), desc(projects.createdAt)], with: { club: true, coverMedia: true, gallery: { with: { media: true } } } }) }
export async function getProject(slug: string) { if (!hasDatabaseUrl) return null; return db.query.projects.findFirst({ where: and(eq(projects.slug, slug), eq(projects.publicationStatus, 'published')), with: { club: true, coverMedia: true, gallery: { with: { media: true } } } }) }
export async function getLeaders() { if (!hasDatabaseUrl) return []; const all = await db.query.leaders.findMany({ orderBy: [desc(leaders.year), asc(leaders.lastName), asc(leaders.firstName)], with: { position: true } }); const year = all[0]?.year; return year ? all.filter(x => x.year === year) : [] }
