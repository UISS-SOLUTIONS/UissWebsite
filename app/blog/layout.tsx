import { HeroHeader } from '@/components/header'
import Footer from '@/components/footer-2'

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-canvas text-ink">
            <HeroHeader />
            {children}
            <Footer />
        </div>
    )
}
