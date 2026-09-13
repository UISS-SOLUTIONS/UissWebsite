import 'server-only'

import { and, asc, desc, eq } from 'drizzle-orm'

import { db, hasDatabaseUrl } from '@/app/db'
import { clubs, coreValues, events, leaders, media, projects } from '@/app/db/schema'
import { getCatalogClub } from '@/lib/club-catalog'
import {
  eventCatalog,
  eventCategories,
  projectCatalog,
  type EventCategory,
  type ExperienceMedia,
  type PublicEvent,
  type PublicProject,
} from '@/lib/experience-catalog'

type DbEvent = typeof events.$inferSelect & {
  club: typeof clubs.$inferSelect | null
  coverMedia: typeof media.$inferSelect | null
}

type DbProject = typeof projects.$inferSelect & {
  club: typeof clubs.$inferSelect | null
  coverMedia: typeof media.$inferSelect | null
  gallery: Array<{ media: typeof media.$inferSelect }>
}

const dateFormatter = new Intl.DateTimeFormat('en-TZ', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Africa/Dar_es_Salaam',
})

function nonempty(value?: string | null) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function externalUrl(value?: string | null) {
  const url = nonempty(value)
  return url && /^https:\/\//i.test(url) ? url : undefined
}

function asMedia(value?: typeof media.$inferSelect | null): ExperienceMedia | undefined {
  const src = nonempty(value?.url)
  const alt = nonempty(value?.alt)
  if (!src || !alt) return undefined

  return {
    src,
    alt,
    width: value?.width,
    height: value?.height,
    credit: value?.credit,
  }
}

function formatDatabaseDate(start: Date, end?: Date | null) {
  const startLabel = dateFormatter.format(start)
  if (!end || dateFormatter.format(end) === startLabel) return startLabel
  return `${startLabel} - ${dateFormatter.format(end)}`
}

function eventTiming(start: Date, end?: Date | null): PublicEvent['timing'] {
  const now = new Date()
  if (start > now) return 'upcoming'
  if (end && end >= now) return 'ongoing'
  return 'past'
}

function inferEventCategories(event: DbEvent): EventCategory[] {
  const source = [event.title, event.summary, event.description, event.club?.title, ...(event.club?.disciplines ?? [])]
    .join(' ')
    .toLowerCase()

  const matches: Array<[EventCategory, RegExp]> = [
    ['Hackathons', /hackathon|competition/],
    ['AI', /artificial intelligence|machine learning|data science|\bai\b/],
    ['Software Development', /software|developer|programming|\bapi\b|open.source/],
    ['Cybersecurity', /cyber|security|capture the flag|\bctf\b/],
    ['Blockchain', /blockchain|stellar|soroban|web3/],
    ['STEM', /\bstem\b|robotics|arduino|electronics/],
    ['Workshops', /workshop|training|bootcamp/],
    ['Industry Events', /industry|career|professional/],
  ]

  return matches.filter(([, pattern]) => pattern.test(source)).map(([category]) => category)
}

function fromDatabaseEvent(event: DbEvent, catalogEvent?: PublicEvent): PublicEvent {
  const title = nonempty(event.title) ?? catalogEvent?.title ?? 'UISS event'
  const summary = nonempty(event.summary) ?? catalogEvent?.summary ?? 'Event details are being prepared.'
  const description = nonempty(event.description)
  const coverMedia = asMedia(event.coverMedia) ?? catalogEvent?.coverMedia

  return {
    id: `db:event:${event.id}`,
    slug: event.slug,
    title,
    summary,
    description,
    dateLabel: formatDatabaseDate(event.startsAt, event.endsAt),
    sortDate: event.startsAt.toISOString(),
    timing: catalogEvent?.timing === 'ongoing' ? 'ongoing' : eventTiming(event.startsAt, event.endsAt),
    location: nonempty(event.location) ?? catalogEvent?.location,
    categories: catalogEvent?.categories ?? inferEventCategories(event),
    featuredRank: catalogEvent?.featuredRank,
    coverMedia,
    gallery: catalogEvent?.gallery ?? [],
    overview: catalogEvent?.overview ?? [description ?? summary],
    highlights: catalogEvent?.highlights ?? [],
    sections: catalogEvent?.sections ?? [],
    timeline: catalogEvent?.timeline ?? [],
    collaborators: catalogEvent?.collaborators ?? [],
    registrationUrl: externalUrl(event.registrationUrl),
    registrationStatus: event.registrationStatus,
  }
}

function fromDatabaseProject(project: DbProject, catalogProject?: PublicProject): PublicProject {
  const statusLabel = project.status.charAt(0).toUpperCase() + project.status.slice(1)
  const coverMedia = asMedia(project.coverMedia) ?? catalogProject?.coverMedia
  const gallery = project.gallery.map((item) => asMedia(item.media)).filter((item): item is ExperienceMedia => Boolean(item))

  return {
    id: `db:project:${project.id}`,
    slug: project.slug,
    title: nonempty(project.title) ?? catalogProject?.title ?? 'UISS project',
    summary: nonempty(project.summary) ?? catalogProject?.summary ?? 'Project details are being prepared.',
    year: project.year,
    status: project.status,
    statusLabel,
    typeLabel: catalogProject?.typeLabel ?? (project.techStack.slice(0, 2).join(' + ') || 'UISS project'),
    problem: nonempty(project.problem) ?? catalogProject?.problem ?? '',
    solution: nonempty(project.solution) ?? catalogProject?.solution ?? '',
    impact: nonempty(project.impact) ?? catalogProject?.impact ?? '',
    overview: catalogProject?.overview ?? [nonempty(project.summary) ?? 'Project details are being prepared.'],
    techStack: project.techStack,
    collaborators: catalogProject?.collaborators ?? [],
    coverMedia,
    gallery: gallery.length ? gallery : catalogProject?.gallery ?? [],
    repositoryUrl: externalUrl(project.repositoryUrl),
    demoUrl: externalUrl(project.demoUrl),
    featured: catalogProject?.featured ?? false,
  }
}

function sortEvents(items: PublicEvent[]) {
  const timingOrder: Record<PublicEvent['timing'], number> = { ongoing: 0, upcoming: 1, past: 2 }
  return [...items].sort((a, b) => {
    const timingDifference = timingOrder[a.timing] - timingOrder[b.timing]
    if (timingDifference) return timingDifference
    return b.sortDate.localeCompare(a.sortDate)
  })
}

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
  if (!hasDatabaseUrl) return sortEvents(eventCatalog)

  const databaseEvents = await safely(
    'events',
    db.query.events.findMany({ with: { club: true, coverMedia: true } }),
    [] as DbEvent[],
  )
  const databaseBySlug = new Map(databaseEvents.map((event) => [event.slug, event]))
  const mergedCatalog = eventCatalog.map((event) => {
    const databaseEvent = databaseBySlug.get(event.slug)
    if (!databaseEvent) return event
    databaseBySlug.delete(event.slug)
    return fromDatabaseEvent(databaseEvent, event)
  })
  const databaseOnly = [...databaseBySlug.values()].map((event) => fromDatabaseEvent(event))

  return sortEvents([...mergedCatalog, ...databaseOnly])
}

export async function getEvent(slug: string) {
  const allEvents = await getEvents()
  return allEvents.find((event) => event.slug === slug)
}

export async function getProjects() {
  if (!hasDatabaseUrl) return projectCatalog

  const databaseProjects = await safely(
    'projects',
    db.query.projects.findMany({
      where: eq(projects.publicationStatus, 'published'),
      orderBy: [desc(projects.year), desc(projects.createdAt)],
      with: { club: true, coverMedia: true, gallery: { with: { media: true } } },
    }),
    [] as DbProject[],
  )
  const databaseBySlug = new Map(databaseProjects.map((project) => [project.slug, project]))
  const mergedCatalog = projectCatalog.map((project) => {
    const databaseProject = databaseBySlug.get(project.slug)
    if (!databaseProject) return project
    databaseBySlug.delete(project.slug)
    return fromDatabaseProject(databaseProject, project)
  })
  const databaseOnly = [...databaseBySlug.values()].map((project) => fromDatabaseProject(project))

  return [...mergedCatalog, ...databaseOnly].sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year)
}

export async function getProject(slug: string) {
  const allProjects = await getProjects()
  return allProjects.find((project) => project.slug === slug)
}

export function getRelatedEvents(event: PublicEvent, allEvents: PublicEvent[], limit = 3) {
  return allEvents
    .filter((candidate) => candidate.slug !== event.slug)
    .map((candidate) => ({
      candidate,
      sharedCategories: candidate.categories.filter((category) => event.categories.includes(category)).length,
    }))
    .sort((a, b) => b.sharedCategories - a.sharedCategories || b.candidate.sortDate.localeCompare(a.candidate.sortDate))
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

export function getAvailableEventCategories(eventsList: PublicEvent[]) {
  return eventCategories.filter((category) => eventsList.some((event) => event.categories.includes(category)))
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

export async function getCoreValues() {
  if (!hasDatabaseUrl) return []

  return safely(
    'core values',
    db.query.coreValues.findMany({ orderBy: asc(coreValues.value) }),
    [],
  )
}
