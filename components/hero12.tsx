import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero12Props {
  className?: string;
  preview?: boolean;
  eyebrow?: string;
  heading?: string;
  highlightedHeading?: string;
  description?: string;
}

const Hero12 = ({
  className,
  preview = false,
  eyebrow = "University of Dar es Salaam",
  heading = "Where ICT students",
  highlightedHeading = "learn, build, and lead.",
  description = "Learn with peers across six technical clubs, work on student projects, and take part in UISS events.",
}: Hero12Props) => {
  const Heading = preview ? "h2" : "h1";

  return (
    <section className={cn("uiss-page-intro", className)}>
      <div className="uiss-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center">
            <Image
              src="/brand/udsm-logo.avif"
              alt="University of Dar es Salaam crest"
              width={440}
              height={454}
              priority
              sizes="48px"
              className="size-full object-contain mix-blend-multiply"
            />
          </div>
          <p className="mt-4 text-sm font-medium text-muted">{eyebrow}</p>
          <Heading className="uiss-page-title mt-4 max-w-2xl text-ink">
            {heading} {highlightedHeading ? <span>{highlightedHeading}</span> : null}
          </Heading>
          <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              render={<Link href="/membership" />}
              nativeButton={false}
              size="lg"
              variant="secondary"
            >
              Become a member <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              render={<Link href="/projects" />}
              nativeButton={false}
              size="lg"
              variant="outline"
            >
              Explore projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero12 };
