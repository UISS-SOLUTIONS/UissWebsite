import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { ExperienceCover } from "@/components/experiences/experience-cover";
import { cn } from "@/lib/utils";
import type { PublicEvent } from "@/lib/experience-catalog";

type EventCardProps = {
  event: PublicEvent;
  variant?: "featured" | "archive" | "related";
  className?: string;
};

function timingLabel(event: PublicEvent) {
  if (event.timing === "ongoing") return "Ongoing";

  if (event.timing === "upcoming") return "Upcoming";

  return "Past event";
}

export function EventCard({ event, variant = "archive", className }: EventCardProps) {
  const compact = variant === "related";

  return (
    <article
      className={cn("group flex h-full flex-col rounded-lg bg-panel shadow-border p-3", className)}
    >
      {event.coverMedia ? (
        <Link href={`/events/${event.slug}`} className="block rounded-lg">
          <ExperienceCover
            media={event.coverMedia}
            className={cn(
              "aspect-16/10",
              variant === "featured" && "sm:aspect-video",
              compact && "aspect-video",
            )}
          />
        </Link>
      ) : null}
      <div className={cn("flex flex-1 flex-col p-3", compact && "p-3 pt-4")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-muted">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="size-4" aria-hidden />
            {event.dateLabel}
          </span>
          <span className="rounded-full bg-surface px-2.5 py-1 text-xs text-ink">
            {timingLabel(event)}
          </span>
        </div>
        <h3
          className={cn(
            "mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink",
            variant === "featured" && "sm:text-3xl",
            compact && "text-xl",
          )}
        >
          <Link
            href={`/events/${event.slug}`}
            className="rounded-sm hover:underline hover:underline-offset-4"
          >
            {event.title}
          </Link>
        </h3>
        {!compact ? (
          <p className="mt-3 line-clamp-3 leading-7 text-muted">{event.summary}</p>
        ) : null}
        <div className="mt-auto pt-5">
          {event.location && !compact ? (
            <p className="mb-4 flex items-start gap-2 text-sm font-medium text-muted">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{event.location}</span>
            </p>
          ) : null}
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 rounded-sm font-semibold text-ink hover:underline hover:underline-offset-4"
          >
            Explore event <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
