import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Tag } from 'lucide-react'
import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { BrandedPoster } from '@/components/experiences/branded-poster'
import { CollaboratorList } from '@/components/experiences/collaborator-list'
import { EventCard } from '@/components/experiences/event-card'
import { Button } from '@/components/ui/button'
import { ManagedImage } from '@/components/managed-image'
import { getEvent, getEvents, getRelatedEvents } from '@/lib/public-data'

type EventDetailProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventDetailProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) return { title: 'Event not found | UISS' }

  return {
    title: `${event.title} | UISS Events`,
    description: event.summary,
  }
}

export default async function EventDetail({ params }: EventDetailProps) {
  const { slug } = await params
  const [event, allEvents] = await Promise.all([getEvent(slug), getEvents()])
  if (!event) notFound()

  const relatedEvents = getRelatedEvents(event, allEvents)
  const overview = event.description ? [event.description] : event.overview
  const canRegister = event.registrationStatus === 'open' && event.registrationUrl

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main>
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
            <Link href="/events" className="inline-flex items-center gap-2 rounded-sm text-sm font-bold text-muted hover:text-ink hover:underline hover:underline-offset-4">
              <ArrowLeft className="size-4" aria-hidden /> Back to events
            </Link>
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="flex flex-wrap gap-2">
                  {event.categories.map((category) => <span key={category} className="rounded-full bg-surface px-3 py-1 text-sm font-bold text-ink">{category}</span>)}
                </div>
                <h1 className="uiss-page-title mt-5">{event.title}</h1>
                <p className="mt-6 max-w-2xl text-xl leading-8 text-muted">{event.summary}</p>
                <dl className="mt-8 grid max-w-2xl gap-4 text-sm sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-lg border border-line p-4">
                    <CalendarDays className="mt-0.5 size-5 shrink-0 text-brand-mark" aria-hidden />
                    <div><dt className="font-bold text-ink">Date</dt><dd className="mt-1 text-muted">{event.dateLabel}</dd></div>
                  </div>
                  {event.location ? (
                    <div className="flex items-start gap-3 rounded-lg border border-line p-4">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-brand-mark" aria-hidden />
                      <div><dt className="font-bold text-ink">Location</dt><dd className="mt-1 text-muted">{event.location}</dd></div>
                    </div>
                  ) : null}
                </dl>
                {canRegister ? (
                  <Button asChild size="lg" className="mt-8"><a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register <ArrowRight aria-hidden /></a></Button>
                ) : null}
              </div>
              <BrandedPoster
                title={event.title}
                label={event.dateLabel}
                kind="event"
                media={event.coverMedia}
                className="aspect-[4/3] shadow-soft"
              />
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.72fr_0.28fr]">
            <div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Overview</h2>
              <div className="mt-6 max-w-3xl space-y-5 text-lg leading-8 text-muted">
                {overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <aside className="rounded-lg bg-surface p-6 sm:p-8">
              <Tag className="size-6 text-brand-mark" aria-hidden />
              <h2 className="mt-5 text-xl font-bold">Experience profile</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div><dt className="font-bold text-ink">Timing</dt><dd className="mt-1 capitalize text-muted">{event.timing}</dd></div>
                <div><dt className="font-bold text-ink">Focus</dt><dd className="mt-1 leading-6 text-muted">{event.categories.join(', ') || 'UISS community'}</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        {event.highlights.length ? (
          <section className="bg-ink py-20 text-canvas sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Verified highlights</h2>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
                {event.highlights.map((highlight) => (
                  <div key={`${highlight.value}-${highlight.label}`}>
                    <p className="text-4xl font-bold tracking-tight text-brand sm:text-5xl">{highlight.value}</p>
                    <p className="mt-3 font-bold text-canvas">{highlight.label}</p>
                    {highlight.note ? <p className="mt-1 text-sm text-canvas/65">{highlight.note}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {event.timeline.length ? (
          <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">What happened</h2>
              <div className="mt-10 space-y-3">
                {event.timeline.map((step) => (
                  <article key={step.title} className="grid gap-3 rounded-lg border border-line p-6 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:p-8">
                    <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                    <p className="leading-7 text-muted">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {event.sections.length ? (
          <section className="bg-surface py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
              {event.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{section.title}</h2>
                  {section.introduction ? <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{section.introduction}</p> : null}
                  <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex min-h-24 items-end rounded-lg border border-line bg-canvas p-5 font-bold text-ink">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {event.gallery.length ? (
          <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Gallery</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {event.gallery.map((image) => (
                  <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <ManagedImage src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" quality={70} className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {event.collaborators.length ? (
          <section className="py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Made possible together.</h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-muted">The people and organisations that helped bring this experience to students.</p>
              </div>
              <CollaboratorList items={event.collaborators} />
            </div>
          </section>
        ) : null}

        {relatedEvents.length ? (
          <section className="bg-surface py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">More from UISS.</h2>
              <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4">
                {relatedEvents.map((relatedEvent) => (
                  <EventCard key={relatedEvent.slug} event={relatedEvent} variant="related" className="w-[82vw] shrink-0 snap-start sm:w-80 lg:w-[22rem]" />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
