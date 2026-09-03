import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroHeader } from '@/components/header'

export default function HeroSection({ preview = false }: { preview?: boolean }) {
    const Heading = preview ? 'h2' : 'h1'

    return (
        <>
            <HeroHeader />
            <main>
                <section className="overflow-hidden py-16 sm:py-24">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-muted">University of Dar es Salaam</p>
                            <Heading className="max-w-3xl text-balance text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                                Where ICT students learn, build, and lead.
                            </Heading>
                            <p className="mt-6 max-w-xl text-pretty text-xl leading-8 text-muted">
                                UISS connects students with practical programs, a growing technical community, and opportunities to turn ideas into useful work.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button asChild size="lg" variant="secondary">
                                    <Link href="/Membership">Become a member <ArrowRight /></Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/Explore">Explore UISS</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-ink shadow-soft">
                            <Image
                                src="/welcomeBg.jpg"
                                alt="Students standing together on campus steps"
                                fill
                                priority
                                className="object-cover grayscale"
                                sizes="(min-width: 1024px) 55vw, 100vw"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-24 text-white">
                                <p className="max-w-sm text-lg font-semibold">A student-led community for technology, collaboration, and professional growth.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
