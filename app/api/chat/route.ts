import { NextRequest } from "next/server";
import { getClient, retrieve, CHAT_MODEL } from "@/lib/rag";
import { OWNER } from "@/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

function systemPrompt(context: string): string {
  return `You are the AI assistant on ${OWNER.name}'s portfolio website. You answer visitors' questions about ${OWNER.name} — his experience, projects, skills, and career.

Rules:
- Answer ONLY from the CONTEXT below. It is retrieved from ${OWNER.name}'s knowledge base for this specific question.
- If the context does not contain the answer, say so plainly and suggest what you can talk about (his projects, skills, or experience). Never invent facts, dates, or numbers.
- Write in third person about ${OWNER.name} ("he", "his"). Be concise, warm, and specific — like a sharp colleague hyping a friend, not a marketing brochure.
- Prefer concrete details (numbers, tech, results) that are in the context.
- Keep answers to 2-4 short paragraphs at most. Use plain language.

CONTEXT:
${context}`;
}

export async function POST(req: NextRequest) {
  let messages: Msg[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "messages required" }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "invalid JSON" }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return Response.json({ error: "no user message" }, { status: 400 });
  }

  try {
    const retrieved = await retrieve(lastUser.content, 4);
    const context = retrieved
      .map((c, i) => `[${i + 1}] (${c.category} — ${c.title})\n${c.content}`)
      .join("\n\n");

    const sources = retrieved.map((c) => ({
      title: c.title,
      category: c.category,
      score: Number(c.score.toFixed(3)),
    }));

    const history = messages.slice(-6).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const stream = await getClient().models.generateContentStream({
      model: CHAT_MODEL,
      contents: history,
      config: {
        systemInstruction: systemPrompt(context),
        temperature: 0.4,
        maxOutputTokens: 800,
      },
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          controller.enqueue(
            encoder.encode("\n\n[The assistant hit an error mid-response.]")
          );
          console.error("stream error", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "x-rag-sources": Buffer.from(JSON.stringify(sources)).toString("base64"),
      },
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : "unknown error";
    console.error("chat error", err);
    const friendly = /API[_ ]?KEY|api key/i.test(raw)
      ? "The Gemini API key is missing or invalid. Add a valid GEMINI_API_KEY to .env.local (free key at https://aistudio.google.com/apikey) and restart the dev server."
      : "The assistant couldn't reach the model. Please try again in a moment.";
    return Response.json({ error: friendly }, { status: 500 });
  }
}
