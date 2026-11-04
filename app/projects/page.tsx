import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { ProjectCard } from "@/components/experiences/project-card";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Projects and Impact | UISS",
  description:
    "Explore verified projects and community initiatives built with and through the UISS community.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const additionalProjects = projects.filter((project) => project.slug !== featuredProject?.slug);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="overflow-hidden">
          <div className="uiss-container uiss-page-intro">
            <div className="max-w-2xl">
              <p className="uiss-eyebrow">Projects and impact</p>
              <h1 className="uiss-page-title mt-4">Technology shaped around real needs.</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted">
                Explore verified work created by students and partners to solve practical problems
                and widen access to technology.
              </p>
              <Button
                render={<Link href="#projects" />}
                nativeButton={false}
                size="lg"
                className="mt-8"
              >
                Explore projects <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-6 uiss-section">
          <div className="uiss-container">
            <h2 className="uiss-section-title max-w-3xl">
              Work that reaches beyond the classroom.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Each published project documents a real need, the response, and the impact UISS can
              verify.
            </p>
            {featuredProject ? (
              <ProjectCard project={featuredProject} featured className="mt-8 sm:mt-10" />
            ) : (
              <div className="mt-8 rounded-lg sm:mt-10 bg-panel shadow-border p-10 text-center">
                <h3 className="text-2xl font-semibold">Projects are being prepared.</h3>
                <p className="mt-3 text-muted">
                  Approved project stories will appear here when they are ready.
                </p>
              </div>
            )}
          </div>
        </section>

        {additionalProjects.length ? (
          <section className="bg-canvas uiss-section">
            <div className="uiss-container">
              <h2 className="uiss-section-title">More projects.</h2>
              <div className="mt-8 grid sm:mt-10 gap-5 md:grid-cols-2">
                {additionalProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
