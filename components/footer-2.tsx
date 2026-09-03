import Link from 'next/link'
import { Logo } from '@/components/logo'

const links = [
    { title: 'Explore', items: [{ label: 'Clubs', href: '/clubs' }, { label: 'Blog', href: '/blog' }, { label: 'Events', href: '/events' }, { label: 'Projects', href: '/projects' }] },
    { title: 'Society', items: [{ label: 'About', href: '/about' }, { label: 'Constitution', href: '/Constitution' }, { label: 'Contact', href: 'mailto:udsmict1@gmail.com' }, { label: 'Admin', href: '/admin' }] },
]

export default function Footer() {
    return (
        <footer className="uiss-proof bg-canvas text-ink">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid gap-12 border-b border-line pb-12 md:grid-cols-2">
                    <div><Logo inverse className="w-40" /><p className="mt-5 max-w-sm leading-7 text-muted">University of Dar es Salaam ICT Students’ Society.</p></div>
                    <div className="grid grid-cols-2 gap-8">
                        {links.map((group) => <div key={group.title}><h2 className="font-bold">{group.title}</h2><ul className="mt-4 space-y-3">{group.items.map((item) => <li key={item.label}><Link className="text-muted hover:text-ink" href={item.href}>{item.label}</Link></li>)}</ul></div>)}
                    </div>
                </div>
                <p className="pt-6 text-sm text-muted">© {new Date().getFullYear()} UISS. All rights reserved.</p>
            </div>
        </footer>
    )
}
