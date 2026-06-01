const {certificates} = require("./certificates.schema.js");
const {organizations} = require("./organization.schema.js");
const {organizationMembers} = require("./organizationMembers.schema.js");
const {verificationStatuses} = require("./verificationStatuses.schema.js");
const {
  pgTable,
  uuid,
  date,
  boolean,
  timestamp,
} = require("drizzle-orm/pg-core");

const verificationRequestes = pgTable("verification_request",{
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("certificate_id").references(() => certificates.id).notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  verifiedByMemberId: uuid("verified_by_member_id").references(() => organizationMembers.id).notNull(),
  verificationStatusesId: uuid("verification_status_id").references(() => verificationStatuses.id).notNull(),
  startdate: date("start_date"),
  enddate: date("end_date"),
  isActive: boolean("is_active"),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = {verificationRequestes};