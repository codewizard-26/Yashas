const { events } = require("./events.schema");
const { users } = require("./user.schema");
const {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
} = require("drizzle-orm/pg-core");

const media = pgTable("media", {
    id: uuid("id").defaultRandom().primaryKey(),
    uploadedByUserId: uuid("uploaded_by_user_id").references(() => users.id).notNull(),
    eventId: uuid("event_id").references(() => events.id).notNull(),
    fileUrl: text("file_url").notNull(),
    mediaType: varchar("media_type", {length: 255}).notNull(),
    caption: text("caption"),
    createdAt: timestamp("created_at", ).defaultNow()
});

module.exports = {media};