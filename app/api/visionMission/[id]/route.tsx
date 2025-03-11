import { db } from "@/app/db";
import { clubs, visionMission } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
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
    return NextResponse.json({success: true, data: updatedvisionMission[0]},{status: 200})
  } catch (e) {
    throw new Error((e as Error).message);
  }
}
