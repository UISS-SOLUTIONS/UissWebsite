import { relations } from "drizzle-orm";
import { timestamp, year } from "drizzle-orm/mysql-core";
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
  date: varchar({ length: 255 }).notNull(),
});

export const coreValues = pgTable("core_values", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  value: varchar({ length: 255 }).notNull(),
  description: text(),
});

export const heroPage = pgTable("hero_page", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  section: varchar({ length: 255 }).notNull(),
  heading: varchar({ length: 255 }).notNull(),
  description: text(),
  backgroundImg: text(),
});

export const position = pgTable("position", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});

export const positionRelations = relations(position, ({ many }) => ({
  leaders: many(leaders),
}));

export const leaders = pgTable("leaders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  positionId: integer().notNull(),
  year: varchar({ length: 255 }).notNull(),
  facebook: varchar({ length: 255 }),
  linkedIn: varchar({ length: 255 }),
  instagram: varchar({ length: 255 }),
  x: varchar({ length: 255 }),
});

export const leadersRelations = relations(leaders, ({ one }) => ({
  position: one(position, {
    fields: [leaders.positionId],
    references: [position.id],
  }),
}));

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull(),
  registeredAt: timestamp().notNull().defaultNow(),
})