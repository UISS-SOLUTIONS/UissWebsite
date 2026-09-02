import { requireAdmin } from "@/lib/requireAdmin";

import { db } from '@/app/db';
import { clubs } from '@/app/db/schema';
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
        vision: clubs.vision,
        mission: clubs.mission,
        visiondescription: clubs.description,
      })
      .from(clubs)
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
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;
    const clubId = parseInt(id);

    if (isNaN(clubId)) {
      return NextResponse.json({ error: 'Invalid club ID' }, { status: 400 });
    }

    const body = await request.json();
    const changes = {
      title: body.title,
      summary: body.summary,
      description: body.description,
      vision: body.vision,
      mission: body.mission,
      disciplines: body.disciplines,
      skillLevels: body.skillLevels,
      schedule: body.schedule,
      location: body.location,
      eligibility: body.eligibility,
      status: body.status,
      introVidId: body.introVidId,
      updatedAt: new Date(),
    };
    const values = Object.fromEntries(
      Object.entries(changes).filter(([, value]) => value !== undefined)
    );
    const updatedClub = await db
      .update(clubs)
      .set(values)
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
