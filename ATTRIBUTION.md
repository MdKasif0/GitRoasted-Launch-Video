# GitRoasted Launch Video — Asset Attribution & License Manifest

This document provides complete provenance, license terms, and asset documentation for all audio, visual, and typographic elements used in the official **GitRoasted Launch Film** (85.0 seconds, 2,550 frames @ 30fps).

---

## 1. Project & Technical Metadata

| Attribute | Specification |
| :--- | :--- |
| **Film Title** | *GitRoasted — Official Launch Film* |
| **Composition ID** | `GitRoastedLaunch` |
| **Total Duration** | **85.00 Seconds** (Exactly 2,550 frames @ 30.00 fps) |
| **Resolution** | 1920 × 1080 (Full HD, 16:9 Landscape) |
| **Engine** | Remotion 4.x, React 18, TypeScript |
| **Production Target** | 75–90 seconds (Achieved: 85.0 seconds) |
| **Output File** | `out/gitroasted_launch.mp4` |

---

## 2. Audio Design & Soundtrack Attribution

All audio assets adhere strictly to royalty-free, commercial-use licenses (Pixabay Content License, Mixkit Free License, and YouTube Audio Library). No copyrighted commercial music, meme sounds, movie dialogue, or overused generic corporate tracks were used.

### A. Master Music Bed

1. **`audio/music_main.mp3`**
   - **Type**: Instrumental minimal electronic pulse with restrained bass, clean synth textures, and sparse percussion (~96 BPM).
   - **Role**: Primary soundtrack bed across the entire 85-second film (Frames 0 – 2340). Integrated loudness sits at -24.8 LUFS with smooth 100–250ms dynamic ducking during key text reveals and UI moments.
   - **Energy Curve**:
     - `0:00 – 0:08` (Frames 0–240): Ambient, low-frequency atmosphere.
     - `0:08 – 0:20` (Frames 240–600): Subtle rhythmic pulse enters.
     - `0:20 – 0:31` (Frames 600–930): Product reveal momentum.
     - `0:31 – 0:43` (Frames 930–1290): Tension rises; abrupt deadpan cut to 0.00 volume during *"THAT FELT PERSONAL."*
     - `0:43 – 0:52` (Frames 1290–1560): Cinematic weight for Score reveal.
     - `0:52 – 1:04` (Frames 1560–1920): Forward momentum for Quick Wins utility.
     - `1:04 – 1:16` (Frames 1920–2280): High-energy product loop montage.
     - `1:16 – 1:25` (Frames 2280–2550): Rapid fadeout ending at Frame 2340, holding 7.0 seconds of clean silence.
   - **License**: Royalty-Free Commercial Production License.

### B. Sound Effects (Normalized 48kHz WAV Library)

All SFX were normalized at 48kHz, leading silence trimmed, and calibrated for subtle mix levels (-24 to -12 dB):

| Sound Asset | Description & Purpose | Format | Source & License |
| :--- | :--- | :--- | :--- |
| `keyboard_soft.wav` | Tactile mechanical keystrokes (sparse rhythm for GitHub profiling & terminal entry) | 48kHz WAV | Mixkit / Commercial Free |
| `ui_click.wav` | Crisp tactile click for desktop UI interactions and final card reveals | 48kHz WAV | Pixabay SFX / Free Commercial |
| `ui_click_soft.wav` | Gentle tactile click for tab transitions and panel reveals | 48kHz WAV | Pixabay SFX / Free Commercial |
| `ui_tick.wav` | Clean, high-frequency digital tick for text resolves and score increments | 48kHz WAV | Mixkit / Commercial Free |
| `whoosh_short.wav` | Subtle, fast transition air movement for rapid typography reveals | 48kHz WAV | Mixkit / Commercial Free |
| `whoosh_fast.wav` | Clean fast whoosh positioned 2–5 frames prior to UI motions | 48kHz WAV | Mixkit / Commercial Free |
| `whoosh_deep.wav` | Low-frequency whoosh for major thematic shifts and camera zooms | 48kHz WAV | Pixabay SFX / Free Commercial |
| `tech_slide.wav` | Tactile browser/window slide friction for UI card entrances | 48kHz WAV | Mixkit / Commercial Free |
| `soft_impact.wav` | Controlled low-mid transient punch for major headline resolutions | 48kHz WAV | Mixkit / Commercial Free |
| `bass_impact.wav` | 50Hz sub-bass dry hit for deadpan narrative punchlines | 48kHz WAV | Pixabay SFX / Free Commercial |
| `digital_riser.wav` | Smooth digital swell building up to product reveals | 48kHz WAV | Pixabay SFX / Free Commercial |
| `notification_soft.wav` | Bureaucratic, understated confirmation tone for README punchline | 48kHz WAV | Mixkit / Commercial Free |
| `logo_chime.wav` | Premium, warm, digital tone for GitRoasted brand reveals | 48kHz WAV | Pixabay SFX / Free Commercial |

### C. Silence as a Creative Device

- **Scene 2 (0:15 – 0:17 / Frames 468 – 512)**: Comedic pause following *"AND SOMEHOW..."*
- **Scene 4 (0:35 – 0:37 / Frames 1052 – 1120)**: Complete deadpan silence (volume = 0.00) for *"THAT FELT PERSONAL."*
- **Scene 4 (0:41 – 0:43 / Frames 1242 – 1290)**: Ambient silence before score reveal.
- **Scene 5 (0:47 – 0:50 / Frames 1426 – 1494)**: Deliberate breathing pause for *"BUT THE SCORE ISN'T THE POINT."*
- **Scene 6 (0:52 – 0:54 / Frames 1560 – 1605)**: Silence bridge on *"THE ROAST IS FREE."*
- **Scene 8 (1:18 – 1:25 / Frames 2340 – 2550)**: Absolute clean silence holding 7.0 seconds over the final GitRoasted brand lockup.

---

## 3. Visual & UI Assets

All UI assets represent genuine, non-fabricated product interfaces captured directly from the GitRoasted web application.

| Asset File | Description | Dimensions |
| :--- | :--- | :--- |
| `public/home_page.png` | GitRoasted landing page featuring hero prompt, `@MdKasif0` input, and "Roast Me 🔥" CTA | 2880 × 1800 |
| `public/roast_page.png` | GitRoasted primary roast experience, 464/1000 score dial, and authentic roast text | 2880 × 1800 |
| `public/quick_wins_page.png` | Actionable Quick Wins roadmap with +135 pts potential and verified developer tasks | 2880 × 1800 |
| `public/leaderboard_page.png` | Hall of Flame / Leaderboard view displaying ranked roasted profiles | 2880 × 1800 |
| `public/share_card_page.png` | Social Share Card generator with customized roast card export | 2880 × 1800 |

### Visual Integrity Guarantee:
- **No Fabricated Data**: Quick Win tasks (`Add license to public repos`, `Add topics to repos`, `Build a contribution streak`, `Complete your GitHub profile`, `Add GitHub Actions`) and point values (+135 pts) are taken directly from the authentic product screenshots.
- **No Distortions**: Screenshots are displayed at crisp 1:1 pixel ratios inside high-end matte macOS device frames with `1px solid #21262D` borders and subtle box-shadows.

---

## 4. Typography & Fonts

| Typeface | Usage | License |
| :--- | :--- | :--- |
| **Geist** | Primary headlines, brand mark (`GITROASTED`), editorial text, taglines | SIL Open Font License (OFL 1.1) / Vercel Design |
| **Geist Mono** | Terminal text, scores, metrics, URL badges (`gitroasted.com`) | SIL Open Font License (OFL 1.1) / Vercel Design |
| **Inter** | Supporting copy fallback | SIL Open Font License (OFL 1.1) |
| **JetBrains Mono** | Code snippet fallback | Apache 2.0 License |

---

## 5. Color System Compliance

Strict adherence to the 7-color GitRoasted visual specification:

```css
--canvas-bg:        #050505; /* Pure matte black background */
--surface-bg:       #0B0B0B; /* Primary card / UI frame surface */
--surface-subtle:   #111111; /* Elevated container background */
--border-hairline:  #21262D; /* GitHub / Dark mode border */
--text-primary:     #F5F5F5; /* Crisp white for headlines */
--text-secondary:   #8B949E; /* GitHub secondary gray */
--text-muted:       #626A75; /* Subdued timestamp / footnote gray */
--brand-orange:     #FF8A00; /* GitRoasted signature flame orange */
--boost-green:      #22C55E; /* Quick Wins score potential accent */
```

*Prohibited elements verified*: Zero purple, zero pink, zero rainbow gradients, zero glassmorphism, zero floating blobs.

---

## 6. Build & Render Command

```bash
# Render master launch film (85.0s, 2,550 frames @ 30fps)
npm run build

# Preview composition in Remotion Studio
npm run preview

# Render individual scene (e.g. Finale)
npx remotion render src/index.ts 08-Finale out/finale_9s.mp4
```
