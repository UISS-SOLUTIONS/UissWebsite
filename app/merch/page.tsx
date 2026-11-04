import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Shirt } from "lucide-react";

import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { MerchProductCard } from "@/components/merch/product-card";
import { Button } from "@/components/ui/button";
import { Container, PageShell, Section } from "@/components/ui/layout";
import { merchCatalog } from "@/lib/merch-catalog";

export const metadata: Metadata = {
  title: "Merch | UISS",
  description:
    "Wear your UISS pride. Explore white and black UISS polos at Tsh 20,000 each and arrange your order through WhatsApp.",
};

export default function MerchPage() {
  return (
    <PageShell>
      <HeroHeader />
      <main id="main-content" tabIndex={-1}>
        <Section spacing="intro">
          <Container>
            <div>
              <div>
                <p className="uiss-eyebrow flex items-center gap-2.5">
                  <Shirt className="size-4 text-ink" aria-hidden="true" /> UISS merchandise
                </p>
                <h1 className="uiss-page-title mt-4 max-w-2xl">
                  Wear your
                  <br /> <span>UISS pride.</span>
                </h1>
                <p className="uiss-lead mt-4 max-w-lg">
                  UISS polos in white and black. Choose your color and size.
                </p>
                <Button
                  render={<Link href="#collection" />}
                  nativeButton={false}
                  variant="outline"
                  className="mt-8 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                >
                  Find your color <ArrowDown aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Container>
        </Section>
        <Section id="collection" aria-labelledby="collection-heading" className="scroll-mt-6">
          <Container>
            <div className="mb-8 sm:mb-10">
              <h2 id="collection-heading" className="uiss-section-title">
                The UISS collection
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {merchCatalog.map((product) => (
                <MerchProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </PageShell>
  );
}
