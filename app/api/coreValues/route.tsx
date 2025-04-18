import { db } from "@/app/db";
import { coreValues } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const allCoreValues = await db.select().from(coreValues);
        if (allCoreValues.length === 0) {
            return NextResponse.json({ message: "Sorry!! No Core Values Found" }, { status: 404 });
        } else {
            return NextResponse.json(allCoreValues, { status: 200 });
        }
    }catch (e){
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}

export async function POST(request: NextRequest){
    const body = await request.json()

    try {
        const [newCoreValue] = await db
            .insert(coreValues)
            .values({
                value: body.value,
                description: body.description,
            }).onConflictDoUpdate({
                target: coreValues.value,
                set: {
                    description: body.description,}
            })
            .returning();
        return NextResponse.json(newCoreValue, {status: 201});
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400})
    }
}