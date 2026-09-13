import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Density = "public" | "editorial" | "admin";
type Width = "reading" | "default" | "wide";

export function PageShell({ density = "public", className, ...props }: HTMLAttributes<HTMLDivElement> & { density?: Density }) {
  return <div className={cn("min-h-screen bg-canvas text-ink", density === "admin" && "uiss-density-admin", className)} {...props} />;
}

export function Container({ width = "default", className, ...props }: HTMLAttributes<HTMLDivElement> & { width?: Width }) {
  return <div className={cn(width === "reading" ? "uiss-reading-rail" : width === "wide" ? "uiss-container-wide" : "uiss-container", className)} {...props} />;
}

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("uiss-section", className)} {...props} />;
}

export function SectionHeading({ eyebrow, title, description, className }: { eyebrow?: string; title: ReactNode; description?: ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <p className="uiss-eyebrow">{eyebrow}</p>}
      <h2 className="uiss-section-title mt-3">{title}</h2>
      {description && <div className="uiss-lead mt-5 max-w-2xl">{description}</div>}
    </div>
  );
}

export type AsyncStatus = "idle" | "loading" | "empty" | "error" | "success";

export function StatePanel({ status, title, children }: { status: AsyncStatus; title: string; children?: ReactNode }) {
  return <div className="uiss-surface p-6" role={status === "error" ? "alert" : "status"}><p className="font-semibold">{title}</p>{children && <div className="mt-2 text-sm text-muted">{children}</div>}</div>;
}
