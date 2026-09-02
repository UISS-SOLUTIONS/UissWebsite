import { requireAdmin } from "@/lib/requireAdmin";

import { db } from "@/app/db";
import { events } from "@/app/db/schema";
import { slugify } from "@/lib/slugify";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allEvents = await db.select().from(events).orderBy(events.startsAt);
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
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();

  try {
    const [newEvent] = await db
      .insert(events)
      .values({
        slug: slugify(String(body.slug || body.title)),
        clubId: body.clubId ?? body.clubID ?? null,
        title: body.title,
        summary: body.summary ?? body.description ?? "",
        description: body.description,
        startsAt: new Date(body.startsAt ?? body.date),
        endsAt: body.endsAt ? new Date(body.endsAt) : null,
        location: body.location,
        onlineUrl: body.onlineUrl,
        registrationUrl: body.registrationUrl,
        registrationStatus: body.registrationStatus ?? "not_required",
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
