const {
  pgTable,
  uuid,
  varchar,
  text,
} = require("drizzle-orm/pg-core");

export const organizationTypes = pgTable("organisation_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  typeName: varchar("type_name", { length: 50 }).notNull().unique(),
  description: text("description"),
});