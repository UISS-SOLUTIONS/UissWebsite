import Image from 'next/image'
import Link from 'next/link'

import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { LeaderPortrait } from '@/components/leader-portrait'
import { aboutCoreValuesFull, aboutHistory, aboutMission, aboutOverview } from '@/lib/about-content'
import { leadershipCatalog } from '@/lib/leadership-catalog'
import { getCanonicalLeaderName, isGuardianLeaderName } from '@/lib/leader-portraits'
import { getLeaders } from '@/lib/public-data'

export const metadata = { title: 'About | UISS' }

const highlightItems = [
  { label: 'Practical learning' },
  { label: 'Technical communities' },
]

const involvementItems = [
  { label: 'Join UISS', href: '/membership' },
  { label: 'Clubs', href: '/clubs' },
  { label: 'Events', href: '/events' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
]

const guardianProfile = {
  id: 'guardian-baraka-maiseli',
  name: 'Prof. Baraka J. Maiseli',
  role: 'Guardian · Academic Advisor',
}

function Divider() {
  return <div aria-hidden="true" className="h-16 border-y border-line bg-canvas" />
}

export default async function AboutPage() {
  const leaders = await getLeaders()
  const guardianRecord = leaders.find((leader) => isGuardianLeaderName(`${leader.firstName} ${leader.lastName}`))
  const guardian = {
    ...guardianProfile,
    avatar: guardianRecord?.imageURL || undefined,
  }
  const electedLeadership = leaders.length
    ? leaders.filter((leader) => !isGuardianLeaderName(`${leader.firstName} ${leader.lastName}`)).map((leader) => {
        const name = getCanonicalLeaderName(`${leader.firstName} ${leader.lastName}`)
        return {
          id: String(leader.id),
          name,
          role: leader.position.title,
          avatar: leader.imageURL || undefined,
        }
      })
    : leadershipCatalog.map((leader) => ({ id: leader.id, name: leader.name, role: leader.role, avatar: undefined }))
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main className="bg-canvas">
        <section className="overflow-hidden" aria-labelledby="about-heading">
          <div className="mx-auto max-w-6xl px-[34px] sm:px-6">
            <div className="mx-auto max-w-[786px] py-10 sm:py-16 lg:py-20">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">About UISS</p>
              <h1 id="about-heading" className="uiss-page-title mt-8 max-w-4xl text-ink">
                {aboutOverview.headline}
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-8 text-muted">
                {aboutOverview.description}
              </p>
            </div>

            <div className="mx-auto grid max-w-[786px] border-y border-line sm:grid-cols-3">
              {highlightItems.map((item) => (
                <div className="border-line px-0 py-4 sm:px-6 sm:py-2 sm:first:pl-0 sm:not-first:border-l" key={item.label}>
                  <p className="font-semibold text-ink">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="-mx-6 -mt-1.5 aspect-[1.79] w-[calc(100%+48px)] overflow-hidden rounded-lg bg-surface sm:mx-0 sm:mt-5 sm:w-full">
              <Image
                src="/About.avif"
                alt="UISS students gathered together"
                width={1672}
                height={941}
                sizes="(min-width: 834px) 786px, calc(100vw - 20px)"
                className="size-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <Divider />

        <section id="history" className="scroll-mt-24 py-6 sm:py-12" aria-labelledby="history-heading">
          <div className="mx-auto grid max-w-[786px] gap-8 px-[34px] sm:gap-10 sm:px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <h2 id="history-heading" className="text-base font-normal text-muted">Our History</h2>
            <div className="space-y-6 text-lg leading-8 text-muted">
              {aboutHistory.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <Divider />

        <section id="mission" className="scroll-mt-24 py-6 sm:py-12" aria-labelledby="mission-heading">
          <div className="mx-auto grid max-w-[786px] gap-8 px-[34px] sm:gap-10 sm:px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <h2 id="mission-heading" className="text-base font-normal text-muted">Our Mission</h2>
            <div className="space-y-6 text-lg leading-8 text-muted">
              {aboutMission.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <Divider />

        <section id="core-values" className="scroll-mt-24 py-6 sm:py-12" aria-labelledby="values-heading">
          <div className="mx-auto max-w-6xl px-[34px] sm:px-6">
            <div className="mx-auto max-w-[786px]">
              <h2 id="values-heading" className="text-base font-normal text-muted">Core Values</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">Below are the core values of UISS that help the Society achieve her goals:</p>
              <div className="mt-14 grid gap-px bg-line sm:grid-cols-2">
                {aboutCoreValuesFull.map((value) => (
                  <article className="min-h-[221px] bg-canvas p-6 sm:min-h-[269px] sm:p-12" key={value.value}>
                    <h3 className="text-lg font-semibold text-ink">{value.value}</h3>
                    <p className="mt-3 leading-7 text-muted">{value.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <section id="leadership" className="scroll-mt-24 py-6 sm:py-12" aria-labelledby="leadership-heading">
          <div className="mx-auto max-w-6xl px-[34px] sm:px-6">
            <div className="mx-auto max-w-[882px]">
              <div className="min-h-[180px] px-6 py-6 sm:min-h-[172px] sm:px-12 sm:py-12">
                <h2 id="leadership-heading" className="text-base font-normal text-muted">Leadership</h2>
              </div>
              <article className="grid gap-6 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-[minmax(160px,220px)_minmax(0,1fr)] sm:items-center sm:gap-10 sm:p-8">
                <LeaderPortrait
                  name={guardian.name}
                  databaseImage={guardian.avatar}
                  variant="advisor"
                  className="mx-auto sm:mx-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted">{guardian.role}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{guardian.name}</h3>
                  <p className="mt-4 max-w-xl leading-7 text-muted">
                    Guiding the society’s academic direction and supporting continuity across each elected student leadership team.
                  </p>
                </div>
              </article>

              {electedLeadership.length ? (
                <div className="mt-8 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr))]">
                  {electedLeadership.map((leader) => (
                    <article className="rounded-2xl border border-line bg-canvas p-4" key={leader.id}>
                      <LeaderPortrait name={leader.name} databaseImage={leader.avatar} variant="card" />
                      <div className="mt-4 min-w-0 px-1 pb-1">
                        <h3 className="font-semibold leading-6 text-ink">{leader.name}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted">{leader.role}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-8 rounded-lg border border-dashed border-line bg-surface p-8 text-muted">Leadership profiles will appear here when published.</p>
              )}
            </div>
          </div>
        </section>

        <Divider />

        <section id="get-involved" className="scroll-mt-24 py-6 sm:py-12" aria-labelledby="involved-heading">
          <div className="mx-auto max-w-6xl px-[34px] sm:px-6">
            <div className="mx-auto grid max-w-[786px] gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <h2 id="involved-heading" className="text-base font-normal text-muted">Get involved</h2>
              </div>
              <div className="divide-y divide-line border-y border-line">
                {involvementItems.map((item) => (
                  <Link className="group flex items-center justify-between gap-6 py-5" href={item.href} key={item.href}>
                    <span>
                      <span className="block font-semibold text-ink group-hover:underline group-focus-visible:underline">{item.label}</span>
                    </span>
                    <span aria-hidden="true" className="text-xl text-muted transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
