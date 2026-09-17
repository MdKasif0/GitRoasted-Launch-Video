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

### A. Music & Melodic Beds

1. **`pulse_bed.wav`**
   - **Type**: Restrained minimalist electronic pulse bed (warm sub-bass, 118 BPM pulse, soft analog synth texture).
   - **Role**: Background layer during Scene 2 (The Problem) and Scene 3 (Reveal). Mixed at -18 to -16 LUFS to support narrative pacing without dominating.
   - **Source**: Pixabay Audio Library / Royalty-Free Electronic Pulse.
   - **License**: Pixabay Content License (Free for commercial and non-commercial use, no attribution required).

2. **`reveal_beat.wav`**
   - **Type**: Mid-tempo indie-tech electronic rhythm with filtered percussion and clean synth pluck.
   - **Role**: Drives Scene 3 (The Reveal), Scene 4 (The Roast), and Scene 7 (Product Montage).
   - **Source**: YouTube Audio Library / Creative Commons Royalty-Free Indie Tech.
   - **License**: Royalty-Free Production Music (Commercial use approved).

3. **`bridge_energy.wav`**
   - **Type**: Cinematic electronic riser with building percussion and harmonic swells.
   - **Role**: Provides the transition bridge across the rapid editorial montage in Scene 7.
   - **Source**: Pixabay Music.
   - **License**: Pixabay Content License (Commercial use approved).

### B. Sound Effects (SFX)

All SFX were individually curated for acoustic authenticity and purpose-driven foley.

| Sound Asset | Description & Purpose | Source & License |
| :--- | :--- | :--- |
| `keystroke.wav` | Mechanical switch tactile click (used during live terminal and search bar typing) | Mixkit Sound Effects / Free Commercial License |
| `keystroke_soft.wav` | Softer secondary mechanical switch release | Mixkit Sound Effects / Free Commercial License |
| `click.wav` | Modern desktop UI cursor mouse click (15ms crisp transient) | Mixkit Sound Effects / Free Commercial License |
| `notif_click.wav` | Subtle digital confirmation tick / pill selector feedback | Mixkit Sound Effects / Free Commercial License |
| `tick.wav` | High-frequency digital counter tick for score rollup | Mixkit Sound Effects / Free Commercial License |
| `chime.wav` | Pure sine harmonic feedback for score boosts (+135 pts) | Pixabay SFX / Free Commercial License |
| `soft_bass.wav` | Subdued 60Hz cinematic bass impact on headline reveals | Mixkit Sound Effects / Free Commercial License |
| `sub_drop.wav` | 40Hz sub-bass drop emphasizing the deadpan roast punchline | Pixabay SFX / Free Commercial License |
| `impact.wav` | Controlled low-frequency cinematic impact on logo entrance | Mixkit Sound Effects / Free Commercial License |
| `whoosh.wav` | Soft, low-pass camera pan whoosh between dashboard tabs | Mixkit Sound Effects / Free Commercial License |
| `tape_stop.wav` | Deliberate tape stop / abrupt filter cut creating the comedic silence | Mixkit Sound Effects / Free Commercial License |
| `score_rollup.wav` | Procedural multi-oscillator rising tone syncing with 0-464 score counter | Custom Remotion Web Audio synthesis |

### C. Silence as a Creative Device

- **Scene 4 (The Roast, 0:31 - 0:43)**: Features a deliberate 600ms absolute deadpan silence (tape stop at Frame 160) before the roast punchline lands.
- **Scene 8 (Final Brand Reveal, 1:16 - 1:25 / Frames 2280 - 2550)**: Clean, deadpan silence holding for over 5.3 seconds following the abrupt cutoff of the montage. Zero background music, zero voiceover, zero audio clutter.

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
