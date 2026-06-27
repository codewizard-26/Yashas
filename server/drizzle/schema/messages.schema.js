const { users } = require("./user.schema");
const { conversations } = require("./conversations.schema");

const {
    pgTable,
    uuid,
    text,
    json,
    boolean,
    timestamp,
} = require("drizzle-orm/pg-core");

const messages = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    conversationId: uuid("conversation_id").references(() => conversations.id).notNull(),
    senderId: uuid("sender_id").references(() => users.id).notNull(),
    content: text("content"),
    attachments: json("attachments").default([]),
    isDelivered: boolean("is_delivered").default(false).notNull(),
    isSeen: boolean("is_seen").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

module.exports = { messages };