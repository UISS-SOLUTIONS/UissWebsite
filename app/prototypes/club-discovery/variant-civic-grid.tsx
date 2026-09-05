"use client";

import { ArrowRight, CalendarDays, FolderKanban } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ClubPreviewDialog, PrototypeHeader, clubs, useClubPrototype } from "./shared";

export function CivicGrid() {
  const reduceMotion = useReducedMotion();
  const { context, setContext, selectedClub, setSelectedClub } = useClubPrototype();
  return (
    <div className="min-h-screen bg-surface pb-28 text-ink">
      <PrototypeHeader context={context} onChange={setContext} />
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">{context === "home" ? "Find your community" : "Six technical communities"}</p>
            <h1 className="mt-4 text-balance text-5xl font-bold tracking-[-0.04em] sm:text-6xl">{context === "home" ? "Explore UISS clubs." : "Choose where you want to grow."}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">Meet students who share your interests and build practical skills together.</p>
          </div>
          {context === "home" ? <button onClick={() => setContext("directory")} className="inline-flex w-fit items-center gap-2 rounded-md border border-line bg-canvas px-5 py-3 font-bold shadow-sm transition-transform duration-150 ease-out hover:-translate-y-0.5">View all clubs<ArrowRight aria-hidden className="size-4" /></button> : null}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club, index) => {
            const Icon = club.icon;
            return (
              <motion.article key={club.name} initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: reduceMotion ? 0 : index * 0.03, ease: [0.16, 1, 0.3, 1] }} whileHover={reduceMotion ? undefined : { y: -4 }} className="flex min-h-80 flex-col rounded-lg border border-line bg-canvas p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-lg" style={{ color: club.accent, backgroundColor: club.tint }}><Icon aria-hidden className="size-6" /></span>
                  {club.activity ? <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold" style={{ color: club.accent, borderColor: club.border, backgroundColor: club.tint }}>{club.activity === "Event soon" ? <CalendarDays aria-hidden className="size-3.5" /> : <FolderKanban aria-hidden className="size-3.5" />}{club.activity}</span> : null}
                </div>
                <h2 className="mt-7 text-2xl font-bold tracking-tight">{club.name}</h2>
                <p className="mt-3 flex-1 leading-7 text-muted">{club.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">{club.tags.map((tag) => <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-muted">{tag}</span>)}</div>
                <button onClick={() => setSelectedClub(club)} className="mt-7 inline-flex items-center gap-2 self-start font-bold text-ink underline-offset-4 hover:underline">Explore club<ArrowRight aria-hidden className="size-4" /></button>
              </motion.article>
            );
          })}
        </div>
      </main>
      <ClubPreviewDialog club={selectedClub} onClose={() => setSelectedClub(null)} />
    </div>
  );
}
