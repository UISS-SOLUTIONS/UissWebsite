import { LeaderInitials, LeadershipPrototypeShell, leadershipMembers } from "./shared";

export function LeadershipDirectory() {
  return (
    <LeadershipPrototypeShell>
      <section className="proto-enter mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="border-b border-[#d8d8d8] pb-8 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="text-[13px] font-medium uppercase leading-4 tracking-[0.16em] text-[#777777]">UISS General Leadership</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-5xl">The 2026/2027 team</h1>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#555555] sm:mt-0 sm:text-right">Current society-wide appointments. Club leadership is presented separately within each club.</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[14px] border border-[#d8d8d8] bg-white">
          <div className="hidden grid-cols-[52px_1fr_1fr_120px] items-center gap-4 border-b border-[#dedede] bg-[#f5f5f5] px-5 py-3 text-[13px] font-medium leading-4 text-[#777777] sm:grid">
            <span aria-hidden="true" />
            <span>Name</span>
            <span>Position</span>
            <span>Term</span>
          </div>
          <div className="divide-y divide-[#e3e3e3]">
            {leadershipMembers.map((member) => (
              <article key={member.id} className="grid gap-3 px-4 py-4 sm:grid-cols-[52px_1fr_1fr_120px] sm:items-center sm:gap-4 sm:px-5">
                <LeaderInitials member={member} size="small" />
                <div>
                  <p className="text-sm font-medium leading-5 text-[#333333]">{member.name}</p>
                  <p className="mt-0.5 text-xs leading-4 text-[#777777] sm:hidden">{member.role}</p>
                </div>
                <p className="hidden text-sm leading-5 text-[#555555] sm:block">{member.role}</p>
                <span className="w-fit rounded-md border border-[#d8d8d8] bg-[#f7f7f7] px-2 py-1 text-xs font-medium leading-4 text-[#555555]">2026/2027</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LeadershipPrototypeShell>
  );
}
