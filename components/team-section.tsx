import type { ReactNode } from "react";
import Link from "next/link";
import { LeaderPortrait } from "@/components/leader-portrait";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar?: string | null;
};

type TeamSectionProps = {
  id?: string;
  heading?: string;
  description?: ReactNode;
  members: TeamMember[];
  action?: { label: string; href: string };
  className?: string;
  emptyMessage?: string;
};

export function TeamSection({
  id = "team",
  heading = "Meet the UISS leadership team.",
  description = "Meet the student leaders serving the UISS community.",
  members,
  action,
  className,
  emptyMessage = "Approved leadership profiles will appear here once they have been added by the UISS team.",
}: TeamSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("uiss-section scroll-mt-6", className)}
    >
      <div className="uiss-container">
        <p className="uiss-eyebrow">Leadership</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 id={`${id}-heading`} className="uiss-section-title max-w-sm">
            {heading}
          </h2>
          <div className="min-w-0">
            <div className="max-w-xl space-y-4 text-base leading-7 text-muted">{description}</div>
            {action ? (
              <Button
                render={<Link href={action.href} />}
                nativeButton={false}
                variant="outline"
                className="mt-6"
              >
                {action.label}
              </Button>
            ) : null}
          </div>
        </div>

        {members.length ? (
          <ul
            aria-label="UISS leaders"
            className="mt-8 grid gap-x-6 gap-y-10 sm:mt-10 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-4 lg:gap-x-12"
          >
            {members.map((member) => (
              <li key={member.id} className="group min-w-0">
                <LeaderPortrait name={member.name} databaseImage={member.avatar} variant="square" />
                <div className="pt-3">
                  <h3 className="font-medium leading-6 text-ink">{member.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 max-w-xl text-base leading-7 text-muted sm:mt-10">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
}
