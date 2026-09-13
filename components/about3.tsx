'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Lightbulb, Network, Users, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { aboutCoreValues, aboutHistory, aboutMission, aboutOverview } from '@/lib/about-content'
import { cn } from '@/lib/utils'

const chapters = [
  { id: 'about-story', label: 'Our story' },
  { id: 'about-mission', label: 'Our mission' },
  { id: 'about-community', label: 'Our community' },
  { id: 'about-values', label: 'Our values' },
] as const

type ChapterId = (typeof chapters)[number]['id']

const storyPoints = [
  { icon: BookOpen, label: 'A voluntary academic society' },
  { icon: Users, label: 'Founded by and for ICT students' },
  { icon: Lightbulb, label: 'Technology for human development' },
]

const missionPoints = [
  { icon: Lightbulb, label: 'Practical learning' },
  { icon: Network, label: 'Technical collaboration' },
  { icon: Users, label: 'Leadership and professional growth' },
]

function PointList({ items }: { items: { icon: LucideIcon; label: string }[] }) {
  return (
    <ul className="mt-8 divide-y divide-line border-y border-line text-muted">
      {items.map(({ icon: Icon, label }) => (
        <li className="flex items-center gap-3 py-3" key={label}>
          <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-mark" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  )
}

function ChapterCopy({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between pb-1 md:col-span-2">
      <div>
        <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-muted">{label}</h3>
        {children}
      </div>
    </div>
  )
}

export function About3({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<ChapterId>('about-story')
  const sectionRefs = useRef<Partial<Record<ChapterId, HTMLElement | null>>>({})

  useEffect(() => {
    const sections = chapters.map(({ id }) => sectionRefs.current[id]).filter((section): section is HTMLElement => section != null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const nextId = visible[0]?.target.id as ChapterId | undefined
        if (nextId) setActiveId(nextId)
      },
      { rootMargin: '-24% 0px -54% 0px', threshold: [0.15, 0.35, 0.55] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollToChapter = (id: ChapterId) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    sectionRefs.current[id]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    setActiveId(id)
  }

  const register = (id: ChapterId) => (element: HTMLElement | null) => {
    sectionRefs.current[id] = element
  }

  return (
    <section className={cn('border-y border-line bg-canvas py-20 sm:py-24', className)} aria-labelledby="about-uiss-heading">
      <div className="mx-auto max-w-6xl px-[34px] sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">{aboutOverview.eyebrow}</p>
        <h2 id="about-uiss-heading" className="mt-7 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {aboutOverview.headline}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">{aboutOverview.description}</p>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          <nav aria-label="About UISS chapters" className="sticky top-24 hidden h-fit lg:block">
            <p className="text-sm text-muted">Explore UISS</p>
            <div className="mt-3 flex flex-col items-start">
              {chapters.map((chapter) => (
                <button
                  aria-current={activeId === chapter.id ? 'true' : undefined}
                  className={cn(
                    'relative w-full border-l border-line px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:text-ink',
                    activeId === chapter.id ? 'text-ink before:absolute before:-left-px before:inset-y-0 before:w-0.5 before:bg-brand' : 'text-muted',
                  )}
                  key={chapter.id}
                  onClick={() => scrollToChapter(chapter.id)}
                  type="button"
                >
                  {chapter.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-20 md:gap-24">
            <article ref={register('about-story')} id="about-story" className="grid scroll-mt-32 gap-8 md:grid-cols-5 md:gap-12">
              <ChapterCopy label="Our story">
                <p className="text-lg font-semibold leading-8 text-ink">A place for ICT students to exchange ideas, build together, and apply technology to challenges that matter.</p>
                <PointList items={storyPoints} />
              </ChapterCopy>
              <div className="relative min-h-[280px] overflow-hidden rounded-lg bg-surface md:col-span-3 md:aspect-[4/3]">
                <Image alt="UISS students gathered together" className="object-cover" fill sizes="(min-width: 768px) 60vw, 100vw" src="/About.avif" />
                <div className="absolute inset-x-4 bottom-4 rounded-md bg-canvas/95 p-4 shadow-soft backdrop-blur-sm sm:inset-x-auto sm:left-4 sm:max-w-xs">
                  <p className="text-sm leading-6 text-muted">{aboutHistory[1]}</p>
                </div>
              </div>
            </article>

            <article ref={register('about-mission')} id="about-mission" className="grid scroll-mt-32 gap-8 md:grid-cols-5 md:gap-12">
              <ChapterCopy label="Our mission">
                <p className="text-lg font-semibold leading-8 text-ink">{aboutMission[1]}</p>
                <PointList items={missionPoints} />
              </ChapterCopy>
              <div className="relative flex min-h-[280px] overflow-hidden rounded-lg border border-line bg-surface p-8 md:col-span-3 md:aspect-[4/3]">
                <div aria-hidden="true" className="absolute -right-16 -top-16 size-56 rounded-full border-[40px] border-brand/80" />
                <div aria-hidden="true" className="absolute -bottom-16 left-10 size-48 rotate-12 rounded-lg border-[32px] border-ink/10" />
                <div className="relative mt-auto max-w-md">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-mark">Our purpose</p>
                  <p className="mt-4 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">Turning student creativity and innovation into meaningful human development.</p>
                </div>
              </div>
            </article>

            <article ref={register('about-community')} id="about-community" className="grid scroll-mt-32 gap-8 md:grid-cols-5 md:gap-12">
              <ChapterCopy label="Our community">
                <p className="text-lg font-semibold leading-8 text-ink">Students learn by doing—through clubs, shared projects, events, and leadership opportunities.</p>
                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line text-sm font-semibold text-ink">
                  {['Clubs', 'Projects', 'Events', 'Leadership'].map((item) => <div className="bg-canvas p-4" key={item}>{item}</div>)}
                </div>
              </ChapterCopy>
              <div className="relative min-h-[280px] overflow-hidden rounded-lg bg-surface md:col-span-3 md:aspect-[4/3]">
                <Image alt="Students participating in a UISS activity" className="object-cover" fill sizes="(min-width: 768px) 60vw, 100vw" src="/ctfWinner.avif" />
              </div>
            </article>

            <article ref={register('about-values')} id="about-values" className="grid scroll-mt-32 gap-8 md:grid-cols-5 md:gap-12">
              <ChapterCopy label="Our values">
                <p className="text-lg font-semibold leading-8 text-ink">Six principles shape how we learn, collaborate, and contribute.</p>
                <div className="mt-8 flex flex-col gap-3">
                  <Button asChild><Link href="/about">Discover our story <ArrowRight aria-hidden="true" /></Link></Button>
                  <Button asChild variant="link" className="w-fit px-0 text-muted"><Link href="/membership">Join UISS</Link></Button>
                </div>
              </ChapterCopy>
              <div className="grid overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 md:col-span-3">
                {aboutCoreValues.map((item, index) => (
                  <div className={cn('bg-canvas p-5 sm:p-6', index < aboutCoreValues.length - 2 && 'border-b border-line', index % 2 === 0 && 'sm:border-r sm:border-line')} key={item.value}>
                    <p className="font-bold text-ink">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
