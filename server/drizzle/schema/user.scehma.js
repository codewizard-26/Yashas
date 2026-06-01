const { userStatuses } = require("./userStatuses.schema");
const {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  timestamp,
} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255, }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255, }).notNull(),
  phone: varchar("phone", { length: 20, }).notNull(),
  profilePhoto: text("profilePhoto", ).notNull(),
  bio: text("bio", ),
  location: varchar("location", { length: 255, }).notNull(),
  skills: jsonb("skills", ),
  projects: jsonb("projects", ),
  socialLinks: jsonb("social_links", ),
  aiProfile: jsonb("ai_profile", ),
  userStatusId: uuid("user_status_id").references(() => userStatuses.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

module.exports = { users };