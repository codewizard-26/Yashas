const { users } = require("./user.scehma");
const { documentTypes } = require("./documentTypes.schema");
const {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  json,
  timestamp,
} = require("drizzle-orm/pg-core");

export const documents = pgTable("documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    documentTypeId: uuid("document_type_id").references(() => documentTypes.id).notNull(),
    title: varchar("title", {length: 255}).notNull(),
    description: text("description"),
    file_url: text("file_url").notNull(),
    uploadedAt: timestamp("uploaded_at", ).defaultNow()
});
