import { db } from "@/app/db";
import { userClub, users } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const allUsers = await db.select().from(users).orderBy(users.registeredAt);

        if(allUsers.length === 0 ){
            return NextResponse.json({message: "Sorry!! No users found"}, {status: 404})
        }else {
            return NextResponse.json(allUsers, {status: 200});
        }
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400})
    }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const [newUser] = await db
      .insert(users)
      .values({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        role: body.role,
      })
      .onConflictDoNothing()
      .returning();
      if(newUser){
        await db.insert(userClub).values({
          userID: newUser.id,
          clubID: body.clubId
        })
      }
    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
