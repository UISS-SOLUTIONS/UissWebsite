import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BrandedPoster } from '@/components/experiences/branded-poster'
import { cn } from '@/lib/utils'
import type { PublicProject } from '@/lib/experience-catalog'

type ProjectCardProps = {
  project: PublicProject
  featured?: boolean
  className?: string
}

export function ProjectCard({ project, featured = false, className }: ProjectCardProps) {
  return (
    <article className={cn('group grid overflow-hidden rounded-lg border border-line bg-canvas shadow-soft', featured ? 'lg:grid-cols-[1.15fr_0.85fr]' : '', className)}>
      <Link href={`/projects/${project.slug}`} className="block min-h-64">
        <BrandedPoster
          title={project.title}
          label={project.typeLabel}
          kind="project"
          media={project.coverMedia}
          className="h-full min-h-64 rounded-none"
        />
      </Link>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-muted">
          <span>{project.year}</span>
          <span className="rounded-full bg-brand px-3 py-1 text-brand-ink">{project.statusLabel}</span>
        </div>
        <h2 className={cn('mt-5 text-3xl font-bold leading-tight tracking-tight text-ink', featured && 'sm:text-4xl')}>
          <Link href={`/projects/${project.slug}`} className="rounded-sm hover:underline hover:underline-offset-4">{project.title}</Link>
        </h2>
        <p className="mt-4 leading-7 text-muted">{project.summary}</p>
        <Link href={`/projects/${project.slug}`} className="mt-7 inline-flex w-fit items-center gap-2 rounded-sm font-bold text-ink hover:underline hover:underline-offset-4">
          Read project story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
