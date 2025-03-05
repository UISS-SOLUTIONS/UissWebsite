import { db } from "@/app/db";
import { testimonies } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const allTestimonies = await db.select().from(testimonies).orderBy(testimonies.postedOn);

        if(allTestimonies.length === 0){
            return NextResponse.json({message: "Sorry!! No testimonies found"}, {status: 404})
        }else{
            return NextResponse.json(allTestimonies, {status: 200})
        }
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400})
    }
}

export async function POST(request: NextRequest){
    const body = await request.json()

    try {
        const [newTestimony] = await db
            .insert(testimonies)
            .values({
                userId: body.userId,
                testimony: body.testimony,
            })
            .returning();
        return NextResponse.json(newTestimony, {status: 201});
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400})
    }
}
