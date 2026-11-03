import { z } from "zod";

const adminCell = z.union([z.json(), z.date(), z.undefined()]);

export const adminRows = z.array(z.record(z.string(), adminCell));

export type AdminCell = z.infer<typeof adminCell>;

export type AdminRow = z.infer<typeof adminRows>[number];

export const coreValueFields = z.object({
  value: z.string().catch(""),
  description: z.string().catch(""),
});
