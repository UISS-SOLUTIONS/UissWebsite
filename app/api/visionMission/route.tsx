import { db } from "@/app/db";
import { visionMission} from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const visionsMissions = await db.select().from(visionMission);
        if(visionsMissions.length === 0){
            return NextResponse.json({message: "Sorry!! No visionMission found"}, {status: 404});
        }else{
            return NextResponse.json(visionsMissions, {status: 200});
        }
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400});
    }
}

export async function POST(request: NextRequest){
    const body = await request.json()

    try {
        const [newVisionMission] = await db
            .insert(visionMission)
            .values({
                vision: body.vision,
                mission: body.mission,
                description: body.description,
            })
            .returning();
        return NextResponse.json(newVisionMission, {status: 201});
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400})
    }
}