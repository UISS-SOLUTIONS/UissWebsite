"use client";

import { LogOut as LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogOut() {
  const [pending, setPending] = useState(false);
  return (
    <button type="button" className="uiss-pressable flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-canvas/20 px-4 py-2.5 text-sm font-semibold hover:bg-canvas/10 disabled:opacity-60" disabled={pending} aria-busy={pending} onClick={async () => { setPending(true); await signOut({ redirect: true, redirectTo: "/login" }); }}>
      <LogOutIcon className="size-4" aria-hidden="true" />{pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
