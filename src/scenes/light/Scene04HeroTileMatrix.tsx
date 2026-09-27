import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FlameIcon, Logo } from '../../components/Logo';

export const Scene04HeroTileMatrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hero Tile Scale Spring
  const tileSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Background Matrix Drift
  const matrixTranslateY = interpolate(frame, [0, 90], [20, -30]);
  const matrixScale = interpolate(frame, [0, 90], [1.0, 1.06]);

  const techBadges = [
    'TypeScript', 'React', 'Next.js', 'Python', 'Docker', 'Rust',
    'Tailwind', 'Vite', 'GitHub Actions', 'Node.js', 'PostgreSQL', 'Go',
    'Linux', 'GraphQL', 'Bun', 'Kubernetes', 'Redis', 'Svelte',
    'Vue', 'FastAPI', 'Turborepo', 'AWS', 'Prisma', 'Supabase'
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: '#FAFAFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Background Matrix of Tech Tiles with Depth-of-Field Blur */}
      <div
        style={{
          position: 'absolute',
          inset: -120,
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
          transform: `translateY(${matrixTranslateY}px) scale(${matrixScale})`,
          opacity: interpolate(tileSpring, [0, 1], [0, 0.45]),
          filter: 'blur(3.5px)',
          pointerEvents: 'none',
        }}
      >
        {techBadges.map((tech, i) => (
          <div
            key={i}
            style={{
              height: 110,
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 20,
              color: '#475569',
              boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
            }}
          >
            {tech}
          </div>
        ))}
      </div>

      {/* Center Hero Tile with Ambient Elevation Shadow */}
      <div
        style={{
          position: 'relative',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${tileSpring})`,
        }}
      >
        {/* Embossed White Hero Disc */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 64,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow:
              '0 40px 100px -20px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(0,0,0,0.04), inset 0 2px 4px rgba(255,255,255,0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <FlameIcon size={110} />
        </div>

        {/* Brand Caption */}
        <div
          style={{
            marginTop: 36,
            opacity: interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        >
          <Logo size={42} showText={true} tagline="Ecosystem Analysis Engine" theme="light" />
        </div>
      </div>
    </div>
  );
};
