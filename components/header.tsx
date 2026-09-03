import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

const menuItems = [
    { name: 'Clubs', href: '/clubs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Events', href: '/events' },
    { name: 'Projects', href: '/projects' },
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
            <Button asChild variant="secondary">
                <Link href="/Membership">Join UISS</Link>
            </Button>
        </nav>
    </header>
)
