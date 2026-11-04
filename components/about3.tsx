import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function About3({ className }: { className?: string }) {
  return (
    <section className={cn("uiss-section", className)} aria-labelledby="about-uiss-heading">
      <div className="uiss-container grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <p className="text-sm font-semibold text-muted">About UISS</p>
          <h2 id="about-uiss-heading" className="mt-4 uiss-section-title text-ink">
            ICT students at UDSM.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            UISS is the University of Dar es Salaam ICT Students’ Society. Our six student clubs
            bring people together through projects, workshops, and shared learning.
          </p>
          <p className="mt-4 leading-7 text-muted">
            We are a voluntary academic society, guided by students and supported by our academic
            advisor, Prof. Baraka J. Maiseli.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline"
          >
            Our story and leadership <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-surface">
          <Image
            alt="UISS students gathered together"
            className="object-cover"
            fill
            sizes="(min-width: 1152px) 512px, (min-width: 768px) 50vw, calc(100vw - 48px)"
            src="/About.avif"
          />
        </div>
      </div>
    </section>
  );
}
