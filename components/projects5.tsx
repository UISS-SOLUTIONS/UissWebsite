import Link from "next/link";
import { FolderKanban } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ManagedImage } from "@/components/managed-image";

export type ProjectPreview = {
  id: string;
  title: string;
  image?: string;
  status: string;
  type: string;
  url: string;
};

interface Projects5Props {
  className?: string;
  heading?: string;
  description?: string;
  projects?: ProjectPreview[];
  emptyMessage?: string;
}

const Projects5 = ({
  className,
  heading = "Projects",
  description = "Explore practical projects created by students across the UISS community.",
  projects = [],
  emptyMessage = "Approved student projects will appear here as they are published by the UISS team.",
}: Projects5Props) => {
  return (
    <section className={cn("uiss-section", className)}>
      <div className="uiss-container">
        <div className="max-w-3xl">
          <p className="uiss-eyebrow">Student work</p>
          <h2 className="mt-4 uiss-section-title text-ink">{heading}</h2>
          <p className="mt-4 text-base leading-7 text-muted">{description}</p>
        </div>
        {projects.length > 0 ? (
          <div className="mt-8 grid sm:mt-10 grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-lg bg-panel shadow-soft"
              >
                <Link href={project.url} className="relative block h-72 overflow-hidden">
                  {project.image ? (
                    <ManagedImage
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-72 w-full items-center justify-center bg-surface text-muted">
                      <FolderKanban className="size-12" aria-hidden />
                    </span>
                  )}
                </Link>
                <div className="flex flex-wrap items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">
                      <Link href={project.url}>{project.title}</Link>
                    </h3>
                    <p className="mt-1 text-muted">{project.type}</p>
                  </div>
                  <Badge variant="secondary">{project.status}</Badge>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg sm:mt-10 bg-panel shadow-border p-10 text-center">
            <FolderKanban className="mx-auto size-10 text-muted" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold text-ink">Projects are being prepared.</h3>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">{emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Projects5 };
