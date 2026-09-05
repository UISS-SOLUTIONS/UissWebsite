import { Suspense } from "react";
import { LeadershipTeamHarness } from "./prototype-harness";

export default function LeadershipTeamPrototypePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LeadershipTeamHarness />
    </Suspense>
  );
}
