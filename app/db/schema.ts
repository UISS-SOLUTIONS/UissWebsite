import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const sponsors = pgTable("sponsors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  logo: text(),
  name: varchar({ length: 255 }).notNull(),
});

export const awardsAndAchievements = pgTable("awards_and_achievements", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  date: varchar({length: 255}).notNull()
});

export const coreValues = pgTable("core_values", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), 
  value: varchar({ length: 255 }).notNull(),
  description: text()
});

export const heroPage = pgTable("hero_page", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  section: varchar({ length: 255 }).notNull(),
  heading: varchar({ length: 255 }).notNull(),
  description: text(),
  backgroundImg: text()
});
