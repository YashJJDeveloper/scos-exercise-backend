import dotenv from "dotenv";
console.log("🔥 DATABASE_URL VALUE:", process.env.DATABASE_URL);
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;


export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false, // required on Render
  },
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch(err => console.error("❌ DB Connection Error", err));

export default pool;