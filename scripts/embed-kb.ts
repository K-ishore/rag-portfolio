// Precompute embeddings for every knowledge-base chunk and write them to
// lib/embeddings.json. Run this whenever you edit lib/knowledge.ts:
//
//   npm run embed
//
// The committed JSON means the deployed site never re-embeds the whole KB on
// a cold start — it only embeds the visitor's question at query time.

import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync } from "node:fs";
import { KNOWLEDGE } from "../lib/knowledge.ts";

const EMBED_MODEL = "gemini-embedding-001";

function loadKey(): string {
  // Read GEMINI_API_KEY from .env.local without pulling in extra deps.
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const key = env.match(/^GEMINI_API_KEY=(.+)$/m)?.[1]?.trim();
  if (!key) throw new Error("GEMINI_API_KEY not found in .env.local");
  return key;
}

async function main() {
  const ai = new GoogleGenAI({ apiKey: loadKey() });
  const out: { id: string; vector: number[] }[] = [];

  for (const chunk of KNOWLEDGE) {
    const res = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: `${chunk.title}\n${chunk.content}`,
    });
    const vector = res.embeddings?.[0]?.values;
    if (!vector) throw new Error(`Embedding failed for chunk "${chunk.id}"`);
    out.push({ id: chunk.id, vector });
    console.log(`  embedded ${chunk.id} (${vector.length} dims)`);
  }

  const dest = new URL("../lib/embeddings.json", import.meta.url);
  writeFileSync(dest, JSON.stringify(out));
  console.log(`\n✓ Wrote ${out.length} embeddings to lib/embeddings.json`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
