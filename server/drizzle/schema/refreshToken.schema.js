const { users } = require("./user.scehma");
const {
    pgTable,
    uuid,
    text,
    timestamp
} = require("drizzle-orm/pg-core");;

const refreshTokens = pgTable("refresh_tokens", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    token: text("token").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    expiresAt: timestamp("expires_at").notNull(),
});

module.exports = { refreshTokens };
