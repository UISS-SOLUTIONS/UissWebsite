import { db } from "@/app/db";
import { sponsors } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const allSponsors = await db.select().from(sponsors);
        if (allSponsors.length === 0) {
            return NextResponse.json({ message: "Sorry!! No sponsors found" }, { status: 404 });
        }
        else {
            return NextResponse.json(allSponsors, { status: 200 });
        }
    }catch (e) {
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    try {
        const [newSponsor] = await db
            .insert(sponsors)
            .values({
                logo: body.logo,
                name: body.name,
            })
            .returning();
        return NextResponse.json(newSponsor, { status: 201 });
    }catch (e) {
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}