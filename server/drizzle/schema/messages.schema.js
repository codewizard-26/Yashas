const { users } = require("./user.scehma");
const {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  json,
  timestamp,
} = require("drizzle-orm/pg-core");

const messages = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    senderId: uuid("sender_id").references(() => users.id).notNull(),
    recieverId: uuid("reciever_id").references(() => users.id).notNull(),
    content: text("content").notNull(),
    attachments: json("attachments", ),
    recieved: boolean("recieved", ).notNull(),
    seen: boolean("seen", ).default(false),
    createdAt: timestamp("created_at", ).defaultNow()
});

module.exports = { messages };
