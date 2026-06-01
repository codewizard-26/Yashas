const {
  pgTable,
  uuid,
  varchar,
  text,
} = require("drizzle-orm/pg-core");

const verificationStatuses = pgTable("verification_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  statusName: varchar("status_name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

module.exports = {verificationStatuses};