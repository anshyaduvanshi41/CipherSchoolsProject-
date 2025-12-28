import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
