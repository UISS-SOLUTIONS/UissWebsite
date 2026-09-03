import 'server-only'

import { and, asc, desc, eq, gte } from 'drizzle-orm'
import { db, hasDatabaseUrl } from '@/app/db'
import { clubs, events, heroPage, leaders, projects, testimonials, members } from '@/app/db/schema'
import { listZenblogPosts } from '@/lib/zenblog'

type QueryResult<T> = {
    data: T
    unavailable: boolean
}

async function safely<T>(_label: string, query: Promise<T>, fallback: T): Promise<QueryResult<T>> {
    try {
        return { data: await query, unavailable: false }
    } catch {
        return { data: fallback, unavailable: true }
    }
}

export async function getHomepageData() {
    const now = new Date()

    if (!hasDatabaseUrl) {
        const blog = await listZenblogPosts()
        return { hero: { data: undefined, unavailable: false }, clubs: { data: [], unavailable: false }, events: { data: [], unavailable: false }, projects: { data: [], unavailable: false }, leaders: { data: [], unavailable: false }, blog, testimonials: { data: [], unavailable: false } }
    }
    const [hero, activeClubs, upcomingEvents, publishedProjects, leadership, blog, testimonialRows] = await Promise.all([
        safely(
            'Hero content',
            db.query.heroPage.findFirst({ where: eq(heroPage.section, 'homepage') }),
            undefined,
        ),
        safely(
            'Clubs',
            db.query.clubs.findMany({
                where: eq(clubs.status, 'active'),
                orderBy: [asc(clubs.title)],
                limit: 3,
                with: { coverMedia: true },
            }),
            [],
        ),
        safely(
            'Events',
            db.query.events.findMany({
                where: gte(events.startsAt, now),
                orderBy: [asc(events.startsAt)],
                limit: 3,
                with: { coverMedia: true },
            }),
            [],
        ),
        safely(
            'Projects',
            db.query.projects.findMany({
                where: eq(projects.publicationStatus, 'published'),
                orderBy: [desc(projects.year), desc(projects.createdAt)],
                limit: 3,
                with: { coverMedia: true },
            }),
            [],
        ),
        safely(
            'Leadership',
            db.query.leaders.findMany({
                orderBy: [desc(leaders.year), asc(leaders.lastName), asc(leaders.firstName)],
                limit: 50,
                with: { position: true },
            }),
            [],
        ),
        listZenblogPosts(),
        safely('Testimonials', db.select({ id: testimonials.id, text: testimonials.testimony, firstName: members.firstName, lastName: members.lastName, publishedAt: testimonials.publishedAt }).from(testimonials).innerJoin(members, eq(testimonials.memberId, members.id)).where(and(eq(testimonials.status, 'published'), eq(members.status, 'active'))).orderBy(desc(testimonials.publishedAt)).limit(3), []),
    ])

    const latestLeadershipYear = leadership.data.at(0)?.year
    const unavailable = [hero, activeClubs, upcomingEvents, publishedProjects, leadership, testimonialRows].flatMap((item, index) => item.unavailable ? [['hero', 'clubs', 'events', 'projects', 'leadership', 'testimonials'][index]] : [])
    if (unavailable.length) console.warn(`[UISS homepage] unavailable: ${unavailable.join(', ')}.`)
    const currentLeaders = latestLeadershipYear
        ? leadership.data.filter((leader) => leader.year === latestLeadershipYear).slice(0, 11)
        : []

    return {
        hero,
        clubs: activeClubs,
        events: upcomingEvents,
        projects: publishedProjects,
        leaders: { data: currentLeaders, unavailable: leadership.unavailable },
        blog,
        testimonials: testimonialRows,
    }
}
