import pool from "../../db/index.js";
import * as Q from "../user-institute-roles/sql/uir.queries.js";
console.log("🔥 DB URL inside repo:", process.env.DATABASE_URL);
export const getUserByEmail = async (email) => {
  const { rows } = await pool.query(Q.GET_USER_BY_EMAIL, [email]);
  return rows[0];
};
