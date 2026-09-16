import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Logo } from '../components/Logo';

export const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.97, 1]);

  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
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
        opacity: fadeOut,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          transform: `scale(${logoScale})`,
          opacity: interpolate(logoSpring, [0, 0.4], [0, 1]),
          zIndex: 10,
        }}
      >
        <Logo size={110} showText={true} />

        <div
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: '#8B949E',
            fontFamily: "'Geist', 'Inter', sans-serif",
            letterSpacing: '-0.02em',
          }}
        >
          Turn GitHub activity into comedy. Then into code.
        </div>

        {/* Real terminal badge from website */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 28px',
            borderRadius: 6,
            background: '#0B0B0B',
            border: '1px solid #21262D',
            fontFamily: "'Geist Mono', monospace",
            fontSize: 22,
            color: '#F5F5F5',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.85)',
          }}
        >
          <span style={{ color: '#FF8A00' }}>❯</span>
          <span>git push --roast</span>
        </div>

        {/* Tagline & URL */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            marginTop: 14,
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#626A75',
              textTransform: 'uppercase',
            }}
          >
            BRUTAL FEEDBACK. BETTER DEVELOPERS.
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#F5F5F5',
              letterSpacing: '-0.02em',
              fontFamily: "'Geist', 'Inter', sans-serif",
            }}
          >
            gitroasted.com
          </div>
        </div>
      </div>
    </div>
  );
};
