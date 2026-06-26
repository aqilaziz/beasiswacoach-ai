#!/usr/bin/env python3
"""Post community blog to NAS academy.decodingdatascience.com/blog"""

import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright

BLOG_CONTENT = """# How I Built BeasiswaCoach AI — An AI-Powered Scholarship Strategy Assistant

## The Problem

Every year, thousands of Indonesian students dream of studying abroad through scholarships. They have the grades, the projects, the leadership experience — but they don't know how to translate those into a winning scholarship application.

Paid education consultants charge millions of rupiah. Free resources are scattered. Students are left confused.

## The Solution

**BeasiswaCoach AI** is a browser-based assistant that turns a raw student profile into a complete scholarship application strategy — no signup, no payment.

1. **Profile Analysis** — 11 fields from education to deadlines
2. **Readiness Scoring** — 5-dimension score
3. **Scholarship Matching** — Category recommendations with fit %
4. **90-Day Roadmap** — 4-phase action plan
5. **Essay & Interview Prep** — Tailored outlines and practice
6. **6 AI Coach Modes** — Domain-specific coaching
7. **Export** — Downloadable application pack

## The Tech Stack

React + TypeScript + Vite · Vercel · OpenAI GPT-4o-mini with streaming · Deterministic engine (works without API key)

## What Makes It Different

### 6 Coach Modes, Not One Generic Prompt

Strategy Coach · Essay Coach · Interview Coach · Financial Narrative Coach · Portfolio Coach · General Coach — each with its own system prompt, each injecting the student's full profile.

### Works Without an API Key

All scoring, matching, roadmap, essay, and interview features run locally. The AI coach is optional enhancement.

## What I Learned

1. Prompt engineering is architecture, not just text
2. Hybrid architectures are practical — deterministic + LLM
3. Offline-first is a feature for Indonesian students
4. The pain points are real and widespread

## Try It

- **Live demo:** https://beasiswacoach-ai.vercel.app
- **Source code:** https://github.com/aqilaziz/beasiswacoach-ai
- **Demo video:** Built with Playwright + gTTS + ffmpeg

---

*Built for the Building AI Application Challenge by Decoding Data Science, June 2026.*
"""

# NAS cookies from previous session
NAS_COOKIES = [
    {"name": "accessTokenNA", "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjZhMzA5MTNhNGJmMjc3MTQxZTkwN2ExNyIsImxlYXJuZXJfcm9sZSI6dHJ1ZSwiaW5zdHJ1Y3Rvcl9yb2xlIjpmYWxzZSwiYWRtaW5fcm9sZSI6ZmFsc2UsImNvbW11bml0eV9hZG1pbiI6ZmFsc2UsInN0YXR1cyI6IlBFTkRJTkciLCJsZWFybmVyIjp7Il9pZCI6IjZhMzA5MTNhNGJmMjc3MTQxZTkwN2ExNiIsImxlYXJuZXJJZCI6OTU0NzMyOH0sImlzQWN0aXZlIjp0cnVlLCJlbWFpbCI6ImdvbnplczdAZ21haWwuY29tIiwidXNlcl9pZCI6OTU0NzMyOCwicm9sZXMiOnsibWVtYmVyIjp0cnVlfSwidXNlcl9pZF90b192YWxpZGF0ZSI6OTU0NzMyOH0sImp3dFZlcnNpb24iOjEsImRldmljZUlkIjoiZ3oxM3lGcDc2MmxhbC1JWEZNOW5FIiwiaWF0IjoxNzgyNDc4Nzc0LCJleHAiOjE3ODI1NjUxNzR9.igT8Wi9hSS-qN2nr7UBVHwCw5uyzHOwnwMThskQmhlk", "domain": ".decodingdatascience.com", "path": "/"},
    {"name": "refreshTokenNA", "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjZhMzA5MTNhNGJmMjc3MTQxZTkwN2ExNyIsImxlYXJuZXJfcm9sZSI6dHJ1ZSwiaW5zdHJ1Y3Rvcl9yb2xlIjpmYWxzZSwiYWRtaW5fcm9sZSI6ZmFsc2UsImNvbW11bml0eV9hZG1pbiI6ZmFsc2UsInN0YXR1cyI6IlBFTkRJTkciLCJsZWFybmVyIjp7Il9pZCI6IjZhMzA5MTNhNGJmMjc3MTQxZTkwN2ExNiIsImxlYXJuZXJJZCI6OTU0NzMyOH0sImlzQWN0aXZlIjp0cnVlLCJlbWFpbCI6ImdvbnplczdAZ21haWwuY29tIiwidXNlcl9pZCI6OTU0NzMyOCwicm9sZXMiOnsibWVtYmVyIjp0cnVlfSwidXNlcl9pZF90b192YWxpZGF0ZSI6OTU0NzMyOH0sImp3dFZlcnNpb24iOjEsImRldmljZUlkIjoiZ3oxM3lGcDc2MmxhbC1JWEZNOW5FIiwiaWF0IjoxNzgyNDc4Nzc0LCJleHAiOjE3OTAyNTQ3NzR9.P3MXsoZnMtwEbpSmQ-FUuRnWYY4iuO-rjuabHHYpZhU", "domain": ".decodingdatascience.com", "path": "/"},
    {"name": "activeCommunityId", "value": "64108eb27b5a8481b12579b1", "domain": ".decodingdatascience.com", "path": "/"},
    {"name": "NEXT_LOCALE", "value": "en", "domain": ".decodingdatascience.com", "path": "/"},
    {"name": "intercom-id-p7trjx3s", "value": "cc109dcf-baa3-4996-b7c6-7534c6decc03", "domain": ".decodingdatascience.com", "path": "/"},
    {"name": "intercom-session-p7trjx3s", "value": "Y3FQdWx4dzNyRVoyeFFVb01qQnZRV0RPeW9GTkFaYUVGWlRiQnRHeHFkbkViZ0oxZlo4Q1lvUk5HUU9SVVh6MmxRemR2S2NmM1k2Y1ArRm1JV2xxSjV1bUVnWFdCckpEMHgraUpUZDlHaDREL2VPUTFGY3pBYk1SZDdXcU1JMzlKWjBSendnMEw3THF2dm1KUTFiY2dnN2RGYldJWjNPTVk4RnJ3MEF6aG1yeGdpajdQSGhWN0dnbkk2RkpMVkpNZGtNaWQybEFBZVhicHZwSWpHZlpleFc5VzF1ekNlTWhKU0hmUWRRREVBZz0tLU13OGxtVVJCd1JJSkRxZTJZMFVWYVE9PQ==--331a95773df899776bd232888579c88aca30dfc0", "domain": ".decodingdatascience.com", "path": "/"},
]

async def post_blog():
    print("→ Opening NAS blog page...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        
        # Set cookies
        await context.add_cookies(NAS_COOKIES)
        
        page = await context.new_page()
        
        # Go to blog page
        await page.goto("https://academy.decodingdatascience.com/blog", wait_until="networkidle", timeout=30000)
        await asyncio.sleep(3)
        
        # Take screenshot to see current state
        await page.screenshot(path="/root/.openclaw-autoclaw/workspace/beasiswacoach-ai/nas_blog_page.png", full_page=True)
        print("    Screenshot saved: nas_blog_page.png")
        
        # Check if logged in
        page_content = await page.content()
        if "login" in page_content.lower() or "sign in" in page_content.lower():
            print("    ⚠️ Not logged in — cookie expired")
        else:
            print("    ✅ Logged in!")
        
        # Try to find "Create Post" or "New Post" button
        create_btn = None
        for selector in [
            "text=Create Post", "text=New Post", "text=Write a post",
            "a:has-text('Create')", "a:has-text('New')", "a:has-text('Write')",
            "button:has-text('Post')", "button:has-text('Create')", "button:has-text('Write')",
            "[data-testid='create-post']", ".create-post", "#create-post",
        ]:
            try:
                btn = page.locator(selector).first
                if await btn.is_visible(timeout=1000):
                    create_btn = btn
                    print(f"    Found button: {selector}")
                    break
            except:
                continue
        
        if create_btn:
            await create_btn.click()
            await asyncio.sleep(3)
            await page.screenshot(path="/root/.openclaw-autoclaw/workspace/beasiswacoach-ai/nas_blog_editor.png")
            print("    Screenshot saved: nas_blog_editor.png")
            
            # Try to find title input
            title_selectors = [
                "input[placeholder*='title' i]", "input[placeholder*='Title' i]",
                "input[name='title']", "#title", ".title-input",
                "[data-testid='post-title']", "h1[contenteditable]",
            ]
            for sel in title_selectors:
                try:
                    title_input = page.locator(sel).first
                    if await title_input.is_visible(timeout=1000):
                        await title_input.fill("How I Built BeasiswaCoach AI — An AI-Powered Scholarship Strategy Assistant")
                        print("    Title filled!")
                        break
                except:
                    continue
            
            # Try to find body/editor
            body_selectors = [
                "[contenteditable='true']", "textarea", ".ql-editor",
                "[data-testid='post-body']", ".editor", "#editor",
                ".ProseMirror", "[role='textbox']",
            ]
            for sel in body_selectors:
                try:
                    body_input = page.locator(sel).first
                    if await body_input.is_visible(timeout=1000):
                        await body_input.fill(BLOG_CONTENT)
                        print("    Body filled!")
                        break
                except:
                    continue
            
            # Try publish/submit
            publish_selectors = [
                "button:has-text('Publish')", "button:has-text('Submit')", 
                "button:has-text('Post')", "button:has-text('Save')",
                "[data-testid='publish']", ".publish-btn",
            ]
            for sel in publish_selectors:
                try:
                    pub_btn = page.locator(sel).first
                    if await pub_btn.is_visible(timeout=1000):
                        print(f"    Found publish button: {sel}")
                        # Don't actually click — just report
                        break
                except:
                    continue
            
            await page.screenshot(path="/root/.openclaw-autoclaw/workspace/beasiswacoach-ai/nas_blog_filled.png")
            print("    Screenshot saved: nas_blog_filled.png")
        else:
            print("    ⚠️ No 'Create Post' button found")
            # Print all button texts for debugging
            buttons = page.locator("button")
            count = await buttons.count()
            print(f"    Found {count} buttons:")
            for i in range(min(count, 20)):
                try:
                    text = await buttons.nth(i).text_content()
                    if text and text.strip():
                        print(f"      [{i}] {text.strip()[:80]}")
                except:
                    pass
        
        await browser.close()

asyncio.run(post_blog())
