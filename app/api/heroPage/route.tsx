import { db } from "@/app/db";
import { heroPage } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allHeroes = await db.select().from(heroPage)
    if (allHeroes.length === 0) {
      return NextResponse.json(
        { message: "Sorry!! No hero page found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(allHeroes, { status: 200 });
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
    const [newHero] = await db
      .insert(heroPage)
      .values({
        section: body.section,
        heading: body.heading,
        subheading: body.subheading,
        description: body.description,
        backgroundImg: body.backgroundImg,
      })
      .returning();
    return NextResponse.json(newHero, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
