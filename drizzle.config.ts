import { config } from "dotenv";
import { defineConfig } from 'drizzle-kit';

config({ path: ".env.local" });
config();

export default defineConfig({
  out: './drizzle',
  schema: './app/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: "snake_case",
});
