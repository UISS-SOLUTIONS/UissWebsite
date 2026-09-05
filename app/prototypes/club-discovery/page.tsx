import { Suspense } from "react";
import { ClubDiscoveryHarness } from "./prototype-harness";

export default function ClubDiscoveryPrototypePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas" />}>
      <ClubDiscoveryHarness />
    </Suspense>
  );
}
