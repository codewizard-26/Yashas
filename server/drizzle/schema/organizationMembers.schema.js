const {users} = require("./user.schema.js");
const {organization} = require("./organization.schema.js");
const {} = require("./");

const {
  pgTable,
  uuid,
  date,
  boolean,
  timestamp,
  
} = require("drizzle-orm/pg-core");

const organizationMembers = pgTable("organizationMembers",{
  id: uuid("id").defaultRandom().primaryKey(),
  userid: uuid("user_id").reference(() => users.id).notNull(),
  organizationid: uuid("organization_id").reference(() => organization.id).notNull(),
  organizationRoleid: uuid("organization_role_id").reference(() => organizationRole.id).notNull(),
  controllevelid: uuid("control_level_id").reference(() => controlLevel.id).notNull(),
  startdate: date("start_date"),
  enddate: date("end_date"),
  isActive: boolean("is_active"),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { organizationMembers };

