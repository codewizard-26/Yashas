const { events } = require("./events.schema");
const { users } = require("./user.schema");
const {
  pgTable,
  uuid,
  timestamp,
} = require("drizzle-orm/pg-core");

const eventParticipants = pgTable("event_participants", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    eventId: uuid("event_id").references(() => events.id).notNull(),
    joinedAt: timestamp("joined_at", ).defaultNow()
});

module.exports = {eventParticipants};