import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CallToAction() {
    return (
        <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-8 rounded-lg bg-brand p-8 text-[#111111] sm:p-12 lg:grid-cols-[1fr_auto]">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.18em]">Ready to take part?</p>
                        <h2 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">Join the UISS student community.</h2>
                    </div>
                    <Button asChild size="lg" className="bg-[#111111] text-white hover:bg-[#111111]/85">
                        <Link href="/membership">Apply for membership <ArrowRight /></Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
