const {organizations } = require("./organization.schema");
const {
    pgTable,
    uuid,
    text,
    timestamp
} = require("drizzle-orm/pg-core");;

const organizationRefreshTokens = pgTable("organization_refresh_tokens", {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
    token: text("token").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    expiresAt: timestamp("expires_at").notNull(),
});

module.exports = {organizationRefreshTokens};