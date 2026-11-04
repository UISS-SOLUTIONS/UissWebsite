import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Server-side authorization gate for every mutating route/action.
 * Middleware alone is not trusted: it only proves a token exists.
 * Returns a 403 NextResponse when the caller is not an admin, else null.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();

  if (!session?.user || !("role" in session.user) || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
