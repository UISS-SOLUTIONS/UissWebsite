import { db } from "@/app/db";
import { userClub, users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id?: string } }
) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { error: "Missing club ID in URL" },
        { status: 400 }
      );
    }

    const clubId = parseInt(params.id);

    if (isNaN(clubId)) {
      return NextResponse.json({ error: "Invalid club ID" }, { status: 400 });
    }

    const clubusers = await db
      .select({
        userId: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      })
      .from(userClub)
      .innerJoin(users, eq(userClub.userID, users.id))
      .where(eq(userClub.clubID, clubId));

    if (clubusers.length === 0) {
      return NextResponse.json(
        [],
        { status: 200 }
      );
    }

    return NextResponse.json(clubusers, { status: 200 });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
