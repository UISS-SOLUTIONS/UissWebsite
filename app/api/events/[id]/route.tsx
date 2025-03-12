import { db } from "@/app/db";
import { events } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { error: "Missing an id parameter in URL" },
        { status: 400 }
      );
    }
    const clubId = parseInt(params.id);
    if (isNaN(clubId)) {
      return NextResponse.json(
        { error: "Invalid id provided" },
        { status: 400 }
      );
    }

    const eventsResults = await db
      .select()
      .from(events)
      .where(eq(events.clubID, clubId));
    return NextResponse.json(
       {events: eventsResults},
      {status: 200} 
    );
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { error: "Missing an id parameter in URL" },
        { status: 400 }
      );
    }
    const clubId = parseInt(params.id);
    if (isNaN(clubId)) {
      return NextResponse.json(
        { error: "Invalid id provided" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const [event] = await db
      .insert(events)
      .values({
        clubID: clubId,
        title: body.title,
        description: body.description,
        date: body.date,
      })
      .returning();

    return NextResponse.json({ success: true, event: event }, { status: 201 });
  } catch (e) {
    throw new Error((e as Error).message);
  }
}
