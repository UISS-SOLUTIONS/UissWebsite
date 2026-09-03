import { requireAdmin } from "@/lib/requireAdmin";

import { db } from "@/app/db";
import { testimonials, members } from "@/app/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
const plain = (value: string) => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

export async function GET(){
    try {
        const rows = await db.select({ id: testimonials.id, text: testimonials.testimony, firstName: members.firstName, lastName: members.lastName, publishedAt: testimonials.publishedAt }).from(testimonials).innerJoin(members, eq(testimonials.memberId, members.id)).where(and(eq(testimonials.status, 'published'), eq(members.status, 'active'))).orderBy(desc(testimonials.publishedAt));
        const allTestimonies = rows.map(r => ({ ...r, text: plain(r.text ?? '') })).filter(r => r.text.length >= 40 && r.text.length <= 400).map(r => ({ id: r.id, text: r.text, name: `${r.firstName} ${r.lastName}`, role: 'UISS member', publishedAt: r.publishedAt }));

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
  const denied = await requireAdmin();
  if (denied) return denied;

    const body = await request.json()

    try {
        const text = plain(String(body.testimony ?? ''));
        const status = body.status === 'published' ? 'published' : 'draft';
        if (status === 'published' && (text.length < 40 || text.length > 400 || !body.consentRecordedAt)) return NextResponse.json({message: 'Published testimonials require consent and a 40–400 character quote.'}, {status: 400});
        const member = await db.query.members.findFirst({ where: and(eq(members.id, Number(body.memberId ?? body.userId)), eq(members.status, 'active')) });
        if (!member) return NextResponse.json({message: 'Select an active member.'}, {status: 400});
        const [newTestimony] = await db
            .insert(testimonials)
            .values({
                memberId: body.memberId ?? body.userId,
                testimony: text,
                status,
                consentRecordedAt: body.consentRecordedAt ? new Date(body.consentRecordedAt) : null,
                publishedAt: status === 'published' ? new Date() : null,
            })
            .returning();
        return NextResponse.json(newTestimony, {status: 201});
    }catch(e){
        return NextResponse.json({message: (e as Error).message}, {status: 400})
    }
}

export async function PATCH(request: NextRequest){
  const denied = await requireAdmin(); if (denied) return denied;
  const body = await request.json(); const text=plain(String(body.testimony??'')); const status=body.status==='published'?'published':'draft';
  if (!Number.isFinite(Number(body.id)) || !Number.isFinite(Number(body.memberId)) || !text) return NextResponse.json({message:'A member and quote are required.'},{status:400});
  if(status==='published' && (text.length<40||text.length>400||!body.consentRecordedAt)) return NextResponse.json({message:'Consent and a 40–400 character quote are required to publish.'},{status:400});
  const existing = await db.query.testimonials.findFirst({ where: eq(testimonials.id, Number(body.id)) });
  if (!existing) return NextResponse.json({message:'Testimonial not found.'},{status:404});
  const member = await db.query.members.findFirst({ where: and(eq(members.id, Number(body.memberId)), eq(members.status, 'active')) });
  if (!member) return NextResponse.json({message:'Select an active member.'},{status:400});
  const [row]=await db.update(testimonials).set({memberId:Number(body.memberId),testimony:text,status,consentRecordedAt:body.consentRecordedAt?new Date(body.consentRecordedAt):existing.consentRecordedAt,publishedAt:status==='published'?(body.publishedAt?new Date(body.publishedAt):existing.publishedAt??new Date()):null,updatedAt:new Date()}).where(eq(testimonials.id,Number(body.id))).returning(); return NextResponse.json(row)
}
