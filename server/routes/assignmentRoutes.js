import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("Fetching assignments from database...");
    const assignments = await Assignment.find({});
    console.log(`Found ${assignments.length} assignments`);
    res.json(assignments);
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;