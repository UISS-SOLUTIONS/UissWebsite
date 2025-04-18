import { INewClub } from "@/app/AdminPanel/types";
import { db } from "@/app/db";
import { clubs, visionMission } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allClubs = await db
      .select({
        id: clubs.id,
        title: clubs.title,
        description: clubs.description,
        introVidId: clubs.introVidId,
        vision: visionMission.vision,
        mission: visionMission.mission,
        visiondescription: visionMission.description,
      })
      .from(clubs)
      .leftJoin(visionMission, eq(clubs.visionMissionID, visionMission.id))
      .orderBy(clubs.id);

    if (allClubs.length === 0) {
      return NextResponse.json(
        { message: "Sorry!! No clubs found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(allClubs, { status: 200 });
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
    let newClub: INewClub[] = []
    await db.transaction(async (trx) => {
      const [vision] = await trx
        .insert(visionMission)
        .values({
          vision: body.vision,
          mission: body.mission,
          description: body.missiondescription,
        })
        .returning();

      newClub = await trx
        .insert(clubs)
        .values({
          title: body.title,
          description: body.description,
          visionMissionID: vision.id,
          introVidId: body.introVidId,
        })
        .onConflictDoNothing()
        .returning()
        
    });

    return NextResponse.json(newClub, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
