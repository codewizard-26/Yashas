const {
    pgTable,
    uuid,
    varchar
} = require("drizzle-orm/pg-core");

const notificationTypes = pgTable("notification_types", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 50 }).notNull().unique(),
});

module.exports = { notificationTypes };