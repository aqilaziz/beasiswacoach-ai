# Day 5 Workbook: Integration of Model/API with Interface

## Challenge: Building AI Application

**Date:** 24 June 2026  
**Checkpoint:** Day 5 - Integration of Model/API with Interface  
**App:** BeasiswaCoach AI  
**Live URL:** https://beasiswacoach-ai.vercel.app  
**GitHub:** https://github.com/aqilaziz/beasiswacoach-ai

---

## 1. Overview

Day 5 focuses on deeply integrating the AI model/API with the user interface to create a seamless, responsive, and engaging user experience. The goal is to make the AI feel like a real-time conversation partner rather than a request-response backend.

### Key Objectives

- Bridge the gap between backend AI logic and frontend UI
- Provide real-time feedback during AI processing
- Make AI responses visually rich and easy to consume
- Add contextual intelligence to the interface

---

## 2. Features Implemented

### 2.1 Streaming AI Responses

**Problem:** Users had to wait for the full AI response before seeing any output, creating a poor experience during long processing times.

**Solution:** Implemented OpenAI's streaming API (`stream: true`) with `ReadableStream` parsing to display AI responses token-by-token in real-time.

**Technical Implementation:**

- Added `onStream` callback parameter to `requestAiReview()` function
- Used `response.body.getReader()` with `TextDecoder` to parse Server-Sent Events (SSE)
- Each `data:` chunk is parsed and accumulated, with partial content sent to UI via callback
- Streaming state managed via `streamingContent` React state
- Typing cursor animation (`▊`) shown during streaming

**Code Changes:**

```typescript
// Before: Full response only
const feedback = await requestAiReview(profile, apiKey, messages);

// After: Real-time streaming
const feedback = await requestAiReview(
  profile,
  apiKey,
  messages,
  0,
  (partial) => {
    setStreamingContent(partial);
    setConnectionStatus("connected");
  },
);
```

### 2.2 Markdown Rendering for AI Responses

**Problem:** AI responses contained markdown formatting (headers, bold, lists, code blocks) that was displayed as raw text.

**Solution:** Built a lightweight `renderMarkdown()` function that converts markdown to HTML for rich display.

**Supported Formatting:**

- Headers (h1, h2, h3)
- Bold and italic text
- Bullet points and numbered lists
- Code blocks and inline code
- Line breaks and paragraphs

**Security Note:** Uses `dangerouslySetInnerHTML` with controlled input from the AI model only (no user-generated HTML).

### 2.3 Connection Status Indicator

**Problem:** Users had no visibility into the AI connection state during interactions.

**Solution:** Added a real-time connection status indicator with 4 states:

| Status         | Visual            | Description                    |
| -------------- | ----------------- | ------------------------------ |
| `disconnected` | Gray dot          | Ready, no active connection    |
| `connecting`   | Amber pulsing dot | Establishing connection to API |
| `connected`    | Green pulsing dot | Live streaming in progress     |
| `error`        | Red dot           | Connection failed              |

**CSS Animations:**

- `pulse-dot`: Pulsing animation for active states
- `blink-cursor`: Typing cursor animation during streaming
- `fade-in`: Smooth appearance of streaming content

### 2.4 Context-Aware Quick Actions

**Problem:** Users often didn't know what to ask the AI coach after the initial review.

**Solution:** Dynamic quick action buttons that analyze the student profile and suggest relevant follow-up questions.

**Logic:**

```typescript
const quickActions = useMemo(() => {
  // Analyzes profile for keywords:
  // - GitHub/portfolio → "Improve portfolio"
  // - IELTS/TOEFL → "English prep"
  // - Leadership content → "Strengthen leadership"
  // - Financial need → "Financial narrative"
  // - Default → "Get started"
}, [profile]);
```

**UX Impact:** Reduces friction by providing one-click conversation starters tailored to the student's profile.

### 2.5 Conversation Export

**Problem:** Users had no way to save or share their AI coaching sessions.

**Solution:** Added "Export chat" button that downloads the full conversation history as a JSON file.

**Export Data Includes:**

- App metadata and timestamp
- Student profile
- Full conversation history
- API performance metrics
- Feedback log

### 2.6 Enhanced Loading States

**Problem:** Generic loading spinner didn't communicate what was happening.

**Solution:**

- Button text changes to "AI is thinking..." during processing
- Streaming header shows "AI is responding..." with spinner
- Connection status updates in real-time
- Smooth fade-in animation for new content

---

## 3. Architecture Changes

### Before Day 5

```
User Input → API Request → Wait → Full Response → Display
```

### After Day 5

```
User Input → API Request → Stream Start → Token-by-Token Display → Complete
                ↓
         Connection Status Updates
         Quick Actions Available
         Markdown Rendering Active
```

### New State Management

```typescript
// New states added
const [streamingContent, setStreamingContent] = useState("");
const [connectionStatus, setConnectionStatus] =
  useState<ConnectionStatus>("disconnected");

// New type
type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";
```

---

## 4. Performance Impact

| Metric            | Day 4                         | Day 5                              | Change                      |
| ----------------- | ----------------------------- | ---------------------------------- | --------------------------- |
| Bundle Size       | 217.95 kB                     | 221.79 kB                          | +3.84 kB                    |
| Gzip Size         | ~69 kB                        | 70.44 kB                           | +1.44 kB                    |
| CSS Size          | ~11 kB                        | 12.51 kB                           | +1.51 kB                    |
| First Paint       | Same                          | Same                               | No change                   |
| Perceived Latency | High (wait for full response) | Low (streaming starts immediately) | **Significant improvement** |

---

## 5. User Experience Improvements

### Before Day 5

- ❌ Blank screen while waiting for AI response
- ❌ Raw text display of formatted AI responses
- ❌ No indication of connection state
- ❌ No suggested follow-up questions
- ❌ No way to save conversations

### After Day 5

- ✅ Real-time streaming shows response as it generates
- ✅ Rich markdown rendering with headers, lists, code blocks
- ✅ Live connection status with animated indicators
- ✅ Context-aware quick action buttons
- ✅ One-click conversation export to JSON
- ✅ Enhanced loading states with descriptive text

---

## 6. Files Modified

| File             | Changes                                                       | Lines Added |
| ---------------- | ------------------------------------------------------------- | ----------- |
| `src/main.tsx`   | Streaming, markdown, connection status, quick actions, export | +350        |
| `src/styles.css` | Connection status, streaming, markdown, quick actions styles  | +154        |

---

## 7. Testing Checklist

- [x] Streaming responses display token-by-token
- [x] Markdown renders correctly (headers, bold, lists, code)
- [x] Connection status updates through all states
- [x] Quick actions appear based on profile content
- [x] Quick actions populate chat input on click
- [x] Export chat downloads JSON file
- [x] Typing cursor shows during streaming
- [x] Error states display correctly
- [x] Cache still works with streaming
- [x] Build succeeds without errors
- [x] Deployed to Vercel production

---

## 8. Deployment

- **Build:** `npm run build` → 221.79 kB (gzip: 70.44 kB)
- **Deploy:** `vercel --prod` → https://beasiswacoach-ai.vercel.app
- **Git:** Commit `cc950f1` pushed to `master`
- **Status:** ✅ Production ready

---

## 9. Next Steps (Day 6 Preview)

Day 6 focuses on "Final Enhancements, Security and Debugging". Planned improvements:

- API key encryption/storage security
- Rate limiting protection
- Input sanitization hardening
- Error boundary implementation
- Performance optimization audit
