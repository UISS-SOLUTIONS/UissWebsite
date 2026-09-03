import { CalendarDays, FolderKanban, UsersRound } from 'lucide-react'
import { HeroHeader } from '@/components/header'
import Footer from '@/components/footer-2'

const pageDetails = {
    clubs: {
        eyebrow: 'UISS clubs',
        title: 'Find your technical community.',
        description: 'Club listings, areas of focus, meeting details, and joining guidance will be planned and populated here.',
        icon: UsersRound,
    },
    events: {
        eyebrow: 'UISS events',
        title: 'See what is happening next.',
        description: 'Upcoming workshops, competitions, talks, and community activities will be planned and populated here.',
        icon: CalendarDays,
    },
    projects: {
        eyebrow: 'UISS projects',
        title: 'Explore work built by students.',
        description: 'Verified student projects, collaborators, outcomes, and links will be planned and populated here.',
        icon: FolderKanban,
    },
} as const

export type PlannedPageKind = keyof typeof pageDetails

export function PlannedPage({ kind }: { kind: PlannedPageKind }) {
    const page = pageDetails[kind]
    const Icon = page.icon

    return (
        <div className="min-h-screen bg-canvas text-ink">
            <HeroHeader />
            <main className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
                <div className="max-w-3xl">
                    <div className="flex size-14 items-center justify-center rounded-md bg-brand text-brand-ink"><Icon /></div>
                    <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-muted">{page.eyebrow}</p>
                    <h1 className="mt-4 text-balance text-5xl font-bold tracking-tight sm:text-6xl">{page.title}</h1>
                    <p className="mt-6 max-w-2xl text-xl leading-8 text-muted">{page.description}</p>
                </div>
                <div className="mt-16 rounded-lg border border-dashed border-line bg-surface p-10">
                    <p className="font-bold">Content planning pending</p>
                    <p className="mt-2 text-muted">This route is ready. Its information structure and verified content will be handled in a later ticket.</p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
