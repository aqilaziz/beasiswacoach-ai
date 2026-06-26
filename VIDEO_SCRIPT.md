# Explainer Video Script — BeasiswaCoach AI

**Duration:** 2-3 minutes  
**Type:** Explainer (how it was built, not just demo)  
**For:** Day 7 checkpoint submission, Building AI Application Challenge

---

## Script

### [0:00-0:15] Intro — The Problem

> "Hi, I'm Aqil Aziz. This is BeasiswaCoach AI — an AI-powered scholarship strategy assistant for Indonesian students.
>
> Here's the problem: thousands of Indonesian students have the potential to win scholarships, but they struggle to turn their grades, projects, and leadership experience into a focused application plan. Many don't have access to paid counselors."

*[Show screen: blank state or app homepage]*

---

### [0:15-0:45] Architecture Overview

> "Let me walk you through how I built this. BeasiswaCoach AI is a React TypeScript application built with Vite, deployed on Vercel. The architecture has three layers:
>
> **Layer 1 — Deterministic Analysis Engine.** This runs entirely in the browser. It calculates a scholarship readiness score across five dimensions: academic fit, portfolio strength, leadership story, need clarity, and execution readiness. Each score is rule-based, not black-box AI — judges can see exactly how scores are computed.
>
> **Layer 2 — Pattern Matching System.** A catalog of scholarship criteria is matched against the student profile using keyword-based and heuristic scoring. Each match comes with a fit percentage and concrete next steps.
>
> **Layer 3 — AI Coach Review.** This is where the LLM comes in. When the user provides an OpenAI API key, the app sends the student's profile to GPT-4o-mini for personalized coaching. But here's what makes it interesting..."

*[Show code structure — main.tsx, the three layers]*

---

### [0:45-1:30] LLM Integration — Advanced Prompt Engineering

> "For Day 7, I built a coach mode system with six specialized prompts. Instead of one generic system prompt, I created domain-specific coaching modes: Strategy Coach for scholarship targeting, Essay Coach for writing help, Interview Coach for practice, Financial Narrative Coach, Portfolio Coach, and General Coach.
>
> Each mode has its own system prompt tuned for that specific task. The student's full profile is dynamically injected into every prompt with a hard instruction to reference specific details — never give generic advice.
>
> The key technical decisions:
> - Temperature is set to 0.35 by default — low enough to avoid hallucinated scholarship deadlines, high enough for natural coaching language
> - Max tokens defaults to 600 — fits the structured output format of 4 sections
> - Conversation memory uses a sliding window — the initial profile is always retained, and recent messages slide through a configurable window"

*[Show: coach mode selector, advanced settings panel, temperature/maxTokens sliders]*

---

### [1:30-2:00] How the LLM Interacts with Users

> "The interaction flow works like this: the user fills out 11 profile fields — everything from education level to financial need context. When they click 'Review Application', the app:
>
> 1. Validates the profile — checking for minimum content, proper API key format
> 2. Checks rate limiting — max 10 requests per minute client-side
> 3. Builds the dynamic system prompt based on the selected coach mode
> 4. Sends the conversation to OpenAI's chat completions endpoint with streaming enabled
> 5. Renders the response with markdown formatting
> 6. Evaluates response quality across relevance, coherence, and actionability
> 7. Caches the response to avoid redundant API calls
>
> Users can then ask follow-up questions in a chat interface, and the sliding window memory preserves context across multiple turns."

*[Show: profile form → click review → streaming response → quality metrics dashboard]*

---

### [2:00-2:30] Security & Production Considerations

> "For a production deployment, I implemented several security measures:
>
> - API keys are stored with base64+salt encoding in localStorage — never sent to any server other than OpenAI
> - All user input is sanitized to prevent XSS
> - An error boundary catches React crashes gracefully
> - Rate limiting prevents excessive API costs
> - Connection status indicators show the user what's happening in real-time
> - Response quality metrics help users evaluate the coaching they receive
>
> And importantly — the app works fully without an API key, using local deterministic analysis. This means it's demo-ready and functional even without internet or paid API access."

*[Show: error handling, local mode, quality dashboard]*

---

### [2:30-3:00] Results & Impact

> "The app generates a complete application strategy from a raw profile:
> - Scholarship readiness score with 5 dimensions
> - Top scholarship matches with fit percentages
> - A 90-day action roadmap across 4 phases
> - Essay outline tailored to the student's story
> - Interview practice questions
> - A downloadable JSON application pack
>
> For Indonesian students who can't afford expensive consulting, this turns a scattered profile into a structured, actionable plan — all running in the browser, with optional AI enhancement.
>
> The source code is on GitHub and the app is live at beasiswacoach-ai.vercel.app."

---

## Recording Tips

1. **Screen share** BeasiswaCoach AI running locally or on Vercel
2. **Speak clearly** — this is an explainer, not a marketing video
3. **Show code** — judges want to see that you understand the architecture
4. **Demonstrate interactivity** — actually edit a profile field, click review, show streaming
5. **Keep it under 3 minutes** — reference video sample: https://youtu.be/bBfs9xHMiHI
6. **End with GitHub + live URL** on screen

---

## Assets to Show on Screen

1. App homepage with readiness score
2. Coach mode selector dropdown
3. Advanced settings panel (temperature, tokens, memory)
4. Streaming response in action
5. Response quality metrics dashboard
6. Code structure / architecture
7. Export application pack JSON
8. GitHub repository + Vercel URL

---

**End of Explainer Video Script.**
