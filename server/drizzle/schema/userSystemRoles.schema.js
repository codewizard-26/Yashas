const { users } = require("./user.schema");
const { systemRoles } = require("./systemRoles.schema")
const {
  pgTable,
  uuid,
  timestamp,
} = require("drizzle-orm/pg-core");

const userSystemRoles = pgTable("userSystemRoles", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    systemRoleId: uuid("system_role_id").references(() => systemRoles.id).notNull(),
    assignedAt: timestamp("assigned_at", ).defaultNow()
});

module.exports = { userSystemRoles };