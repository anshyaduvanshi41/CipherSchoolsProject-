import express from "express";
import { executeSQL } from "../controllers/sqlController.js";
import { getHint } from "../controllers/hintController.js";

const router = express.Router();
router.post("/execute", executeSQL);
router.post("/hint", getHint);
export default router;