import { db } from "@/app/db";
import { events } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allEvents = await db.select().from(events).orderBy(events.date);
    if (allEvents.length === 0) {
      return NextResponse.json(
        { message: "Sorry!! No events found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(allEvents, { status: 200 });
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
    const [newEvent] = await db
      .insert(events)
      .values({
        clubID: body.clubID,
        title: body.title,
        description: body.description,
        date: body.date,
      })
      .returning();
    return NextResponse.json(newEvent, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
