const {users} = require("./user.schema");
const {organizations} = require("./organization.schema");
const {
    pgTable,
    uuid,
    varchar,
    text,
    jsonb,
    boolean,
    timestamp,
} = require("drizzle-orm/pg-core");

const jobs = pgTable("jobs",{
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
    postedbyMemberId: uuid("posted_by_member_id").references(() => users.id).notNull(),
    title: varchar("title",{length: 255,}).notNull(),
    description: text("description"),
    location: varchar("location",{length: 255,}),
    salaryRange: jsonb("salary_range"),
    requirements: jsonb("requirements"),
    isOpen: boolean("is_open").default(true).notNull(),
    appllicationDeadline: timestamp("application_deadline"),
    createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { jobs };
