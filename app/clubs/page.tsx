import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { ClubShowcase, type ClubPreview } from '@/components/home/club-showcase'
import { clubCatalog } from '@/lib/club-catalog'
import { clubMediaBySlug } from '@/lib/club-media'
import { getClubs } from '@/lib/public-data'

export const metadata = { title: 'Clubs | UISS' }

export default async function ClubsPage() {
    const publishedClubs = await getClubs()
    const publishedBySlug = new Map(publishedClubs.map((club) => [club.slug, club]))

    const clubs: ClubPreview[] = clubCatalog.map((catalogClub) => {
        const published = publishedBySlug.get(catalogClub.slug)
        const suppliedMedia = clubMediaBySlug[catalogClub.slug]

        return {
            id: published ? String(published.id) : catalogClub.id,
            title: published?.title ?? catalogClub.title,
            summary: published?.summary || catalogClub.summary,
            disciplines: published?.disciplines.length ? published.disciplines : catalogClub.disciplines,
            url: `/clubs/${catalogClub.slug}`,
            image: suppliedMedia?.image ?? published?.coverMedia?.url ?? catalogClub.image,
            imageAlt: suppliedMedia?.imageAlt ?? published?.coverMedia?.alt ?? catalogClub.imageAlt,
        }
    })

    return (
        <div className="min-h-screen bg-canvas text-ink">
            <HeroHeader />
            <main>
                <ClubShowcase clubs={clubs} headingLevel="h1" showViewAll={false} className="min-h-[calc(100vh-5rem)]" />
            </main>
            <Footer />
        </div>
    )
}
