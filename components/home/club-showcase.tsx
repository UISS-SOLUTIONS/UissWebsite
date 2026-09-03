import Link from 'next/link'
import { ArrowRight, UsersRound } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export type ClubPreview = {
    id: string
    title: string
    summary: string
    disciplines: string[]
    url: string
}

type ClubShowcaseProps = {
    clubs: ClubPreview[]
    unavailable?: boolean
}

export function ClubShowcase({ clubs, unavailable = false }: ClubShowcaseProps) {
    if (clubs.length === 0) return null
    return (
        <section className="bg-surface py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Find your community</p>
                        <h2 className="mt-4 text-5xl font-bold tracking-tight text-ink sm:text-6xl">Explore UISS clubs.</h2>
                        <p className="mt-5 text-lg leading-8 text-muted">Meet students who share your interests and build practical skills together.</p>
                    </div>
                    <Button asChild variant="outline"><Link href="/clubs">View all clubs<ArrowRight data-icon="inline-end" /></Link></Button>
                </div>

                {clubs.length > 0 ? (
                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {clubs.map((club) => (
                            <Card key={club.id} className="flex min-h-72 flex-col">
                                <CardHeader>
                                    <div className="flex size-11 items-center justify-center rounded-lg bg-brand-mark/15 text-brand-mark"><UsersRound aria-hidden /></div>
                                    <CardTitle className="mt-5 text-2xl"><Link href={club.url} className="hover:underline">{club.title}</Link></CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="leading-7 text-muted">{club.summary || 'Club details are being prepared.'}</p>
                                    {club.disciplines.length > 0 ? <div className="mt-5 flex flex-wrap gap-2">{club.disciplines.slice(0, 3).map((item) => <Badge key={item} variant="outline">{item}</Badge>)}</div> : null}
                                </CardContent>
                                <CardFooter><Link href={club.url} className="flex items-center gap-2 font-semibold text-ink hover:underline">Explore club<ArrowRight aria-hidden /></Link></CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="mt-12 rounded-lg border border-dashed border-line bg-canvas p-10 text-center">
                        <UsersRound className="mx-auto size-10 text-muted" aria-hidden />
                        <h3 className="mt-5 text-2xl font-bold text-ink">Club profiles are being prepared.</h3>
                        <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">{unavailable ? 'Club information could not be loaded right now. Please try again later.' : 'Approved club information will appear here as it is added by the UISS team.'}</p>
                    </div>
                )}
            </div>
        </section>
    )
}
