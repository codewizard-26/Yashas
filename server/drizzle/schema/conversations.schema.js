const { users } = require("./user.schema");
const {
    pgTable,
    uuid,
    timestamp,
} = require("drizzle-orm/pg-core");

const conversations = pgTable("conversations", {
    id: uuid("id").defaultRandom().primaryKey(),
    user1Id: uuid("user1_id").references(() => users.id).notNull(),
    user2Id: uuid("user2_id").references(() => users.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

module.exports = { conversations };