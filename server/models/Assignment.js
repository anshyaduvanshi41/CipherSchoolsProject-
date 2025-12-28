import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    question: String,
    sampleTables: Array,
    createdAt: Date
  },
  {
    collection: "assignments" // 🔥 EXACT MongoDB collection name
  }
);

export default mongoose.model("Assignment", assignmentSchema);
