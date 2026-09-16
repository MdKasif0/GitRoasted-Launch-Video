# GitRoasted — Official Launch Film

> 80-second startup launch film for **GitRoasted** built programmatically using **Remotion**, React, and TypeScript.

---

## 🎬 Overview

- **Resolution**: 1920 × 1080
- **Frame Rate**: 30 fps
- **Duration**: Exactly 80.0 seconds (2,400 frames)
- **Output Artifact**: `out/gitroasted_launch.mp4`

---

## 🎨 Visual Identity & Design System

The visual language follows the strict aesthetic of a high-end developer tool + editorial design + internet humor + startup launch film:

- **Color System**:
  - **Background Primary**: `#050505` (matte black canvas)
  - **Background Secondary**: `#0A0A0A`
  - **Surfaces**: `#0B0B0B`, `#111111`
  - **Hairline Borders**: `1px solid #21262D`
  - **Text Primary**: `#F5F5F5`
  - **Text Secondary**: `#8B949E`
  - **Text Muted**: `#626A75`
  - **Brand Orange**: `#FF8A00`
  - **Secondary Orange**: `#FF9F1C`
  - **Positive Boost**: `#22C55E`
- **Zero Prohibited Aesthetics**: Zero purple/pink/rainbow gradients, zero neon glows, zero glassmorphism, zero floating blobs.
- **Typography**: `Geist` and `Inter` for headlines and editorial copy; `Geist Mono` and `JetBrains Mono` selectively for scores, metrics, streak pills, and terminal commands.
- **Motion Dynamics**: Spring transitions bounded to `scale(0.97 to 1.0)`, 150–500ms UI interactions, and virtual camera pans/push-ins. Real UI screenshots inside authentic device frames.

---

## 🎞️ Scene Breakdown

1. **Scene 1: Cold Open (0:00 – 0:08 | 240f)**: Universal truth of neglected GitHub profiles.
2. **Scene 2: The Problem (0:08 – 0:17 | 270f)**: Pushing straight to main at 3:14 AM and starring our own repos.
3. **Scene 3: The Reveal (0:17 – 0:27 | 300f)**: Landing page in device frame with interactive cursor typing `@MdKasif0` and clicking `Roast Me`.
4. **Scene 4: The Roast (0:27 – 0:40 | 390f)**: Verbatim AI roast quote with grounded editorial callouts.
5. **Scene 5: Seriousness Score & Breakdown (0:40 – 0:52 | 360f)**: Live score rollup (0 to 464) and pan down to the 7 score breakdown metrics.
6. **Scene 6: Actionable Quick Wins (0:52 – 1:04 | 360f)**: Roadmap demonstrating the score leap `463` ➔ `598` (+135 pts).
7. **Scene 7: Product Montage (1:04 – 1:14 | 300f)**: Social Card Studio + Hall of Flame Leaderboard.
8. **Scene 8: Finale (1:14 – 1:20 | 180f)**: Clean brand closure, terminal badge `❯ git push --roast`, `gitroasted.com`.

---

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Preview in Remotion Studio

```bash
npm run preview
```

Studio opens at `http://localhost:3000` where you can scrub through all 2,400 frames and inspect individual scenes.

### Render Video

```bash
npm run build
```

Builds the final production video to `out/gitroasted_launch.mp4`.

---

## 🛠️ Tech Stack

- **Remotion 4.x**
- **React 18**
- **TypeScript**
- **Web Audio API** (deterministic procedural audio effects)
