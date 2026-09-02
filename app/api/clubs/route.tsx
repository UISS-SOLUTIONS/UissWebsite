import { requireAdmin } from "@/lib/requireAdmin";

import { INewClub } from "@/app/admin/types";
import { db } from "@/app/db";
import { clubs } from "@/app/db/schema";
import { slugify } from "@/lib/slugify";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allClubs = await db
      .select({
        id: clubs.id,
        title: clubs.title,
        description: clubs.description,
        introVidId: clubs.introVidId,
        vision: clubs.vision,
        mission: clubs.mission,
        visiondescription: clubs.description,
      })
      .from(clubs)
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
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  try {
    const title = String(body.title ?? "").trim();
    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const newClub: INewClub[] = await db
      .insert(clubs)
      .values({
        slug: slugify(String(body.slug || title)),
        title,
        summary: String(body.summary ?? body.description ?? ""),
        description: body.description,
        vision: body.vision,
        mission: body.mission,
        introVidId: body.introVidId,
      })
      .onConflictDoNothing()
      .returning({
        id: clubs.id,
        title: clubs.title,
        description: clubs.description,
        introVidId: clubs.introVidId,
      });

    return NextResponse.json(newClub, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
