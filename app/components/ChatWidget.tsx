"use client";

import { useRef, useState, useEffect } from "react";

type Source = { title: string; category: string; score: number };
type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const SUGGESTIONS = [
  "What is the POS Expert Assistant?",
  "What are Kishore's AI skills?",
  "How does his RAG pipeline work?",
  "Why is he moving into Applied AI?",
];

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const next: Message[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || "Request failed");
      }

      let sources: Source[] = [];
      const header = res.headers.get("x-rag-sources");
      if (header) {
        try {
          // Decode base64 as UTF-8 so multi-byte chars (em dashes, etc.) survive.
          const bytes = Uint8Array.from(atob(header), (c) => c.charCodeAt(0));
          sources = JSON.parse(new TextDecoder().decode(bytes));
        } catch {}
      }

      setMessages((m) => [...m, { role: "assistant", content: "", sources }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { ...copy[copy.length - 1], content: acc };
          return copy;
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `⚠️ ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface/70 backdrop-blur shadow-2xl shadow-black/40 overflow-hidden h-[520px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2/60">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-2 shadow-[0_0_10px] shadow-accent-2" />
        <span className="text-sm font-medium">Ask about Kishore</span>
        <span className="ml-auto text-xs text-muted font-mono">RAG · Gemini</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {empty && (
          <div className="text-sm text-muted animate-fade-up">
            <p className="mb-3">
              Hi 👋 I&apos;m an AI trained on Kishore&apos;s background. Ask me anything —
              I&apos;ll retrieve the answer from his knowledge base and cite what I used.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-surface-2 hover:border-accent hover:text-foreground transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`animate-fade-up ${m.role === "user" ? "flex justify-end" : ""}`}
          >
            {m.role === "user" ? (
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent/15 border border-accent/30 px-4 py-2 text-sm">
                {m.content}
              </div>
            ) : (
              <div className="max-w-[92%]">
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {m.content ? (
                    m.content
                  ) : (
                    <span className="cursor-blink text-muted">thinking</span>
                  )}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.sources.map((s, j) => (
                      <span
                        key={j}
                        title={`relevance ${s.score}`}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-2 border border-border text-muted"
                      >
                        {s.category} · {s.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="text-sm text-muted cursor-blink animate-fade-up">retrieving</div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border p-3 bg-surface-2/40"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about his projects, skills, experience…"
          className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-background disabled:opacity-40 hover:bg-accent/90 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
