import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export type EventPreview = {
  id: string;
  title: string;
  summary: string;
  date: string;
  location?: string;
  registrationStatus: string;
  url: string;
};

type EventShowcaseProps = {
  events: EventPreview[];
  unavailable?: boolean;
};

export function EventShowcase({ events, unavailable = false }: EventShowcaseProps) {
  if (events.length === 0) return null;

  return (
    <section className="uiss-section">
      <div className="uiss-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="uiss-eyebrow">What’s happening</p>
            <h2 className="uiss-section-title mt-4 text-ink">Upcoming events.</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Workshops, meetups, competitions, and community sessions from UISS.
            </p>
          </div>
          <Button render={<Link href="/events" />} nativeButton={false} variant="outline">
            View all events
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        {events.length > 0 ? (
          <div className="mt-8 grid sm:mt-10 gap-5 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="flex min-h-80 flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-brand-mark/15 text-brand-mark">
                      <CalendarDays aria-hidden />
                    </div>
                    <Badge variant="secondary">
                      {event.registrationStatus.replaceAll("_", " ")}
                    </Badge>
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                    {event.date}
                  </p>
                  <CardTitle className="mt-2 text-2xl">
                    <Link href={event.url} className="hover:underline">
                      {event.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="leading-7 text-muted">
                    {event.summary || "Event details are being prepared."}
                  </p>
                  {event.location ? (
                    <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
                      <MapPin className="size-4" aria-hidden />
                      {event.location}
                    </p>
                  ) : null}
                </CardContent>
                <CardFooter>
                  <Link
                    href={event.url}
                    className="flex items-center gap-2 font-semibold text-ink hover:underline"
                  >
                    Event details
                    <ArrowRight aria-hidden />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg sm:mt-10 bg-panel shadow-border p-10 text-center">
            <CalendarDays className="mx-auto size-10 text-muted" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold text-ink">
              No upcoming events have been published.
            </h3>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">
              {unavailable
                ? "Event information could not be loaded right now. Please try again later."
                : "Approved event dates and registration details will appear here when they are available."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
