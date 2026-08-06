import ChatWidget from "./components/ChatWidget";
import { OWNER } from "@/lib/knowledge";

const PROJECTS = [
  {
    name: "POS Expert Assistant",
    tag: "Flagship · In production",
    desc: "AI Chrome extension that drafts grounded replies for support agents inside Zoho SalesIQ. A 3-layer system: 100-card deterministic 'Second Brain', hybrid BM25 + vector RAG (RRF) over ~5,900 tickets, and an internal LLM for generation.",
    stack: ["Hybrid RAG", "BM25 + Vector", "Zoho Catalyst", "Python", "Chrome ext"],
    metrics: ["3.76/5 eval", "Beat Zia Studio 12/14", "$0 API cost"],
    repo: "https://github.com/K-ishore/pos-expert-assistant",
  },
  {
    name: "Missed-Chat → Ticket Automation",
    tag: "Zoho Flow · In production",
    desc: "When support agents are already busy, incoming SalesIQ chats get missed with no follow-up. Kishore built an automation that detects these unattended chats and auto-creates a 'missed chat' ticket in Zoho Desk — so no customer falls through the cracks. Scoped with the Zoho Flow team, running live.",
    stack: ["Zoho Flow", "SalesIQ", "Zoho Desk", "No-code automation"],
    metrics: ["In production", "No missed chats", "Team-wide"],
  },
  {
    name: "Model Benchmark Harness",
    tag: "Evaluation",
    desc: "LLM-as-judge benchmark comparing 4 models across accuracy, relevance, empathy, helpfulness, latency and cost. Chose Qwen3-30B (free, 2.22s) over GPT-4o on measured data.",
    stack: ["LLM-as-judge", "Python", "Eval design"],
    metrics: ["4 models", "40 samples", "6 metrics"],
  },
  {
    name: "This RAG Portfolio",
    tag: "You're using it",
    desc: "The chat on this page is a live RAG app — vector retrieval over a knowledge base about Kishore, grounded generation with citations. Same pattern as his production work, in miniature.",
    stack: ["Next.js", "Gemini", "Embeddings", "TypeScript"],
    metrics: ["Cited answers", "Streaming", "Serverless"],
    repo: "https://github.com/K-ishore/rag-portfolio",
  },
];

const EXPERIENCE = [
  {
    role: "Product Support Engineer",
    company: "Zoho",
    period: "Jul 2023 – Present",
    location: "Chennai, Tamil Nadu, India",
    desc: "Supports RPOS7 / RetailEasy — GoFrugal's retail POS product (a Zoho company) — resolving live customer issues over Zoho SalesIQ. That front-line view of real user pain became the foundation for the production AI tools he now builds for his team.",
    current: true,
  },
  {
    role: "Associate Member — Assure Care",
    company: "GOFRUGAL Technologies Pvt Ltd",
    period: "Sep 2022 – Jul 2023",
    location: "Madurai, Tamil Nadu, India",
    desc: "Full-time role on the Assure Care team, building foundational skills in Linux, networking, and SQL while supporting GoFrugal's retail products.",
    current: false,
  },
  {
    role: "Intern — Associate Member, Assure Care",
    company: "GOFRUGAL Technologies Pvt Ltd",
    period: "Jul 2022 – Sep 2022",
    location: "Madurai, Tamil Nadu, India",
    desc: "Started his career as an intern on the Assure Care team, where he first got hands-on with the GoFrugal product ecosystem.",
    current: false,
  },
];

const SKILLS = [
  { group: "AI / ML", items: ["RAG pipelines", "Hybrid search (BM25 + vector)", "RRF fusion", "Embeddings", "LLM evaluation", "Prompt engineering"] },
  { group: "Engineering", items: ["Python", "Chrome extensions", "Serverless (Catalyst)", "REST API integration", "Deluge"] },
  { group: "Platform", items: ["Zoho SalesIQ", "Zoho Desk", "Zoho PlatformAI", "Vector search", "Latency & cost analysis"] },
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
      <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">{eyebrow}</p>
      <h2 className="text-3xl font-semibold mb-10">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border/60 bg-background/70">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <span className="font-semibold tracking-tight">{OWNER.name}</span>
          <div className="hidden sm:flex items-center gap-7 text-sm text-muted">
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </nav>

      {/* Hero + Chat */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-border bg-surface text-muted mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
            {OWNER.company}
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
            {OWNER.name}
          </h1>
          <p className="mt-3 text-lg text-accent font-medium">{OWNER.role}</p>
          <p className="mt-5 text-muted text-lg leading-relaxed max-w-xl">
            {OWNER.tagline}{" "}
            This whole page is powered by a RAG chat — don&apos;t just read
            about me, <span className="text-foreground">ask</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-background hover:bg-accent/90 transition-colors"
            >
              See projects
            </a>
            <a
              href={`mailto:${OWNER.email}`}
              className="rounded-xl border border-border px-5 py-3 text-sm font-medium hover:border-accent transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <ChatWidget />
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" eyebrow="Work" title="Projects">
        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-border bg-surface/60 p-6 hover:border-accent/50 transition-colors flex flex-col"
            >
              <p className="text-xs font-mono text-accent-2 mb-2">{p.tag}</p>
              <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
              <p className="text-sm text-muted leading-relaxed flex-1">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.metrics.map((m) => (
                  <span key={m} className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/25 text-accent">
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-surface-2 border border-border text-muted">
                    {s}
                  </span>
                ))}
              </div>
              {"repo" in p && p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                >
                  View on GitHub ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" eyebrow="Toolbox" title="Skills">
        <div className="grid md:grid-cols-3 gap-5">
          {SKILLS.map((col) => (
            <div key={col.group} className="rounded-2xl border border-border bg-surface/60 p-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-4">{col.group}</h3>
              <ul className="space-y-2">
                {col.items.map((it) => (
                  <li key={it} className="text-sm flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent-2" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" eyebrow="Path" title="Experience">
        <div className="max-w-3xl">
          <ol className="relative border-l border-border ml-1.5">
            {EXPERIENCE.map((e, i) => (
              <li key={i} className="mb-8 last:mb-0 pl-8">
                <span
                  className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-background ${
                    e.current ? "bg-accent" : "bg-border"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-semibold">{e.role}</h3>
                  {e.current && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-accent mt-0.5">{e.company}</p>
                <p className="text-xs font-mono text-muted mt-1">
                  {e.period} · {e.location}
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">{e.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Say hi" title="Contact">
        <div className="rounded-2xl border border-border bg-surface/60 p-8 max-w-2xl">
          <p className="text-muted mb-6">
            Happy to talk about Applied AI, RAG systems, and building practical AI
            on real data.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${OWNER.email}`}
              className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-background hover:bg-accent/90 transition-colors"
            >
              {OWNER.email}
            </a>
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border px-5 py-3 text-sm font-medium hover:border-accent transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border px-5 py-3 text-sm font-medium hover:border-accent transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted">
        Built with Next.js + Gemini RAG · {OWNER.name}
      </footer>
    </main>
  );
}
