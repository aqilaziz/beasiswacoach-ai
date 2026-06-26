# Day 8 Workbook — Demo Video & Final Submission

**Challenge:** Building AI Application by Decoding Data Science  
**Participant:** Aqil Aziz  
**Project:** BeasiswaCoach AI  
**Date:** June 27, 2026  
**Path:** LLM / API Integration

---

## Day 8 Objective

> "Create a final demo video and prepare all submission materials for the Building AI Application Challenge. Submit the project with live demo URL, source code URL, video URL, and community engagement."

---

## 1. Demo Video Production

### Video Specifications

| Property | Value |
|----------|-------|
| **Duration** | 1 minute 51 seconds (111s) |
| **Resolution** | 1280 × 720 (HD) |
| **Format** | MP4 (H.264 video + AAC audio) |
| **Size** | 8.1 MB |
| **Narration** | Bahasa Indonesia (gTTS) |
| **Recording Tool** | Playwright (Python) |

### Production Pipeline

```
1. Screen Recording → Playwright + Chromium headless
2. Narration Generation → gTTS (Bahasa Indonesia)
3. Video + Audio Merge → ffmpeg (libx264 + AAC)
4. Speed Adjustment → setpts filter (1.41x slowdown)
```

### Video Flow

| Timestamp | Section | What's Shown |
|-----------|---------|-------------|
| 0:00-0:10 | Intro | Problem statement, app homepage |
| 0:10-0:25 | Profile & Scoring | 11 profile fields, 5-dimension readiness score |
| 0:25-0:40 | Matches & Roadmap | Scholarship categories, 90-day action plan |
| 0:40-0:55 | Day 7 Features | 6 Coach Modes, Advanced Settings |
| 0:55-1:20 | LLM Integration | Temperature/Token/Memory controls, streaming |
| 1:20-1:40 | Export & Quality | Application pack export, quality metrics |
| 1:40-1:51 | Closing | GitHub + Vercel URLs, thank you |

### Technical Decisions

- **Playwright over screen recording tools:** Programmatic control over exact scroll timing and interactions
- **Headless mode:** No display server needed, works in CI/CD
- **gTTS over recorded voice:** Consistent quality, easy iteration, no re-recording needed
- **ffmpeg setpts filter:** Smooth slow-down to match narration without frame drops
- **Indonesian narration:** Target audience is Indonesian students and NAS judges

---

## 2. Submission Checklist

### Platform URLs
| Item | URL | Status |
|------|-----|--------|
| Live Demo | https://beasiswacoach-ai.vercel.app | ✅ Deployed |
| Source Code | https://github.com/aqilaziz/beasiswacoach-ai | ✅ Public |
| Demo Video | `submission-assets/beasiswacoach-demo.mp4` | ✅ Created |
| LinkedIn Post | https://www.linkedin.com/feed/update/urn:li:share:7474219876170244096/ | ✅ Posted |
| LinkedIn Group | https://www.linkedin.com/feed/update/urn:li:groupPost:9371112-7474225017006813184 | ✅ Posted |
| Community Blog | https://academy.decodingdatascience.com/blog | ✅ Posted |

### Submission Assets
| Asset | File | Status |
|-------|------|--------|
| Homepage Screenshot | `submission-assets/beasiswacoach-homepage.png` | ✅ |
| Day 3 Screenshot | `submission-assets/beasiswacoach-day3-screenshot.png` | ✅ |
| Day 7 Screenshot | `submission-assets/day7-enhanced-app.png` | ✅ |
| Demo Video | `submission-assets/beasiswacoach-demo.mp4` | ✅ |
| Workbooks (Day 1-8) | `DAY5-8_WORKBOOK.md` + submission-assets/*.doc | ✅ |
| README | `README.md` | ✅ |
| SUBMISSION Pack | `SUBMISSION.md` | ✅ |
| Video Script | `VIDEO_SCRIPT.md` | ✅ |

---

## 3. Judging Criteria Alignment

| Criteria | How Demonstrated |
|----------|-----------------|
| **Innovation** | 6-mode coach system with domain-specific prompts; deterministic + AI hybrid architecture |
| **Technical Execution** | React + TypeScript + Vite; streaming API; sliding window memory; rate limiting; error boundaries |
| **Real-world Applicability** | Complete scholarship workflow for Indonesian students; works offline without API key |
| **Presentation** | Demo video shows full user journey; README and SUBMISSION.md provide copy-ready materials |
| **Platform Readiness** | Deployed on Vercel; build passes; all submission assets prepared |

---

## 4. Lessons Learned

### What Went Well
- Playwright-based recording gives precise control over timing and interactions
- gTTS produces natural-sounding Indonesian narration without recording sessions
- ffmpeg filter approach handles video/audio duration mismatch cleanly
- The modular coach prompt system makes it easy to add new coaching domains

### Challenges
- **Video pacing:** Raw recording (79s) was too fast for narration (111s). Solved with setpts slowdown filter
- **Headless interaction:** Some UI elements (select dropdowns) require explicit Playwright interaction commands
- **Narration sync:** gTTS doesn't provide word-level timestamps, so precise sync isn't possible — general section-level alignment works well enough
- **Token exposure:** Previous session's GitHub token was exposed in plaintext. Generated new token and will use environment variables going forward

### Future Improvements
- Add word-level timing for better narration-video sync
- Consider Loom-style face bubble overlay
- Add English subtitle track for international audience
- Record with microphone narration instead of TTS for more natural delivery

---

## 5. Post-Submission

- **Day 8 unlock:** June 27, 2026 at 13:00 WIB
- **Final NAS submission:** All checkpoints completed (7/9 → 9/9)
- **Community engagement:** LinkedIn post + NAS community blog
- **Portfolio use:** Project can be showcased in scholarship application portfolios

---

**End of Day 8 Workbook.**
