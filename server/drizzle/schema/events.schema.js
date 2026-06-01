const {organizations} = require("./organization.schema.js");
const {organizationMembers} = require("./organizationMembers.schema.js");
const {
  pgTable,
  uuid,
  date,
  varchar,
  json,
  text,
  timestamp,
} = require("drizzle-orm/pg-core");

const events = pgTable("events",{
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  createdByMemberId: uuid("created_by_member_id").references(() => organizationMembers.id).notNull(),
  title: varchar("title", {length : 255, }).notNull(),
  description: text("description"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  location: varchar("location", { length: 255, }).notNull(),
  bannerUrl: text("banner_url"),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = {events}