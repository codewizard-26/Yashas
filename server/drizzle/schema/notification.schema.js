const { users } = require("./user.schema");
const { notificationTypes } = require("./notificationType.schema");
const {
    pgTable,
    uuid,
    varchar,
    text,
    boolean,
    timestamp,
    json,
} = require("drizzle-orm/pg-core");

const notifications = pgTable("notifications", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    actorId: uuid("actor_id").references(() => users.id),
    notificationTypeId: uuid("notification_type_id").references(() => notificationTypes.id).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    metadata: json("metadata"),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

module.exports = { notifications };