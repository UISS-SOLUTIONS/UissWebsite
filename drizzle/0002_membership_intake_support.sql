CREATE SCHEMA "private";
--> statement-breakpoint
CREATE TABLE "private"."membership_rate_limits" (
	"key_hash" text PRIMARY KEY NOT NULL,
	"window_started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"attempts" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "club_interest" text NOT NULL;