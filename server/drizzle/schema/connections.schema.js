const { connectionStatuses } = require("./connectionStatuses.schema");
const { users } = require("./user.schema");
const {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  json,
  timestamp,
} = require("drizzle-orm/pg-core");

const connections = pgTable("connections", {
    id: uuid("id").defaultRandom().primaryKey(),
    senderId: uuid("sender_id").references(() => users.id).notNull(),
    recieverId: uuid("reciever_id").references(() => users.id).notNull(),
    connectionStatusId: uuid("connection_status_id").references(() => connectionStatuses.id).notNull(),
    createdAt: timestamp("created_at", ).defaultNow()
});

module.exports = { connections };
