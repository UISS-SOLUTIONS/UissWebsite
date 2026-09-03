import type { Metadata } from 'next'
import CallToAction from '@/components/call-to-action-1'
import ContactSection from '@/components/contact-1'
import ContentSection from '@/components/content-4'
import FAQs from '@/components/faqs-3'
import Features from '@/components/features-5'
import Footer from '@/components/footer-2'
import HeroSection from '@/components/hero-section-4'
import LogoCloud from '@/components/logo-cloud-1'
import StatsSection from '@/components/stats-2'
import TeamSection from '@/components/team-2'
import TestimonialSection from '@/components/testimonials-2'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'UISS design system review',
    robots: { index: false, follow: false },
}

const tokens = [
    { name: 'Ink', className: 'bg-ink', value: '#111111' },
    { name: 'Canvas', className: 'bg-canvas border border-line', value: '#FFFFFF' },
    { name: 'Surface', className: 'bg-surface', value: '#F8F8F7' },
    { name: 'Brand', className: 'bg-brand', value: '#EFB631' },
    { name: 'Logo gold', className: 'bg-brand-mark', value: '#D8A13A' },
    { name: 'Focus', className: 'bg-focus', value: '#1D4ED8' },
    { name: 'Success', className: 'bg-success', value: '#15803D' },
    { name: 'Danger', className: 'bg-danger', value: '#B91C1C' },
]

const hierarchy = [
    { level: '01 · Primitives', items: 'Button, input, select, textarea, label, card, accordion, hover card' },
    { level: '02 · Layout', items: 'Container, grid, section spacing, light and selective-dark surfaces' },
    { level: '03 · Domain cards', items: 'Program, project, event, news, leader, member story, impact metric' },
    { level: '04 · Sections', items: 'Hero, affiliations, features, content, stats, testimonials, CTA, FAQ, team, contact, footer' },
]

export default function DesignSystemPage() {
    return (
        <div className="bg-canvas text-ink">
            <section className="border-b border-line bg-surface py-12">
                <div className="mx-auto max-w-6xl px-6">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Internal review · not indexed</p>
                    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">UISS design system gallery</h1>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">A Tailark Mist–based direction adapted for this project’s Tailwind 3 setup. Placeholder names, figures, testimonials, and biographies are intentionally not presented as facts.</p>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="text-3xl font-bold">Semantic tokens</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {tokens.map((token) => <div key={token.name} className="rounded-md border border-line p-3"><div className={`h-24 rounded-sm ${token.className}`} /><div className="mt-3 flex justify-between gap-3"><span className="font-bold">{token.name}</span><code className="text-sm text-muted">{token.value}</code></div></div>)}
                    </div>
                    <div className="mt-12 flex flex-wrap gap-3">
                        <Button>Primary action</Button><Button variant="secondary">Brand action</Button><Button variant="outline">Secondary action</Button><Button variant="destructive">Danger action</Button>
                    </div>
                    <p className="mt-6 max-w-3xl leading-7 text-muted">Gold is reserved for backgrounds, icons, and decoration with dark text. It is not used for normal text on white. Focus blue, success green, and danger red all pass AA contrast against white.</p>
                </div>
            </section>

            <section className="border-y border-line bg-surface py-16">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="text-3xl font-bold">Component hierarchy</h2>
                    <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
                        {hierarchy.map((group) => <article key={group.level} className="bg-canvas p-6"><h3 className="font-bold">{group.level}</h3><p className="mt-3 leading-7 text-muted">{group.items}</p></article>)}
                    </div>
                </div>
            </section>

            <div className="border-b-8 border-brand"><HeroSection preview /></div>
            <LogoCloud />
            <Features />
            <ContentSection />
            <StatsSection />
            <TestimonialSection />
            <TeamSection />
            <FAQs />
            <ContactSection />
            <CallToAction />
            <Footer />
        </div>
    )
}
