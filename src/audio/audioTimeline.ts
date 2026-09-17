import { interpolate } from 'remotion';
import { AUDIO } from './audioRegistry';

export interface AudioCue {
  id: string;
  file: string;
  frame: number;
  durationInFrames: number;
  volume: number;
  description: string;
}

/**
 * Master Music volume envelope across the 85-second film (2550 frames @ 30fps).
 * Follows the prescribed energy curve and intentional silence ducking.
 */
export const getMusicVolume = (frame: number): number => {
  // 0 - 240f (0:00 - 0:08): Very sparse, almost ambient atmosphere
  if (frame < 240) {
    return interpolate(frame, [0, 30, 240], [0.08, 0.12, 0.14], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // 240 - 600f (0:08 - 0:20): Subtle pulse enters (Scene 2: Developer Problem)
  if (frame < 600) {
    // 470 - 506f: "AND SOMEHOW..." intentional comedic pause / near-silence
    if (frame >= 468 && frame <= 512) {
      return interpolate(
        frame,
        [468, 474, 504, 512],
        [0.20, 0.04, 0.04, 0.18],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    // 560 - 600f: "Second opinion" opens up for Reveal
    if (frame >= 560) {
      return interpolate(frame, [560, 600], [0.18, 0.22], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
    return 0.20;
  }

  // 600 - 930f (0:20 - 0:31): Product reveal rhythm (Scene 3)
  if (frame < 930) {
    // 735 - 765f: Roast reveal panel (reduce -2dB on visual surprise)
    if (frame >= 732 && frame <= 770) {
      return interpolate(
        frame,
        [732, 738, 762, 770],
        [0.22, 0.16, 0.16, 0.22],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    return 0.22;
  }

  // 930 - 1290f (0:31 - 0:43): The Roast sequence (Scene 4)
  if (frame < 1290) {
    // 1055 - 1110f: "THAT FELT PERSONAL." DEADPAN COMEDIC SILENCE
    if (frame >= 1052 && frame <= 1120) {
      return interpolate(
        frame,
        [1052, 1055, 1110, 1120],
        [0.22, 0.0, 0.0, 0.18],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    // 1196 - 1220f: "IT CHECKED BACK." dry impact dip
    if (frame >= 1194 && frame <= 1222) {
      return interpolate(
        frame,
        [1194, 1198, 1216, 1222],
        [0.20, 0.08, 0.08, 0.20],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    // 1245 - 1290f: "YOU HAVE BEEN ROASTED." near-silence bridge to Score
    if (frame >= 1242) {
      return interpolate(frame, [1242, 1248, 1285, 1290], [0.20, 0.05, 0.05, 0.20], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
    return 0.22;
  }

  // 1290 - 1560f (0:43 - 0:52): Seriousness Score sequence (Scene 5)
  if (frame < 1560) {
    // 1430 - 1490f: "BUT THE SCORE ISN'T THE POINT." breathing space
    if (frame >= 1426 && frame <= 1494) {
      return interpolate(
        frame,
        [1426, 1432, 1486, 1494],
        [0.24, 0.06, 0.06, 0.22],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    // 1494 - 1560f: Forward momentum into Quick Wins
    if (frame >= 1494) {
      return interpolate(frame, [1494, 1530], [0.22, 0.24], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
    return 0.24;
  }

  // 1560 - 1920f (0:52 - 1:04): Quick Wins utility roadmap (Scene 6)
  if (frame < 1920) {
    // 1560 - 1595f: "THE ROAST IS FREE." pause
    if (frame >= 1560 && frame <= 1600) {
      return interpolate(
        frame,
        [1560, 1565, 1595, 1605],
        [0.22, 0.06, 0.06, 0.22],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    return 0.22;
  }

  // 1920 - 2280f (1:04 - 1:16): Product Montage (Scene 7)
  if (frame < 2280) {
    // 2145 - 2190f: Final narrative line "A LITTLE MORE HONEST."
    if (frame >= 2145 && frame <= 2190) {
      return interpolate(
        frame,
        [2145, 2150, 2185, 2190],
        [0.25, 0.12, 0.12, 0.24],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    // 2190 - 2280f: Abrupt reduction after final payoff
    if (frame >= 2190) {
      return interpolate(frame, [2190, 2220, 2280], [0.24, 0.10, 0.06], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
    return 0.25;
  }

  // 2280 - 2550f (1:16 - 1:25 | Scene 8: Finale):
  // Outro fades down to 0 by frame 2340 (78.0s), holding 5.3+ seconds of pure silence
  if (frame < 2340) {
    return interpolate(frame, [2280, 2340], [0.06, 0.0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // 2340 - 2550f: Absolute Clean Silence
  return 0.0;
};

/**
 * Frame-exact synchronized sound design timeline.
 * Every cue is mapped to the exact visual trigger in Remotion.
 */
export const AUDIO_CUES: AudioCue[] = [
  // =========================================================================
  // SCENE 1: COLD OPEN (0:00 - 0:09 | Frames 0 - 270)
  // =========================================================================
  {
    id: 's1-profile-tick',
    file: AUDIO.tick,
    frame: 15,
    durationInFrames: 10,
    volume: 0.15,
    description: 'Very quiet tick when "YOUR GITHUB PROFILE" appears',
  },
  {
    id: 's1-saying-more-tick',
    file: AUDIO.clickSoft,
    frame: 35,
    durationInFrames: 10,
    volume: 0.16,
    description: 'Slightly deeper tick when "is probably saying more about you" resolves',
  },
  {
    id: 's1-intended-tick',
    file: AUDIO.tick,
    frame: 65,
    durationInFrames: 10,
    volume: 0.15,
    description: 'Quiet tick when "than you intended." appears',
  },
  {
    id: 's1-github-key-1',
    file: AUDIO.keyboard,
    frame: 122,
    durationInFrames: 8,
    volume: 0.14,
    description: 'Subtle key hit on Profile Information flash',
  },
  {
    id: 's1-github-key-2',
    file: AUDIO.keyboard,
    frame: 131,
    durationInFrames: 8,
    volume: 0.15,
    description: 'Soft key hit during flash sequence',
  },
  {
    id: 's1-github-key-3',
    file: AUDIO.keyboard,
    frame: 141,
    durationInFrames: 8,
    volume: 0.16,
    description: 'Slightly faster key hit on Languages flash',
  },
  {
    id: 's1-github-key-cluster',
    file: AUDIO.keyboard,
    frame: 153,
    durationInFrames: 12,
    volume: 0.18,
    description: 'Small keyboard cluster before final activity reveal',
  },
  {
    id: 's1-github-activity-click',
    file: AUDIO.clickSoft,
    frame: 170,
    durationInFrames: 10,
    volume: 0.20,
    description: 'Tactile click when Activity Matrix lands',
  },
  {
    id: 's1-investigate-whoosh',
    file: AUDIO.whooshShort,
    frame: 184,
    durationInFrames: 15,
    volume: 0.18,
    description: 'Short clean whoosh leading into "We decided to investigate."',
  },
  {
    id: 's1-investigate-impact',
    file: AUDIO.softImpact,
    frame: 192,
    durationInFrames: 25,
    volume: 0.24,
    description: 'Soft impact when "We decided to investigate." settles',
  },
  {
    id: 's1-logo-whoosh',
    file: AUDIO.whooshShort,
    frame: 219,
    durationInFrames: 15,
    volume: 0.18,
    description: 'Soft whoosh under logo entrance',
  },
  {
    id: 's1-logo-chime',
    file: AUDIO.logoChime,
    frame: 236,
    durationInFrames: 40,
    volume: 0.28,
    description: 'Warm digital chime peaking as GitRoasted logo settles',
  },

  // =========================================================================
  // SCENE 2: DEVELOPER PROBLEM (0:09 - 0:20 | Frames 270 - 600)
  // =========================================================================
  {
    id: 's2-build-things-impact',
    file: AUDIO.softImpact,
    frame: 270,
    durationInFrames: 25,
    volume: 0.22,
    description: 'Soft impact on "YOU BUILD THINGS." text reveal',
  },
  {
    id: 's2-terminal-keyboard',
    file: AUDIO.keyboard,
    frame: 285,
    durationInFrames: 20,
    volume: 0.18,
    description: 'Short 0.6s keyboard snippet at terminal appearance',
  },
  {
    id: 's2-terminal-code-tick',
    file: AUDIO.tick,
    frame: 312,
    durationInFrames: 10,
    volume: 0.15,
    description: 'Subtle tick at code movement',
  },
  {
    id: 's2-push-code-tick',
    file: AUDIO.tick,
    frame: 342,
    durationInFrames: 10,
    volume: 0.20,
    description: 'Clean digital tick on "YOU PUSH CODE."',
  },
  {
    id: 's2-push-code-whoosh',
    file: AUDIO.whooshShort,
    frame: 350,
    durationInFrames: 15,
    volume: 0.18,
    description: 'Short transition whoosh coinciding with workflow diagram',
  },
  {
    id: 's2-push-code-click',
    file: AUDIO.click,
    frame: 354,
    durationInFrames: 10,
    volume: 0.22,
    description: 'Slightly stronger transient on "CODE."',
  },
  {
    id: 's2-repos-47-tick',
    file: AUDIO.tick,
    frame: 412,
    durationInFrames: 10,
    volume: 0.22,
    description: 'Factual digital tick when "47" visually punches in',
  },
  {
    id: 's2-repos-47-bass',
    file: AUDIO.bassImpact,
    frame: 414,
    durationInFrames: 25,
    volume: 0.20,
    description: 'Extremely subtle low impact supporting 47 repositories',
  },
  {
    id: 's2-somehow-hit',
    file: AUDIO.bassImpact,
    frame: 476,
    durationInFrames: 25,
    volume: 0.18,
    description: 'Soft low hit on "AND SOMEHOW..." before silence',
  },
  {
    id: 's2-readme-click',
    file: AUDIO.clickSoft,
    frame: 522,
    durationInFrames: 10,
    volume: 0.18,
    description: 'Tiny UI click when README visual appears',
  },
  {
    id: 's2-coming-soon-notif',
    file: AUDIO.notification,
    frame: 534,
    durationInFrames: 25,
    volume: 0.22,
    description: 'Subtle bureaucratic confirmation chime on "coming soon."',
  },
  {
    id: 's2-second-opinion-whoosh',
    file: AUDIO.whooshDeep,
    frame: 562,
    durationInFrames: 25,
    volume: 0.20,
    description: 'Controlled deep whoosh on orange emphasis appearance',
  },
  {
    id: 's2-second-opinion-impact',
    file: AUDIO.softImpact,
    frame: 575,
    durationInFrames: 25,
    volume: 0.22,
    description: 'Soft impact on "second opinion."',
  },

  // =========================================================================
  // SCENE 3: MEET GITROASTED & REVEAL (0:20 - 0:31 | Frames 600 - 930)
  // =========================================================================
  {
    id: 's3-meet-riser',
    file: AUDIO.riser,
    frame: 605,
    durationInFrames: 35,
    volume: 0.20,
    description: 'Digital riser starting ~0.5s before logo reveal',
  },
  {
    id: 's3-meet-logo-chime',
    file: AUDIO.logoChime,
    frame: 638,
    durationInFrames: 45,
    volume: 0.28,
    description: 'Logo chime exactly as GitRoasted wordmark settles',
  },
  {
    id: 's3-meet-bass-impact',
    file: AUDIO.bassImpact,
    frame: 638,
    durationInFrames: 25,
    volume: 0.16,
    description: 'Subtle warm bass impact under final logo lock-up',
  },
  {
    id: 's3-homepage-tech-slide',
    file: AUDIO.techSlide,
    frame: 670,
    durationInFrames: 15,
    volume: 0.22,
    description: 'Tech slide for GitRoasted homepage UI entrance',
  },
  {
    id: 's3-homepage-settle-click',
    file: AUDIO.clickSoft,
    frame: 688,
    durationInFrames: 10,
    volume: 0.18,
    description: 'Soft click as homepage settles',
  },
  {
    id: 's3-roast-me-button-click',
    file: AUDIO.click,
    frame: 726,
    durationInFrames: 10,
    volume: 0.24,
    description: 'Tactile cursor click on "Roast Me 🔥" button',
  },
  {
    id: 's3-roast-reveal-whoosh',
    file: AUDIO.whooshShort,
    frame: 728,
    durationInFrames: 15,
    volume: 0.18,
    description: 'Rising micro-tension whoosh into roast view',
  },
  {
    id: 's3-roast-reveal-impact',
    file: AUDIO.softImpact,
    frame: 738,
    durationInFrames: 25,
    volume: 0.24,
    description: 'Soft impact on roast panel reveal ("Oh.")',
  },
  {
    id: 's3-quickwins-teaser-slide',
    file: AUDIO.techSlide,
    frame: 810,
    durationInFrames: 15,
    volume: 0.20,
    description: 'Interface slide on profile to quick wins switch',
  },
  {
    id: 's3-quickwins-click-1',
    file: AUDIO.clickSoft,
    frame: 825,
    durationInFrames: 10,
    volume: 0.16,
    description: 'Restrained interface click',
  },
  {
    id: 's3-quickwins-click-2',
    file: AUDIO.clickSoft,
    frame: 846,
    durationInFrames: 10,
    volume: 0.16,
    description: 'Restrained interface click',
  },
  {
    id: 's3-quickwins-whoosh',
    file: AUDIO.whooshShort,
    frame: 870,
    durationInFrames: 15,
    volume: 0.18,
    description: 'Subtle interface camera pan whoosh',
  },
  {
    id: 's3-quickwins-click-3',
    file: AUDIO.click,
    frame: 885,
    durationInFrames: 10,
    volume: 0.18,
    description: 'Final soft click in overview section',
  },

  // =========================================================================
  // SCENE 4: THE ROAST EXPERIENCE (0:31 - 0:43 | Frames 930 - 1290)
  // =========================================================================
  {
    id: 's4-roast-zoom-whoosh',
    file: AUDIO.whooshDeep,
    frame: 930,
    durationInFrames: 25,
    volume: 0.20,
    description: 'Deep subtle whoosh as camera zooms into first roast line',
  },
  {
    id: 's4-roast-zoom-tick',
    file: AUDIO.tick,
    frame: 945,
    durationInFrames: 10,
    volume: 0.15,
    description: 'Quiet UI tick during roast zoom',
  },
  {
    id: 's4-roast-zoom-click',
    file: AUDIO.clickSoft,
    frame: 1005,
    durationInFrames: 10,
    volume: 0.18,
    description: 'Soft click as observation spotlight frames the text',
  },
  {
    id: 's4-roast-zoom-impact',
    file: AUDIO.bassImpact,
    frame: 1035,
    durationInFrames: 25,
    volume: 0.18,
    description: 'Very subtle low impact before punchline cut',
  },
  {
    id: 's4-that-felt-personal-impact',
    file: AUDIO.softImpact,
    frame: 1055,
    durationInFrames: 25,
    volume: 0.24,
    description: 'Single impact on "THAT FELT PERSONAL." followed by dead silence',
  },
  {
    id: 's4-roast-return-whoosh',
    file: AUDIO.whooshDeep,
    frame: 1108,
    durationInFrames: 25,
    volume: 0.20,
    description: 'Short deep whoosh returning to the evidence',
  },
  {
    id: 's4-checked-data-tick',
    file: AUDIO.tick,
    frame: 1170,
    durationInFrames: 10,
    volume: 0.20,
    description: 'Clean digital tick on "WE CHECKED THE DATA."',
  },
  {
    id: 's4-checked-back-bass',
    file: AUDIO.bassImpact,
    frame: 1198,
    durationInFrames: 25,
    volume: 0.22,
    description: 'Dry, low and subtle bass impact on "IT CHECKED BACK."',
  },
  {
    id: 's4-been-roasted-hit',
    file: AUDIO.softImpact,
    frame: 1245,
    durationInFrames: 20,
    volume: 0.16,
    description: 'Tiny low hit on "YOU HAVE BEEN ROASTED." followed by pause',
  },

  // =========================================================================
  // SCENE 5: SERIOUSNESS SCORE (0:43 - 0:52 | Frames 1290 - 1560)
  // =========================================================================
  {
    id: 's5-score-appear-tick',
    file: AUDIO.tick,
    frame: 1338,
    durationInFrames: 10,
    volume: 0.16,
    description: 'UI tick when score counter container appears',
  },
  {
    id: 's5-score-count-tick-1',
    file: AUDIO.tick,
    frame: 1350,
    durationInFrames: 10,
    volume: 0.16,
    description: 'First major score count tick',
  },
  {
    id: 's5-score-count-tick-2',
    file: AUDIO.tick,
    frame: 1362,
    durationInFrames: 10,
    volume: 0.18,
    description: 'Second major score count tick',
  },
  {
    id: 's5-score-count-tick-3',
    file: AUDIO.tick,
    frame: 1374,
    durationInFrames: 10,
    volume: 0.18,
    description: 'Third major score count tick',
  },
  {
    id: 's5-score-final-impact',
    file: AUDIO.softImpact,
    frame: 1382,
    durationInFrames: 30,
    volume: 0.28,
    description: 'Definitive impact exactly as final score 464 lands',
  },
  {
    id: 's5-score-final-click',
    file: AUDIO.click,
    frame: 1382,
    durationInFrames: 10,
    volume: 0.20,
    description: 'Crisp tactile transient on final score settle',
  },
  {
    id: 's5-score-not-point-tick',
    file: AUDIO.tick,
    frame: 1430,
    durationInFrames: 10,
    volume: 0.15,
    description: 'Subtle tick on "BUT THE SCORE ISN\'T THE POINT."',
  },
  {
    id: 's5-next-step-riser',
    file: AUDIO.riser,
    frame: 1490,
    durationInFrames: 25,
    volume: 0.20,
    description: 'Controlled riser before orange emphasis',
  },
  {
    id: 's5-next-step-impact',
    file: AUDIO.softImpact,
    frame: 1510,
    durationInFrames: 25,
    volume: 0.24,
    description: 'Soft impact when "WHAT YOU DO NEXT IS." settles',
  },

  // =========================================================================
  // SCENE 6: QUICK WINS ROADMAP (0:52 - 1:04 | Frames 1560 - 1920)
  // =========================================================================
  {
    id: 's6-fixes-point-confirm',
    file: AUDIO.notification,
    frame: 1602,
    durationInFrames: 25,
    volume: 0.22,
    description: 'Product status confirmation chime on "THE FIXES ARE THE POINT."',
  },
  {
    id: 's6-task-slide',
    file: AUDIO.techSlide,
    frame: 1644,
    durationInFrames: 15,
    volume: 0.20,
    description: 'Tech slide entering Quick Wins roadmap UI',
  },
  {
    id: 's6-task1-click',
    file: AUDIO.clickSoft,
    frame: 1665,
    durationInFrames: 10,
    volume: 0.16,
    description: 'Soft click on Task 01 focus',
  },
  {
    id: 's6-task1-tick',
    file: AUDIO.tick,
    frame: 1689,
    durationInFrames: 10,
    volume: 0.16,
    description: 'Subtle tick on Task 01 progress',
  },
  {
    id: 's6-task2-click',
    file: AUDIO.clickSoft,
    frame: 1716,
    durationInFrames: 10,
    volume: 0.16,
    description: 'Soft click on Task 02 focus',
  },
  {
    id: 's6-camera-whoosh',
    file: AUDIO.whooshShort,
    frame: 1749,
    durationInFrames: 15,
    volume: 0.18,
    description: 'Clean camera sweep whoosh up to Roadmap Score card',
  },
  {
    id: 's6-roadmap-click',
    file: AUDIO.clickSoft,
    frame: 1770,
    durationInFrames: 10,
    volume: 0.16,
    description: 'Soft click on Roadmap score potential card',
  },
  {
    id: 's6-boost-impact',
    file: AUDIO.softImpact,
    frame: 1806,
    durationInFrames: 25,
    volume: 0.22,
    description: 'Clean impact on full composition lock (+135 pts)',
  },
  {
    id: 's6-small-fixes-hit',
    file: AUDIO.softImpact,
    frame: 1845,
    durationInFrames: 20,
    volume: 0.18,
    description: 'Very soft impact on "SMALL FIXES."',
  },
  {
    id: 's6-better-github-hit',
    file: AUDIO.softImpact,
    frame: 1868,
    durationInFrames: 20,
    volume: 0.22,
    description: 'Slightly stronger impact on "BETTER GITHUB."',
  },
  {
    id: 's6-better-roast-hit',
    file: AUDIO.softImpact,
    frame: 1890,
    durationInFrames: 25,
    volume: 0.26,
    description: 'Strongest impact on "BETTER ROAST."',
  },

  // =========================================================================
  // SCENE 7: PRODUCT MONTAGE (1:04 - 1:16 | Frames 1920 - 2280)
  // =========================================================================
  {
    id: 's7-analyze-tick',
    file: AUDIO.tick,
    frame: 1920,
    durationInFrames: 10,
    volume: 0.18,
    description: 'Digital tick on "ANALYZE."',
  },
  {
    id: 's7-analyze-whoosh',
    file: AUDIO.whooshShort,
    frame: 1920,
    durationInFrames: 15,
    volume: 0.18,
    description: 'Tiny whoosh on "ANALYZE."',
  },
  {
    id: 's7-roast-impact',
    file: AUDIO.bassImpact,
    frame: 1965,
    durationInFrames: 25,
    volume: 0.22,
    description: 'Slightly deeper impact on "ROAST."',
  },
  {
    id: 's7-improve-tick',
    file: AUDIO.tick,
    frame: 2010,
    durationInFrames: 10,
    volume: 0.20,
    description: 'Clean upward tonal tick on "IMPROVE."',
  },
  {
    id: 's7-repeat-whoosh',
    file: AUDIO.whooshFast,
    frame: 2055,
    durationInFrames: 15,
    volume: 0.20,
    description: 'Short fast whoosh on "REPEAT."',
  },
  {
    id: 's7-repeat-click',
    file: AUDIO.clickSoft,
    frame: 2055,
    durationInFrames: 10,
    volume: 0.18,
    description: 'UI click on "REPEAT."',
  },
  {
    id: 's7-community-slide',
    file: AUDIO.techSlide,
    frame: 2100,
    durationInFrames: 15,
    volume: 0.22,
    description: 'Tech slide for Community & Leaderboard appearance',
  },
  {
    id: 's7-community-settle',
    file: AUDIO.clickSoft,
    frame: 2125,
    durationInFrames: 10,
    volume: 0.18,
    description: 'Subtle UI click on leaderboard settle',
  },
  {
    id: 's7-honest-tick-1',
    file: AUDIO.tick,
    frame: 2145,
    durationInFrames: 10,
    volume: 0.16,
    description: 'Tiny tick at "YOUR GITHUB"',
  },
  {
    id: 's7-honest-whoosh',
    file: AUDIO.whooshShort,
    frame: 2156,
    durationInFrames: 12,
    volume: 0.16,
    description: 'Quiet tension at "JUST GOT"',
  },
  {
    id: 's7-honest-impact',
    file: AUDIO.softImpact,
    frame: 2178,
    durationInFrames: 25,
    volume: 0.22,
    description: 'Soft warm impact at "A LITTLE MORE HONEST."',
  },

  // =========================================================================
  // SCENE 8: FINALE (1:16 - 1:25 | Frames 2280 - 2550)
  // =========================================================================
  {
    id: 's8-finale-logo-chime',
    file: AUDIO.logoChime,
    frame: 2310,
    durationInFrames: 30,
    volume: 0.20,
    description: 'Subtle logo chime as final lockup settles; 0 SFX afterward',
  },
];
