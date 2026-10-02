import Link from 'next/link'
import { Instagram, Linkedin, Mail } from 'lucide-react'

type FooterLink = {
    label: string
    href: string
    external?: boolean
}

type FooterGroup = {
    title: string
    items: FooterLink[]
}

const footerGroups: FooterGroup[] = [
    {
        title: 'Explore',
        items: [
            { label: 'Clubs', href: '/clubs' },
            { label: 'Events', href: '/events' },
            { label: 'Projects', href: '/projects' },
            { label: 'Merch', href: '/merch' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        title: 'Society',
        items: [
            { label: 'About', href: '/about' },
            { label: 'Constitution', href: '/UISSConstitution.pdf' },
            { label: 'Membership', href: '/membership' },
            { label: 'Contact', href: 'mailto:udsmict1@gmail.com' },
        ],
    },
    {
        title: 'Programmes',
        items: [
            { label: 'Join a club', href: '/clubs' },
            { label: 'Apply for membership', href: '/membership' },
            { label: 'Attend events', href: '/events' },
            { label: 'See projects', href: '/projects' },
        ],
    },
    {
        title: 'Contact',
        items: [{ label: 'Email UISS', href: 'mailto:udsmict1@gmail.com' }],
    },
]

const socialLinks = [
    {
        label: 'UISS on Instagram',
        href: 'https://www.instagram.com/uiss_udsmict/',
        icon: Instagram,
    },
    {
        label: 'UISS on LinkedIn',
        href: 'https://www.linkedin.com/company/uiss-udsm-ict-student-s-society/home/',
        icon: Linkedin,
    },
    {
        label: 'Email UISS',
        href: 'mailto:udsmict1@gmail.com',
        icon: Mail,
    },
]

function FooterLinkItem({ item }: { item: FooterLink }) {
    const className = 'text-sm text-muted transition-colors hover:text-ink hover:underline hover:underline-offset-4'

    if (item.external) {
        return (
            <a className={className} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
            </a>
        )
    }

    return <Link className={className} href={item.href}>{item.label}</Link>
}

export default function Footer() {
    return (
        <footer className="uiss-footer-shell bg-canvas px-4 py-8 text-ink sm:px-6 sm:py-12 lg:py-16">
            <div className="uiss-footer-panel mx-auto max-w-6xl overflow-hidden rounded-[var(--uiss-radius-lg)] border border-line/80 shadow-soft">
                <div className="px-6 pb-0 pt-10 sm:px-10 sm:pt-12">
                    <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-10 pb-12 lg:grid-cols-4">
                        {footerGroups.map((group) => (
                            <div key={group.title}>
                                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink">{group.title}</h2>
                                <ul className="mt-5 space-y-3">
                                    {group.items.map((item) => (
                                        <li key={`${group.title}-${item.label}`}>
                                            <FooterLinkItem item={item} />
                                        </li>
                                    ))}
                                </ul>

                                {group.title === 'Contact' ? (
                                    <div className="mt-6 flex items-center gap-2" role="group" aria-label="UISS social links">
                                        {socialLinks.map(({ label, href, icon: Icon }) => {
                                            const isExternal = href.startsWith('http')

                                            return (
                                                <a
                                                    key={label}
                                                    aria-label={label}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-brand"
                                                    href={href}
                                                    target={isExternal ? '_blank' : undefined}
                                                    rel={isExternal ? 'noopener noreferrer' : undefined}
                                                >
                                                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                                                </a>
                                            )
                                        })}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </nav>
                </div>

                <div aria-hidden="true" className="uiss-footer-wordmark px-6 sm:px-10">UISS</div>

                <div className="flex flex-col gap-4 border-t border-line/70 px-6 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
                    <p>© {new Date().getFullYear()} UISS. All rights reserved.</p>
                    <span className="inline-flex items-center gap-2 font-semibold text-ink">
                        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand shadow-[0_0_0_4px_rgb(var(--uiss-brand)/0.14)]" />
                        UISS Online
                    </span>
                </div>
            </div>
        </footer>
    )
}
