import 'server-only'

import { asc, desc, eq, gte } from 'drizzle-orm'
import { db } from '@/app/db'
import { clubs, events, heroPage, leaders, projects } from '@/app/db/schema'
import { listZenblogPosts } from '@/lib/zenblog'

type QueryResult<T> = {
    data: T
    unavailable: boolean
}

async function safely<T>(label: string, query: Promise<T>, fallback: T): Promise<QueryResult<T>> {
    try {
        return { data: await query, unavailable: false }
    } catch (error) {
        console.warn(`[UISS homepage] ${label} could not be loaded.`, error)
        return { data: fallback, unavailable: true }
    }
}

export async function getHomepageData() {
    const now = new Date()

    const [hero, activeClubs, upcomingEvents, publishedProjects, leadership, blog] = await Promise.all([
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
                limit: 4,
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
                limit: 4,
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
    ])

    const latestLeadershipYear = leadership.data.at(0)?.year
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
    }
}
