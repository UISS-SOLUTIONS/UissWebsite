import { Team1 } from "@/components/team1";
import { LeadershipPrototypeShell, leadershipMembers } from "./shared";

export function LeadershipCarousel() {
  return (
    <LeadershipPrototypeShell>
      <div className="proto-enter">
        <Team1
          className="bg-white"
          heading="Meet the UISS leadership team."
          description="The eleven student leaders serving the society during the 2026/2027 academic year."
          members={leadershipMembers.map((member) => ({
            id: member.id,
            name: member.name,
            role: member.role,
          }))}
        />
      </div>
    </LeadershipPrototypeShell>
  );
}
