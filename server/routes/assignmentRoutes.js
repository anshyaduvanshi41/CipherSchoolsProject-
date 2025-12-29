import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

/**
 * GET /api/assignments
 * Fetch all assignments from MongoDB
 * Query params: difficulty (optional: 'easy', 'medium', 'hard')
 * Response: Array of assignments
 */
router.get("/", async (req, res) => {
  try {
    const { difficulty } = req.query;
    let query = {};
    
    if (difficulty) {
      query.difficulty = { $regex: difficulty, $options: 'i' };
    }

    const assignments = await Assignment.find(query).sort({ createdAt: -1 });
    
    if (!assignments || assignments.length === 0) {
      console.warn("No assignments found in database");
      return res.json([]);
    }

    console.log(`Fetched ${assignments.length} assignments`);
    res.json(assignments);

  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({
      error: "Failed to fetch assignments: " + err.message
    });
  }
});

/**
 * GET /api/assignments/:id
 * Fetch a single assignment by ID
 */

router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({
        error: "Assignment not found"
      });
    }

    res.json(assignment);

  } catch (err) {
    console.error("Error fetching assignment:", err);
    res.status(500).json({
      error: "Failed to fetch assignment: " + err.message
    });
  }
});

export default router;