const {users} = require("./");
const {} = require("./");
const {} = require("./");

const {
  PgTable,
  uuid,
  date,
  boolean,
  timestamp,
  
} = require("drizzle-orm/pg-core");

export const OrganisationMembers = pgTable("OrganisationMembers",{
  id: uuid("id").defaultRandom().primaryKey(),
  userid: uuid("user_id").reference(() => userid.id).notNull(),
  organisationid: uuid("organisation_id").reference(() => organisationid.id).notNull(),
  organisationRoleid: uuid("organisation_role_id").reference(() => organisationRoleid.id).notNull(),
  controllevelid: uuid("control_level_id").reference(() => control_level_id.id).notNull(),
  startdate: date("start_date"),
  enddate: date("end_date"),
  isActive: boolean("is_active"),
  createdAt: timestamp("created_at").defaultNow(),
})
