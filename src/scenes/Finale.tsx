import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FlameIcon } from '../components/Logo';

export const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─────────────────────────────────────────────────────────────
  // FINAL BRAND REVEAL ARCHITECTURE (Total: 270 frames / 9.0s @ 30fps)
  //
  // 0 - 30f (0.0s - 1.0s):
  //   Clean silence and space following the abrupt cut of Scene 7.
  //
  // 30 - 75f (1.0s - 2.5s):
  //   Centered flame mark + "GITROASTED" enters with crisp, restrained spring.
  //
  // 75 - 110f (2.5s - 3.67s):
  //   Tagline appears:
  //   "Roast your GitHub.
  //    Improve your craft."
  //   Followed by a small, centered orange line.
  //
  // 110 - 270f (3.67s - 9.0s | 5.3+ seconds):
  //   ABSOLUTE STILLNESS & CLEAN SILENCE.
  //   The final frame holds for 3+ seconds with zero audio, zero CTA, zero fluff.
  // ─────────────────────────────────────────────────────────────

  // Logo entrance spring (Starts at Frame 30)
  const logoSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.94, 1.0]);
  const logoOpacity = interpolate(logoSpring, [0, 0.4], [0, 1]);

  // Tagline entrance spring (Starts at Frame 65)
  const taglineSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const taglineTranslateY = interpolate(taglineSpring, [0, 1], [14, 0]);
  const taglineOpacity = interpolate(taglineSpring, [0, 0.4], [0, 1]);

  // Small orange line width spring (Starts at Frame 90)
  const lineSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 16, stiffness: 160 },
  });
  const lineWidth = interpolate(lineSpring, [0, 1], [0, 56]);

  // Subtle URL opacity (Starts at Frame 105)
  const urlOpacity = interpolate(frame, [105, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Centered Brand Lockup */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          zIndex: 10,
        }}
      >
        {/* Flame Mark */}
        <div style={{ marginBottom: 24 }}>
          <FlameIcon size={108} />
        </div>

        {/* Brand Name: GITROASTED */}
        <div
          style={{
            fontFamily: "'Geist', -apple-system, sans-serif",
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: '-0.035em',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          <span style={{ color: '#F5F5F5' }}>GIT</span>
          <span style={{ color: '#FF8A00' }}>ROASTED</span>
        </div>

        {/* Tagline: Two Lines as Specified */}
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            lineHeight: 1.32,
            opacity: taglineOpacity,
            transform: `translateY(${taglineTranslateY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'Geist', -apple-system, sans-serif",
              fontSize: 32,
              fontWeight: 600,
              color: '#F5F5F5',
              letterSpacing: '-0.02em',
            }}
          >
            Roast your GitHub.
          </div>
          <div
            style={{
              fontFamily: "'Geist', -apple-system, sans-serif",
              fontSize: 32,
              fontWeight: 600,
              color: '#8B949E',
              letterSpacing: '-0.02em',
            }}
          >
            Improve your craft.
          </div>
        </div>

        {/* Small Orange Line Underneath */}
        <div
          style={{
            marginTop: 26,
            width: lineWidth,
            height: 2,
            backgroundColor: '#FF8A00',
            borderRadius: 1,
          }}
        />

        {/* Clean Web Address */}
        <div
          style={{
            marginTop: 24,
            fontFamily: "'Geist Mono', monospace",
            fontSize: 16,
            color: '#626A75',
            letterSpacing: '0.12em',
            opacity: urlOpacity,
          }}
        >
          gitroasted.com
        </div>
      </div>
    </div>
  );
};
