import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene03IsometricBars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera pan diagonally across the isometric stage
  const panX = interpolate(frame, [0, 120], [-150, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 120], [60, -40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bars = [
    { label: 'Consistency', value: 42, color: '#FB923C', delay: 10 },
    { label: 'Craft', value: 58, color: '#F97316', delay: 25 },
    { label: 'Impact', value: 39, color: '#EA580C', delay: 40 },
    { label: 'Profile Health', value: 46, color: '#C2410C', delay: 55 },
    { label: 'GitRoasted Score', value: 464, max: 1000, color: '#FF8A00', delay: 70, isHero: true },
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
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Background Isometric Grid */}
      <div
        style={{
          position: 'absolute',
          inset: -400,
          backgroundImage:
            'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(1000px) rotateX(60deg) rotateZ(-30deg)',
          opacity: 0.4,
        }}
      />

      {/* Title Overlay in Top Left */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 100,
          zIndex: 50,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: '#FF8A00', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Quantitative Breakdown
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>
          Every commit has a score.
        </div>
      </div>

      {/* 3D Isometric Bar Container */}
      <div
        style={{
          display: 'flex',
          gap: 65,
          alignItems: 'flex-end',
          transform: `translate(${panX}px, ${panY}px) perspective(1200px) rotateX(55deg) rotateZ(-32deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {bars.map((bar, idx) => {
          const barSpring = spring({
            frame: frame - bar.delay,
            fps,
            config: { damping: 15, stiffness: 80 },
          });

          const targetHeight = bar.isHero ? 420 : (bar.value / 100) * 320;
          const currentHeight = interpolate(barSpring, [0, 1], [0, targetHeight]);
          const displayValue = bar.isHero
            ? Math.round(interpolate(barSpring, [0, 1], [0, bar.value]))
            : `${Math.round(interpolate(barSpring, [0, 1], [0, bar.value]))}%`;

          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Bar Value Tooltip / Label */}
              <div
                style={{
                  position: 'absolute',
                  top: -currentHeight - 55,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: barSpring,
                  transform: 'rotateZ(32deg) rotateX(-55deg)', // Counter-rotate so text is readable
                }}
              >
                <span
                  style={{
                    fontSize: bar.isHero ? 28 : 22,
                    fontWeight: 800,
                    color: bar.isHero ? '#FF8A00' : '#0F172A',
                    background: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    border: bar.isHero ? '2px solid #FF8A00' : '1px solid #E2E8F0',
                  }}
                >
                  {displayValue}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#64748B',
                    marginTop: 4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {bar.label}
                </span>
              </div>

              {/* 3D Bar Pill */}
              <div
                style={{
                  width: bar.isHero ? 80 : 64,
                  height: currentHeight,
                  background: `linear-gradient(to top, ${bar.color}, #FDBA74)`,
                  borderRadius: 16,
                  boxShadow: `
                    -12px 12px 25px rgba(0, 0, 0, 0.08),
                    0 0 20px rgba(255, 138, 0, ${bar.isHero ? 0.35 : 0.15})
                  `,
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
              />

              {/* Ground Shadow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -15,
                  width: bar.isHero ? 90 : 70,
                  height: 35,
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.12)',
                  filter: 'blur(6px)',
                  transform: 'rotateX(90deg)',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
