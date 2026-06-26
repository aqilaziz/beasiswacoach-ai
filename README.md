# BeasiswaCoach AI

BeasiswaCoach AI is an AI-powered scholarship strategy assistant for Indonesian students who want to apply for scholarships but do not know how to turn their profile into a clear application plan.

The app analyzes a student profile, estimates scholarship readiness, recommends matching scholarship categories, creates a 90-day roadmap, drafts an essay outline, generates interview practice questions, and exports an application pack.

## Challenge fit

This project is built for the Decoding Data Science **Building AI Application** challenge, June 20-28, 2026.

| Judging criteria         | How this project addresses it                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Innovation               | Focuses on scholarship strategy for Indonesian students, combining readiness scoring, matching, writing support, and interview prep in one workflow. |
| Technical execution      | Built with React, TypeScript, deterministic scoring logic, browser-side generated outputs, JSON export, and optional OpenAI API review.              |
| Real-world applicability | Helps students who need practical scholarship guidance, especially those with limited access to paid counselors.                                     |
| Presentation             | The interface demonstrates the full workflow from profile input to final application assets.                                                         |
| Platform readiness       | Includes a deployable Vite build and submission materials for demo, README, and LinkedIn sharing.                                                    |

## Features

- Student profile analyzer for education level, target country, field, grades, English readiness, achievements, leadership, financial need, goal, and deadline.
- Scholarship readiness score across academic fit, portfolio strength, leadership story, need clarity, and execution readiness.
- Scholarship category matching with fit percentages and next actions.
- 90-day action roadmap for documents, portfolio, essays, English prep, and applications.
- Essay outline generator tailored to the student profile.
- Interview practice question generator.
- Optional OpenAI-powered coach review using an API key entered at runtime.
- **NEW Day 7:** 6-mode Coach system (Strategy, Essay, Interview, Financial Narrative, Portfolio, General) with specialized LLM prompts.
- **NEW Day 7:** Temperature, max tokens, and conversation memory controls for fine-tuned LLM configuration.
- **NEW Day 7:** Sliding window conversation memory for efficient multi-turn coaching.
- Local fallback coach mode, so the app still works during demos without API access.
- Downloadable JSON application pack.

## Run locally

```bash
cd challenge-ai-submission
npm install
npm run dev
```

Local preview defaults to `http://localhost:5173/` unless another port is selected.

## Build

```bash
npm run build
```

The production files are generated in `dist/`.

## Deploy

Recommended options:

1. Vercel: import this folder, keep the build command as `npm run build`, and use `dist` output.
2. Netlify: build command `npm run build`, publish directory `dist`.
3. GitHub Pages: run the build and publish the `dist` folder.

## Demo script (Updated Day 7)

1. Open BeasiswaCoach AI.
2. Explain the target user: Indonesian students preparing scholarship applications.
3. Edit a student profile field and show that scores, scholarship matches, roadmap, essay outline, interview questions, and summary update instantly.
4. Enter an OpenAI API key and select a **Coach Mode** (Strategy, Essay, Interview, Financial, Portfolio, or General).
5. Toggle **Advanced Settings** to show temperature, max tokens, and conversation memory controls.
6. Click **Review application** and show the live streaming AI response.
7. Demonstrate the response quality evaluation dashboard.
8. Show the **Quick Actions** for follow-up coaching in chat mode.
9. Export the application pack JSON.
10. Show the deployed URL and explain the coach mode system.

## Final submission assets

- Deployed app URL: https://beasiswacoach-ai.vercel.app
- GitHub repository: https://github.com/aqilaziz/beasiswacoach-ai
- README with problem, solution, features, and run instructions.
- 1-2 minute demo video showing profile analysis and exported application pack.
- Screenshot of the app homepage and generated outputs.
- LinkedIn post describing the problem, AI workflow, impact, and app link.

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
