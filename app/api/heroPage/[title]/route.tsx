import { db } from "@/app/db";
import { heroPage } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{title: string}>}) {
    const {title} = await params;
  try {
    const Heroes = await db.select().from(heroPage).where(eq(heroPage.section, title))
    if (Heroes.length === 0) {
      return NextResponse.json(
        { message: "Sorry!! No hero page found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(Heroes[0], { status: 200 });
    }
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}