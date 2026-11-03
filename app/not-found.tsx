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
      <main
        id="main-content"
        tabIndex={-1}
        className="uiss-container uiss-page-content flex min-h-[65dvh] items-center"
      >
        <section className="max-w-3xl" aria-labelledby="not-found-heading">
          <p className="uiss-eyebrow">Error 404</p>
          <h1 id="not-found-heading" className="uiss-page-title mt-4">
            This page is no longer here.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            The UISS website has moved forward. Use one of the current sections below, or return to
            the homepage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<Link href="/" />} nativeButton={false} size="lg">
              Return home
            </Button>
            {destinations.map((destination) => (
              <Button
                render={<Link href={destination.href} />}
                nativeButton={false}
                key={destination.href}
                variant="outline"
                size="lg"
              >
                {destination.label}
              </Button>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
