const { users } = require("./user.scehma");
const {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} = require("drizzle-orm/pg-core");

const notifications = pgTable("notification", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    title: varchar("title", { length: 255, }).notNull(),
    messages: text("messages").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow()
});

module.exports = { notifications };
