"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight, X } from "lucide-react"
import { HoverExpand, type HoverExpandItem } from "@/components/unlumen-ui/hover-expand"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    MorphingDialog,
    MorphingDialogClose,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogDescription,
    MorphingDialogSubtitle,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog"

export type ClubPreview = {
    id: string
    title: string
    summary: string
    disciplines: string[]
    url: string
    image?: string
    imageAlt?: string
}

type ClubShowcaseProps = {
    clubs: ClubPreview[]
    unavailable?: boolean
    headingLevel?: "h1" | "h2"
    showViewAll?: boolean
    className?: string
}

function ClubMorphingPreview({ club, trigger }: { club: ClubPreview; trigger: React.ReactNode }) {
    return (
        <MorphingDialog transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.85 }}>
            <MorphingDialogTrigger
                ariaLabel={`Preview ${club.title}`}
                className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
            >
                {trigger}
            </MorphingDialogTrigger>
            <MorphingDialogContainer>
                <MorphingDialogContent className="relative mx-4 max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-canvas shadow-2xl">
                    <div
                        className="relative h-44 bg-ink sm:h-56"
                        style={club.image ? { backgroundImage: `url(${club.image})`, backgroundPosition: "center", backgroundSize: "cover" } : undefined}
                        role={club.image && club.imageAlt ? "img" : undefined}
                        aria-label={club.image && club.imageAlt ? club.imageAlt : undefined}
                    >
                        {club.image ? <span className="absolute inset-0 bg-black/45" aria-hidden /> : null}
                    </div>
                    <MorphingDialogClose className="grid size-10 place-items-center rounded-full border border-white/35 bg-black/55 text-white outline-none backdrop-blur-sm transition-colors duration-150 ease-out hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-white">
                        <X aria-hidden />
                    </MorphingDialogClose>
                    <div className="p-6 sm:p-8">
                        <MorphingDialogSubtitle className="text-sm font-bold uppercase tracking-[0.16em] text-muted">
                            UISS club preview
                        </MorphingDialogSubtitle>
                        <MorphingDialogTitle className="mt-3">
                            <h3 className="text-balance text-4xl font-bold tracking-tight text-ink">{club.title}</h3>
                        </MorphingDialogTitle>
                        <MorphingDialogDescription
                            className="mt-5"
                            variants={{
                                initial: { opacity: 0, y: 8 },
                                animate: { opacity: 1, y: 0, transition: { delay: 0.08, duration: 0.2, ease: "easeOut" } },
                                exit: { opacity: 0, y: 4, transition: { duration: 0.12 } },
                            }}
                        >
                            <p className="text-lg leading-8 text-muted">{club.summary || "Club details are being prepared."}</p>
                            {club.disciplines.length > 0 ? (
                                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${club.title} focus areas`}>
                                    {club.disciplines.slice(0, 4).map((discipline) => (
                                        <li key={discipline} className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-ink">
                                            {discipline}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                            <Button asChild className="mt-8">
                                <Link href={club.url}>
                                    Open full club profile
                                    <ArrowUpRight data-icon="inline-end" />
                                </Link>
                            </Button>
                        </MorphingDialogDescription>
                    </div>
                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>
    )
}

export function ClubShowcase({ clubs, headingLevel = "h2", showViewAll = true, className }: ClubShowcaseProps) {
    if (clubs.length === 0) return null

    const Heading = headingLevel

    const clubsById = new Map(clubs.map((club) => [club.id, club]))
    const items: HoverExpandItem[] = clubs.map((club) => ({
        id: club.id,
        label: club.title,
        sublabel: "Explore",
        description: club.summary || "Club details are being prepared.",
        image: club.image,
        imageAlt: club.imageAlt,
    }))

    return (
        <section className={cn("bg-surface py-24 sm:py-32", className)}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Find your community</p>
                        <Heading className="mt-4 text-5xl font-bold tracking-tight text-ink sm:text-6xl">Explore UISS clubs.</Heading>
                        <p className="mt-5 text-lg leading-8 text-muted">Move through all six peer communities, preview what they explore, then open the full profile when one feels right.</p>
                    </div>
                    {showViewAll ? <Button asChild variant="outline">
                        <Link href="/clubs">
                            View all clubs
                            <ArrowRight data-icon="inline-end" />
                        </Link>
                    </Button> : null}
                </div>

                <HoverExpand
                    className="mt-12 text-ink"
                    items={items}
                    collapsedHeight={76}
                    expandedHeight={260}
                    renderItem={(item, content) => {
                        const club = clubsById.get(item.id)
                        return club ? <ClubMorphingPreview club={club} trigger={content} /> : content
                    }}
                />
            </div>
        </section>
    )
}
