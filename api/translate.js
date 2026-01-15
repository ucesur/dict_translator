import axios from "axios";
import { getCache, setCache } from "./_cache.js";

import axios from "axios";

export default async function handler(req, res) {
  try {
    return res.status(200).json({
      ok: true,
      message: "translate endpoint works"
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

/*
export default async function handler(req, res) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "TV UI translation engine" },
          { role: "user", content: "Translate: Hello" }
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

    res.status(200).json({
      result: response.data.choices[0].message.content
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
}*/

