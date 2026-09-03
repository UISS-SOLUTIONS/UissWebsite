"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { sql } from "drizzle-orm";
import { Resend } from "resend";
import { db } from "@/app/db";
import { members, membershipRateLimits } from "@/app/db/schema";

export type MembershipActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

class RateLimitError extends Error {}

function field(formData: FormData, name: string, maxLength: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

export async function submitMembershipApplication(
  _previousState: MembershipActionState,
  formData: FormData
): Promise<MembershipActionState> {
  if (field(formData, "website", 200)) {
    return { status: "success", message: "Application received." };
  }

  const firstName = field(formData, "firstName", 100);
  const lastName = field(formData, "lastName", 100);
  const email = field(formData, "email", 254).toLowerCase();
  const clubInterest = field(formData, "clubInterest", 120);
  const message = field(formData, "message", 1000);

  if (!firstName || !lastName || !clubInterest || !/^\S+@\S+\.\S+$/.test(email)) {
    return { status: "error", message: "Check your name, email, and club interest." };
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwardedFor || requestHeaders.get("x-real-ip") || "unknown";
  const keyHash = createHash("sha256").update(address).digest("hex");

  try {
    const created = await db.transaction(async (transaction) => {
      const [limit] = await transaction
        .insert(membershipRateLimits)
        .values({ keyHash })
        .onConflictDoUpdate({
          target: membershipRateLimits.keyHash,
          set: {
            attempts: sql`case when ${membershipRateLimits.windowStartedAt} < now() - interval '1 hour' then 1 else ${membershipRateLimits.attempts} + 1 end`,
            windowStartedAt: sql`case when ${membershipRateLimits.windowStartedAt} < now() - interval '1 hour' then now() else ${membershipRateLimits.windowStartedAt} end`,
          },
        })
        .returning({ attempts: membershipRateLimits.attempts });

      if (limit.attempts > 5) {
        throw new RateLimitError();
      }

      const [member] = await transaction
        .insert(members)
        .values({ firstName, lastName, email, clubInterest, message: message || null })
        .onConflictDoNothing({ target: members.email })
        .returning({ id: members.id });

      return member;
    });

    if (!created) {
      return {
        status: "success",
        message: "We already have an application for this email.",
      };
    }

    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.MEMBERSHIP_NOTIFICATION_EMAIL;
    if (process.env.RESEND_API_KEY && from && to) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from,
        to: [to],
        subject: `New UISS membership application from ${firstName} ${lastName}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Club interest:</strong> ${escapeHtml(clubInterest)}</p>
          <p><strong>Message:</strong> ${escapeHtml(message || "None")}</p>`,
      });
      if (error) {
        console.error("Membership notification failed", error.message);
      }
    }

    return {
      status: "success",
      message: "Application received. The UISS team reviews applications weekly.",
    };
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { status: "error", message: "Too many attempts. Try again in an hour." };
    }
    console.error("Membership application failed", error);
    return {
      status: "error",
      message: "We could not save your application. Try again.",
    };
  }
}
