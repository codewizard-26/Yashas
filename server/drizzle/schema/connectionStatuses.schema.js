const {
  pgTable,
  uuid,
  varchar,
  text,
} = require("drizzle-orm/pg-core");

export const connectionStatuses = pgTable("connection_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  statusName: varchar("status_name", { length: 50 }).notNull().unique(),
  description: text("description"),
});