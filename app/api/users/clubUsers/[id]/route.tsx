import { db } from "@/app/db";
import { memberClub, members } from "@/app/db/schema";
import { requireAdmin } from "@/lib/requireAdmin";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;

    const clubId = parseInt(id);

    if (isNaN(clubId)) {
      return NextResponse.json({ error: "Invalid club ID" }, { status: 400 });
    }

    const clubusers = await db
      .select({
        userId: members.id,
        firstName: members.firstName,
        lastName: members.lastName,
        email: members.email,
      })
      .from(memberClub)
      .innerJoin(members, eq(memberClub.memberId, members.id))
      .where(eq(memberClub.clubId, clubId));

    if (clubusers.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(clubusers, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unable to load club members" },
      { status: 500 }
    );
  }
}
