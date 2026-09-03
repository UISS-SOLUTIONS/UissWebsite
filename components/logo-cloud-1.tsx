import Image from 'next/image'
import { Logo } from '@/components/logo'

export default function LogoCloud() {
    return (
        <section className="border-y border-line bg-surface" aria-labelledby="affiliations-title">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
                <p id="affiliations-title" className="max-w-xs font-semibold text-muted">Part of the University of Dar es Salaam student community</p>
                <div className="flex flex-wrap items-center gap-10">
                    <Logo className="w-32" />
                    <div className="h-12 w-px bg-line" aria-hidden="true" />
                    <Image src="/Udsm.png" alt="University of Dar es Salaam" width={188} height={58} className="h-14 w-auto object-contain" />
                </div>
            </div>
        </section>
    )
}
