import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ManagedImage } from "@/components/managed-image";

export type Blog7Post = {
  id: string;
  title: string;
  summary?: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image?: string;
};

interface Blog7Props {
  tagline?: string;
  heading?: string;
  description?: string;
  posts?: Blog7Post[];
  emptyMessage?: string;
  className?: string;
  headingLevel?: "h1" | "h2";
}

const Blog7 = ({
  tagline = "Latest updates",
  heading = "UISS blog",
  description = "Project notes, event reports, and ideas from UISS students.",
  posts = [],
  emptyMessage = "No stories are available yet. Check back for updates from UISS.",
  className,
  headingLevel = "h1",
}: Blog7Props) => {
  const Heading = headingLevel;
  const EmptyHeading = headingLevel === "h1" ? "h2" : "h3";

  return (
    <section className={cn("uiss-section", className)}>
      <div className="uiss-container flex flex-col gap-8 sm:gap-10">
        <div className="max-w-3xl">
          <Badge variant="secondary">{tagline}</Badge>
          <Heading className="mt-4 uiss-section-title text-ink">{heading}</Heading>
          <p className="mt-4 text-base leading-7 text-muted">{description}</p>
        </div>
        {posts.length > 0 ? (
          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="grid overflow-hidden">
                {post.image ? (
                  <Link href={post.url} className="relative block aspect-video overflow-hidden">
                    <ManagedImage
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </Link>
                ) : null}
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    {post.label}
                  </Badge>
                  <CardTitle className="mt-4 text-2xl leading-tight">
                    <Link href={post.url} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <p className="mt-2 text-sm font-semibold text-muted">
                    {post.author} · {post.published}
                  </p>
                </CardHeader>
                <CardContent>
                  {post.summary ? <p className="leading-7 text-muted">{post.summary}</p> : null}
                </CardContent>
                <CardFooter>
                  <Link
                    href={post.url}
                    className="flex items-center gap-2 font-semibold text-ink hover:underline"
                  >
                    Read <span className="sr-only">{post.title}</span>more
                    <ArrowRight aria-hidden />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex w-full max-w-3xl flex-col items-center rounded-lg bg-panel shadow-border p-10 text-center">
            <Newspaper className="size-10 text-muted" aria-hidden />
            <EmptyHeading className="mt-5 text-2xl font-semibold text-ink">
              No stories yet.
            </EmptyHeading>
            <p className="mt-3 max-w-xl leading-7 text-muted">{emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Blog7 };
