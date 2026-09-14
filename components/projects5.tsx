'use client'

import Link from 'next/link'
import { FolderKanban } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ManagedImage } from '@/components/managed-image'

export type ProjectPreview = {
    id: string
    title: string
    image?: string
    status: string
    type: string
    url: string
}

interface Projects5Props {
    className?: string
    heading?: string
    description?: string
    projects?: ProjectPreview[]
    emptyMessage?: string
}

const Projects5 = ({
    className,
    heading = 'Projects',
    description = 'Explore practical projects created by students across the UISS community.',
    projects = [],
    emptyMessage = 'Approved student projects will appear here as they are published by the UISS team.',
}: Projects5Props) => {
    const shouldReduceMotion = useReducedMotion()

    return (
    <section className={cn('py-24 sm:py-32', className)}>
        <div className="container mx-auto px-6">
            <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Student work</p>
                <h2 className="mt-4 text-5xl font-bold tracking-tight text-ink sm:text-6xl">{heading}</h2>
                <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
            </div>
            {projects.length > 0 ? <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="group overflow-hidden rounded-lg border border-line bg-canvas shadow-soft"
                    >
                        <Link href={project.url} className="relative block h-72 overflow-hidden">
                            {project.image ? (
                                <ManagedImage src={project.image} alt={project.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover grayscale transition-[filter,transform] duration-200 ease-out group-hover:scale-[1.015] group-hover:grayscale-0 motion-reduce:transition-none" />
                            ) : (
                                <span className="flex h-72 w-full items-center justify-center bg-surface text-muted"><FolderKanban className="size-12" aria-hidden /></span>
                            )}
                        </Link>
                        <div className="flex items-center justify-between gap-5 p-5">
                            <div>
                                <h3 className="text-lg font-semibold text-ink"><Link href={project.url}>{project.title}</Link></h3>
                                <p className="mt-1 text-muted">{project.type}</p>
                            </div>
                            <Badge variant="secondary">{project.status}</Badge>
                        </div>
                    </motion.article>
                ))}
            </div> : (
                <div className="mt-12 rounded-lg border border-dashed border-line bg-surface p-10 text-center">
                    <FolderKanban className="mx-auto size-10 text-muted" aria-hidden />
                    <h3 className="mt-5 text-2xl font-bold text-ink">Projects are being prepared.</h3>
                    <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">{emptyMessage}</p>
                </div>
            )}
        </div>
    </section>
    )
}

export { Projects5 }
