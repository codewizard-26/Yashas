const {users} = require("./user.schema.js");
const {organization} = require("./organization.schema.js");
const {} = require("./");

const {
  PgTable,
  uuid,
  date,
  boolean,
  timestamp,
  
} = require("drizzle-orm/pg-core");

export const OrganizationMembers = pgTable("OrganizationMembers",{
  id: uuid("id").defaultRandom().primaryKey(),
  userid: uuid("user_id").reference(() => usersid.id).notNull(),
  organizationid: uuid("organization_id").reference(() => organizationid.id).notNull(),
  organizationRoleid: uuid("organization_role_id").reference(() => organizationRoleid.id).notNull(),
  controllevelid: uuid("control_level_id").reference(() => control_level_id.id).notNull(),
  startdate: date("start_date"),
  enddate: date("end_date"),
  isActive: boolean("is_active"),
  createdAt: timestamp("created_at").defaultNow(),
})
