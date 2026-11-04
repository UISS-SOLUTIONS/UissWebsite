import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, UserRound } from "lucide-react";
import { ManagedImage } from "@/components/managed-image";

export interface BlogArticleTwoProps {
  title: string;
  description?: string;
  category?: string;
  authors?: Array<{ name: string; image?: string }>;
  image?: string;
  published: string;
  children: ReactNode;
}

function AuthorMark({ author }: { author: NonNullable<BlogArticleTwoProps["authors"]>[number] }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 text-sm text-muted">
      <span
        className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-panel shadow-border"
        role={author.image ? undefined : "img"}
        aria-label={author.image ? undefined : `${author.name} avatar unavailable`}
      >
        {author.image ? (
          <ManagedImage
            src={author.image}
            alt={author.name}
            width={24}
            height={24}
            sizes="24px"
            className="size-full object-cover"
          />
        ) : (
          <UserRound aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
        )}
      </span>
      <span className="min-w-0 break-words text-ink">{author.name}</span>
    </span>
  );
}

export function BlogArticleTwo({
  title,
  description,
  category,
  authors = [],
  image,
  published,
  children,
}: BlogArticleTwoProps) {
  return (
    <article className="uiss-page-content bg-canvas">
      <div className="uiss-reading-rail">
        <header>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/blog" className="transition-colors hover:text-ink">
                  Blog
                </Link>
              </li>
              {category ? (
                <>
                  <li aria-hidden="true" className="text-muted">
                    <ChevronRight aria-hidden="true" className="size-3.5" />
                  </li>
                  <li aria-current="page" className="text-ink">
                    {category}
                  </li>
                </>
              ) : null}
            </ol>
          </nav>
          <h1 className="uiss-page-title mt-4 text-ink">{title}</h1>
          {description ? (
            <p className="mt-4 text-base leading-7 text-muted">{description}</p>
          ) : null}
        </header>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {authors.length ? (
            <div className="flex min-w-0 flex-wrap items-center gap-4">
              {authors.map((author) => (
                <AuthorMark key={author.name} author={author} />
              ))}
            </div>
          ) : null}
          <time className="text-sm text-muted">{published}</time>
        </div>
        {image ? (
          <div className="relative mt-8 overflow-hidden rounded-lg bg-panel shadow-border sm:mt-10">
            <ManagedImage
              src={image}
              alt={title}
              width={672}
              height={378}
              sizes="(min-width: 768px) 672px, 100vw"
              className="aspect-video w-full object-cover"
              priority
            />
          </div>
        ) : null}
        <div data-blog-article className="zenblog-content zenblog-content--quartz mt-8 sm:mt-10">
          {children}
        </div>
      </div>
    </article>
  );
}
