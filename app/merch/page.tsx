import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Shirt } from "lucide-react";

import Footer from "@/components/footer-2";
import { HeroHeader } from "@/components/header";
import { MerchProductCard } from "@/components/merch/product-card";
import { Button } from "@/components/ui/button";
import { Container, PageShell, Section } from "@/components/ui/layout";
import { merchCatalog } from "@/lib/merch-catalog";
import styles from "./merch.module.css";

export const metadata: Metadata = {
  title: "Merch | UISS",
  description: "Wear your UISS pride. Explore white and black UISS polos at Tsh 20,000 each and arrange your order through WhatsApp.",
};

export default function MerchPage() {
  return (
    <PageShell className={styles.page}>
      <HeroHeader />
      <main>
        <Section className="border-b border-line pb-8 pt-10 sm:pb-10 sm:pt-14">
          <Container>
            <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
              <div>
                <p className="uiss-eyebrow flex items-center gap-2.5"><Shirt className="size-4 text-ink" aria-hidden="true" /> UISS merchandise</p>
                <h1 className="uiss-page-title mt-4 max-w-2xl">Wear your<br />{" "}<span className="decoration-brand underline decoration-[5px] underline-offset-[8px]">UISS pride.</span></h1>
                <p className="uiss-lead mt-5 max-w-lg">UISS polos in white and black. Choose your color and size.</p>
                <Button asChild variant="outline" className="mt-5 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2">
                  <Link href="#collection">Find your color <ArrowDown aria-hidden="true" /></Link>
                </Button>
              </div>
              <div className="hidden border-l-2 border-brand pl-6 lg:mb-1 lg:block">
                <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Two colors.<br />One community.</p>
                <p className="mt-3 max-w-xs leading-relaxed text-muted">The UISS polo, in white and black. Pick the one that feels like you.</p>
              </div>
            </div>
          </Container>
        </Section>
        <Section id="collection" aria-labelledby="collection-heading" className="scroll-mt-24 pb-8 pt-8 sm:pb-12 sm:pt-10">
          <Container>
            <div className="mb-5">
              <h2 id="collection-heading" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">The UISS collection</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {merchCatalog.map((product) => <MerchProductCard key={product.id} product={product} />)}
            </div>
          </Container>
        </Section>

      </main>
      <Footer />
    </PageShell>
  );
}
