CREATE TYPE "public"."club_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."member_status" AS ENUM('pending', 'active', 'inactive', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('concept', 'active', 'completed');--> statement-breakpoint
CREATE TYPE "public"."publication_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."registration_status" AS ENUM('open', 'closed', 'full', 'not_required');--> statement-breakpoint
CREATE TABLE "awards_and_achievements" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "awards_and_achievements_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"description" text,
	"award_date" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clubs" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "clubs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"description" text,
	"vision" text,
	"mission" text,
	"disciplines" text[] DEFAULT '{}'::text[] NOT NULL,
	"skill_levels" text[] DEFAULT '{}'::text[] NOT NULL,
	"schedule" text,
	"location" text,
	"eligibility" text,
	"status" "club_status" DEFAULT 'active' NOT NULL,
	"intro_video_id" text DEFAULT '' NOT NULL,
	"cover_media_id" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "core_values" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "core_values_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"value" text NOT NULL,
	"description" text,
	CONSTRAINT "core_values_value_unique" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"club_id" bigint,
	"title" text NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"description" text,
	"starts_at" timestamp with time zone NOT NULL,
	"ends_at" timestamp with time zone,
	"location" text,
	"online_url" text,
	"registration_url" text,
	"registration_status" "registration_status" DEFAULT 'not_required' NOT NULL,
	"cover_media_id" bigint,
	"added_on" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_page" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hero_page_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"section" text NOT NULL,
	"heading" text NOT NULL,
	"subheading" text NOT NULL,
	"description" text NOT NULL,
	"background_img" text NOT NULL,
	CONSTRAINT "hero_page_section_unique" UNIQUE("section")
);
--> statement-breakpoint
CREATE TABLE "leaders" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "leaders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"position_id" bigint NOT NULL,
	"year" text NOT NULL,
	"facebook" text,
	"linkedin" text,
	"instagram" text,
	"twitter" text,
	"image_url" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "media_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"url" text NOT NULL,
	"alt" text NOT NULL,
	"width" integer,
	"height" integer,
	"credit" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_club" (
	"member_id" bigint NOT NULL,
	"club_id" bigint NOT NULL,
	CONSTRAINT "member_club_member_id_club_id_pk" PRIMARY KEY("member_id","club_id")
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "members_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"message" text,
	"status" "member_status" DEFAULT 'pending' NOT NULL,
	"registered_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "news_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"body" text NOT NULL,
	"published_at" timestamp with time zone,
	"status" "publication_status" DEFAULT 'draft' NOT NULL,
	"cover_media_id" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "position" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "position_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	CONSTRAINT "position_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "project_media" (
	"project_id" bigint NOT NULL,
	"media_id" bigint NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "project_media_project_id_media_id_pk" PRIMARY KEY("project_id","media_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"problem" text NOT NULL,
	"solution" text NOT NULL,
	"impact" text NOT NULL,
	"year" integer NOT NULL,
	"status" "project_status" DEFAULT 'concept' NOT NULL,
	"publication_status" "publication_status" DEFAULT 'draft' NOT NULL,
	"tech_stack" text[] DEFAULT '{}'::text[] NOT NULL,
	"club_id" bigint,
	"repository_url" text,
	"demo_url" text,
	"cover_media_id" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sponsors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"logo" text,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testimonials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"member_id" bigint NOT NULL,
	"testimony" text NOT NULL,
	"posted_on" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_cover_media_id_media_id_fk" FOREIGN KEY ("cover_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_cover_media_id_media_id_fk" FOREIGN KEY ("cover_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaders" ADD CONSTRAINT "leaders_position_id_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."position"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_club" ADD CONSTRAINT "member_club_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_club" ADD CONSTRAINT "member_club_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_cover_media_id_media_id_fk" FOREIGN KEY ("cover_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_media" ADD CONSTRAINT "project_media_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_media" ADD CONSTRAINT "project_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_media_id_media_id_fk" FOREIGN KEY ("cover_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "clubs_slug_uidx" ON "clubs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "clubs_cover_media_id_idx" ON "clubs" USING btree ("cover_media_id");--> statement-breakpoint
CREATE UNIQUE INDEX "events_slug_uidx" ON "events" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "events_club_id_idx" ON "events" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "events_cover_media_id_idx" ON "events" USING btree ("cover_media_id");--> statement-breakpoint
CREATE INDEX "events_starts_at_idx" ON "events" USING btree ("starts_at");--> statement-breakpoint
CREATE INDEX "leaders_position_id_idx" ON "leaders" USING btree ("position_id");--> statement-breakpoint
CREATE INDEX "member_club_club_id_idx" ON "member_club" USING btree ("club_id");--> statement-breakpoint
CREATE UNIQUE INDEX "members_email_uidx" ON "members" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "news_slug_uidx" ON "news" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "news_cover_media_id_idx" ON "news" USING btree ("cover_media_id");--> statement-breakpoint
CREATE INDEX "news_status_published_at_idx" ON "news" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "project_media_media_id_idx" ON "project_media" USING btree ("media_id");--> statement-breakpoint
CREATE UNIQUE INDEX "projects_slug_uidx" ON "projects" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "projects_club_id_idx" ON "projects" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "projects_cover_media_id_idx" ON "projects" USING btree ("cover_media_id");--> statement-breakpoint
CREATE INDEX "projects_publication_status_idx" ON "projects" USING btree ("publication_status");--> statement-breakpoint
CREATE INDEX "testimonials_member_id_idx" ON "testimonials" USING btree ("member_id");--> statement-breakpoint

ALTER TABLE "media" ADD CONSTRAINT "media_alt_nonempty" CHECK (length(btrim("alt")) > 0);--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_end_after_start" CHECK ("ends_at" IS NULL OR "ends_at" >= "starts_at");--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_year_reasonable" CHECK ("year" BETWEEN 2000 AND 2100);--> statement-breakpoint

ALTER TABLE "awards_and_achievements" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "clubs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "core_values" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "hero_page" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "leaders" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "media" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "member_club" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "members" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "news" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "position" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "project_media" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "sponsors" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "testimonials" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint

CREATE POLICY "public_read_awards" ON "awards_and_achievements" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint
CREATE POLICY "public_read_active_clubs" ON "clubs" FOR SELECT TO anon, authenticated USING ("status" = 'active');--> statement-breakpoint
CREATE POLICY "public_read_core_values" ON "core_values" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint
CREATE POLICY "public_read_events" ON "events" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint
CREATE POLICY "public_read_hero_page" ON "hero_page" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint
CREATE POLICY "public_read_leaders" ON "leaders" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint
CREATE POLICY "public_read_media" ON "media" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint
CREATE POLICY "public_read_published_news" ON "news" FOR SELECT TO anon, authenticated USING ("status" = 'published');--> statement-breakpoint
CREATE POLICY "public_read_positions" ON "position" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint
CREATE POLICY "public_read_published_project_media" ON "project_media" FOR SELECT TO anon, authenticated USING (
  EXISTS (
    SELECT 1 FROM "projects"
    WHERE "projects"."id" = "project_media"."project_id"
      AND "projects"."publication_status" = 'published'
  )
);--> statement-breakpoint
CREATE POLICY "public_read_published_projects" ON "projects" FOR SELECT TO anon, authenticated USING ("publication_status" = 'published');--> statement-breakpoint
CREATE POLICY "public_read_sponsors" ON "sponsors" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint
CREATE POLICY "public_read_testimonials" ON "testimonials" FOR SELECT TO anon, authenticated USING (true);--> statement-breakpoint

CREATE POLICY "admin_all_awards" ON "awards_and_achievements" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_clubs" ON "clubs" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_core_values" ON "core_values" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_events" ON "events" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_hero_page" ON "hero_page" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_leaders" ON "leaders" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_media" ON "media" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_member_club" ON "member_club" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_members" ON "members" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_news" ON "news" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_positions" ON "position" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_project_media" ON "project_media" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_projects" ON "projects" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_sponsors" ON "sponsors" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
CREATE POLICY "admin_all_testimonials" ON "testimonials" FOR ALL TO authenticated USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint

GRANT USAGE ON SCHEMA public TO anon, authenticated;--> statement-breakpoint
GRANT SELECT ON "awards_and_achievements", "clubs", "core_values", "events", "hero_page", "leaders", "media", "news", "position", "project_media", "projects", "sponsors", "testimonials" TO anon, authenticated;--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;--> statement-breakpoint
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- The application's DATABASE_URL connects as the table owner and therefore bypasses RLS.
-- Every server-side mutation must continue to call requireAdmin(); RLS protects Data API access as a second layer.
