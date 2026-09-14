"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ManagedImage } from "@/components/managed-image"
import { cn } from "@/lib/utils"

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

export function ClubShowcase({ clubs, headingLevel = "h2", showViewAll = true, className }: ClubShowcaseProps) {
    const [activeClub, setActiveClub] = useState<ClubPreview | null>(null)
    const [previewedId, setPreviewedId] = useState<string | null>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const Heading = headingLevel

    useEffect(() => {
        if (!activeClub) return

        const previousOverflow = document.body.style.overflow
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActiveClub(null)
                return
            }
            if (event.key !== "Tab") return

            const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (!first || !last) return

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        }
        document.body.style.overflow = "hidden"
        document.addEventListener("keydown", closeOnEscape)
        closeButtonRef.current?.focus()

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener("keydown", closeOnEscape)
            triggerRef.current?.focus()
        }
    }, [activeClub])

    if (clubs.length === 0) return null

    return (
        <section className={cn("bg-surface py-24 sm:py-32", className)}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Find your community</p>
                        <Heading className="mt-4 text-5xl font-bold tracking-tight text-ink sm:text-6xl">Explore UISS clubs.</Heading>
                        <p className="mt-5 text-lg leading-8 text-muted">Move through all six peer communities, preview what they explore, then open the full profile when one feels right.</p>
                    </div>
                    {showViewAll ? <Button asChild variant="outline"><Link href="/clubs">View all clubs <ArrowRight data-icon="inline-end" /></Link></Button> : null}
                </div>

                <div className="mt-12 border-y border-line">
                    {clubs.map((club, index) => (
                        <button
                            key={club.id}
                            type="button"
                            className="group relative flex min-h-20 w-full items-center overflow-hidden border-b border-line px-5 text-left last:border-b-0 focus-visible:z-10 sm:min-h-24"
                            onMouseEnter={() => setPreviewedId(club.id)}
                            onMouseLeave={() => setPreviewedId(null)}
                            onFocus={() => setPreviewedId(club.id)}
                            onClick={(event) => {
                                triggerRef.current = event.currentTarget
                                setActiveClub(club)
                            }}
                        >
                            {club.image && previewedId === club.id ? (
                                <span className="absolute inset-0 bg-ink opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" aria-hidden="true">
                                    <ManagedImage src={club.image} alt="" fill sizes="(min-width: 1280px) 1152px, 100vw" quality={65} className="object-cover opacity-45 transition-transform duration-200 ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transition-none" />
                                </span>
                            ) : null}
                            <span className="relative mr-4 text-xs font-semibold tabular-nums text-muted group-hover:text-white/80 group-focus-visible:text-white/80">{String(index + 1).padStart(2, "0")}</span>
                            <span className="relative min-w-0 flex-1 truncate text-lg font-semibold tracking-tight text-ink group-hover:text-white group-focus-visible:text-white sm:text-2xl">{club.title}</span>
                            <span className="relative ml-4 hidden text-xs font-bold uppercase tracking-widest text-muted group-hover:text-white/80 group-focus-visible:text-white/80 sm:block">Preview</span>
                        </button>
                    ))}
                </div>
            </div>

            {activeClub ? (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveClub(null) }}>
                    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="club-preview-title" aria-describedby="club-preview-description" className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-canvas shadow-2xl transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none [@starting-style]:scale-[0.97] [@starting-style]:opacity-0">
                        <div className="relative h-44 bg-ink sm:h-56">
                            {activeClub.image ? <ManagedImage src={activeClub.image} alt={activeClub.imageAlt ?? ""} fill sizes="(min-width: 640px) 672px, 100vw" quality={70} className="object-cover opacity-60" /> : null}
                        </div>
                        <button ref={closeButtonRef} type="button" aria-label="Close club preview" onClick={() => setActiveClub(null)} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/35 bg-black/70 text-white transition-[transform,background-color] duration-150 ease-out active:scale-[0.97]"><X aria-hidden="true" /></button>
                        <div className="p-6 sm:p-8">
                            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted">UISS club preview</p>
                            <h3 id="club-preview-title" className="mt-3 text-balance text-4xl font-bold tracking-tight text-ink">{activeClub.title}</h3>
                            <p id="club-preview-description" className="mt-5 text-lg leading-8 text-muted">{activeClub.summary || "Club details are being prepared."}</p>
                            {activeClub.disciplines.length ? <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${activeClub.title} focus areas`}>{activeClub.disciplines.slice(0, 4).map((discipline) => <li key={discipline} className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-ink">{discipline}</li>)}</ul> : null}
                            <Button asChild className="mt-8"><Link href={activeClub.url}>Open full club profile <ArrowUpRight data-icon="inline-end" /></Link></Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    )
}
