import { db } from "@/app/db";
import { position } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const allPositions = await db.select().from(position);
        if (allPositions.length === 0) {
            return NextResponse.json({ message: "Sorry!! No positions found" }, { status: 404 });
        } else {
            return NextResponse.json(allPositions, { status: 200 });
        }
    }catch (e) {
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}

export async function POST (request: NextRequest) {
    const body = await request.json();

    try {
        const [newPosition] = await db
            .insert(position)
            .values({
                title: body.title,
            })
            .returning();
        return NextResponse.json(newPosition, { status: 201 });
    }catch (e) {
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}