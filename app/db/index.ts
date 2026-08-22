// lib/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema"; // Your schema file

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // TLS verification on by default; set DATABASE_SSL_REJECT_UNAUTHORIZED=false
  // only for local development against pools with self-signed certs.
  ssl:
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "false"
      ? { rejectUnauthorized: false }
      : true,
});

export const db = drizzle(pool, { schema });

