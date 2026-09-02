import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  integer,
  pgEnum,
  pgSchema,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

const identity = (name: string) =>
  bigint(name, { mode: "number" }).primaryKey().generatedAlwaysAsIdentity();

export const clubStatus = pgEnum("club_status", ["active", "inactive"]);
export const memberStatus = pgEnum("member_status", ["pending", "active", "inactive", "rejected"]);
export const registrationStatus = pgEnum("registration_status", ["open", "closed", "full", "not_required"]);
export const projectStatus = pgEnum("project_status", ["concept", "active", "completed"]);
export const publicationStatus = pgEnum("publication_status", ["draft", "published"]);
export const privateSchema = pgSchema("private");

export const media = pgTable("media", {
  id: identity("id"),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  width: integer("width"),
  height: integer("height"),
  credit: text("credit"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sponsors = pgTable("sponsors", {
  id: identity("id"),
  logo: text("logo"),
  name: text("name").notNull(),
});

export const awardsAndAchievements = pgTable("awards_and_achievements", {
  id: identity("id"),
  title: text("title").notNull(),
  description: text("description"),
  awardDate: text("award_date").notNull(),
});

export const coreValues = pgTable("core_values", {
  id: identity("id"),
  value: text("value").notNull().unique(),
  description: text("description"),
});

export const heroPage = pgTable("hero_page", {
  id: identity("id"),
  section: text("section").notNull().unique(),
  heading: text("heading").notNull(),
  subheading: text("subheading").notNull(),
  description: text("description").notNull(),
  backgroundImg: text("background_img").notNull(),
});

export const position = pgTable("position", {
  id: identity("id"),
  title: text("title").notNull().unique(),
});

export const leaders = pgTable(
  "leaders",
  {
    id: identity("id"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    positionId: bigint("position_id", { mode: "number" })
      .notNull()
      .references(() => position.id, { onDelete: "restrict" }),
    year: text("year").notNull(),
    facebook: text("facebook"),
    linkedIn: text("linkedin"),
    instagram: text("instagram"),
    twitter: text("twitter"),
    imageURL: text("image_url").notNull().default(""),
  },
  (table) => [index("leaders_position_id_idx").on(table.positionId)]
);

export const clubs = pgTable(
  "clubs",
  {
    id: identity("id"),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull().default(""),
    description: text("description"),
    vision: text("vision"),
    mission: text("mission"),
    disciplines: text("disciplines").array().notNull().default(sql`'{}'::text[]`),
    skillLevels: text("skill_levels").array().notNull().default(sql`'{}'::text[]`),
    schedule: text("schedule"),
    location: text("location"),
    eligibility: text("eligibility"),
    status: clubStatus("status").notNull().default("active"),
    introVidId: text("intro_video_id").notNull().default(""),
    coverMediaId: bigint("cover_media_id", { mode: "number" }).references(() => media.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("clubs_slug_uidx").on(table.slug),
    index("clubs_cover_media_id_idx").on(table.coverMediaId),
  ]
);

export const members = pgTable(
  "members",
  {
    id: identity("id"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    clubInterest: text("club_interest").notNull(),
    message: text("message"),
    status: memberStatus("status").notNull().default("pending"),
    registeredAt: timestamp("registered_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("members_email_uidx").on(table.email)]
);

export const membershipRateLimits = privateSchema.table("membership_rate_limits", {
  keyHash: text("key_hash").primaryKey(),
  windowStartedAt: timestamp("window_started_at", { withTimezone: true }).notNull().defaultNow(),
  attempts: integer("attempts").notNull().default(1),
});

export const memberClub = pgTable(
  "member_club",
  {
    memberId: bigint("member_id", { mode: "number" }).notNull().references(() => members.id, { onDelete: "cascade" }),
    clubId: bigint("club_id", { mode: "number" }).notNull().references(() => clubs.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.memberId, table.clubId] }),
    index("member_club_club_id_idx").on(table.clubId),
  ]
);

export const testimonials = pgTable(
  "testimonials",
  {
    id: identity("id"),
    memberId: bigint("member_id", { mode: "number" }).notNull().references(() => members.id, { onDelete: "cascade" }),
    testimony: text("testimony").notNull(),
    postedOn: timestamp("posted_on", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("testimonials_member_id_idx").on(table.memberId)]
);

export const events = pgTable(
  "events",
  {
    id: identity("id"),
    slug: text("slug").notNull(),
    clubId: bigint("club_id", { mode: "number" }).references(() => clubs.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    summary: text("summary").notNull().default(""),
    description: text("description"),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    location: text("location"),
    onlineUrl: text("online_url"),
    registrationUrl: text("registration_url"),
    registrationStatus: registrationStatus("registration_status").notNull().default("not_required"),
    coverMediaId: bigint("cover_media_id", { mode: "number" }).references(() => media.id, { onDelete: "set null" }),
    addedOn: timestamp("added_on", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("events_slug_uidx").on(table.slug),
    index("events_club_id_idx").on(table.clubId),
    index("events_cover_media_id_idx").on(table.coverMediaId),
    index("events_starts_at_idx").on(table.startsAt),
  ]
);

export const projects = pgTable(
  "projects",
  {
    id: identity("id"),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    problem: text("problem").notNull(),
    solution: text("solution").notNull(),
    impact: text("impact").notNull(),
    year: integer("year").notNull(),
    status: projectStatus("status").notNull().default("concept"),
    publicationStatus: publicationStatus("publication_status").notNull().default("draft"),
    techStack: text("tech_stack").array().notNull().default(sql`'{}'::text[]`),
    clubId: bigint("club_id", { mode: "number" }).references(() => clubs.id, { onDelete: "set null" }),
    repositoryUrl: text("repository_url"),
    demoUrl: text("demo_url"),
    coverMediaId: bigint("cover_media_id", { mode: "number" }).references(() => media.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("projects_slug_uidx").on(table.slug),
    index("projects_club_id_idx").on(table.clubId),
    index("projects_cover_media_id_idx").on(table.coverMediaId),
    index("projects_publication_status_idx").on(table.publicationStatus),
  ]
);

export const projectMedia = pgTable(
  "project_media",
  {
    projectId: bigint("project_id", { mode: "number" }).notNull().references(() => projects.id, { onDelete: "cascade" }),
    mediaId: bigint("media_id", { mode: "number" }).notNull().references(() => media.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.mediaId] }),
    index("project_media_media_id_idx").on(table.mediaId),
  ]
);

export const news = pgTable(
  "news",
  {
    id: identity("id"),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    body: text("body").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    status: publicationStatus("status").notNull().default("draft"),
    coverMediaId: bigint("cover_media_id", { mode: "number" }).references(() => media.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("news_slug_uidx").on(table.slug),
    index("news_cover_media_id_idx").on(table.coverMediaId),
    index("news_status_published_at_idx").on(table.status, table.publishedAt),
  ]
);

export const positionRelations = relations(position, ({ many }) => ({ leaders: many(leaders) }));
export const leadersRelations = relations(leaders, ({ one }) => ({
  position: one(position, { fields: [leaders.positionId], references: [position.id] }),
}));
export const clubsRelations = relations(clubs, ({ one, many }) => ({
  coverMedia: one(media, { fields: [clubs.coverMediaId], references: [media.id] }),
  memberClubs: many(memberClub),
  events: many(events),
  projects: many(projects),
}));
export const membersRelations = relations(members, ({ many }) => ({
  memberClubs: many(memberClub),
  testimonials: many(testimonials),
}));
export const memberClubRelations = relations(memberClub, ({ one }) => ({
  member: one(members, { fields: [memberClub.memberId], references: [members.id] }),
  club: one(clubs, { fields: [memberClub.clubId], references: [clubs.id] }),
}));
export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  member: one(members, { fields: [testimonials.memberId], references: [members.id] }),
}));
export const eventsRelations = relations(events, ({ one }) => ({
  club: one(clubs, { fields: [events.clubId], references: [clubs.id] }),
  coverMedia: one(media, { fields: [events.coverMediaId], references: [media.id] }),
}));
export const projectsRelations = relations(projects, ({ one, many }) => ({
  club: one(clubs, { fields: [projects.clubId], references: [clubs.id] }),
  coverMedia: one(media, { fields: [projects.coverMediaId], references: [media.id] }),
  gallery: many(projectMedia),
}));
export const projectMediaRelations = relations(projectMedia, ({ one }) => ({
  project: one(projects, { fields: [projectMedia.projectId], references: [projects.id] }),
  media: one(media, { fields: [projectMedia.mediaId], references: [media.id] }),
}));
export const newsRelations = relations(news, ({ one }) => ({
  coverMedia: one(media, { fields: [news.coverMediaId], references: [media.id] }),
}));
