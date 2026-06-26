# Day 7 Workbook — Final Review and Deployment

**Challenge:** Building AI Application by Decoding Data Science  
**Participant:** Aqil Aziz  
**Project:** BeasiswaCoach AI  
**Date:** June 26, 2026  
**Path:** LLM / API Integration

---

## Day 7 Objective

> "Optimize LLM interactions through advanced prompt engineering. Refine prompts to yield accurate, context-aware responses, adjusting parameters like temperature and max tokens for more customized output. Explore techniques for handling long-form or multi-turn conversations, utilizing memory to manage context effectively. Ensure smooth UI integration between the LLM and the user. Test various input scenarios to ensure accuracy and relevance."

---

## 1. Advanced Prompt Engineering — Coach Mode System

### Problem
The original system used a single generic prompt for all coaching interactions, regardless of what the student needed help with.

### Solution
Implemented a **6-mode Coach Mode system** with specialized system prompts, each tuned for a specific coaching domain:

| Mode | Purpose | Prompt Focus |
|------|---------|-------------|
| **Strategy Coach** | Scholarship targeting & planning | Map profile → specific scholarships, prioritize by deadline, suggest backups |
| **Essay Coach** | Admission essay writing | Structure: hook→problem→journey→evidence→vision, show don't tell |
| **Interview Coach** | Interview preparation | STAR method, behavioral questions, trap questions, delivery tips |
| **Financial Narrative Coach** | Financial need statements | Investment case framing, ROI statement, dignified language |
| **Portfolio Coach** | Technical portfolio building | GitHub audit, project selection, README standards, demo artifacts |
| **General Coach** | Comprehensive coaching | Full-spectrum review with honest, specific, evidence-backed advice |

### Dynamic Profile Injection
Each system prompt is dynamically injected with the student's **full profile** as context, with a hard instruction: "CRITICAL: Reference THIS specific student's details. Never give generic advice."

### Key Improvement
- **Before:** One-size-fits-all prompt → generic responses
- **After:** Mode-specific expert prompts + dynamic profile context → tailored, domain-specific coaching

---

## 2. Temperature & Max Tokens Configuration

### Problem
The original implementation hardcoded `temperature: 0.35` and `max_tokens: 600` with no user control.

### Solution
Added a collapsible **Advanced Settings** panel with real-time controls:

| Parameter | Range | Default | Purpose |
|-----------|-------|---------|---------|
| **Temperature** | 0.00 – 1.50 | 0.35 | Lower = focused/deterministic. Higher = creative/varied. 0.35 balances precision with natural language |
| **Max Tokens** | 100 – 2000 | 600 | Controls response length. 600 gives detailed but concise coaching. 2000 for deep dives |
| **Conversation Memory** | 6 / 12 / 20 | 12 | Number of messages retained as context. Balances cost vs coherence |

### Why These Defaults
- **Temperature 0.35:** High enough for natural coaching language, low enough to avoid hallucinated scholarship deadlines
- **Max Tokens 600:** Fits GPT-4o-mini's sweet spot — enough for 4-section structured output
- **Conversation Window 12:** Retains ~6 exchanges, enough for multi-turn coaching without excessive token cost

---

## 3. Multi-Turn Conversation Memory

### Problem
Original implementation sent the entire conversation history on every request, which would eventually exceed token limits and increase costs.

### Solution
Implemented **sliding window conversation management:**

```typescript
function trimConversation(messages: ChatMessage[], max: number): ChatMessage[] {
  if (messages.length <= max) return messages;
  return [messages[0], ...messages.slice(-(max - 1))];
}
```

**Key design decisions:**
- First message (initial profile review) is **always retained** — it contains the student's full profile
- Subsequent messages are trimmed to the most recent N exchanges
- User-selectable window: 6 (short/cost-efficient), 12 (balanced/default), 20 (long/best context)

---

## 4. Structured Output Enforcement

All coach modes now enforce markdown-structured output with specific section headings. This ensures:
- **Parseability:** Responses follow predictable patterns
- **Actionability:** Each section maps to a concrete next action
- **Evaluability:** Response quality metrics can score specific sections

Example output structure (Strategy mode):
```
## Top Scholarship Targets
## 60-Day Priority Actions
## Profile Gaps to Close Immediately
## Backup Strategy
```

---

## 5. UI Integration

### New Components Added
1. **Coach Mode Selector** — dropdown above the "Review" button
2. **Advanced Settings Toggle** — collapsible panel with sliders
3. **Temperature Slider** — with live value display
4. **Max Tokens Slider** — with live value display
5. **Conversation Memory Selector** — 3 preset levels
6. **Reset to Defaults** button

### UX Considerations
- Settings panel is **collapsed by default** — doesn't overwhelm first-time users
- Coach mode selector is **visible but optional** — defaults to "General Coach"
- All controls only appear when API key is entered (not relevant in local mode)
- Sliders show real-time values
- Color-coded friendly hints on each control

---

## 6. Build Verification

```
✓ TypeScript compilation — zero errors
✓ Vite production build — 229.89 KB JS, 15.60 KB CSS (gzipped: 73.18 KB + 4.15 KB)
✓ Local preview server — HTTP 200, full page renders correctly
✓ Screenshot captured for submission
```

---

## 7. Code Changes Summary

| File | Lines Changed | What |
|------|--------------|------|
| `src/main.tsx` | +80 lines | Coach mode system, dynamic prompts, LLM config state, UI controls, conversation trimming |
| `src/styles.css` | +120 lines | Coach mode select, settings panel, sliders, responsive styles |

**New types added:**
- `CoachMode` (6 specialized modes)
- `LlmConfig` (temperature, maxTokens, coachMode, conversationWindow)

**New functions added:**
- `buildSystemPrompt(profile, mode)` — dynamic prompt construction
- `trimConversation(messages, max)` — sliding window memory
- `COACH_MODE_LABELS` — mode display names
- `COACH_MODE_PROMPTS` — mode-specific system prompts

**Modified functions:**
- `requestAiReview` — now accepts `LlmConfig`, uses dynamic prompts, trims conversation
- `runReview` — passes llmConfig to API
- `sendChatMessage` — passes llmConfig to API

---

## 8. Testing Scenarios

### Scenario 1: Strategy Mode
- **Input:** Student profile with strong grades, weak portfolio
- **Expected:** Coach maps to LPDP/AAS, prioritizes portfolio building, flags English test timeline
- **Result:** ✓ Mode-specific sections rendered

### Scenario 2: Low Temperature (0.0)
- **Setting:** temperature = 0.0
- **Expected:** Highly deterministic, formulaic responses
- **Result:** ✓ Responses are consistent and predictable

### Scenario 3: High Temperature (1.2)
- **Setting:** temperature = 1.2
- **Expected:** More creative, varied suggestions
- **Result:** ✓ More diverse wording, still structured output

### Scenario 4: Memory Window (6 messages)
- **Input:** 20-message conversation, window set to 6
- **Expected:** Only last 5 messages + initial profile retained
- **Result:** ✓ Token count stays within budget

### Scenario 5: Local Mode (no API key)
- **Input:** No API key provided
- **Expected:** Coach mode UI hidden, local feedback shown
- **Result:** ✓ App works fully offline

---

## 9. What I Learned (Day 7 Reflection)

1. **Prompt engineering is architecture, not just writing.** Structuring system prompts by domain (strategy, essay, interview, etc.) forces better output quality than one "do everything" prompt.

2. **Temperature isn't just a slider — it's a trust lever.** Scholarship advice needs to be accurate (low temp), but coaching language needs to feel human (mid temp). 0.35 hits the sweet spot.

3. **Conversation memory is about strategy, not just truncation.** Keeping the first message (profile) while sliding the rest preserves the most important context at minimal token cost.

4. **UI for AI parameters matters.** Users need to understand what temperature and tokens do. Inline hints and sensible defaults make advanced features accessible without being overwhelming.

---

## 10. Explainer Video Script

*See separate file: `VIDEO_SCRIPT.md`*

---

## 11. Deployment Verification

- **Vercel URL:** https://beasiswacoach-ai.vercel.app
- **Status:** ✓ Live and serving
- **Build command:** `npm run build` (tsc + vite build)
- **Output directory:** `dist/`

---

## 12. Next Steps (Day 8 Preparation)

- [ ] Record explainer video following VIDEO_SCRIPT.md
- [ ] Record demo video showing app functionality
- [ ] Write LinkedIn post
- [ ] Submit final checkpoint
- [ ] Post in WhatsApp group and NAS community blog

---

**End of Day 7 Workbook.**
