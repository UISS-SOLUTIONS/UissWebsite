import { relations } from "drizzle-orm";
import {
  integer,
  timestamp,
  pgTable,
  text,
  varchar,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Defines the sponsors table with columns id, logo, and name
export const sponsors = pgTable("sponsors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  logo: text(),
  name: varchar({ length: 255 }).notNull(),
});

// Defines the awards_and_achievements table with columns id, title, description, and awardDate
export const awardsAndAchievements = pgTable("awards_and_achievements", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  awardDate: varchar({ length: 255 }).notNull(),
});

// Defines the core_values table with columns id, value, and description
export const coreValues = pgTable("core_values", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  value: varchar({ length: 255 }).notNull(),
  description: text(),
});

// Defines the hero_page table with columns id, section, heading, description, and backgroundImg
export const heroPage = pgTable("hero_page", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  section: varchar({ length: 255 }).notNull().unique(),
  heading: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  backgroundImg: varchar({ length: 255 }).notNull(),
});

// Defines the position table with columns id and title
export const position = pgTable("position", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});

// Defines the leaders table with columns id, firstName, lastName, positionId, year, facebook, linkedIn, instagram, and twitter
export const leaders = pgTable("leaders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  positionId: integer()
    .notNull()
    .references(() => position.id),
  year: varchar({ length: 255 }).notNull(),
  facebook: varchar({ length: 255 }),
  linkedIn: varchar({ length: 255 }),
  instagram: varchar({ length: 255 }),
  twitter: varchar({ length: 255 }),
});

// Defines the users table with columns id, firstName, lastName, email, password, role, and registeredAt
export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 255 }).notNull(),
    registeredAt: timestamp().notNull().defaultNow(),
  },
  (table) => [uniqueIndex().on(table.email)]
);

// Defines the testimonies table with columns id, userId, testimony, and postedOn
export const testimonies = pgTable("testimonies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  testimony: text(),
  postedOn: timestamp().notNull().defaultNow(),
});

// Defines the events table with columns id, clubId, title, description, date, and addedOn
export const events = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clubID: integer()
    .notNull()
    .references(() => clubs.id),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  date: varchar({ length: 255 }).notNull(),
  addedOn: timestamp().notNull().defaultNow(),
});

// Defines the clubs table with columns id, visionMissionID, title, and description
export const clubs = pgTable("clubs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  visionMissionID: integer()
    .notNull()
    .unique()
    .references(() => visionMission.id),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
});

// Defines the user_club table with columns userID and clubID intersect of clubs and users table
export const userClub = pgTable(
  "user_club",
  {
    userID: integer()
      .notNull()
      .references(() => users.id),
    clubID: integer()
      .notNull()
      .references(() => clubs.id),
  },
  (t) => [primaryKey({ columns: [t.userID, t.clubID] })]
);

// Defines the vision_mission table with columns id, vision, mission, and description
export const visionMission = pgTable("vision_mission", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  vision: text(),
  mission: text(),
  description: text(),
});

// Defines the relations for the users table, specifying that a user can belong to many clubs
export const userClubRelations = relations(userClub, ({ one }) => ({
  users: one(users, {
    fields: [userClub.userID],
    references: [users.id],
  }),
  clubs: one(clubs, {
    fields: [userClub.clubID],
    references: [clubs.id],
  }),
}));

// Defines the relations for the position table, specifying that a position can have many leaders
export const positionRelations = relations(position, ({ many }) => ({
  leaders: many(leaders),
}));

// Defines the relations for the leaders table, specifying that a leader has one position
export const leadersRelations = relations(leaders, ({ one }) => ({
  position: one(position, {
    fields: [leaders.positionId],
    references: [position.id],
  }),
}));

// Defines the relations for the users table, specifying that a user can have many testimonies and clubs
export const userRelations = relations(users, ({ many }) => ({
  testimonies: many(testimonies),
  userClub: many(userClub),
}));

// Defines the relations for the testimonies table, specifying that a testimony belongs to one user
export const testimoniesRelations = relations(testimonies, ({ one }) => ({
  user: one(users, {
    fields: [testimonies.userId],
    references: [users.id],
  }),
}));

// Defines the relations for the clubs table, specifying that a club has one vision and mission
export const clubsRelations = relations(clubs, ({ one, many }) => ({
  visionMission: one(visionMission, {
    fields: [clubs.visionMissionID],
    references: [visionMission.id],
  }),
  userClub: many(userClub),
  events: many(events),
}));

// Defines the relations for the events table, specifying that an event belongs to one club
export const eventsRelations = relations(events, ({ one }) => ({
  clubs: one(clubs, {
    fields: [events.clubID],
    references: [clubs.id],
  }),
}));

// Defines the relations for the vision_mission table, specifying that a vision and mission can belong to one club
export const visionMissionRelations = relations(visionMission, ({ one }) => ({
  clubs: one(clubs),
}));
