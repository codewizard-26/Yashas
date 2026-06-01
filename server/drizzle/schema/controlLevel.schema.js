const {
    pgTable,
    uuid,
    integer,
    varchar,
    text,
} = require("drizzle-orm/pg-core");

const controlLevel = pgTable("controlLevel",{
    id: uuid("id").defaultRandom().primaryKey(),
    levelName: varchar("level_name",{length: 255,}).notNull(),
    hierarchyRank: integer("hierarchy_rank").notNull(),
    description: text("description"),
})

module.exports = { controlLevel };