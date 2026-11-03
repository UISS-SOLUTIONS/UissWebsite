import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { CollaboratorList } from "@/components/experiences/collaborator-list";
import { EventCard } from "@/components/experiences/event-card";
import { Button } from "@/components/ui/button";
import { categoryFromSlug, categorySlug, collaborationNetwork } from "@/lib/experience-catalog";
import { getAvailableEventCategories, getEvents } from "@/lib/public-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events and Experiences | UISS",
  description:
    "Explore UISS workshops, hackathons, competitions, communities, and industry collaborations.",
};

type EventsPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const [events, query] = await Promise.all([getEvents(), searchParams]);
  const requestedCategory = Array.isArray(query.category) ? query.category[0] : query.category;
  const activeCategory = categoryFromSlug(requestedCategory);
  const availableCategories = getAvailableEventCategories(events);

  const featuredEvents = events
    .filter((event) => event.featuredRank)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));

  const archivedEvents = activeCategory
    ? events.filter((event) => event.categories.includes(activeCategory))
    : events;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="overflow-hidden">
          <div className="uiss-container uiss-page-intro">
            <div className="max-w-2xl">
              <p className="uiss-eyebrow">Events and experiences</p>
              <h1 className="uiss-page-title mt-4">Where ideas become experiences.</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted">
                Discover the experiences bringing UISS students together to learn, build,
                experiment, and create technology that matters.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button render={<Link href="#archive" />} nativeButton={false} size="lg">
                  Explore events <ArrowRight aria-hidden />
                </Button>
                <Button
                  render={
                    <a href="mailto:udsmict1@gmail.com?subject=Collaboration%20with%20UISS" />
                  }
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                >
                  <Mail aria-hidden />
                  Collaborate with UISS
                </Button>
              </div>
            </div>
          </div>
        </section>

        {featuredEvents.length ? (
          <section className="uiss-section">
            <div className="uiss-container">
              <p className="uiss-eyebrow">Featured experiences</p>
              <h2 className="uiss-section-title mt-4 max-w-3xl">
                Moments that moved students from learning into practice.
              </h2>
              <div className="mt-8 grid sm:mt-10 gap-5 lg:grid-cols-12">
                {featuredEvents.map((event, index) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    variant="featured"
                    className={cn(index === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5")}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="archive" className="scroll-mt-6 bg-canvas uiss-section">
          <div className="uiss-container">
            <h2 className="uiss-section-title">Moments that move us forward.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Browse workshops, competitions, conversations, and programs that have shaped the UISS
              community.
            </p>
            <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter events by category">
              <Link
                href="/events#archive"
                aria-current={!activeCategory ? "page" : undefined}
                className={cn(
                  "uiss-button uiss-pressable inline-flex min-h-11 items-center rounded-control px-4 py-2 text-sm",
                  !activeCategory
                    ? "bg-ink text-white"
                    : "bg-panel text-ink shadow-border hover:bg-surface",
                )}
              >
                All
              </Link>
              {availableCategories.map((category) => (
                <Link
                  key={category}
                  href={`/events?category=${categorySlug(category)}#archive`}
                  aria-current={activeCategory === category ? "page" : undefined}
                  className={cn(
                    "uiss-button uiss-pressable inline-flex min-h-11 items-center rounded-control px-4 py-2 text-sm",
                    activeCategory === category
                      ? "bg-ink text-white"
                      : "bg-panel text-ink shadow-border hover:bg-surface",
                  )}
                >
                  {category}
                </Link>
              ))}
            </nav>

            <p className="mt-8 text-sm font-semibold text-muted" aria-live="polite">
              {activeCategory
                ? `${archivedEvents.length} ${activeCategory.toLowerCase()} experience${archivedEvents.length === 1 ? "" : "s"}`
                : `${archivedEvents.length} experiences`}
            </p>
            {archivedEvents.length ? (
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {archivedEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-lg bg-panel shadow-border p-10 text-center">
                <h3 className="text-2xl font-semibold">No matching experiences</h3>
                <p className="mt-3 text-muted">Choose another category or view the full archive.</p>
                <Button
                  render={<Link href="/events#archive" />}
                  nativeButton={false}
                  variant="outline"
                  className="mt-6"
                >
                  View all events
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="uiss-section">
          <div className="uiss-container grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <h2 className="uiss-section-title">Better together.</h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted">
                UISS works with technology communities, universities, and industry partners to
                create practical opportunities beyond the classroom.
              </p>
            </div>
            <CollaboratorList items={collaborationNetwork} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
