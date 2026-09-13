import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { BrandedPoster } from '@/components/experiences/branded-poster'
import { ProjectCard } from '@/components/experiences/project-card'
import { Button } from '@/components/ui/button'
import { getProjects } from '@/lib/public-data'

export const metadata: Metadata = {
  title: 'Projects and Impact | UISS',
  description: 'Explore verified projects and community initiatives built with and through the UISS community.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]
  const additionalProjects = projects.filter((project) => project.slug !== featuredProject?.slug)

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main>
        <section className="overflow-hidden border-b border-line">
          <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] md:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Projects and impact</p>
              <h1 className="uiss-page-title mt-5">Technology shaped around real needs.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">Explore verified work created by students and partners to solve practical problems and widen access to technology.</p>
              <Button asChild size="lg" className="mt-8"><Link href="#projects">Explore projects <ArrowRight aria-hidden /></Link></Button>
            </div>
            <BrandedPoster
              title="Useful work starts with a real problem."
              label="Student projects and community impact"
              kind="project"
              className="aspect-[4/3] shadow-soft"
            />
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Work that reaches beyond the classroom.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">Each published project documents a real need, the response, and the impact UISS can verify.</p>
            {featuredProject ? (
              <ProjectCard project={featuredProject} featured className="mt-10" />
            ) : (
              <div className="mt-10 rounded-lg border border-dashed border-line bg-surface p-10 text-center">
                <h3 className="text-2xl font-bold">Projects are being prepared.</h3>
                <p className="mt-3 text-muted">Approved project stories will appear here when they are ready.</p>
              </div>
            )}
          </div>
        </section>

        {additionalProjects.length ? (
          <section className="bg-surface py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">More projects.</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {additionalProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
