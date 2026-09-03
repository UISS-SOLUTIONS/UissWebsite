import Image from 'next/image'
import { LogoIcon } from '@/components/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type AboutStat = { value: string; label: string; description: string }
type AboutSection = { title: string; content: string }

interface About3Props {
    heading?: string
    description?: string
    stats?: AboutStat[]
    sections?: AboutSection[]
    className?: string
}

const defaultStats: AboutStat[] = [
    { value: '11', label: 'Leadership positions', description: 'The team carousel is prepared for the current leaders and their approved profiles.' },
    { value: '1 hr', label: 'Blog refresh', description: 'New Zenblog publications are checked by the website every hour.' },
    { value: '4', label: 'New destination pages', description: 'Clubs, Blog, Events, and Projects now have dedicated routes.' },
]

const defaultSections: AboutSection[] = [
    { title: 'Our purpose', content: 'UISS brings ICT students together around practical learning, technical collaboration, leadership, and professional growth.' },
    { title: 'This design direction', content: 'The structure is ready for verified institutional copy, current leadership details, authentic project records, and approved photography.' },
]

const About3 = ({
    heading = 'About UISS',
    description = 'A student-led community supporting ICT students at the University of Dar es Salaam.',
    stats = defaultStats,
    sections = defaultSections,
    className,
}: About3Props) => (
    <section className={cn('py-24 sm:py-32', className)}>
        <div className="container mx-auto px-6">
            <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="max-w-xl">
                    <LogoIcon className="size-14" />
                    <h2 className="mt-7 text-5xl font-bold tracking-tight text-ink sm:text-6xl">{heading}</h2>
                    <p className="mt-5 text-xl leading-8 text-muted">{description}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <Image src="/welcomeBg.jpg" alt="UISS students gathered on campus" width={1200} height={900} className="aspect-[4/3] size-full rounded-lg object-cover grayscale" />
                    <Image src="/ctfWinner.jpg" alt="Students participating in a UISS activity" width={1200} height={900} className="aspect-[4/3] size-full rounded-lg object-cover" />
                </div>
            </div>
            <div className="mt-16 grid gap-5 md:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label} variant="soft">
                        <CardHeader><CardTitle className="text-4xl">{stat.value}</CardTitle><p className="font-bold text-ink">{stat.label}</p></CardHeader>
                        <CardContent><p className="leading-7 text-muted">{stat.description}</p></CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-2">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h3 className="text-3xl font-bold tracking-tight text-ink">{section.title}</h3>
                        <p className="mt-4 text-lg leading-8 text-muted">{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
)

export { About3 }
