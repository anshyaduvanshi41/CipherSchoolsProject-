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

    const prompt = `You are a helpful SQL tutor. The student is trying to solve this SQL problem:

Question: ${question}

${schema ? `Database Schema: ${schema}` : ''}

Their current SQL query attempt:
\`\`\`sql
${sqlQuery}
\`\`\`

Provide a helpful, educational hint to guide them toward the correct solution. 
Be concise (2-3 sentences max), point out logical issues if any, and suggest what they should research or try next.
DO NOT provide the complete solution or the actual SQL answer.`;

    const hint = await getHintFromLLM(prompt);
    
    if (!hint) {
      return res.status(500).json({
        error: 'Failed to generate hint from LLM'
      });
    }

    res.json({ hint });

  } catch (error) {
    console.error('Error getting hint:', error);
    res.status(500).json({
      error: 'Failed to generate hint: ' + error.message
    });
  }
};