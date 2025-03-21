import { db } from "@/app/db";
import { clubs, userClub, users, visionMission } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// API Route Handler
export async function GET(
  request: NextRequest,
  { params }: { params: { id?: string } } // Ensure `params` is optional
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
      return NextResponse.json(
        { error: "Invalid club ID" },
        { status: 400 }
      );
    }

    const clubDetails = await db
      .select({
        clubId: clubs.id,
        clubName: clubs.title,
        clubDescription: clubs.description,
        vision: visionMission.vision,
                mission: visionMission.mission,
                visiondescription: visionMission.description,
        userId: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      })
      .from(userClub)
      .innerJoin(users, eq(userClub.userID, users.id))
      .innerJoin(clubs, eq(userClub.clubID, clubs.id))
      .leftJoin(visionMission, eq(clubs.visionMissionID, visionMission.id))
      .where(eq(userClub.clubID, clubId));

    if (clubDetails.length === 0) {
      return NextResponse.json(
        { error: "Club not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        clubId: clubDetails[0].clubId,
        clubName: clubDetails[0].clubName,
        clubDescription: clubDetails[0].clubDescription,
        vision: clubDetails[0].vision,
        mission: clubDetails[0].mission,
        visiondescription: clubDetails[0].visiondescription,
        users: clubDetails.map((row) => ({
          id: row.userId,
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
