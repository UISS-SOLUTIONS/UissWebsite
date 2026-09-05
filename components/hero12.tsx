import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Hero12Props {
    className?: string
    preview?: boolean
    eyebrow?: string
    heading?: string
    highlightedHeading?: string
    description?: string
}

const Hero12 = ({
    className,
    preview = false,
    eyebrow = 'University of Dar es Salaam',
    heading = 'Where ICT students',
    highlightedHeading = 'learn, build, and lead.',
    description = 'UISS connects students with practical programs, a growing technical community, and opportunities to turn ideas into useful work.',
}: Hero12Props) => {
    const Heading = preview ? 'h2' : 'h1'

    return (
        <section className={cn('relative overflow-hidden py-24 sm:py-32', className)}>
            <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--uiss-line)/0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--uiss-line)/0.55)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(70%_70%_at_center,black,transparent)]"
            />
            <div className="container relative z-10 mx-auto px-6">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <div className="flex size-32 items-center justify-center sm:size-36">
                        <Image
                            src="/brand/udsm-logo.jpg"
                            alt="University of Dar es Salaam crest"
                            width={440}
                            height={454}
                            priority
                            className="size-full object-contain mix-blend-multiply"
                        />
                    </div>
                    <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
                    <Heading className="mt-5 max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                        {heading} {highlightedHeading ? <span className="text-brand-mark">{highlightedHeading}</span> : null}
                    </Heading>
                    <p className="mt-6 max-w-2xl text-pretty text-xl leading-8 text-muted">
                        {description}
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/membership">Become a member <ArrowRight data-icon="inline-end" /></Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/projects">Explore projects</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { Hero12 }
