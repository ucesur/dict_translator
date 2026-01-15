const axios = require("axios");

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
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    if (!process.env.CLIENT_DICT_TRA) {
      return res.status(500).json({ error: "CLIENT_DICT_TRA missing" });
    }

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

    const content = response.data.choices[0].message.content;

    return res.status(200).json({ result: content });

  } catch (err) {
    console.error("TRANSLATE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
