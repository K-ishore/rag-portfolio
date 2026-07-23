# Kishore S — RAG Portfolio

A personal portfolio website where visitors **chat with an AI that answers questions about Kishore** using a real Retrieval-Augmented Generation (RAG) pipeline. The chat retrieves from a knowledge base, ranks by vector similarity, and generates grounded answers with citations.

## How the RAG works

1. **Knowledge base** — `lib/knowledge.ts` holds focused chunks about Kishore (bio, projects, skills, experience).
2. **Indexing** — on first request, every chunk is embedded with Gemini `gemini-embedding-001` and cached in memory (`lib/rag.ts`).
3. **Retrieval** — the incoming question is embedded and ranked against the KB by cosine similarity; the top 4 chunks are selected.
4. **Generation** — those chunks are injected into the system prompt and `gemini-2.5-flash` streams a grounded answer (`app/api/chat/route.ts`).
5. **Citations** — the retrieved sources are returned via the `x-rag-sources` header and shown under each answer.

## Setup

```bash
# 1. Get a free Gemini API key: https://aistudio.google.com/apikey
# 2. Add it to .env.local
echo "GEMINI_API_KEY=your_key_here" > .env.local

# 3. Run
npm run dev
```

Open http://localhost:3000.

## Editing your content

All the text about you lives in **`lib/knowledge.ts`** — edit the `KNOWLEDGE` chunks and the `OWNER` block (name, links, contact). Anything marked `[FILL IN]` needs your real details. No re-indexing step is needed; the KB re-embeds on the next cold start.

The static sections (projects/skills/experience cards) live in `app/page.tsx`.

## Deploy (Vercel)

Push to GitHub, import into Vercel, and set `GEMINI_API_KEY` as an environment variable in the project settings. That's it.

## Stack

Next.js (App Router) · TypeScript · Tailwind v4 · Google Gemini (embeddings + generation).
