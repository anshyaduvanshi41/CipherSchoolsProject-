import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const getHintFromLLM = async prompt => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });
  return res.choices[0].message.content;
};