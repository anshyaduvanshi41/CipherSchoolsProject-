import { pool } from "../db/postgres.js";
import { validateSQL } from "../utils/validateSQL.js";

export const executeSQL = async (req, res) => {
  const { query } = req.body;
  if (!validateSQL(query)) return res.status(400).json({ error: "Invalid SQL" });
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};