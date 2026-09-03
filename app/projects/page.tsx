import type { Metadata } from 'next'
import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { Projects5 } from '@/components/projects5'

export const metadata: Metadata = { title: 'Projects | UISS', description: 'Explore projects built by UISS students.' }

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-canvas text-ink">
            <HeroHeader />
            <main><Projects5 /></main>
            <Footer />
        </div>
    )
}
