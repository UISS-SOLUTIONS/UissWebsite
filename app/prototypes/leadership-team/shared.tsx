import type { ReactNode } from "react";

export type LeadershipMember = {
  id: string;
  name: string;
  role: string;
  group: "Executive" | "Projects and technology" | "Communications and design";
};

export const leadershipMembers: LeadershipMember[] = [
  { id: "collince-sanare", name: "Collince Sanare", role: "Chairperson", group: "Executive" },
  { id: "baraka-alex", name: "Baraka Alex", role: "Assistant Chairperson", group: "Executive" },
  { id: "alexander-marwa", name: "Alexander Marwa", role: "General Secretary", group: "Executive" },
  { id: "hefsibamakelle-mteri", name: "Hefsibamakelle Mteri", role: "Assistant General Secretary", group: "Executive" },
  { id: "noreen-mrema", name: "Noreen Mrema", role: "Treasurer", group: "Executive" },
  { id: "sifa-ramendu", name: "Sifa Ramendu", role: "Projects Manager", group: "Projects and technology" },
  { id: "lutome-gallia", name: "Lutome Gallia", role: "Assistant Projects Manager", group: "Projects and technology" },
  { id: "gadi-josephat", name: "Gadi Josephat", role: "IT Manager", group: "Projects and technology" },
  { id: "abdon-musa", name: "Abdon Musa", role: "Graphics & Visual Design Manager", group: "Communications and design" },
  { id: "dorcas-laiser", name: "Dorcas Laiser", role: "Digital Communications Manager", group: "Communications and design" },
  { id: "winifrida-masalu", name: "Winifrida Masalu", role: "Assistant Digital Communications Manager", group: "Communications and design" },
];

export const initialsFor = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export function LeadershipPrototypeShell({ children }: { children: ReactNode }) {
  return (
    <main className="leadership-prototype min-h-screen bg-white text-[#111111]">
      <header className="border-b border-[#dedede] bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-[#111111] text-xs font-semibold text-white">UI</span>
            <div>
              <p className="text-sm font-semibold leading-4">UISS</p>
              <p className="text-xs leading-4 text-[#777777]">Leadership preview</p>
            </div>
          </div>
          <span className="rounded-md border border-[#d5d5d5] px-3 py-1.5 text-xs font-medium text-[#333333]">2026/2027</span>
        </div>
      </header>
      {children}
    </main>
  );
}

export function LeaderInitials({ member, size = "large" }: { member: LeadershipMember; size?: "small" | "large" }) {
  return (
    <div
      className={
        size === "large"
          ? "grid size-24 shrink-0 place-items-center rounded-full border border-[#d8d8d8] bg-[#f1f1f1] text-xl font-semibold text-[#333333]"
          : "grid size-11 shrink-0 place-items-center rounded-full border border-[#d8d8d8] bg-[#f1f1f1] text-xs font-semibold text-[#333333]"
      }
      aria-hidden="true"
    >
      {initialsFor(member.name)}
    </div>
  );
}
