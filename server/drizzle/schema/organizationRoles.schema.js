const {
    pgTable,
    uuid,
    text,
    varchar,

} = require("drizzle-orm/pg-core");

export const organizationRole = pgTable("organizationRole",{
    id: uuid("id").defaultRandom().primaryKey(),
    roleName: varchar("role_name",{length: 255,}).notNull(),
    description: text("description"),

})