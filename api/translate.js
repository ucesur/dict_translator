const axios = require("axios");

function buildSystemPromptFromConfig() {
  return `
You are a professional translation engine for TV Broadcasting / Set-Top Box UI.

Audience:
- End-user

Style:
- UI text
- Short sentences
- Clear and direct
- No explanations

Terminology rules (MANDATORY):
- "Recording" → "Kayıt"
- "Analogue services" → "Analog servisler"
- "Timer" → "Zamanlayıcı"
- "Reminder" → "Hatırlatıcı"

Rules:
- Use TV UI friendly short sentences
- Do NOT translate industry terms unnecessarily
- Keep system message tone consistent
- Translate ONLY, do not add comments
- Output ONLY valid JSON
`;
}


module.exports = async function (req, res) {
  // CORS ayarı (Flutter Web için)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // preflight request
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { text, targetLangs } = req.body;

    if (!text || !Array.isArray(targetLangs) || targetLangs.length === 0) {
      return res.status(400).json({ error: "Missing text or targetLangs" });
    }

    if (!text) return res.status(400).json({ error: "Missing text" });

    if (!process.env.CLIENT_DICT_TRA) {
      return res.status(500).json({ error: "CLIENT_DICT_TRA missing" });
    }

    const systemPrompt = buildSystemPromptFromConfig();

    const userPrompt = `
      Translate the following text into:
      ${targetLangs.join(", ")}
    
    Text:
    "${text}"
    `;
    
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
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

/*
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "TV UI translation engine" },
          { role: "user", content: text }
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
*/
    const content = response.data.choices[0].message.content;

    return res.status(200).json({ result: content });

  } catch (err) {
    console.error("TRANSLATE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
