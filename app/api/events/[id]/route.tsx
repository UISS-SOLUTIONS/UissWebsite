import { requireAdmin } from "@/lib/requireAdmin";

import { db } from "@/app/db";
import { events } from "@/app/db/schema";
import { slugify } from "@/lib/slugify";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clubId = parseInt(id);
    if (isNaN(clubId)) {
      return NextResponse.json(
        { error: "Invalid id provided" },
        { status: 400 }
      );
    }

    const eventsResults = await db
      .select()
      .from(events)
      .where(eq(events.clubId, clubId));
    return NextResponse.json(eventsResults, { status: 200 });
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const {id} = await params;
    const clubId = parseInt(id);
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
        slug: slugify(String(body.slug || body.title)),
        clubId,
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

    return NextResponse.json(event, { status: 201 });
  } catch (e) {
    throw new Error((e as Error).message);
  }
}
