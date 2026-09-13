import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { BrandedPoster } from '@/components/experiences/branded-poster'
import { CollaboratorList } from '@/components/experiences/collaborator-list'
import { EventCard } from '@/components/experiences/event-card'
import { Button } from '@/components/ui/button'
import { categoryFromSlug, categorySlug, collaborationNetwork } from '@/lib/experience-catalog'
import { getAvailableEventCategories, getEvents } from '@/lib/public-data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Events and Experiences | UISS',
  description: 'Explore UISS workshops, hackathons, competitions, communities, and industry collaborations.',
}

type EventsPageProps = {
  searchParams: Promise<{ category?: string | string[] }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const [events, query] = await Promise.all([getEvents(), searchParams])
  const requestedCategory = Array.isArray(query.category) ? query.category[0] : query.category
  const activeCategory = categoryFromSlug(requestedCategory)
  const availableCategories = getAvailableEventCategories(events)
  const featuredEvents = events
    .filter((event) => event.featuredRank)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
  const archivedEvents = activeCategory
    ? events.filter((event) => event.categories.includes(activeCategory))
    : events

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main>
        <section className="overflow-hidden border-b border-line">
          <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.02fr_0.98fr] md:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Events and experiences</p>
              <h1 className="uiss-page-title mt-5">Where ideas become experiences.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">Discover the experiences bringing UISS students together to learn, build, experiment, and create technology that matters.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link href="#archive">Explore events <ArrowRight aria-hidden /></Link></Button>
                <Button asChild size="lg" variant="outline">
                  <a href="mailto:udsmict1@gmail.com?subject=Collaboration%20with%20UISS"><Mail aria-hidden />Collaborate with UISS</a>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-xl md:mx-0">
              <BrandedPoster
                title="Learn. Build. Connect. Create impact."
                label="Workshops, hackathons, communities"
                kind="event"
                className="aspect-[4/3] shadow-soft"
              />
            </div>
          </div>
        </section>

        {featuredEvents.length ? (
          <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Featured experiences</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Moments that moved students from learning into practice.</h2>
              <div className="mt-10 grid gap-5 lg:grid-cols-12">
                {featuredEvents.map((event, index) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    variant="featured"
                    className={cn(index === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5')}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="archive" className="scroll-mt-24 bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Moments that move us forward.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">Browse workshops, competitions, conversations, and programs that have shaped the UISS community.</p>
            <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter events by category">
              <Link
                href="/events#archive"
                aria-current={!activeCategory ? 'page' : undefined}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-bold transition active:scale-[0.98]',
                  !activeCategory ? 'border-ink bg-ink text-canvas' : 'border-line bg-canvas text-ink hover:border-ink',
                )}
              >
                All
              </Link>
              {availableCategories.map((category) => (
                <Link
                  key={category}
                  href={`/events?category=${categorySlug(category)}#archive`}
                  aria-current={activeCategory === category ? 'page' : undefined}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-bold transition active:scale-[0.98]',
                    activeCategory === category ? 'border-ink bg-ink text-canvas' : 'border-line bg-canvas text-ink hover:border-ink',
                  )}
                >
                  {category}
                </Link>
              ))}
            </nav>

            <p className="mt-8 text-sm font-semibold text-muted" aria-live="polite">
              {activeCategory ? `${archivedEvents.length} ${activeCategory.toLowerCase()} experience${archivedEvents.length === 1 ? '' : 's'}` : `${archivedEvents.length} experiences`}
            </p>
            {archivedEvents.length ? (
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {archivedEvents.map((event) => <EventCard key={event.slug} event={event} />)}
              </div>
            ) : (
              <div className="mt-5 rounded-lg border border-dashed border-line bg-canvas p-10 text-center">
                <h3 className="text-2xl font-bold">No matching experiences</h3>
                <p className="mt-3 text-muted">Choose another category or view the full archive.</p>
                <Button asChild variant="outline" className="mt-6"><Link href="/events#archive">View all events</Link></Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Better together.</h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-muted">UISS works with technology communities, universities, and industry partners to create practical opportunities beyond the classroom.</p>
            </div>
            <CollaboratorList items={collaborationNetwork} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
