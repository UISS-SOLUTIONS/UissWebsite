'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type ProjectPreview = {
    id: string
    title: string
    image: string
    status: string
    type: string
    url: string
}

const placeholderProjects: ProjectPreview[] = [
    { id: 'project-directory', title: 'Student project directory', image: '/welcomeBg.jpg', status: 'Planning', type: 'Project showcase', url: '/projects' },
    { id: 'club-collaborations', title: 'Club collaborations', image: '/ctfWinner.jpg', status: 'Planning', type: 'Community work', url: '/clubs' },
    { id: 'future-initiatives', title: 'Future initiatives', image: '/construction.png', status: 'Planning', type: 'Upcoming work', url: '/projects' },
]

interface Projects5Props {
    className?: string
    heading?: string
    description?: string
    projects?: ProjectPreview[]
}

const Projects5 = ({
    className,
    heading = 'Projects',
    description = 'The project catalogue is ready for verified student work. Project details and outcomes will be planned in a later ticket.',
    projects = placeholderProjects,
}: Projects5Props) => (
    <section className={cn('py-24 sm:py-32', className)}>
        <div className="container mx-auto px-6">
            <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Student work</p>
                <h2 className="mt-4 text-5xl font-bold tracking-tight text-ink sm:text-6xl">{heading}</h2>
                <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="group overflow-hidden rounded-lg border border-line bg-canvas shadow-soft"
                    >
                        <Link href={project.url} className="block overflow-hidden">
                            <Image src={project.image} alt="" width={1200} height={800} className="h-72 w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
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
            </div>
        </div>
    </section>
)

export { Projects5 }
