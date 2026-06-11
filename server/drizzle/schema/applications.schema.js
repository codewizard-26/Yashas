const { jobs } = require("./jobs.schema");
const { users } = require("./user.scehma");
const { applicationStatuses } = require("./applicationStatuses.schema");

const {
    pgTable,
    uuid,
    timestamp,
} = require("drizzle-orm/pg-core");

const applications = pgTable("applications",{
    id: uuid("id").defaultRandom().primaryKey(),
    jobId: uuid("job_id").references(() => jobs.id).notNull(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    applicationStatusId: uuid("application_status_id").references(() => applicationStatuses.id).notNull(),
    appliedAt: timestamp("applied_at").defaultNow(),
});

module.exports = { applications };