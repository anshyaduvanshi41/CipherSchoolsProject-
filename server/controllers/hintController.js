import { getHintFromLLM } from "../utils/llm.js";

export const getHint = async (req, res) => {
  const { question, schema, userQuery } = req.body;
  const prompt = `SQL tutor. Question: ${question}. Schema: ${schema}. UserQuery: ${userQuery}. Give hint only.`;
  const hint = await getHintFromLLM(prompt);
  res.json({ hint });
};