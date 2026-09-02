import { requireAdmin } from "@/lib/requireAdmin";
import { db } from "@/app/db";
import { members } from "@/app/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const allUsers = await db
      .select({
        id: members.id,
        firstName: members.firstName,
        lastName: members.lastName,
        email: members.email,
        status: members.status,
        registeredAt: members.registeredAt,
      })
      .from(members)
      .orderBy(members.registeredAt);

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
