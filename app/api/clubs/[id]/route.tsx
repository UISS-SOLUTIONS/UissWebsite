import { db } from '@/app/db';
import { clubs, userClub, visionMission } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Correct typing
) {
  try {
    const { id } = await params; // Await the Promise
    const clubId = parseInt(id);

    if (isNaN(clubId)) {
      return NextResponse.json({ error: 'Invalid club ID' }, { status: 400 });
    }

    const clubDetails = await db
      .select({
        clubId: clubs.id,
        clubName: clubs.title,
        clubDescription: clubs.description,
        vision: visionMission.vision,
        mission: visionMission.mission,
        visiondescription: visionMission.description,
      })
      .from(clubs)
      .leftJoin(userClub, eq(userClub.clubID, clubs.id))
      .leftJoin(visionMission, eq(clubs.visionMissionID, visionMission.id))
      .where(eq(clubs.id, clubId));

    if (clubDetails.length === 0) {
      return NextResponse.json({ error: 'Club not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        clubId: clubDetails[0].clubId,
        clubName: clubDetails[0].clubName,
        clubDescription: clubDetails[0].clubDescription,
        vision: clubDetails[0].vision,
        mission: clubDetails[0].mission,
        visiondescription: clubDetails[0].visiondescription,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clubId = parseInt(id);

    if (isNaN(clubId)) {
      return NextResponse.json({ error: 'Invalid club ID' }, { status: 400 });
    }

    const body = await request.json();
    const updatedClub = await db
      .update(clubs)
      .set(body)
      .where(eq(clubs.id, clubId))
      .returning();

    if (updatedClub.length === 0) {
      return NextResponse.json({ error: 'Club not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedClub[0],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Internal server error' },
      { status: 500 }
    );
  }
}