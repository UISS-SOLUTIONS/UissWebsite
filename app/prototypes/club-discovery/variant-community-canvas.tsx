"use client";

import { ArrowRight, CalendarDays, FolderKanban, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ClubPreviewDialog, PrototypeHeader, clubs, useClubPrototype } from "./shared";

export function CommunityCanvas() {
  const reduceMotion = useReducedMotion();
  const { context, setContext, selectedClub, setSelectedClub } = useClubPrototype();
  return (
    <div className="min-h-screen bg-[#111111] pb-28 text-white">
      <PrototypeHeader context={context} onChange={setContext} />
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/75"><Sparkles aria-hidden className="size-4 text-brand" />Six clubs. One student community.</span>
          <h1 className="mt-7 text-balance text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-7xl">Find the people building what interests you.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">{context === "home" ? "Explore every UISS club and discover where your curiosity can become practical work." : "All six communities are open to current UDSM students ready to learn, contribute, and grow together."}</p>
          {context === "home" ? <button onClick={() => setContext("directory")} className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-[#111111] transition-transform duration-150 ease-out hover:scale-[1.03]">View all clubs<ArrowRight aria-hidden className="size-4" /></button> : null}
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club, index) => {
            const Icon = club.icon;
            return (
              <motion.article key={club.name} initial={reduceMotion ? false : { opacity: 0, scale: 0.975 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.24, delay: reduceMotion ? 0 : index * 0.03, ease: [0.16, 1, 0.3, 1] }} whileHover={reduceMotion ? undefined : { scale: 1.015 }} className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-7">
                <div aria-hidden className="absolute -right-16 -top-20 size-52 rounded-full blur-3xl" style={{ backgroundColor: `${club.accent}35` }} />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid size-16 place-items-center rounded-2xl" style={{ color: club.accent, backgroundColor: club.tint }}><Icon aria-hidden className="size-8" /></span>
                  {club.activity ? <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/80">{club.activity === "Event soon" ? <CalendarDays aria-hidden className="size-3.5" /> : <FolderKanban aria-hidden className="size-3.5" />}{club.activity}</span> : null}
                </div>
                <h2 className="relative mt-8 text-3xl font-bold tracking-tight">{club.name}</h2>
                <p className="relative mt-4 flex-1 leading-7 text-white/65">{club.summary}</p>
                <div className="relative mt-6 flex flex-wrap gap-2">{club.tags.map((tag) => <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/65">{tag}</span>)}</div>
                <button onClick={() => setSelectedClub(club)} className="relative mt-7 inline-flex items-center gap-2 self-start font-bold text-white">Explore club<ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-1" /></button>
              </motion.article>
            );
          })}
        </div>
      </main>
      <ClubPreviewDialog club={selectedClub} onClose={() => setSelectedClub(null)} />
    </div>
  );
}
