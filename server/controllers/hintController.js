import { getHintFromLLM } from "../utils/llm.js";

export const getHint = async (req, res) => {
  try {
    const { question, userQuery, query, schema } = req.body;

    // Use userQuery or query (handle both parameter names)
    const sqlQuery = userQuery || query;

    if (!question || !sqlQuery) {
      return res.status(400).json({ 
        error: 'Question and query are required' 
      });
    }

    const prompt = `You are a SQL tutor. The student is trying to solve this question:

Question: ${question}

${schema ? `Database Schema: ${schema}` : ''}

Their current SQL query attempt: ${sqlQuery}

Provide a helpful hint to guide them toward the correct solution. Be concise and educational, not giving away the complete answer.`;

    const hint = await getHintFromLLM(prompt);

    res.json({ hint });
  } catch (error) {
    console.error('Error getting hint:', error);
    res.status(500).json({ 
      error: 'Failed to generate hint: ' + error.message 
    });
  }
};
