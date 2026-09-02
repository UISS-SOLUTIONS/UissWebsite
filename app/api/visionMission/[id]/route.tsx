import { requireAdmin } from "@/lib/requireAdmin";

import { db } from "@/app/db";
import { clubs } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
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
    const body = await request.json();
    const changes = {
      vision: body.vision,
      mission: body.mission,
      description: body.description,
      updatedAt: new Date(),
    };
    const updatedvisionMission = await db
      .update(clubs)
      .set(Object.fromEntries(Object.entries(changes).filter(([, value]) => value !== undefined)))
      .where(eq(clubs.id, clubId))
      .returning();
    if (updatedvisionMission.length === 0) {
      return NextResponse.json(
        { error: "Vision or Mission not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      updatedvisionMission[0],
      { status: 200 }
    );
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clubId = parseInt(id);
    if (isNaN(clubId)) {
      return NextResponse.json(
        { error: "Invalid Vision Mission Id" },
        { status: 400 }
      );
    }
    const result = await db
      .select({
        id: clubs.id,
        name: clubs.title,
        vision: clubs.vision,
        mission: clubs.mission,
        description: clubs.description,
      })
      .from(clubs)
      .where(eq(clubs.id, clubId));

    if (result.length === 0) {
      return NextResponse.json({ Message: "Sorry!! No Data Found" }, { status: 404 });
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
