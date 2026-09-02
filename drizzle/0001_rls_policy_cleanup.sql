ALTER POLICY "public_read_awards" ON "awards_and_achievements" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_active_clubs" ON "clubs" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_core_values" ON "core_values" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_events" ON "events" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_hero_page" ON "hero_page" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_leaders" ON "leaders" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_media" ON "media" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_published_news" ON "news" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_positions" ON "position" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_published_project_media" ON "project_media" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_published_projects" ON "projects" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_sponsors" ON "sponsors" TO anon;--> statement-breakpoint
ALTER POLICY "public_read_testimonials" ON "testimonials" TO anon;--> statement-breakpoint

ALTER POLICY "admin_all_awards" ON "awards_and_achievements"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_clubs" ON "clubs"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_core_values" ON "core_values"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_events" ON "events"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_hero_page" ON "hero_page"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_leaders" ON "leaders"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_media" ON "media"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_member_club" ON "member_club"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_members" ON "members"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_news" ON "news"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_positions" ON "position"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_project_media" ON "project_media"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_projects" ON "projects"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_sponsors" ON "sponsors"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');--> statement-breakpoint
ALTER POLICY "admin_all_testimonials" ON "testimonials"
  USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
