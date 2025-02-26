import { Description } from "@radix-ui/react-alert-dialog";
import { desc, relations } from "drizzle-orm";
import { year } from "drizzle-orm/mysql-core";
import {
  integer,
  timestamp,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

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
});

export const userRelations = relations(users, ({ many }) => ({
  testimonies: many(testimonies),
  clubs: many(clubs),
}));

export const testimonies = pgTable("testimonies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  testimony: text(),
  postedOn: timestamp().notNull().defaultNow(),
});

export const testimoniesRelations = relations(testimonies, ({ one }) => ({
  user: one(users, {
    fields: [testimonies.userId],
    references: [users.id],
  }),
}));

export const events = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clubId: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  date: varchar({ length: 255 }).notNull(),
  addedon: timestamp().notNull().defaultNow(),
});

export const clubs = pgTable("clubs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  visionMissionID: integer().notNull(),
  title: varchar({ length: 255}).notNull(),
  description: text(),
});

export const clubsRelations = relations(clubs, ({ one, many }) => ({
  users: many(users),
  visionMission: one(visionMission)
}));

export const visionMission = pgTable('vision_mission', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  vision: text(),
  mission: text(),
  description: text(),
})


