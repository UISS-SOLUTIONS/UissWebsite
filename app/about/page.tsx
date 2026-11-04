import Image from "next/image";

import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { TeamSection } from "@/components/team-section";
import {
  aboutCoreValuesFull,
  aboutHistory,
  aboutMission,
  aboutOverview,
} from "@/lib/about-content";
import { leadershipCatalog } from "@/lib/leadership-catalog";
import { getCanonicalLeaderName, isGuardianLeaderName } from "@/lib/leader-portraits";
import { getLeaders } from "@/lib/public-data";

export const metadata = { title: "About | UISS" };

const highlightItems = [{ label: "Practical learning" }, { label: "Technical communities" }];

const guardianProfile = {
  id: "guardian-baraka-maiseli",
  name: "Prof. Baraka J. Maiseli",
  role: "Guardian · Academic Advisor",
};

export default async function AboutPage() {
  const leaders = await getLeaders();

  const guardianRecord = leaders.find((leader) =>
    isGuardianLeaderName(`${leader.firstName} ${leader.lastName}`),
  );

  const guardian = {
    ...guardianProfile,
    avatar: guardianRecord?.imageURL || undefined,
  };

  const electedLeadership = leaders.length
    ? leaders
        .filter((leader) => !isGuardianLeaderName(`${leader.firstName} ${leader.lastName}`))
        .map((leader) => {
          const name = getCanonicalLeaderName(`${leader.firstName} ${leader.lastName}`);

          return {
            id: String(leader.id),
            name,
            role: leader.position.title,
            avatar: leader.imageURL || undefined,
          };
        })
    : leadershipCatalog.map((leader) => ({
        id: leader.id,
        name: leader.name,
        role: leader.role,
        avatar: undefined,
      }));

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main id="main-content" tabIndex={-1} className="bg-canvas">
        <section className="overflow-hidden" aria-labelledby="about-heading">
          <div className="uiss-container">
            <div className="uiss-page-intro max-w-3xl">
              <p className="uiss-eyebrow">About UISS</p>
              <h1 id="about-heading" className="uiss-page-title mt-4 max-w-4xl text-ink">
                {aboutOverview.headline}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                {aboutOverview.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {highlightItems.map((item) => (
                <div key={item.label}>
                  <p className="font-semibold text-ink">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 aspect-[1.79] overflow-hidden rounded-lg bg-surface sm:mt-10">
              <Image
                src="/About.avif"
                alt="UISS students gathered together"
                width={1672}
                height={941}
                sizes="(min-width: 1248px) 1200px, calc(100vw - 48px)"
                className="size-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section
          id="history"
          className="uiss-section scroll-mt-6"
          aria-labelledby="history-heading"
        >
          <div className="uiss-container grid gap-6 md:grid-cols-[1fr_2fr] md:items-baseline md:gap-12">
            <h2 id="history-heading" className="text-base font-normal text-muted">
              Our History
            </h2>
            <div className="max-w-3xl space-y-6 text-lg leading-8 text-muted">
              {aboutHistory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section
          id="mission"
          className="uiss-section scroll-mt-6"
          aria-labelledby="mission-heading"
        >
          <div className="uiss-container grid gap-6 md:grid-cols-[1fr_2fr] md:items-baseline md:gap-12">
            <h2 id="mission-heading" className="text-base font-normal text-muted">
              Our Mission
            </h2>
            <div className="max-w-3xl space-y-6 text-lg leading-8 text-muted">
              {aboutMission.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section
          id="core-values"
          className="uiss-section scroll-mt-6"
          aria-labelledby="values-heading"
        >
          <div className="uiss-container">
            <div>
              <h2 id="values-heading" className="text-base font-normal text-muted">
                Core Values
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                Below are the core values of UISS that help the Society achieve her goals:
              </p>
              <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                {aboutCoreValuesFull.map((value) => (
                  <article key={value.value}>
                    <h3 className="text-lg font-semibold text-ink">{value.value}</h3>
                    <p className="mt-3 leading-7 text-muted">{value.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TeamSection
          id="leadership"
          description={
            <>
              <p>Student leadership and academic guidance for the UISS community.</p>
              <p>
                Our academic advisor, {guardian.name}, guides the society’s academic direction and
                supports continuity across each elected student leadership team.
              </p>
            </>
          }
          members={[guardian, ...electedLeadership]}
        />
      </main>
      <Footer />
    </div>
  );
}
