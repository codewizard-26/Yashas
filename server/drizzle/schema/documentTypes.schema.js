const {
  pgTable,
  uuid,
  varchar,
  text,
} = require("drizzle-orm/pg-core");

const documentTypes = pgTable("document_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  typeName: varchar("type_name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

module.exports = { documentTypes };