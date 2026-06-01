const { organizationTypes } = require("./organizationTypes.schema");
const { organizationVerificationStatuses } = require("./organizationVerificationStatuses.schema");
const { users } = require("./user.scehma");
const {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  timestamp,
} = require("drizzle-orm/pg-core");

const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  organozationTypeId: uuid("organization_type_id").references(() => organizationTypes.id).notNull(),
  parentOrganizationId: uuid("parent_organization_id").references(() => organizations.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255, }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255, }).notNull(),
  phone: varchar("phone", { length: 20, }).notNull(),
  address: varchar("address", { length: 255, }).notNull(),
  logo: text("logo", ),
  description: text("description").notNull(),
  website: text("website"),
  organizationVerificationStatusId: uuid("organization_verification_status_id").references(() => organizationVerificationStatuses.id).notNull(),
  verifiedByUserId: uuid("verified_by_user_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  verifiedAt: timestamp("verified_at"),
});

module.exports = { organizations };