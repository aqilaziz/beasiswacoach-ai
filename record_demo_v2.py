#!/usr/bin/env python3
"""Record BeasiswaCoach AI demo video v2 — slower pacing, more interactions."""

import asyncio
import os
import subprocess
import time
from pathlib import Path

from gtts import gTTS
from playwright.async_api import async_playwright

WORKDIR = Path("/root/.openclaw-autoclaw/workspace/beasiswacoach-ai")
APP_URL = "https://beasiswacoach-ai.vercel.app"
OUTPUT_RAW = WORKDIR / "demo_raw.webm"
OUTPUT_NARRATION = WORKDIR / "narration_bg.mp3"
OUTPUT_FINAL = WORKDIR / "submission-assets/beasiswacoach-demo.mp4"

# Concise narration ~100 seconds (matching target 101s from previous session)
NARRATION_SCRIPT = """
Halo, saya Aqil Aziz. Ini BeasiswaCoach AI, asisten strategi beasiswa berbasis AI untuk mahasiswa Indonesia.

Banyak mahasiswa Indonesia punya potensi beasiswa, tapi bingung menyusun profil dan rencana aplikasi. BeasiswaCoach AI menyelesaikan masalah ini.

Di halaman utama, kita lihat profil mahasiswa dengan 11 field: jenjang pendidikan, negara tujuan, bidang studi, IPK, kesiapan bahasa Inggris, prestasi, kepemimpinan, kebutuhan finansial, dan tenggat waktu.

Aplikasi langsung menghitung Scholarship Readiness Score dari 5 dimensi: Academic Fit, Portfolio Strength, Leadership Story, Need Clarity, dan Execution Readiness.

Setelah scoring, ada rekomendasi kategori beasiswa dengan persentase kecocokan dan langkah konkret selanjutnya. Juga ada roadmap 90 hari yang membagi persiapan ke 4 fase.

Untuk Day 7, saya bangun 6 Coach Mode spesifik: Strategy, Essay, Interview, Financial Narrative, Portfolio, dan General Coach. Tiap mode punya system prompt khusus yang di-inject dengan profil mahasiswa.

Pengguna bisa atur temperature, max tokens, dan conversation memory lewat Advanced Settings. App tetap berfungsi tanpa API key, jadi selalu siap demo.

Source code di GitHub, live di Vercel. Terima kasih.
"""

async def wait_and_log(page, seconds, msg):
    print(f"    ⏳ {msg} ({seconds}s)")
    await asyncio.sleep(seconds)

async def record_demo():
    print("[1/3] Recording demo...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 720},
            record_video_dir=str(WORKDIR),
            record_video_size={"width": 1280, "height": 720},
        )
        page = await context.new_page()

        # 1. Open app and show homepage
        print("    → Opening app...")
        await page.goto(APP_URL, wait_until="networkidle", timeout=30000)
        await wait_and_log(page, 5, "Showing homepage")

        # 2. Scroll down slowly to show readiness score
        print("    → Showing readiness score...")
        await page.evaluate("""
            async () => {
                for (let i = 0; i <= 400; i += 10) {
                    window.scrollTo(0, i);
                    await new Promise(r => setTimeout(r, 100));
                }
            }
        """)
        await wait_and_log(page, 3, "Readiness score visible")

        # 3. Scroll further to scholarship matches
        print("    → Showing scholarship matches...")
        await page.evaluate("""
            async () => {
                for (let i = 400; i <= 900; i += 8) {
                    window.scrollTo(0, i);
                    await new Promise(r => setTimeout(r, 80));
                }
            }
        """)
        await wait_and_log(page, 4, "Scholarship matches")

        # 4. Continue to roadmap section
        print("    → Showing 90-day roadmap...")
        await page.evaluate("""
            async () => {
                for (let i = 900; i <= 1500; i += 8) {
                    window.scrollTo(0, i);
                    await new Promise(r => setTimeout(r, 80));
                }
            }
        """)
        await wait_and_log(page, 4, "90-day roadmap")

        # 5. Show essay outline section
        print("    → Showing essay outline...")
        await page.evaluate("""
            async () => {
                for (let i = 1500; i <= 2000; i += 8) {
                    window.scrollTo(0, i);
                    await new Promise(r => setTimeout(r, 80));
                }
            }
        """)
        await wait_and_log(page, 3, "Essay outline")

        # 6. Show coach modes (Day 7 feature)
        print("    → Interacting with coach mode selector...")
        try:
            coach_select = page.locator("select").first
            if await coach_select.is_visible(timeout=3000):
                await coach_select.click()
                await asyncio.sleep(0.5)
                # Show different modes
                options = ["strategy", "essay", "interview", "financial", "portfolio", "general"]
                for opt in options:
                    try:
                        await coach_select.select_option(opt)
                        await asyncio.sleep(1)
                    except:
                        pass
                await coach_select.select_option("strategy")
                await asyncio.sleep(1)
        except Exception as e:
            print(f"    Coach selector not interactive: {e}")

        # 7. Try advanced settings interaction
        print("    → Showing advanced settings...")
        try:
            # Look for buttons/inputs related to advanced settings
            all_buttons = page.locator("button")
            count = await all_buttons.count()
            for i in range(count):
                btn = all_buttons.nth(i)
                text = await btn.text_content()
                if text and ("advanced" in text.lower() or "settings" in text.lower()):
                    await btn.click()
                    await asyncio.sleep(2)
                    break
        except:
            pass

        # 8. Scroll to interview questions
        print("    → Showing interview questions...")
        await page.evaluate("""
            async () => {
                let h = document.body.scrollHeight;
                let pos = 2000;
                while (pos < h) {
                    window.scrollTo(0, pos);
                    await new Promise(r => setTimeout(r, 100));
                    pos += 10;
                }
            }
        """)
        await wait_and_log(page, 3, "Interview questions & export")

        # 9. Click Review Application button if visible
        print("    → Attempting review action...")
        try:
            review_btn = page.locator("button").filter(has_text="Review")
            if await review_btn.first.is_visible(timeout=2000):
                await review_btn.first.click()
                await asyncio.sleep(6)  # Wait for streaming response
        except:
            pass

        # 10. Scroll back to top for final view
        print("    → Final scroll back to top...")
        await page.evaluate("""
            async () => {
                let pos = window.scrollY;
                while (pos > 0) {
                    pos -= 15;
                    window.scrollTo(0, pos);
                    await new Promise(r => setTimeout(r, 50));
                }
            }
        """)
        await wait_and_log(page, 3, "Final view")

        # Close and save
        await page.close()
        video_path = await page.video.path()
        await context.close()
        await browser.close()

        import shutil
        shutil.move(video_path, str(OUTPUT_RAW))
        
        # Check duration
        result = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", str(OUTPUT_RAW)],
            capture_output=True, text=True
        )
        dur = float(result.stdout.strip())
        print(f"    ✅ Raw video: {dur:.1f}s")

def generate_narration():
    print("[2/3] Generating narration...")
    tts = gTTS(text=NARRATION_SCRIPT, lang="id", slow=False)
    tts.save(str(OUTPUT_NARRATION))
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(OUTPUT_NARRATION)],
        capture_output=True, text=True
    )
    dur = float(result.stdout.strip())
    print(f"    ✅ Narration: {dur:.1f}s")

def combine_video():
    print("[3/3] Combining video + narration...")
    
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(OUTPUT_NARRATION)],
        capture_output=True, text=True
    )
    nar_dur = float(result.stdout.strip())
    
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(OUTPUT_RAW)],
        capture_output=True, text=True
    )
    vid_dur = float(result.stdout.strip())
    
    print(f"    Video: {vid_dur:.1f}s | Narration: {nar_dur:.1f}s")

    OUTPUT_FINAL.parent.mkdir(parents=True, exist_ok=True)
    
    # Use setpts to adjust video speed to roughly match narration + some buffer
    # Target: video should be ~90% of narration so last bit is static
    if vid_dur < nar_dur:
        # Slow down video
        factor = nar_dur / vid_dur
        print(f"    Slowing video by {factor:.2f}x")
        vf = f"setpts={factor}*PTS"
        cmd = [
            "ffmpeg", "-y",
            "-i", str(OUTPUT_RAW),
            "-i", str(OUTPUT_NARRATION),
            "-filter_complex", f"[0:v]{vf}[v]",
            "-map", "[v]",
            "-map", "1:a:0",
            "-c:v", "libx264", "-preset", "fast", "-crf", "23",
            "-c:a", "aac",
            "-shortest",
            str(OUTPUT_FINAL),
        ]
    else:
        # Trim video
        print(f"    Trimming video to match narration")
        cmd = [
            "ffmpeg", "-y",
            "-i", str(OUTPUT_RAW),
            "-i", str(OUTPUT_NARRATION),
            "-c:v", "libx264", "-preset", "fast", "-crf", "23",
            "-c:a", "aac",
            "-shortest",
            "-map", "0:v:0", "-map", "1:a:0",
            str(OUTPUT_FINAL),
        ]
    
    subprocess.run(cmd, check=True)
    
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(OUTPUT_FINAL)],
        capture_output=True, text=True
    )
    final_dur = float(result.stdout.strip())
    size_mb = os.path.getsize(OUTPUT_FINAL) / (1024 * 1024)
    print(f"    ✅ Final video: {final_dur:.1f}s | {size_mb:.1f} MB")

async def main():
    await record_demo()
    generate_narration()
    combine_video()
    print("\n🎬 Demo video complete!")

if __name__ == "__main__":
    asyncio.run(main())
