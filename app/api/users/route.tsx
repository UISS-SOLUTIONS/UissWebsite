import { requireAdmin } from "@/lib/requireAdmin";
import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const allUsers = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
        registeredAt: users.registeredAt,
      })
      .from(users)
      .orderBy(users.registeredAt);

    if (allUsers.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    return NextResponse.json(allUsers, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Unable to load users" },
      { status: 500 }
    );
  }
}

// POST /api/users removed (red-team #53): unauthenticated self-registration
// accepted an arbitrary `role`, enabling self-service admin escalation.
// Member intake returns via a validated Server Action writing pending rows (#46).
