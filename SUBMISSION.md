# BeasiswaCoach AI Submission Pack

## Project identity

- Project name: BeasiswaCoach AI
- Challenge: Building AI Application by Decoding Data Science / NAS
- Path: LLM/API Integration Path
- Target user: Indonesian students preparing scholarship applications with limited access to paid counseling
- Core problem: Students often have potential, but struggle to structure their profile, identify suitable scholarship paths, and prepare application materials on time.

## Copy-ready short pitch

BeasiswaCoach AI helps Indonesian students turn a raw scholarship profile into a practical application strategy. The app analyzes profile details, calculates readiness, recommends scholarship categories, generates a 90-day roadmap, creates essay direction, prepares interview questions, and exports an application pack. It works locally for demos and can use OpenAI for an optional coach review.

## Copy-ready long description

BeasiswaCoach AI is an AI-powered scholarship strategy assistant for Indonesian students. Many students know they want a scholarship, but they do not know how to translate grades, projects, leadership, financial need, and deadlines into a focused application plan. BeasiswaCoach AI solves this by guiding the student through one complete workflow: profile input, readiness scoring, scholarship matching, roadmap planning, essay outlining, interview practice, summary generation, and JSON export.

The project combines deterministic local analysis with optional OpenAI-powered review. This keeps the app useful during demos without requiring a secret key, while still demonstrating how a live LLM can provide deeper coaching when the user supplies an API key at runtime.

## Key features

- Student profile editor for academic record, English readiness, achievements, leadership, financial need, goals, and deadline plan.
- Scholarship readiness score across academic fit, portfolio strength, leadership story, need clarity, and execution readiness.
- Scholarship match recommendations with fit percentages and concrete next actions.
- 90-day action roadmap for portfolio, documents, essays, English prep, and submission execution.
- Essay outline and interview practice question generation.
- Optional OpenAI coach review using an API key entered only in the browser.
- Exportable JSON application pack for evidence and follow-up planning.

## Judging criteria alignment

- Innovation: Focuses on a specific, high-impact student scholarship workflow instead of a generic chatbot.
- Technical execution: Uses React, TypeScript, Vite, structured profile logic, deterministic scoring, generated outputs, JSON export, and optional OpenAI API integration.
- Real-world applicability: Helps students prepare concrete scholarship assets and action plans without expensive consulting.
- Presentation: The first screen demonstrates the full value flow from profile to score to recommendations.
- Platform readiness: Build passes and the project includes README, screenshot, demo script, and submission copy.

## Submission links

- Live demo URL: https://beasiswacoach-ai.vercel.app
- Source code URL: https://github.com/aqilaziz/beasiswacoach-ai
- Demo video URL: TODO
- LinkedIn post URL: https://www.linkedin.com/feed/update/urn:li:share:7474219876170244096/
- LinkedIn group post URL: https://www.linkedin.com/feed/update/urn:li:groupPost:9371112-7474225017006813184

## Local assets

- Screenshot: `submission-assets/beasiswacoach-homepage.png`
- Production build: `dist/`
- README: `README.md`

## Demo script

1. Open the app and introduce the target user: Indonesian scholarship applicants.
2. Show the default profile and readiness score.
3. Edit one profile field to demonstrate instant recalculation.
4. Show scholarship matches, 90-day roadmap, essay outline, and interview questions.
5. Click Review application without an API key to show local coach mode.
6. Explain that entering an OpenAI key enables live model review.
7. Export the application pack JSON.

## NAS submission steps

1. Log in at `https://nas.com/login?redirectTo=/artificialintelligence/challenges/building-ai-application-jun`.
2. Return to the challenge page and join the challenge if the button becomes available.
3. Complete any required checkpoints.
4. Submit the live demo URL, source URL, video URL, and LinkedIn post URL.
5. Use the short pitch and long description from this file.

## Suggested LinkedIn post

```text
I built BeasiswaCoach AI for the Building AI Application Challenge by Decoding Data Science.

It helps Indonesian students turn a scholarship profile into readiness scores, scholarship matches, a 90-day roadmap, essay outline, interview practice, and an exportable application pack.

The problem: many students have potential, but they struggle to structure their story, prove readiness, and prepare applications without expensive counseling.

The AI workflow combines profile analysis, rule-based readiness scoring, scholarship-fit matching, generated writing guidance, interview prompts, and optional OpenAI-powered review.

Demo: https://beasiswacoach-ai.vercel.app
Source: https://github.com/aqilaziz/beasiswacoach-ai

#BuildingAIApplication #DecodingDataScience #AIForBuilders #Scholarship #ArtificialIntelligence
```
