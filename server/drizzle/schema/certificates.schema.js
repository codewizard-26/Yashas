const {users} = require("./user.schema.js");
const {organizations} = require("./organization.schema.js");
const {verificationStatuses} = require("./verificationStatuses.schema.js")
const {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  timestamp,
} = require("drizzle-orm/pg-core");

const certificates = pgTable("certificates",{
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  issuerOrganizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  title: varchar("title", {length : 255, }).notNull(),
  description: text("description"),
  issueDate: date("issue_date"),
  CredentialId: varchar("credential_id", {length: 255}),
  fileUrl: text("file_url"),
  verificationStatusesId: uuid("verification_statuses_id").references(() => verificationStatuses.id).notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

module.exports = {certificates};