"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { ManagedImage } from "@/components/managed-image";
import { Button } from "@/components/ui/button";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import { cn } from "@/lib/utils";

export type ClubPreview = {
  id: string;
  title: string;
  summary: string;
  disciplines: string[];
  url: string;
  image?: string;
  imageAlt?: string;
};

type ClubShowcaseProps = {
  clubs: ClubPreview[];
  unavailable?: boolean;
  headingLevel?: "h1" | "h2";
  showViewAll?: boolean;
  className?: string;
};

function ClubMorphingPreview({ club, trigger }: { club: ClubPreview; trigger: React.ReactNode }) {
  return (
    <MorphingDialog transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
      <MorphingDialogTrigger
        ariaLabel={`Preview ${club.title}`}
        className="block w-full rounded-sm text-start transition-colors hover:bg-surface focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
      >
        {trigger}
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative mx-4 max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-lg bg-panel shadow-modal">
          <div
            className="relative h-44 bg-surface sm:h-56"
            role={club.image && club.imageAlt ? "img" : undefined}
            aria-label={club.image && club.imageAlt ? club.imageAlt : undefined}
          >
            {club.image ? (
              <>
                <ManagedImage
                  src={club.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 672px, calc(100vw - 32px)"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-black/10" aria-hidden />
              </>
            ) : null}
          </div>
          <MorphingDialogClose className="grid size-11 place-items-center rounded-md bg-panel text-ink shadow-soft transition-colors duration-150 hover:bg-surface focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2">
            <X aria-hidden />
          </MorphingDialogClose>
          <div className="p-6 sm:p-8">
            <MorphingDialogSubtitle className="uiss-eyebrow">
              UISS club preview
            </MorphingDialogSubtitle>
            <MorphingDialogTitle className="mt-3">
              <h3 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-ink">
                {club.title}
              </h3>
            </MorphingDialogTitle>
            <MorphingDialogDescription className="mt-5" disableLayoutAnimation>
              <p className="text-base leading-7 text-muted">
                {club.summary || "Club details are being prepared."}
              </p>
              {club.disciplines.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${club.title} focus areas`}>
                  {club.disciplines.slice(0, 4).map((discipline) => (
                    <li
                      key={discipline}
                      className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted"
                    >
                      {discipline}
                    </li>
                  ))}
                </ul>
              ) : null}
              <Button render={<Link href={club.url} />} nativeButton={false} className="mt-8">
                Open full club profile
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            </MorphingDialogDescription>
          </div>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export function ClubShowcase({
  clubs,
  headingLevel = "h2",
  showViewAll = true,
  className,
}: ClubShowcaseProps) {
  if (clubs.length === 0) return null;

  const Heading = headingLevel;

  return (
    <section
      className={cn(
        "bg-canvas",
        headingLevel === "h1" ? "uiss-page-content" : "uiss-section",
        className,
      )}
    >
      <div className="uiss-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="uiss-eyebrow">Find your community</p>
            <Heading
              className={cn(
                "mt-4 text-ink",
                headingLevel === "h1" ? "uiss-page-title" : "uiss-section-title",
              )}
            >
              Explore UISS clubs.
            </Heading>
            <p className="mt-4 text-base leading-7 text-muted">
              Six technical communities, open to beginners and experienced students alike.
            </p>
          </div>
          {showViewAll ? (
            <Button render={<Link href="/clubs" />} nativeButton={false} variant="outline">
              View all clubs
              <ArrowRight data-icon="inline-end" />
            </Button>
          ) : null}
        </div>

        <ul className="-mx-3 mt-8 space-y-2 sm:mt-10">
          {clubs.map((club) => (
            <li key={club.id}>
              <ClubMorphingPreview
                club={club}
                trigger={
                  <div
                    data-testid={`club-row-${club.id}`}
                    className="flex min-h-28 items-center gap-5 px-3 py-5"
                  >
                    {club.image ? (
                      <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-md bg-line sm:block">
                        <ManagedImage
                          src={club.image}
                          alt=""
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <span className="block text-base font-medium leading-6 tracking-normal text-ink">
                        {club.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-muted">
                        {club.summary}
                      </span>
                    </div>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-muted" />
                  </div>
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
