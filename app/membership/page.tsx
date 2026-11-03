import type { Metadata } from "next";
import CustomForm from "@/app/components/CustomForm";
import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { getClub } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Join UISS | Membership application",
  description: "Apply to join the University of Dar es Salaam ICT Students' Society.",
};

const benefits = [
  "Meet students and practitioners across ICT.",
  "Learn through workshops, study groups, and club sessions.",
  "Build projects that solve real problems.",
  "Share your work and receive useful feedback.",
  "Find collaborators and a supportive peer network.",
  "Access member events and society opportunities.",
];

export default async function MembershipPage({
  searchParams,
}: {
  searchParams: Promise<{ club?: string }>;
}) {
  const slug = (await searchParams).club;
  const club = slug ? await getClub(slug) : null;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="uiss-page-intro bg-canvas">
          <div className="uiss-container grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="uiss-eyebrow">UISS membership</p>
              <h1 className="uiss-page-title mt-4">Find your place in the UISS community.</h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted">
                Tell us who you are and which technical community interests you. Applications stay
                open throughout the year, and the UISS team reviews them weekly.
              </p>
              <div className="mt-10">
                <p className="font-semibold">What happens next</p>
                <p className="mt-2 max-w-md leading-7 text-muted">
                  We save your application and send it to the UISS team. They will use your
                  university email to follow up.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-lg bg-panel p-6 shadow-soft sm:p-8">
                <CustomForm initialClub={club?.title} />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="membership-benefits" className="uiss-section bg-canvas">
          <div className="uiss-container">
            <div className="max-w-2xl">
              <p className="uiss-eyebrow">Why join</p>
              <h2 id="membership-benefits" className="uiss-section-title mt-4">
                Learn with people who are building too.
              </h2>
            </div>

            <ol className="mt-8 grid sm:mt-10 gap-x-12 gap-y-8 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <li key={benefit} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-mono text-sm font-semibold tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold leading-7">{benefit}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
