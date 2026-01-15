import axios from "axios";
import { getCache, setCache } from "./_cache.js";

export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString()
  });
}
/*
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, targetLangs } = req.body;

  if (!text || !targetLangs) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const cacheKey = text + "|" + targetLangs.join(",");

  // 🔁 CACHE
  const cached = getCache(cacheKey);
  if (cached) {
    return res.json({
      source: "cache",
      translations: cached
    });
  }

  // 🧠 PROMPT
  const prompt = `
You are a TV UI translation engine.

Rules:
- Short UI-friendly sentences
- Broadcasting terminology
- End-user tone

Translate the text into:
${targetLangs.join(", ")}

Text:
"${text}"

Return JSON only.
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "TV UI translation engine" },
          { role: "user", content: prompt }
        ],
        temperature: 0
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLIENT_DICT_TRA}`,
          "Content-Type": "application/json"
        }
      }
    );

    const result = JSON.parse(
      response.data.choices[0].message.content
    );

    setCache(cacheKey, result);

    return res.json({
      source: "api",
      translations: result
    });

  } catch (err) {
    return res.status(500).json({
      error: "Translation failed"
    });
  }
}*/
