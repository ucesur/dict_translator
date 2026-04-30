# dict_translator

A serverless REST API that translates TV Broadcasting / Set-Top Box UI text into multiple target languages using OpenAI's GPT API. Designed for deployment on Vercel.

## Features

- Translates UI strings into one or more target languages in a single request
- Optimised for TV/STB terminology (short, UI-friendly output, no explanations)
- Enforced terminology mappings (e.g. "Recording" → "Kayıt")
- JSON response, deterministic output (temperature 0)
- CORS-enabled — compatible with Flutter Web and browser clients
- In-memory cache module included

## Endpoints

### `POST /api/translate`

Translates the given text into the specified target languages.

**Request body**

```json
{
  "text": "Recording",
  "targetLangs": ["Turkish", "German"]
}
```

**Response**

```json
{
  "result": "{ \"Turkish\": \"Kayıt\", \"German\": \"Aufnahme\" }"
}
```

**Error responses**

| Status | Meaning |
|--------|---------|
| 400 | Missing `text` or `targetLangs` |
| 405 | Wrong HTTP method |
| 500 | Server error / missing API key |

### `GET /api/health`

Returns `200 OK` — used for uptime monitoring.

## Getting started

### Prerequisites

- Node.js 18+
- An OpenAI API key
- [Vercel CLI](https://vercel.com/docs/cli) for local development

### Install dependencies

```bash
npm install
```

### Environment variables

| Variable | Description |
|----------|-------------|
| `CLIENT_DICT_TRA` | OpenAI API key (required) |

For local development, create a `.env` file or set the variable in your shell:

```bash
export CLIENT_DICT_TRA=sk-...
```

### Run locally

```bash
vercel dev
```

### Deploy to Vercel

```bash
vercel deploy
```

Set `CLIENT_DICT_TRA` in the Vercel dashboard under **Settings → Environment Variables**.

## Project structure

```
api/
  translate.js   # POST /api/translate — main translation logic
  health.js      # GET  /api/health   — uptime check
  _cache.js      # In-memory cache helpers (getCache / setCache)
package.json
```

## Translation behaviour

- **Model:** `gpt-4.1-mini`
- **Temperature:** 0 (deterministic)
- **Context:** TV Broadcasting / Set-Top Box UI end-user text
- **Style:** short, clear, no explanations, polite tone

### Mandatory terminology (English → Turkish)

| English | Turkish |
|---------|---------|
| Recording | Kayıt |
| Analogue services | Analog servisler |
| Timer | Zamanlayıcı |
| Reminder | Hatırlatıcı |

## License

MIT
