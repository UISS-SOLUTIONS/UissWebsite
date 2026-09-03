import Link from 'next/link'
import { CalendarDays, Mail, UsersRound } from 'lucide-react'
import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Community1Props {
    className?: string
}

const links = [
    { label: 'Explore clubs', href: '/clubs', icon: UsersRound },
    { label: 'View events', href: '/events', icon: CalendarDays },
    { label: 'Email UISS', href: 'mailto:udsmict1@gmail.com', icon: Mail },
]

const Community1 = ({ className }: Community1Props) => (
    <section className={cn('bg-surface py-24 sm:py-32', className)}>
        <div className="container mx-auto flex flex-col items-center gap-6 px-6 text-center">
            <LogoIcon className="size-12" />
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Join the UISS community.<br /><span className="text-muted">Find people to learn and build with.</span>
            </h2>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                {links.map(({ label, href, icon: Icon }) => (
                    <Button key={href} asChild variant="outline">
                        <Link href={href}><Icon data-icon="inline-start" />{label}</Link>
                    </Button>
                ))}
            </div>
        </div>
    </section>
)

export { Community1 }
