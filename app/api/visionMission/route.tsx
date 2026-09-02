import { requireAdmin } from "@/lib/requireAdmin";

import { db } from "@/app/db";
import { clubs } from "@/app/db/schema";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const visionsMissions = await db.select({
          id: clubs.id,
          name: clubs.title,
          vision: clubs.vision,
          mission: clubs.mission,
          description: clubs.description,
        }).from(clubs);
        if(visionsMissions.length === 0){
            return NextResponse.json({message: "Sorry!! No visionMission found"}, {status: 404});
        }else{
            return NextResponse.json(visionsMissions, {status: 200});
        }
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400});
    }
}

export async function POST(){
  const denied = await requireAdmin();
  if (denied) return denied;

    return NextResponse.json(
      { message: "Vision and mission are now edited on a club" },
      { status: 410 }
    );
}
