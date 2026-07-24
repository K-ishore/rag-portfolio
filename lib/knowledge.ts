// ---------------------------------------------------------------------------
// Knowledge base for the RAG portfolio.
//
// Each chunk is embedded and retrieved at query time. Keep chunks focused —
// one idea each — so retrieval stays precise. This was drafted from Kishore's
// notes; edit freely. Anything marked [FILL IN] should be replaced with real
// details before publishing.
// ---------------------------------------------------------------------------

export type Chunk = {
  id: string;
  category: string;
  title: string;
  content: string;
};

export const OWNER = {
  name: "Kishore S",
  role: "Product Support Engineer @ Zoho",
  company: "GoFrugal Technologies (a Zoho company)",
  location: "Chennai, Tamil Nadu, India",
  email: "kishore.kumars@zohocorp.com",
  linkedin: "https://www.linkedin.com/in/kishore-kumar-s-219ba61bb",
  github: "https://github.com/K-ishore",
  tagline:
    "A Zoho support engineer who builds production AI systems — hybrid RAG, vector search, and LLM evaluation — on real customer data.",
};

export const KNOWLEDGE: Chunk[] = [
  {
    id: "bio-1",
    category: "About",
    title: "Who Kishore is",
    content:
      "Kishore S is a Product Support Engineer at GoFrugal Technologies, a Zoho company. He supports RPOS7 (RetailEasy), GoFrugal's point-of-sale product, handling live customer issues over Zoho SalesIQ chat. He is self-taught in software and builds production AI systems — he learned to build by shipping, not through formal CS training.",
  },
  {
    id: "bio-2",
    category: "About",
    title: "What makes his background unusual",
    content:
      "Kishore's edge is that he comes from the support floor. He has seen thousands of real customer problems, so he knows exactly which failures matter and how users actually phrase them. He turned that domain knowledge into an AI product used by his own support team. He cares about data security and cost — his production system runs entirely on Zoho's internal infrastructure with zero external API spend.",
  },
  {
    id: "proj-pos-overview",
    category: "Projects",
    title: "POS Expert Assistant — overview",
    content:
      "POS Expert Assistant is an AI-powered Chrome extension that suggests replies to support agents in real time inside Zoho SalesIQ. It reads the live chat, retrieves relevant knowledge, and drafts a grounded, empathetic reply the agent can send or edit. It is Kishore's flagship project and runs in production for the RPOS7 support team.",
  },
  {
    id: "proj-pos-architecture",
    category: "Projects",
    title: "POS Expert Assistant — 3-layer architecture",
    content:
      "The system has three layers. Layer 1, the 'Second Brain', is 100 curated knowledge cards with ~724 keywords for deterministic lookup on known issues (gated by a confidence threshold). Layer 2 is a hybrid RAG pipeline combining BM25 keyword search with vector search, fused via Reciprocal Rank Fusion (RRF), over ~5,900 support tickets, ~188 help docs, and ~7,000 contact records. Layer 3 is PlatformAI, Zoho's internal LLM, which generates the final reply. The deterministic brain answers known issues instantly; RAG handles the long tail.",
  },
  {
    id: "proj-pos-models",
    category: "Projects",
    title: "POS Expert Assistant — model selection and benchmarking",
    content:
      "Kishore ran a 4-model benchmark (40 samples, LLM-as-judge) to choose the generation model. Qwen3-30B won with 3.43/5 overall and 2.22s latency while being free on Zoho's internal infrastructure, beating GPT-4o (3.41/5, 3.6s) which also costs money. Embeddings use text-embedding-3-small. This benchmarking discipline — measuring accuracy, relevance, empathy, helpfulness, latency, and cost — is central to how he works.",
  },
  {
    id: "proj-pos-results",
    category: "Projects",
    title: "POS Expert Assistant — results and impact",
    content:
      "The assistant scores 3.76/5 on the current end-to-end evaluation, with earlier local configurations reaching 4.24/5 and a 95% pass rate. In a head-to-head comparison against a competing no-code AI tool (Zia Agent Studio), Kishore's system won on 12 of 14 dimensions — hybrid search, three knowledge sources, 100+ curated cards, customer history awareness, product awareness, and measured accuracy. It is deployed on Zoho Catalyst (serverless) and integrated with SalesIQ via a widget.",
  },
  {
    id: "proj-pos-systems",
    category: "Projects",
    title: "POS Expert Assistant — production engineering details",
    content:
      "Beyond retrieval, the pipeline includes real production hardening: regex-based parsing of internal emails, subject-context augmentation for vague short messages, early-exit routing for license-audit notifications to the Customer Success team, and payment/subscription routing to account managers. It also has a faithfulness-guaranteed history summarizer (summaries are extracted from tickets, never invented) and a pre-send empathy guard that warns an agent before sending a curt or deflecting reply to a frustrated customer.",
  },
  {
    id: "proj-missed-chat",
    category: "Projects",
    title: "Missed-Chat to Ticket Automation",
    content:
      "Before the POS Expert Assistant, Kishore spotted a real gap on his support team: in Zoho SalesIQ, when agents are already engaged in live chats, new incoming customer chats get missed and left without any follow-up. He designed an automation that detects these missed/unattended chats and automatically creates a 'missed chat' ticket in Zoho Desk, so every customer gets picked up instead of falling through the cracks. He scoped the workflow, collaborated with the Zoho Flow team, and implemented it using Zoho Flow — it has been running successfully in production for his team. It's an early example of his signature pattern: notice a real support pain point and automate it away.",
  },
  {
    id: "proj-portfolio",
    category: "Projects",
    title: "This RAG portfolio site",
    content:
      "This portfolio website is itself a RAG application. The chat you are using retrieves from a knowledge base about Kishore using vector embeddings and cosine similarity, then generates grounded answers with citations. It is built with Next.js, TypeScript, and Tailwind, and uses Google Gemini for embeddings and generation. It demonstrates the same retrieve-then-generate pattern as his production work, in miniature.",
  },
  {
    id: "skills-ai",
    category: "Skills",
    title: "AI / ML engineering skills",
    content:
      "Kishore's core skills: Retrieval-Augmented Generation (RAG), hybrid search (BM25 + vector with RRF fusion), vector search and embeddings, LLM evaluation and benchmarking (LLM-as-judge methodology), prompt engineering, and latency/cost analysis for LLM systems. He has built and shipped a full RAG pipeline end to end on real, messy customer data.",
  },
  {
    id: "skills-eng",
    category: "Skills",
    title: "Software & platform skills",
    content:
      "Engineering skills: Python (backend and data pipelines), JavaScript (Chrome extension development), serverless deployment on Zoho Catalyst, and API integration across Zoho Desk, Zoho SalesIQ, and Zoho PlatformAI. He works comfortably with Deluge for Zoho platform scripting and has built production widgets for SalesIQ.",
  },
  {
    id: "skills-growing",
    category: "Skills",
    title: "Areas he is actively strengthening",
    content:
      "Kishore is honest about his growth areas as a self-taught engineer: deepening SQL (joins, subqueries, indexing beyond basic CRUD), formal API design, and computer-science fundamentals like data structures and system design. He is deliberately closing these gaps to keep growing as an engineer.",
  },
  {
    id: "exp-current",
    category: "Experience",
    title: "Product Support Engineer, Zoho (current)",
    content:
      "Since July 2023, Kishore has been a Product Support Engineer at Zoho, based in Chennai, Tamil Nadu, India. He supports RPOS7 / RetailEasy — GoFrugal's retail POS product (GoFrugal is a Zoho company) — resolving live customer issues over Zoho SalesIQ chat. This front-line role gave him deep product knowledge and a direct view of real user pain points, which became the raw material for the AI tools he now builds.",
  },
  {
    id: "exp-gofrugal-early",
    category: "Experience",
    title: "GOFRUGAL Technologies — Assure Care (2022–2023)",
    content:
      "Kishore began his career at GOFRUGAL Technologies Pvt Ltd in Madurai, Tamil Nadu. He joined in July 2022 as an intern (Associate Member, Assure Care), then moved into the full-time Associate Member, Assure Care role from September 2022 to July 2023. During this period he built foundational skills in Linux, networking, and SQL before transitioning into Product Support Engineering at Zoho in mid-2023.",
  },
  {
    id: "career-goal",
    category: "Focus",
    title: "Applied AI focus",
    content:
      "Kishore's engineering focus is Applied AI — the practical side of the field: deploying AI systems, vector search, embeddings, and rigorous LLM evaluation, and making models work reliably on real company data. He emphasizes data security and cost efficiency (like running entirely on Zoho's internal infrastructure at zero external API spend) over purely theoretical algorithm work. He's driven by shipping AI that solves real problems for real users.",
  },
  {
    id: "contact",
    category: "Contact",
    title: "How to reach Kishore",
    content:
      "You can reach Kishore by email at kishore.kumars@zohocorp.com, on LinkedIn at https://www.linkedin.com/in/kishore-kumar-s-219ba61bb, or on GitHub at https://github.com/K-ishore. He's happy to talk about Applied AI, RAG systems, and building practical AI on real data.",
  },
];
