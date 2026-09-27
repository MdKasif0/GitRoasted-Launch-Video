import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LightPhoneFrame } from '../../components/LightPhoneFrame';
import { FlameIcon } from '../../components/Logo';

export const Scene01MobileHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Macro camera zoom-out (0 - 90 frames)
  const cameraZoom = interpolate(frame, [0, 60, 110], [2.4, 1.4, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cameraY = interpolate(frame, [0, 60, 110], [-260, -80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3D Phone Tilt (starts at frame 115)
  const phoneRotateY = spring({
    frame: frame - 115,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const currentRotateY = interpolate(phoneRotateY, [0, 1], [0, -18]);

  const phoneRotateX = spring({
    frame: frame - 115,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const currentRotateX = interpolate(phoneRotateX, [0, 1], [0, 12]);

  const phoneScale = interpolate(phoneRotateY, [0, 1], [1.0, 0.88]);

  // Message 1 Entrance
  const msg1Spring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Message 2 Entrance
  const msg2Spring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Reply Bubble Entrance
  const replySpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Orbiting cards eruption (frame 125 onwards)
  const orbitProgress = spring({
    frame: frame - 125,
    fps,
    config: { damping: 15, stiffness: 70 },
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: 'radial-gradient(circle at 50% 40%, #FFFFFF 0%, #F1F5F9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        perspective: 1400,
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Subtle Background Studio Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.35,
        }}
      />

      {/* Floating Header Tag */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #E2E8F0',
          padding: '8px 24px',
          borderRadius: 30,
          boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <FlameIcon size={20} />
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', letterSpacing: '0.05em' }}>
          GITHUB PROFILE INSPECTION IN PROGRESS
        </span>
      </div>

      {/* 3D Container with Camera Transform */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${cameraY}px) scale(${cameraZoom * phoneScale}) rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Phone Frame */}
        <LightPhoneFrame width={420} height={860}>
          <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Chat Header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                paddingBottom: 16,
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 20,
                  boxShadow: '0 8px 16px rgba(15, 23, 42, 0.15)',
                }}
              >
                TR
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Tech Recruiter</div>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Online • Today 9:41 AM</div>
              </div>
            </div>

            {/* Message 1 */}
            {frame >= 25 && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: '82%',
                  background: '#E2E8F0',
                  color: '#0F172A',
                  padding: '12px 18px',
                  borderRadius: '20px 20px 20px 4px',
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  transform: `scale(${msg1Spring})`,
                  transformOrigin: 'bottom left',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                Checking your GitHub profile before tomorrow&apos;s interview... 🔥
              </div>
            )}

            {/* Message 2 */}
            {frame >= 55 && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: '80%',
                  background: '#E2E8F0',
                  color: '#0F172A',
                  padding: '12px 18px',
                  borderRadius: '20px 20px 20px 4px',
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  transform: `scale(${msg2Spring})`,
                  transformOrigin: 'bottom left',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                Be honest, what am I about to see? 👀
              </div>
            )}

            {/* Reply Message */}
            {frame >= 85 && (
              <div
                style={{
                  alignSelf: 'flex-end',
                  maxWidth: '85%',
                  background: 'linear-gradient(135deg, #FF8A00 0%, #EA580C 100%)',
                  color: '#FFFFFF',
                  padding: '14px 20px',
                  borderRadius: '20px 20px 4px 20px',
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  transform: `scale(${replySpring})`,
                  transformOrigin: 'bottom right',
                  boxShadow: '0 8px 20px rgba(255, 138, 0, 0.3)',
                  marginTop: 8,
                }}
              >
                Let GitRoasted cook. 👨‍🍳🔥
                <div
                  style={{
                    marginTop: 10,
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px 12px',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>⚡</span> Analyzing @MdKasif0...
                </div>
              </div>
            )}
          </div>
        </LightPhoneFrame>

        {/* =========================================================================
            6 Orbiting 3D Cards Erupting Around the Phone
            ========================================================================= */}
        {frame >= 120 && (
          <>
            {/* Card 1: Top Left - 47 Repos */}
            <div
              style={{
                position: 'absolute',
                top: -60,
                left: -320,
                width: 260,
                padding: '18px 22px',
                borderRadius: 18,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.14)',
                transform: `translate3d(0, 0, 180px) scale(${orbitProgress})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Repository Count
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>
                47 <span style={{ fontSize: 16, color: '#FF8A00' }}>Repos</span>
              </div>
              <div style={{ fontSize: 12, color: '#EF4444', marginTop: 4, fontWeight: 600 }}>
                ⚠️ 0 LICENSE files found
              </div>
            </div>

            {/* Card 2: Top Right - Languages */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                right: -320,
                width: 260,
                padding: '18px 22px',
                borderRadius: 18,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.14)',
                transform: `translate3d(0, 0, 140px) scale(${orbitProgress})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Languages Detected
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                  TS 64%
                </span>
                <span style={{ background: '#FEF3C7', color: '#B45309', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                  Python
                </span>
                <span style={{ background: '#FEE2E2', color: '#B91C1C', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                  Rust
                </span>
              </div>
            </div>

            {/* Card 3: Left Middle - 3 AM Commit */}
            <div
              style={{
                position: 'absolute',
                top: 240,
                left: -380,
                width: 290,
                padding: '18px 22px',
                borderRadius: 18,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.14)',
                transform: `translate3d(0, 0, 120px) scale(${orbitProgress})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#64748B' }}>
                <span>🕒</span> 3:14 AM Commit
              </div>
              <div style={{ fontSize: 14, fontFamily: "'Geist Mono', monospace", color: '#0F172A', fontWeight: 600, marginTop: 6, background: '#F8FAFC', padding: '6px 10px', borderRadius: 6 }}>
                &quot;please work final v2&quot;
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
                Commit telemetry: High desperation
              </div>
            </div>

            {/* Card 4: Right Middle - Score Dial Snapshot */}
            <div
              style={{
                position: 'absolute',
                top: 220,
                right: -360,
                width: 280,
                padding: '18px 22px',
                borderRadius: 18,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.14)',
                transform: `translate3d(0, 0, 200px) scale(${orbitProgress})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                GitRoasted Score
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: '#FF8A00' }}>464</span>
                <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 600 }}>/ 1000</span>
              </div>
              <div style={{ fontSize: 12, color: '#0F172A', fontWeight: 600, marginTop: 4 }}>
                Certified Roasted • Needs Work
              </div>
            </div>

            {/* Card 5: Bottom Left - Streak Heatmap */}
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                left: -330,
                width: 270,
                padding: '18px 22px',
                borderRadius: 18,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.14)',
                transform: `translate3d(0, 0, 160px) scale(${orbitProgress})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Contribution Matrix
              </div>
              {/* Green blocks representation */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4, marginTop: 10 }}>
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 12,
                      borderRadius: 2,
                      background: i % 7 === 0 ? '#16A34A' : i % 3 === 0 ? '#86EFAC' : '#E2E8F0',
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>
                Longest gap: 4 months touching grass
              </div>
            </div>

            {/* Card 6: Bottom Right - Roast Quote */}
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                right: -340,
                width: 280,
                padding: '18px 22px',
                borderRadius: 18,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.14)',
                transform: `translate3d(0, 0, 150px) scale(${orbitProgress})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#FF8A00', textTransform: 'uppercase' }}>
                Roast Verdict 🔥
              </div>
              <div style={{ fontSize: 13, color: '#0F172A', fontWeight: 600, fontStyle: 'italic', marginTop: 6, lineHeight: 1.4 }}>
                &quot;A graveyard of unfinished side projects and READMEs that say coming soon.&quot;
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
