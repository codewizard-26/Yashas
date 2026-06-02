const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const schema = require("../drizzle/schema");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

const connectDB = async () => {
  try {
    const client = await pool.connect();

    console.log("✅ PostgreSQL Connected");

    client.release();
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = {
  db,
  connectDB,
};