"use client";

import { ArrowUpRight, CalendarDays, FolderKanban } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ClubPreviewDialog, PrototypeHeader, clubs, useClubPrototype } from "./shared";

export function TechnicalIndex() {
  const reduceMotion = useReducedMotion();
  const { context, setContext, selectedClub, setSelectedClub } = useClubPrototype();
  return (
    <div className="min-h-screen bg-canvas pb-28 text-ink">
      <PrototypeHeader context={context} onChange={setContext} />
      <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-8 border-b-2 border-ink pb-9 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">UISS / Clubs / 06</p>
            <h1 className="mt-5 max-w-2xl text-balance text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-7xl">Technical communities, clearly mapped.</h1>
          </div>
          <div className="lg:justify-self-end lg:text-right">
            <p className="max-w-xl text-lg leading-8 text-muted">{context === "home" ? "Find the people, tools, and practice that will move your skills forward." : "Compare all six communities, then open the one that matches how you want to learn and contribute."}</p>
            {context === "home" ? <button onClick={() => setContext("directory")} className="mt-5 inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-4">Open directory<ArrowUpRight aria-hidden className="size-4" /></button> : null}
          </div>
        </div>
        <div className="grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club, index) => {
            const Icon = club.icon;
            return (
              <motion.article key={club.name} initial={reduceMotion ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: reduceMotion ? 0 : index * 0.025, ease: [0.16, 1, 0.3, 1] }} className="group relative flex min-h-72 flex-col border-b border-r border-line bg-canvas p-6 transition-colors duration-150 ease-out hover:bg-surface">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm font-bold tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden className="size-7" style={{ color: club.accent }} />
                </div>
                <h2 className="mt-8 text-2xl font-bold tracking-tight">{club.name}</h2>
                <p className="mt-3 flex-1 leading-7 text-muted">{club.summary}</p>
                <div className="mt-6 flex items-end justify-between gap-3">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted">{club.tags.join(" · ")}</p>
                  {club.activity ? <span title={club.activity} className="grid size-8 shrink-0 place-items-center rounded-full" style={{ color: club.accent, backgroundColor: club.tint }}>{club.activity === "Event soon" ? <CalendarDays aria-hidden className="size-4" /> : <FolderKanban aria-hidden className="size-4" />}</span> : null}
                </div>
                <button onClick={() => setSelectedClub(club)} aria-label={`Explore ${club.name}`} className="absolute inset-0"><span className="sr-only">Explore {club.name}</span></button>
                <ArrowUpRight aria-hidden className="absolute bottom-6 right-6 size-5 translate-y-1 opacity-0 transition-[transform,opacity] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100" />
              </motion.article>
            );
          })}
        </div>
      </main>
      <ClubPreviewDialog club={selectedClub} onClose={() => setSelectedClub(null)} />
    </div>
  );
}
