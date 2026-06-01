const {users} = require("./user.scehma.js");
const {organizations} = require("./organization.schema.js");
const {organizationRole} = require("./organizationRoles.schema.js");
const {controlLevel} = require("./controlLevel.schema.js");
const {
  pgTable,
  uuid,
  date,
  boolean,
  timestamp,
} = require("drizzle-orm/pg-core");

const organizationMembers = pgTable("organizationMembers",{
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  organizationRoleId: uuid("organization_role_id").references(() => organizationRole.id).notNull(),
  controllevelId: uuid("control_level_id").references(() => controlLevel.id).notNull(),
  startdate: date("start_date"),
  enddate: date("end_date"),
  isActive: boolean("is_active"),
  createdAt: timestamp("created_at").defaultNow(),
})

module.exports = { organizationMembers };