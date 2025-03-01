import { db } from "@/app/db";
import { awardsAndAchievements } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const allAwards = await db.select().from(awardsAndAchievements);
        if (allAwards.length === 0) {
            return NextResponse.json({ message: "Sorry!! No awards found" }, { status: 404 });
        } else {
            return NextResponse.json(allAwards, { status: 200 });
        }
    }catch (e ){
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}

export async function POST(request: NextRequest){
    const body = await request.json()

    try {
        const [newAward] = await db
            .insert(awardsAndAchievements)
            .values({
                title: body.title,
                description: body.description,
                awardDate: body.awardDate,
            })
            .returning();
        return NextResponse.json(newAward, {status: 201});
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400})
    }
}