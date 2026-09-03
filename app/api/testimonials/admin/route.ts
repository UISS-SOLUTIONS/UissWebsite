import { requireAdmin } from '@/lib/requireAdmin'
import { db } from '@/app/db'
import { testimonials, members } from '@/app/db/schema'
import { desc, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
export async function GET(){const denied=await requireAdmin(); if(denied)return denied; const rows=await db.select({id:testimonials.id,memberId:members.id,memberName:members.firstName,memberLastName:members.lastName,testimony:testimonials.testimony,status:testimonials.status,consentRecordedAt:testimonials.consentRecordedAt,publishedAt:testimonials.publishedAt,updatedAt:testimonials.updatedAt}).from(testimonials).innerJoin(members,eq(testimonials.memberId,members.id)).orderBy(desc(testimonials.updatedAt)); return NextResponse.json(rows)}
