import Link from "next/link";

import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { Button } from "@/components/ui/button";

const destinations = [
  { label: "Explore clubs", href: "/clubs" },
  { label: "Read the blog", href: "/blog" },
  { label: "View events", href: "/events" },
  { label: "See projects", href: "/projects" },
  { label: "About UISS", href: "/about" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HeroHeader />
      <main className="mx-auto flex min-h-[65vh] max-w-6xl items-center px-6 py-20">
        <section className="max-w-3xl" aria-labelledby="not-found-heading">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
            Error 404
          </p>
          <h1
            id="not-found-heading"
            className="mt-4 text-balance text-5xl font-bold leading-none tracking-tight sm:text-6xl"
          >
            This page is no longer here.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            The UISS website has moved forward. Use one of the current sections
            below, or return to the homepage.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/">Return home</Link>
            </Button>
            {destinations.map((destination) => (
              <Button asChild key={destination.href} variant="outline" size="lg">
                <Link href={destination.href}>{destination.label}</Link>
              </Button>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
