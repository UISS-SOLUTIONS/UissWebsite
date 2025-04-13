import { db } from "@/app/db";
import { leaders, position } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allLeaders = await db.select({
      id: leaders.id,
      firstName: leaders.firstName,
      lastName: leaders.lastName,
      position: position.title,
      year: leaders.year,
    }).from(leaders).orderBy(leaders.year).innerJoin(position, eq(leaders.positionId, position.id));
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
        positionId: parseInt(body.positionId),
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
