import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

const menuItems = [
    { name: 'Clubs', href: '/clubs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Events', href: '/events' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
]

export const HeroHeader = () => (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
        <nav className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-6 px-6" aria-label="Main navigation">
            <Link href="/" aria-label="UISS home">
                <Logo />
            </Link>
            <ul className="hidden items-center gap-1 md:flex">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <Button asChild variant="ghost" size="sm">
                            <Link href={item.href}>{item.name}</Link>
                        </Button>
                    </li>
                ))}
            </ul>
            <div className="hidden md:block">
                <Button asChild variant="secondary">
                    <Link href="/membership">Join UISS</Link>
                </Button>
            </div>
            <details className="group relative md:hidden">
                <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-lg border border-line bg-canvas text-ink [&::-webkit-details-marker]:hidden">
                    <Menu aria-hidden />
                    <span className="sr-only">Open navigation menu</span>
                </summary>
                <div className="absolute right-0 top-12 z-50 w-56 rounded-lg border border-line bg-canvas p-2 shadow-soft">
                    {menuItems.map((item) => (
                        <Link key={item.name} href={item.href} className="block rounded-md px-4 py-3 font-semibold text-ink hover:bg-surface">{item.name}</Link>
                    ))}
                    <Link href="/membership" className="mt-2 block rounded-md bg-ink px-4 py-3 text-center font-semibold text-canvas">Join UISS</Link>
                </div>
            </details>
        </nav>
    </header>
)
