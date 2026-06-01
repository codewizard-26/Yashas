const {
  pgTable,
  uuid,
  varchar,
  text,
} = require("drizzle-orm/pg-core");

const organizationVerificationStatuses = pgTable("organization_verification_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  statusName: varchar("status_name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

module.exports = { organizationVerificationStatuses };