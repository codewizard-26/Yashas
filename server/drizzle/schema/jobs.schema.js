const {organizationMembers} = require("./organizationMembers.schema");

const {
    pgTable,
    uuid,
    varchar,
    text,
    jsonb,
    timestamp,
} = require("drizzle-orm/pg-core");

const jobs = pgTable("jobs",{
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id").references(() => organizationMembers.id).notNull(),
    postedbyMemberId: uuid("posted_by_member_id").references(() => organizationMembers.id),
    title: varchar("title",{length: 255,}).notNull(),
    description: text("description"),
    location: varchar("location",{length: 255,}),
    salaryRange: jsonb("salary_range"),
    requirements: jsonb("requirements"),
    appllicationDeadline: timestamp("application_deadline"),
    createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { jobs };
