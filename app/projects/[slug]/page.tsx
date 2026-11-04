import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, CircleCheckBig } from "lucide-react";
import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { ExperienceCover } from "@/components/experiences/experience-cover";
import { CollaboratorList } from "@/components/experiences/collaborator-list";
import { Button } from "@/components/ui/button";
import { ManagedImage } from "@/components/managed-image";
import { getProject } from "@/lib/public-data";

type ProjectDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Project not found | UISS" };

  return {
    title: `${project.title} | UISS Projects`,
    description: project.summary,
  };
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main id="main-content" tabIndex={-1}>
        <section>
          <div className="uiss-container uiss-page-intro">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-muted hover:text-ink hover:underline hover:underline-offset-4"
            >
              <ArrowLeft className="size-4" aria-hidden /> Back to projects
            </Link>
            <div
              className={
                project.coverMedia
                  ? "mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
                  : "mt-8 max-w-3xl"
              }
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-muted">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4" aria-hidden />
                    {project.year}
                  </span>
                  <span className="rounded-full bg-surface px-3 py-1 text-ink">
                    {project.statusLabel}
                  </span>
                  <span>{project.typeLabel}</span>
                </div>
                <h1 className="uiss-page-title mt-4">{project.title}</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{project.summary}</p>
                {project.demoUrl || project.repositoryUrl ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.demoUrl ? (
                      <Button
                        render={
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" />
                        }
                        nativeButton={false}
                        size="lg"
                      >
                        View demo <ArrowUpRight aria-hidden />
                      </Button>
                    ) : null}
                    {project.repositoryUrl ? (
                      <Button
                        render={
                          <a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                        nativeButton={false}
                        size="lg"
                        variant="outline"
                      >
                        Repository <ArrowUpRight aria-hidden />
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {project.coverMedia ? (
                <ExperienceCover media={project.coverMedia} className="aspect-4/3 shadow-soft" />
              ) : null}
            </div>
          </div>
        </section>

        <section className="uiss-section">
          <div className="uiss-container">
            <h2 className="uiss-section-title">Overview</h2>
            <div className="mt-4 max-w-3xl space-y-6 text-lg leading-8 text-muted">
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-canvas uiss-section">
          <div className="uiss-container">
            <h2 className="uiss-section-title max-w-3xl">From need to meaningful impact.</h2>
            <div className="mt-8 grid sm:mt-10 gap-5 md:grid-cols-2">
              {project.problem ? (
                <article className="rounded-lg bg-panel shadow-border p-6 sm:p-8 md:col-span-2">
                  <p className="text-sm font-semibold text-brand-mark">The need</p>
                  <h3 className="mt-3 text-2xl font-semibold">Problem</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{project.problem}</p>
                </article>
              ) : null}
              {project.solution ? (
                <article className="rounded-lg bg-panel p-6 text-ink shadow-border sm:p-8">
                  <h3 className="text-2xl font-semibold">Solution</h3>
                  <p className="mt-4 leading-8">{project.solution}</p>
                </article>
              ) : null}
              {project.impact ? (
                <article className="rounded-lg bg-panel shadow-border p-6 sm:p-8">
                  <CircleCheckBig className="size-7 text-brand-mark" aria-hidden />
                  <h3 className="mt-5 text-2xl font-semibold">Impact</h3>
                  <p className="mt-4 leading-8 text-muted">{project.impact}</p>
                </article>
              ) : null}
            </div>
          </div>
        </section>

        {project.techStack.length ? (
          <section className="uiss-section">
            <div className="uiss-container">
              <h2 className="text-3xl font-semibold tracking-tight">Technology</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full bg-panel shadow-border px-4 py-2 font-semibold"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {project.gallery.length ? (
          <section className="uiss-section">
            <div className="uiss-container">
              <h2 className="uiss-section-title">Project gallery</h2>
              <div className="mt-8 grid sm:mt-10 gap-5 md:grid-cols-2">
                {project.gallery.map((image) => (
                  <div key={image.src} className="relative aspect-4/3 overflow-hidden rounded-lg">
                    <ManagedImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {project.collaborators.length ? (
          <section className="uiss-section">
            <div className="uiss-container grid gap-8 lg:gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <h2 className="uiss-section-title">A shared effort.</h2>
                <p className="mt-4 max-w-md text-base leading-7 text-muted">
                  Organisations that contributed to connectivity, devices, infrastructure, and
                  educational access.
                </p>
              </div>
              <CollaboratorList items={project.collaborators} />
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
