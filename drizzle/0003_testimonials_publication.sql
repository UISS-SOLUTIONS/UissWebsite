ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "status" publication_status NOT NULL DEFAULT 'draft';
ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "consent_recorded_at" timestamptz;
ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "published_at" timestamptz;
ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "updated_at" timestamptz NOT NULL DEFAULT now();
