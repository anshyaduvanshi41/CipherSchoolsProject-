import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import sqlRoutes from "./routes/sqlRoutes.js";
import { connectMongo } from "./db/mongo.js";

dotenv.config();
connectMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/assignments", assignmentRoutes);
app.use("/api/sql", sqlRoutes);

app.listen(5000, () => console.log("Server running on 5000"));