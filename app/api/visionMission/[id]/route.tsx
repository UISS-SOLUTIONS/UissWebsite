import { db } from "@/app/db";
import { clubs, visionMission } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clubId = parseInt(id);
    if (isNaN(clubId)) {
      return NextResponse.json({ error: "Invalid club ID" }, { status: 400 });
    }
    const body = await request.json();
    const [visionMissionId] = await db
      .select({ visionMissionID: clubs.visionMissionID })
      .from(clubs)
      .where(eq(clubs.id, clubId));
    if (!visionMissionId) {
      return NextResponse.json({ error: "Club not found" }, { status: 404 });
    }
    const updatedvisionMission = await db
      .update(visionMission)
      .set(body)
      .where(eq(visionMission.id, visionMissionId.visionMissionID))
      .returning();
    if (updatedvisionMission.length === 0) {
      return NextResponse.json(
        { error: "Vision or Mission not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedvisionMission[0] },
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
    const visionMissionID = parseInt(id);
    if (isNaN(visionMissionID)) {
      return NextResponse.json(
        { error: "Invalid Vision Mission Id" },
        { status: 400 }
      );
    }
    const result = await db
      .select()
      .from(visionMission)
      .where(eq(visionMission.id, visionMissionID));

    if (result.length === 0) {
      NextResponse.json({ Message: "Sorry!! No Data Found" }, { status: 404 });
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
