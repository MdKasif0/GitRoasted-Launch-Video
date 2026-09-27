import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const Scene07VortexTunnel: React.FC = () => {
  const frame = useCurrentFrame();

  // Fast forward camera travel
  const cameraZ = interpolate(frame, [0, 90], [-400, 1600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cameraRotateZ = interpolate(frame, [0, 90], [0, 45]);

  const cards = [
    { title: 'Roast Score: 464', sub: 'Needs Work 🔥', color: '#FF8A00' },
    { title: 'Add MIT License', sub: '+25 pts available', color: '#16A34A' },
    { title: 'Streak Gap: 4 Months', sub: 'Touching Grass 🌿', color: '#EF4444' },
    { title: 'Hall of Flame', sub: 'Rank #142 Global', color: '#3B82F6' },
    { title: '3:14 AM Commit', sub: 'High Desperation', color: '#F59E0B' },
    { title: 'Add GitHub Actions', sub: '+30 pts potential', color: '#10B981' },
    { title: 'README "Coming soon"', sub: '3 years old 💀', color: '#8B5CF6' },
    { title: 'TypeScript 64%', sub: 'Primary Stack', color: '#2563EB' },
    { title: 'Quick Win Complete', sub: '+50 pts earned', color: '#16A34A' },
    { title: 'Build Streak', sub: '+30 pts potential', color: '#0EA5E9' },
    { title: '47 Repositories', sub: '3 Active / 44 Dormant', color: '#EC4899' },
    { title: 'Social Share Card', sub: 'Exported in 4K', color: '#FF8A00' },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        perspective: 900,
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Center Depth Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 138, 0, 0.12) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 3D Moving Tunnel Stage */}
      <div
        style={{
          position: 'relative',
          width: 0,
          height: 0,
          transform: `translateZ(${cameraZ}px) rotateZ(${cameraRotateZ}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {cards.map((card, i) => {
          const angle = (i / cards.length) * Math.PI * 2;
          const radius = 620; // Distance from center axis
          const zDepth = (i % 4) * 400; // Staggered along Z axis

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const rotateAngle = (angle * 180) / Math.PI + 90;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x - 150,
                top: y - 90,
                width: 300,
                height: 180,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 20,
                padding: '24px 20px',
                boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.12)',
                transform: `translateZ(${zDepth}px) rotateZ(${rotateAngle}deg) rotateX(15deg)`,
                transformStyle: 'preserve-3d',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: card.color }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Telemetry Stream
                  </span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 12 }}>
                  {card.title}
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: card.color,
                  background: '#F8FAFC',
                  padding: '6px 12px',
                  borderRadius: 8,
                  alignSelf: 'flex-start',
                }}
              >
                {card.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Center Overlay Headline */}
      <div
        style={{
          position: 'absolute',
          zIndex: 60,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.03em',
            textShadow: '0 2px 20px rgba(255,255,255,0.9)',
          }}
        >
          ANALYZE. ROAST. IMPROVE.
        </div>
      </div>
    </div>
  );
};
