"use client";

import { useEffect, useState, type ComponentType } from "react";
import {
  ArrowLeft,
  Blocks,
  BrainCircuit,
  ChartNoAxesCombined,
  CodeXml,
  Network,
  PenTool,
  X,
  type LucideProps,
} from "lucide-react";

export type Club = {
  name: string;
  summary: string;
  tags: [string, string, string];
  activity?: "Event soon" | "Active project";
  accent: string;
  tint: string;
  border: string;
  icon: ComponentType<LucideProps>;
};

export const clubs: Club[] = [
  {
    name: "Artificial Intelligence",
    summary: "Build practical AI systems and explore machine learning with responsible, human-centred thinking.",
    tags: ["Machine learning", "Computer vision", "Responsible AI"],
    activity: "Event soon",
    accent: "#7c3aed",
    tint: "#f3e8ff",
    border: "#d8b4fe",
    icon: BrainCircuit,
  },
  {
    name: "Blockchain",
    summary: "Understand decentralized systems by designing transparent, secure applications and protocols together.",
    tags: ["Smart contracts", "Web3", "Cryptography"],
    accent: "#b45309",
    tint: "#fef3c7",
    border: "#fcd34d",
    icon: Blocks,
  },
  {
    name: "Data Science",
    summary: "Turn real data into useful evidence through analysis, visualization, statistics, and collaborative projects.",
    tags: ["Analytics", "Visualization", "Statistics"],
    activity: "Active project",
    accent: "#047857",
    tint: "#d1fae5",
    border: "#6ee7b7",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Networking",
    summary: "Learn how connected systems work by configuring, securing, and troubleshooting modern networks together.",
    tags: ["Infrastructure", "Security", "Cloud"],
    accent: "#0e7490",
    tint: "#cffafe",
    border: "#67e8f9",
    icon: Network,
  },
  {
    name: "Software Development",
    summary: "Grow from ideas to reliable software through programming practice, teamwork, reviews, and real products.",
    tags: ["Web development", "Mobile", "Open source"],
    activity: "Active project",
    accent: "#1d4ed8",
    tint: "#dbeafe",
    border: "#93c5fd",
    icon: CodeXml,
  },
  {
    name: "UI/UX & Graphic Design",
    summary: "Design useful, inclusive digital experiences through research, interface craft, and visual communication.",
    tags: ["UX research", "Interfaces", "Visual design"],
    accent: "#be185d",
    tint: "#fce7f3",
    border: "#f9a8d4",
    icon: PenTool,
  },
];

export type PreviewContext = "home" | "directory";

export function PrototypeHeader({ context, onChange }: { context: PreviewContext; onChange: (context: PreviewContext) => void }) {
  return (
    <header className="border-b border-line bg-canvas/95 text-ink">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button className="font-wordmark text-xl tracking-tight" onClick={() => onChange("home")}>UISS</button>
        <nav aria-label="Prototype context" className="flex items-center gap-1 rounded-full border border-line bg-surface p-1 text-sm font-semibold">
          <button onClick={() => onChange("home")} aria-pressed={context === "home"} className={`rounded-full px-4 py-2 transition-colors duration-150 ease-out ${context === "home" ? "bg-ink text-canvas" : "text-muted hover:text-ink"}`}>Homepage</button>
          <button onClick={() => onChange("directory")} aria-pressed={context === "directory"} className={`rounded-full px-4 py-2 transition-colors duration-150 ease-out ${context === "directory" ? "bg-ink text-canvas" : "text-muted hover:text-ink"}`}>Club directory</button>
        </nav>
      </div>
    </header>
  );
}

export function ClubPreviewDialog({ club, onClose }: { club: Club | null; onClose: () => void }) {
  useEffect(() => {
    if (!club) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [club, onClose]);

  if (!club) return null;
  const Icon = club.icon;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/45 p-5 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="club-preview-title" className="w-full max-w-xl rounded-lg border border-line bg-canvas p-7 shadow-2xl sm:p-9">
        <div className="flex items-start justify-between gap-5">
          <span className="grid size-14 place-items-center rounded-lg" style={{ color: club.accent, backgroundColor: club.tint }}><Icon aria-hidden className="size-7" /></span>
          <button onClick={onClose} aria-label="Close club preview" className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-150 ease-out hover:text-ink"><X aria-hidden className="size-5" /></button>
        </div>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em]" style={{ color: club.accent }}>UISS club preview</p>
        <h2 id="club-preview-title" className="mt-3 text-4xl font-bold tracking-tight text-ink">{club.name}</h2>
        <p className="mt-5 text-lg leading-8 text-muted">{club.summary}</p>
        <div className="mt-7 flex flex-wrap gap-2">{club.tags.map((tag) => <span key={tag} className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-ink">{tag}</span>)}</div>
        <button onClick={onClose} className="mt-9 inline-flex items-center gap-2 font-bold text-ink underline decoration-2 underline-offset-4"><ArrowLeft aria-hidden className="size-4" />Return to comparison</button>
      </section>
    </div>
  );
}

export function useClubPrototype() {
  const [context, setContext] = useState<PreviewContext>("home");
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  return { context, setContext, selectedClub, setSelectedClub };
}
