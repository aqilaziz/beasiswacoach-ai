# How I Built BeasiswaCoach AI — An AI-Powered Scholarship Strategy Assistant

**By Aqil Aziz** | Building AI Application Challenge, Decoding Data Science

---

## The Problem

Every year, thousands of Indonesian students dream of studying abroad or at top domestic universities through scholarships. They have the grades, the projects, the leadership experience — but they don't know how to translate those into a winning scholarship application.

Paid education consultants charge millions of rupiah. Free resources are scattered across hundreds of websites. Students are left confused about where to start, which scholarships fit their profile, and how to craft a compelling story.

## The Solution

**BeasiswaCoach AI** is a browser-based assistant that turns a raw student profile into a complete scholarship application strategy. No signup. No payment. Just open the app and start.

Here's what it does in one workflow:

1. **Profile Analysis** — 11 fields covering education level, target country, GPA, English readiness, achievements, leadership, financial need, and deadlines
2. **Readiness Scoring** — 5-dimension score (Academic Fit, Portfolio Strength, Leadership Story, Need Clarity, Execution Readiness)
3. **Scholarship Matching** — Category recommendations with fit percentages and concrete next steps
4. **90-Day Roadmap** — 4-phase action plan for documents, portfolio, essays, and submission
5. **Essay & Interview Prep** — Tailored essay outlines and practice questions
6. **AI Coach Review** — Optional OpenAI-powered coaching across 6 specialized modes
7. **Application Pack Export** — Downloadable JSON for documentation

## The Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Deployment:** Vercel
- **AI Integration:** OpenAI GPT-4o-mini with streaming responses
- **Architecture:** Deterministic analysis engine (no API key needed) + optional LLM enhancement

## What Makes It Different

### 6 Coach Modes, Not One Generic Prompt

Instead of a single "AI assistant" prompt, BeasiswaCoach AI has 6 domain-specific coaching modes:
- **Strategy Coach** — Scholarship targeting and prioritization
- **Essay Coach** — Admission essay structure and storytelling
- **Interview Coach** — STAR method and behavioral questions
- **Financial Narrative Coach** — Need statements that frame investment, not charity
- **Portfolio Coach** — Project and achievement presentation
- **General Coach** — Catch-all for any scholarship question

Each mode has its own system prompt, and the student's full profile is dynamically injected with hard instructions to reference specific details — never give generic advice.

### Works Without an API Key

The app is fully functional without any API access. All scoring, matching, roadmap generation, essay outlining, and interview questions run locally in the browser. The AI coach is an optional enhancement — useful, but not required.

### Security & Production Mindset

- API keys are stored with base64+salt encoding in localStorage (never sent to any server except OpenAI)
- Input sanitization prevents XSS
- Rate limiting prevents API cost abuse
- Error boundaries catch crashes gracefully
- Response quality metrics help users evaluate AI coaching

## What I Learned

1. **Prompt engineering is architecture, not just text.** Designing 6 coach modes forced me to think about prompt structure, context injection, and output format as engineering decisions.
2. **Hybrid architectures are practical.** Deterministic scoring + optional LLM gives the best of both worlds: reliability for core features, flexibility for open-ended coaching.
3. **Offline-first is a feature.** Students in Indonesia don't always have stable internet. Making the app work without API calls was the right call.
4. **Indonesian students need this.** The specific pain points — confusing scholarship categories, no structured roadmap, fear of interviews — are real and widespread.

## Try It Yourself

- **Live demo:** https://beasiswacoach-ai.vercel.app
- **Source code:** https://github.com/aqilaziz/beasiswacoach-ai
- **Demo video:** Watch the walkthrough to see every feature in action

---

*Built for the Building AI Application Challenge by Decoding Data Science, June 2026.*

#BuildingAIApplication #DecodingDataScience #AIForBuilders #Scholarship #ArtificialIntelligence
