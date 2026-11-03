import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Cta4Props {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  className?: string;
}

const Cta4 = ({
  heading = "Join UISS.",
  description = "Current UDSM student? Tell us about yourself and the technical club you’d like to join.",
  buttonText = "Join UISS",
  buttonUrl = "/membership",
  className,
}: Cta4Props) => (
  <section className={cn("uiss-section bg-panel", className)}>
    <div className="uiss-container">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h2 className="uiss-section-title text-ink">{heading}</h2>
          <p className="mt-4 leading-7 text-muted">{description}</p>
        </div>
        <Button
          render={<Link href={buttonUrl} />}
          nativeButton={false}
          variant="secondary"
          size="lg"
        >
          {buttonText}
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </div>
  </section>
);

export { Cta4 };
