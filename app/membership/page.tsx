import type { Metadata } from "next";
import CustomForm from "@/app/components/CustomForm";
import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";

export const metadata: Metadata = {
  title: "Join UISS | Membership application",
  description:
    "Apply to join the University of Dar es Salaam ICT Students' Society.",
};

const benefits = [
  "Meet students and practitioners across ICT.",
  "Learn through workshops, study groups, and club sessions.",
  "Build projects that solve real problems.",
  "Share your work and receive useful feedback.",
  "Find collaborators and a supportive peer network.",
  "Access member events and society opportunities.",
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main>
        <section className="border-b border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
            <div className="lg:col-span-5 lg:pt-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
                UISS membership
              </p>
              <h1 className="mt-4 text-balance text-5xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
                Find your place in the UISS community.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted">
                Tell us who you are and which technical community interests you.
                Applications stay open throughout the year, and the UISS team reviews
                them weekly.
              </p>
              <div className="mt-10 border-l-4 border-brand pl-5">
                <p className="font-semibold">What happens next</p>
                <p className="mt-2 max-w-md leading-7 text-muted">
                  We save your application and send it to the UISS team. They will use
                  your university email to follow up.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-lg border border-line bg-canvas p-6 shadow-soft sm:p-9">
                <CustomForm />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="membership-benefits"
          className="bg-canvas py-20 sm:py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
                Why join
              </p>
              <h2
                id="membership-benefits"
                className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl"
              >
                Learn with people who are building too.
              </h2>
            </div>

            <ol className="mt-12 grid border-t border-line md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <li
                  key={benefit}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7 md:odd:pr-10 md:even:border-l md:even:pl-10"
                >
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
