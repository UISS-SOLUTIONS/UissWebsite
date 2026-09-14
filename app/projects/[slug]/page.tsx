import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, CalendarDays, CircleCheckBig } from 'lucide-react'
import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { BrandedPoster } from '@/components/experiences/branded-poster'
import { CollaboratorList } from '@/components/experiences/collaborator-list'
import { Button } from '@/components/ui/button'
import { ManagedImage } from '@/components/managed-image'
import { getProject } from '@/lib/public-data'

type ProjectDetailProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Project not found | UISS' }

  return {
    title: `${project.title} | UISS Projects`,
    description: project.summary,
  }
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main>
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-sm text-sm font-bold text-muted hover:text-ink hover:underline hover:underline-offset-4">
              <ArrowLeft className="size-4" aria-hidden /> Back to projects
            </Link>
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-muted">
                  <span className="inline-flex items-center gap-2"><CalendarDays className="size-4" aria-hidden />{project.year}</span>
                  <span className="rounded-full bg-brand px-3 py-1 text-brand-ink">{project.statusLabel}</span>
                  <span>{project.typeLabel}</span>
                </div>
                <h1 className="uiss-page-title mt-5">{project.title}</h1>
                <p className="mt-6 max-w-2xl text-xl leading-8 text-muted">{project.summary}</p>
                {project.demoUrl || project.repositoryUrl ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.demoUrl ? <Button asChild size="lg"><a href={project.demoUrl} target="_blank" rel="noopener noreferrer">View demo <ArrowUpRight aria-hidden /></a></Button> : null}
                    {project.repositoryUrl ? <Button asChild size="lg" variant="outline"><a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">Repository <ArrowUpRight aria-hidden /></a></Button> : null}
                  </div>
                ) : null}
              </div>
              <BrandedPoster
                title={project.title}
                label={`${project.year} ${project.typeLabel}`}
                kind="project"
                media={project.coverMedia}
                className="aspect-[4/3] shadow-soft"
              />
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Overview</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-muted">
              {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">From need to meaningful impact.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {project.problem ? (
                <article className="rounded-lg border border-line bg-canvas p-7 sm:p-9 md:col-span-2">
                  <p className="text-sm font-bold text-brand-mark">The need</p>
                  <h3 className="mt-3 text-2xl font-bold">Problem</h3>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{project.problem}</p>
                </article>
              ) : null}
              {project.solution ? (
                <article className="rounded-lg bg-brand p-7 text-brand-ink sm:p-9">
                  <h3 className="text-2xl font-bold">Solution</h3>
                  <p className="mt-4 leading-8">{project.solution}</p>
                </article>
              ) : null}
              {project.impact ? (
                <article className="rounded-lg border border-line bg-canvas p-7 sm:p-9">
                  <CircleCheckBig className="size-7 text-brand-mark" aria-hidden />
                  <h3 className="mt-5 text-2xl font-bold">Impact</h3>
                  <p className="mt-4 leading-8 text-muted">{project.impact}</p>
                </article>
              ) : null}
            </div>
          </div>
        </section>

        {project.techStack.length ? (
          <section className="py-16">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold tracking-tight">Technology</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((technology) => <li key={technology} className="rounded-full border border-line bg-canvas px-4 py-2 font-semibold">{technology}</li>)}
              </ul>
            </div>
          </section>
        ) : null}

        {project.gallery.length ? (
          <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Project gallery</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {project.gallery.map((image) => (
                  <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <ManagedImage src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {project.collaborators.length ? (
          <section className="py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">A shared effort.</h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-muted">Organisations that contributed to connectivity, devices, infrastructure, and educational access.</p>
              </div>
              <CollaboratorList items={project.collaborators} />
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
