import { LeaderInitials, LeadershipPrototypeShell, leadershipMembers } from "./shared";

const groups = ["Executive", "Projects and technology", "Communications and design"] as const;

export function LeadershipBoard() {
  return (
    <LeadershipPrototypeShell>
      <section className="proto-enter mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-[13px] font-medium uppercase leading-4 tracking-[0.16em] text-[#777777]">General Leadership · 2026/2027</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-5xl">Eleven roles. One accountable team.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#555555]">A structured view of the student leaders responsible for governance, projects, technology, communications, and design.</p>
        </div>

        <div className="mt-14 flex flex-col gap-12">
          {groups.map((group) => {
            const members = leadershipMembers.filter((member) => member.group === group);
            return (
              <section key={group} aria-labelledby={`group-${group.replaceAll(" ", "-")}`}>
                <div className="mb-5 flex items-center gap-4">
                  <h2 id={`group-${group.replaceAll(" ", "-")}`} className="text-base font-medium leading-5 text-[#333333]">{group}</h2>
                  <div className="h-px flex-1 bg-[#dedede]" />
                  <span className="text-[13px] font-medium leading-4 text-[#777777]">{members.length} {members.length === 1 ? "position" : "positions"}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {members.map((member) => (
                    <article key={member.id} className="flex min-h-64 flex-col items-center justify-center rounded-[14px] border border-[#d8d8d8] bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      <LeaderInitials member={member} />
                      <h3 className="mt-5 text-base font-medium leading-5 text-[#333333]">{member.name}</h3>
                      <p className="mt-2 text-sm leading-5 text-[#777777]">{member.role}</p>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </LeadershipPrototypeShell>
  );
}
