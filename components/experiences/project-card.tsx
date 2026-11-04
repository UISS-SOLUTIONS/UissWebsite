import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExperienceCover } from "@/components/experiences/experience-cover";
import { cn } from "@/lib/utils";
import type { PublicProject } from "@/lib/experience-catalog";

type ProjectCardProps = {
  project: PublicProject;
  featured?: boolean;
  className?: string;
};

export function ProjectCard({ project, featured = false, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group grid overflow-hidden rounded-lg bg-panel shadow-soft",
        featured && project.coverMedia ? "lg:grid-cols-[1.15fr_0.85fr]" : "",
        className,
      )}
    >
      {project.coverMedia ? (
        <Link href={`/projects/${project.slug}`} className="block min-h-64">
          <ExperienceCover media={project.coverMedia} className="h-full min-h-64 rounded-none" />
        </Link>
      ) : null}
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-muted">
          <span>{project.year}</span>
          <span className="rounded-full bg-surface px-3 py-1 text-ink">{project.statusLabel}</span>
        </div>
        <h2
          className={cn(
            "mt-4 text-2xl font-semibold leading-tight tracking-[-0.04em] text-ink",
            featured && "sm:text-3xl",
          )}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-sm hover:underline hover:underline-offset-4"
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-4 leading-7 text-muted">{project.summary}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-sm font-semibold text-ink hover:underline hover:underline-offset-4"
        >
          Read project story <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
