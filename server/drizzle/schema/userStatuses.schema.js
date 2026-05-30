const { jsonb } = require("drizzle-orm/pg-core");
const {
  pgTable,
  uuid,
  varchar,
  text,
} = require("drizzle-orm/pg-core");

export const userStatuses = pgTable("user_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  statusName: varchar("status_name", { length: 50 }).notNull().unique(),
  description: text("description"),
});