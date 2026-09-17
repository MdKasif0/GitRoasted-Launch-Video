# GitRoasted — Official Launch Film

> 85-second startup launch film for **GitRoasted** built programmatically using **Remotion**, React, and TypeScript.

---

## 🎬 Film Overview & Specifications

- **Resolution**: 1920 × 1080 (16:9 Full HD)
- **Frame Rate**: 30.00 fps
- **Exact Duration**: **85.00 seconds** (2,550 frames)
- **Composition Target**: 75–90 seconds minimum
- **Engine**: Remotion 4.x / React 18 / TypeScript
- **Output Artifact**: `out/gitroasted_launch.mp4`

---

## ⏱️ Final Scene Structure & Timing Breakdown

| Scene | Timestamp | Frames | Core Beat & Narrative Arc |
| :--- | :--- | :--- | :--- |
| **01 Cold Open** | `0:00 – 0:09` | 270f | Monospace minimalist documentary opening: *"Your GitHub profile is probably saying more about you than you intended."* Sudden freeze cut: *"We decided to investigate."* |
| **02 Developer Problem** | `0:09 – 0:20` | 330f | Universal developer cycle: You build things. You push code. You create 47 repositories. *"...and somehow your README still says 'coming soon.'"* |
| **03 GitRoasted Reveal** | `0:20 – 0:31` | 330f | Main product reveal. Clean matte frame, real homepage UI (`home_page.png`), animated desktop cursor typing `@MdKasif0` and clicking *"Roast Me 🔥"*. |
| **04 The Roast** | `0:31 – 0:43` | 360f | Comedic deadpan sequence. Verbatim roast quote: *"A graveyard of unfinished side projects and 3 AM commit messages."* 600ms deliberate silence pause. *"THAT FELT PERSONAL."* Sub-bass punchline. |
| **05 The Score** | `0:43 – 0:52` | 270f | Serious quantitative moment. Real score breakdown (0 ➔ 464 / 1000). Metric telemetry: Consistency (42), Craft (58), Impact (39). *"Everything has a score. But the score isn't the point."* |
| **06 Quick Wins** | `0:52 – 1:04` | 360f | Actionable roadmap (`quick_wins_page.png`). Verified developer tasks (+135 pts potential: License, Topics, Streaks, CI/CD). *"The roast is free. The fixes are the point."* |
| **07 Product Montage** | `1:04 – 1:16` | 360f | High-tempo startup montage: `ANALYZE.` ➔ `ROAST.` ➔ `IMPROVE.` ➔ `REPEAT.` Featuring Leaderboard (`leaderboard_page.png`) & Share Card (`share_card_page.png`). Payoff text with abrupt cutoff. |
| **08 Final Brand Reveal** | `1:16 – 1:25` | 270f | Pure black canvas. Centered Flame icon + `GITROASTED` brand mark. Tagline: *"Roast your GitHub. / Improve your craft."* Small orange accent line. Holds for over 5.3 seconds in clean, deadpan silence. |

---

## 🎨 Visual Identity & Strict Design System

- **Color Palette**:
  - `Canvas Background`: `#050505` (matte deep black)
  - `Surfaces`: `#0B0B0B`, `#111111`
  - `Borders`: `1px solid #21262D` (authentic GitHub hairline border)
  - `Text Primary`: `#F5F5F5`
  - `Text Secondary`: `#8B949E`
  - `Text Muted`: `#626A75`
  - `Brand Accent`: `#FF8A00` (signature flame orange)
  - `Score Boost`: `#22C55E` (Quick Wins potential indicator)
- **Zero Prohibited Aesthetics**: Strictly zero purple, zero pink, zero rainbow gradients, zero glassmorphism, zero floating blobs, zero cheesy reaction emojis.
- **Typography**: `Geist` for editorial headlines and brand identity; `Geist Mono` for scores, terminal syntax, and timestamps.

---

## 🎵 Audio Design & Licensing

All audio tracks and sound effects are royalty-free and approved for commercial use under the **Pixabay Content License**, **Mixkit Free License**, and **YouTube Audio Library**.

- **Music Direction**: Restrained indie-tech electronic pulse beds (`pulse_bed.wav`, `reveal_beat.wav`, `bridge_energy.wav`) featuring warm sub-bass, light synth textures, and clear rhythmic momentum kept at -18 to -14 LUFS.
- **SFX**: Purpose-driven foley including mechanical keystrokes (`keystroke.wav`), desktop cursor clicks (`click.wav`), soft digital ticks (`tick.wav`), sub-bass impacts (`soft_bass.wav`, `sub_drop.wav`), and a deliberate comedic tape stop (`tape_stop.wav`).
- **Clean Silence**: Scene 8 deliberately ends with 0 audio, holding 5.3+ seconds in absolute silence for maximum impact.
- Detailed license records and source manifest are available in [ATTRIBUTION.md](./ATTRIBUTION.md).

---

## 🚀 Quick Start & Rendering

### Install Dependencies

```bash
npm install
```

### Preview in Remotion Studio

```bash
npm run preview
```

Studio opens at `http://localhost:3000` where you can scrub through all 2,550 frames, check frame-perfect timings, and inspect individual scenes (`01-ColdOpen` through `08-Finale`).

### Render Production Video

```bash
# Render complete 85-second master launch film
npm run build

# Or render with Remotion CLI directly:
npx remotion render src/index.ts GitRoastedLaunch out/gitroasted_launch.mp4
```

### Render Individual Scenes

```bash
npx remotion render src/index.ts 08-Finale out/finale_9s.mp4
npx remotion render src/index.ts 07-ProductMontage out/product_montage_12s.mp4
```

---

## 📂 Project Structure

```
├── ATTRIBUTION.md               # Asset attribution, licenses & technical specifications
├── README.md                    # Project documentation & overview
├── package.json                 # Remotion 4.x scripts & dependencies
├── public/                      # Static assets (official UI screenshots & audio files)
│   ├── home_page.png            # Actual GitRoasted homepage UI
│   ├── roast_page.png           # Actual GitRoasted roast UI (464/1000 score dial)
│   ├── quick_wins_page.png      # Actual GitRoasted quick wins UI (+135 pts)
│   ├── leaderboard_page.png     # Actual GitRoasted leaderboard UI
│   ├── share_card_page.png      # Actual GitRoasted share card export UI
│   └── audio/                   # Royalty-free music beds & SFX
└── src/
    ├── Root.tsx                 # Remotion root registering all 8 compositions
    ├── index.ts                 # Entrypoint
    ├── audio/
    │   └── AudioTrack.tsx       # Master audio synchronization layer
    ├── components/
    │   ├── Cursor.tsx           # Realistic desktop cursor component
    │   ├── DeviceFrame.tsx      # Matte macOS window chrome container
    │   ├── Logo.tsx             # Precision SVG Flame icon & brand lockup
    │   └── Noise.tsx            # Subtle filmic grain overlay
    ├── compositions/
    │   └── GitRoastedLaunch.tsx # 85-second master composition (Series of 8 scenes)
    └── scenes/
        ├── ColdOpen.tsx         # Scene 1 (270 frames / 9.0s)
        ├── Problem.tsx          # Scene 2 (330 frames / 11.0s)
        ├── Reveal.tsx           # Scene 3 (330 frames / 11.0s)
        ├── Roast.tsx            # Scene 4 (360 frames / 12.0s)
        ├── Score.tsx            # Scene 5 (270 frames / 9.0s)
        ├── QuickWins.tsx        # Scene 6 (360 frames / 12.0s)
        ├── ProductMontage.tsx   # Scene 7 (360 frames / 12.0s)
        └── Finale.tsx           # Scene 8 (270 frames / 9.0s)
```
