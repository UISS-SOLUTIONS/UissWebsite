import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Cta4Props {
    heading?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
    features?: string[]
    className?: string
}

const Cta4 = ({
    heading = 'Make your university experience count.',
    description = 'Join a student-led community built around learning, collaboration, and practical technology work.',
    buttonText = 'Join UISS',
    buttonUrl = '/Membership',
    features = ['Learn with peers', 'Build practical projects', 'Grow your professional network'],
    className,
}: Cta4Props) => (
    <section className={cn('py-24 sm:py-32', className)}>
        <div className="container mx-auto px-6">
            <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-10 rounded-lg bg-surface px-7 py-12 md:flex-row lg:px-16 lg:py-16">
                <div className="max-w-xl md:w-1/2">
                    <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">{heading}</h2>
                    <p className="mt-4 leading-7 text-muted">{description}</p>
                    <Button className="mt-7" asChild variant="secondary">
                        <Link href={buttonUrl}>{buttonText}<ArrowRight data-icon="inline-end" /></Link>
                    </Button>
                </div>
                <ul className="flex flex-col gap-3 text-sm font-semibold text-ink md:w-1/3">
                    {features.map((item) => <li className="flex items-center gap-3" key={item}><Check aria-hidden />{item}</li>)}
                </ul>
            </div>
        </div>
    </section>
)

export { Cta4 }
