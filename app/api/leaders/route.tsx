import { db } from "@/app/db";
import { leaders } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allLeaders = await db.select().from(leaders).orderBy(leaders.year);
    if (allLeaders.length === 0) {
      return NextResponse.json(
        { message: "Sorry!! No leaders found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(allLeaders, { status: 200 });
    }
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const [newLeader] = await db
      .insert(leaders)
      .values({
        firstName: body.firstName,
        lastName: body.lastName,
        year: body.year,
        facebook: body.facebook,
        linkedIn: body.linkedIn,
        instagram: body.instagram,
        twitter: body.twitter,
        positionId: body.positionId,
      })
      .returning();
    return NextResponse.json(newLeader, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
