import { auth } from "@/auth";
import { NextResponse } from "next/server";

type SessionRole = { role?: string };

/**
 * Server-side authorization gate for every mutating route/action.
 * Middleware alone is not trusted: it only proves a token exists.
 * Returns a 403 NextResponse when the caller is not an admin, else null.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();
  const role = (session?.user as SessionRole | undefined)?.role;

  if (!session || role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
