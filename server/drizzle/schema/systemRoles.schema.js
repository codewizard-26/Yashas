const {
  pgTable,
  uuid,
  varchar,
  text,
} = require("drizzle-orm/pg-core");

export const systemRoles = pgTable("system_roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  roleName: varchar("role_name", { length: 50 }).notNull().unique(),
  description: text("description"),
});