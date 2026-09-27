import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FlameIcon } from '../../components/Logo';

export const Scene08ScoreDialTurntable: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 60): Macro Dial Countup
  const dialSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const scoreNumber = Math.round(interpolate(dialSpring, [0, 1], [0, 464]));

  // Transition to 3D Turntable (starts at frame 50)
  const turntableTransition = spring({
    frame: frame - 50,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  const turntableRotate = interpolate(frame, [50, 120], [0, 70], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const avatars = [
    { name: 'Alex', score: '780', color: '#16A34A' },
    { name: 'Sarah', score: '620', color: '#2563EB' },
    { name: 'David', score: '464', color: '#FF8A00' },
    { name: 'Elena', score: '890', color: '#16A34A' },
    { name: 'Marcus', score: '350', color: '#EF4444' },
    { name: 'Chloe', score: '540', color: '#F59E0B' },
    { name: 'Liam', score: '710', color: '#16A34A' },
    { name: 'Maya', score: '430', color: '#FF8A00' },
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
      {/* Background Soft Studio Lighting */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 138, 0, 0.08) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* PHASE 1: Macro Score Dial (Fades out after frame 65) */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: interpolate(frame, [50, 65], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `scale(${interpolate(dialSpring, [0, 1], [0.85, 1.0])})`,
        }}
      >
        {/* Circular SVG Gauge */}
        <div style={{ position: 'relative', width: 340, height: 340 }}>
          <svg width="340" height="340" viewBox="0 0 340 340">
            {/* Background Track */}
            <circle
              cx="170"
              cy="170"
              r="140"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="16"
              strokeDasharray="4 8"
            />
            {/* Active Progress */}
            <circle
              cx="170"
              cy="170"
              r="140"
              fill="none"
              stroke="#FF8A00"
              strokeWidth="18"
              strokeDasharray={2 * Math.PI * 140}
              strokeDashoffset={2 * Math.PI * 140 * (1 - (scoreNumber / 1000) * 0.75)}
              strokeLinecap="round"
              transform="rotate(135 170 170)"
            />
          </svg>

          {/* Center Dial Value */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Overall Score
            </span>
            <span style={{ fontSize: 72, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.04em' }}>
              {scoreNumber}
            </span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#FF8A00' }}>
              / 1000
            </span>
          </div>
        </div>

        <div style={{ marginTop: 24, fontSize: 24, fontWeight: 700, color: '#0F172A' }}>
          Everything has a score.
        </div>
      </div>

      {/* PHASE 2: 3D Turntable with Orbiting Developer Avatar Circles (Frame 55 onwards) */}
      {frame >= 50 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: 1200,
            opacity: turntableTransition,
          }}
        >
          {/* Turntable Disc Stage */}
          <div
            style={{
              position: 'relative',
              width: 700,
              height: 700,
              transform: `rotateX(58deg) rotateZ(${turntableRotate}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Base Circular Platform */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '2px solid #E2E8F0',
                boxShadow: '0 30px 70px rgba(15, 23, 42, 0.08)',
              }}
            />

            {/* Concentric Guide Ring */}
            <div
              style={{
                position: 'absolute',
                inset: 70,
                borderRadius: '50%',
                border: '1px dashed #CBD5E1',
              }}
            />

            {/* Center Hero Badge Disc */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) translateZ(40px)',
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF8A00 0%, #EA580C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(255, 138, 0, 0.4)',
                transformStyle: 'preserve-3d',
              }}
            >
              <FlameIcon size={64} />
            </div>

            {/* Orbiting Avatar Circles */}
            {avatars.map((dev, i) => {
              const angle = (i / avatars.length) * Math.PI * 2;
              const radius = 260;
              const x = Math.cos(angle) * radius + 350;
              const y = Math.sin(angle) * radius + 350;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: x - 45,
                    top: y - 45,
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 12px 25px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translateZ(25px)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>{dev.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: dev.color, marginTop: 2 }}>
                    {dev.score}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Caption */}
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              fontSize: 28,
              fontWeight: 800,
              color: '#0F172A',
              textAlign: 'center',
            }}
          >
            Hall of Flame Leaderboard Ecosystem
          </div>
        </div>
      )}
    </div>
  );
};
