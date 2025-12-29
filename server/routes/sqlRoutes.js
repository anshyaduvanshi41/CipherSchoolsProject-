import express from "express";
import { executeSQL } from "../controllers/sqlController.js";
import { getHint } from "../controllers/hintController.js";

const router = express.Router();

/**
 * POST /api/sql/execute
 * Execute a SQL query against PostgreSQL sandbox
 * Body: { query: "SELECT * FROM users" }
 * Response: Array of rows or error
 */
router.post("/execute", async (req, res) => {
  try {
    await executeSQL(req, res);
  } catch (error) {
    console.error("SQL execute error:", error);
    res.status(500).json({
      error: "Internal server error: " + error.message
    });
  }
});

/**
 * POST /api/sql/hint
 * Get an AI-generated hint for a SQL query
 * Body: { question, query/userQuery, schema? }
 * Response: { hint: "hint text" }
 */
router.post("/hint", async (req, res) => {
  try {
    await getHint(req, res);
  } catch (error) {
    console.error("Hint error:", error);
    res.status(500).json({
      error: "Internal server error: " + error.message
    });
  }
});

export default router;