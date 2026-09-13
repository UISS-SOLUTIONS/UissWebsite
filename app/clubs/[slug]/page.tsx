import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { getClub } from "@/lib/public-data";
import { clubMediaBySlug } from "@/lib/club-media";
import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Container, PageShell, Section } from "@/components/ui/layout";

export default async function ClubDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = await getClub(slug);
  if (!club) notFound();
  const media = clubMediaBySlug[club.slug];
  const facts = [
    { label: "Schedule", value: club.schedule, icon: CalendarDays },
    { label: "Location", value: club.location, icon: MapPin },
    { label: "Who can join", value: club.eligibility, icon: Users },
  ].filter((fact) => fact.value);

  return (
    <PageShell>
      <HeroHeader />
      <main>
        <Section className="border-b border-line bg-surface pt-12 sm:pt-16">
          <Container>
            <Link href="/clubs" className="uiss-pressable inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft className="size-4" aria-hidden="true" /> All clubs</Link>
            <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="uiss-eyebrow">UISS technical community</p>
                <h1 className="uiss-page-title mt-4">{club.title}</h1>
                <p className="uiss-lead mt-6 max-w-2xl">{club.description || club.summary}</p>
                <Button asChild size="lg" className="mt-8"><Link href={`/membership?club=${encodeURIComponent(club.slug)}`}>Join this club <ArrowRight aria-hidden="true" /></Link></Button>
              </div>
              {media && <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line lg:col-span-5"><Image src={media.image} alt={media.imageAlt} fill priority className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" /></div>}
            </div>
          </Container>
        </Section>
        <Section>
          <Container>
            {facts.length > 0 && <dl className="grid gap-4 sm:grid-cols-3">{facts.map(({ label, value, icon: Icon }) => <div key={label} className="uiss-surface p-5"><Icon className="size-5 text-brand-mark" aria-hidden="true" /><dt className="mt-4 text-sm font-bold">{label}</dt><dd className="mt-1 text-muted">{value}</dd></div>)}</dl>}
            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4"><p className="uiss-eyebrow">Direction</p><h2 className="uiss-section-title mt-3">Learn with purpose.</h2></div>
              <div className="space-y-10 lg:col-span-7 lg:col-start-6">
                {club.mission && <section><h3 className="font-display text-2xl font-semibold">Mission</h3><p className="mt-3 text-lg leading-8 text-muted">{club.mission}</p></section>}
                {club.vision && <section><h3 className="font-display text-2xl font-semibold">Vision</h3><p className="mt-3 text-lg leading-8 text-muted">{club.vision}</p></section>}
                {club.disciplines.length > 0 && <section><h3 className="font-display text-2xl font-semibold">What members explore</h3><ul className="mt-4 flex flex-wrap gap-2">{club.disciplines.map((item) => <li key={item} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold">{item}</li>)}</ul></section>}
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </PageShell>
  );
}
