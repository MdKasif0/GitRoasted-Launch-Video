import React from 'react';
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene11FloatingMetricPills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera drift / push forward
  const cameraZ = interpolate(frame, [0, 90], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraRotateY = interpolate(frame, [0, 90], [-4, 3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraRotateX = interpolate(frame, [0, 90], [3, -2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Staggered entrances
  const pill1Spring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const pill2Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const pill3Spring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Floating bob oscillations
  const bob1 = Math.sin((frame / 30) * Math.PI * 1.5) * 8;
  const bob2 = Math.sin(((frame + 12) / 30) * Math.PI * 1.5) * 10;
  const bob3 = Math.sin(((frame + 24) / 30) * Math.PI * 1.5) * 7;

  // Background subtle drift
  const bgScale = interpolate(frame, [0, 90], [1.02, 1.08]);

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
        perspective: 1400,
        fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Background Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(15, 23, 42, 0.07) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.8,
        }}
      />

      {/* Blurred 3D Dashboard Backdrop */}
      <div
        style={{
          position: 'absolute',
          width: 1500,
          height: 900,
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(15, 23, 42, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          transform: `scale(${bgScale}) rotateX(12deg) rotateY(-8deg) translateY(-20px)`,
          filter: 'blur(10px) saturate(1.1)',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      >
        <img
          src={staticFile('share_card_page.png')}
          alt="Dashboard preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Camera 3D Stage Container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `translateZ(${cameraZ}px) rotateY(${cameraRotateY}deg) rotateX(${cameraRotateX}deg)`,
        }}
      >
        {/* Pill 1: Score Potential (Top-Left) */}
        <div
          style={{
            position: 'absolute',
            left: 220,
            top: 240,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '20px 36px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: 9999,
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 24px 50px rgba(15, 23, 42, 0.09), 0 4px 12px rgba(15, 23, 42, 0.04)',
            transform: `translateY(${interpolate(pill1Spring, [0, 1], [60, 0]) + bob1}px) translateZ(80px) scale(${pill1Spring})`,
            opacity: pill1Spring,
          }}
        >
          {/* Flame / Graph Icon badge */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF8A00 0%, #FF5A00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(255, 138, 0, 0.3)',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                fill="#FFFFFF"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Score Potential
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 2 }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                }}
              >
                464
              </span>
              <span style={{ fontSize: 20, color: '#94A3B8' }}>➔</span>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#FF8A00',
                  letterSpacing: '-0.02em',
                }}
              >
                599
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#10B981',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '3px 10px',
                  borderRadius: 12,
                }}
              >
                +135 pts 🚀
              </span>
            </div>
          </div>
        </div>

        {/* Pill 2: Top Roast Quote (Center) */}
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 480,
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            padding: '24px 44px',
            background: '#FFFFFF',
            borderRadius: 9999,
            border: '2px solid rgba(255, 138, 0, 0.3)',
            boxShadow: '0 32px 70px rgba(255, 138, 0, 0.12), 0 8px 24px rgba(15, 23, 42, 0.05)',
            transform: `translateY(${interpolate(pill2Spring, [0, 1], [70, 0]) + bob2}px) translateZ(140px) scale(${pill2Spring})`,
            opacity: pill2Spring,
          }}
        >
          {/* Flame Icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#FFF7ED',
              border: '1px solid #FFEDD5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
          >
            🔥
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#FF8A00',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Audited Developer Verdict
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginTop: 2,
              }}
            >
              “Commits only on Sundays at 3:14 AM”
            </div>
          </div>
          <div
            style={{
              marginLeft: 12,
              padding: '6px 14px',
              borderRadius: 20,
              background: '#0F172A',
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Weekend Warrior
          </div>
        </div>

        {/* Pill 3: Actionable Roadmap / Quick Wins (Bottom-Right) */}
        <div
          style={{
            position: 'absolute',
            right: 220,
            bottom: 250,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '20px 38px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: 9999,
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 24px 50px rgba(15, 23, 42, 0.09), 0 4px 12px rgba(15, 23, 42, 0.04)',
            transform: `translateY(${interpolate(pill3Spring, [0, 1], [60, 0]) + bob3}px) translateZ(90px) scale(${pill3Spring})`,
            opacity: pill3Spring,
          }}
        >
          {/* Green Check Icon */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(16, 185, 129, 0.25)',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Actionable Fixes
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginTop: 2,
              }}
            >
              5 Immediate Quick Wins Ready
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#64748B',
              background: '#F1F5F9',
              padding: '6px 14px',
              borderRadius: 16,
              marginLeft: 8,
            }}
          >
            License • Actions • Topics
          </div>
        </div>
      </div>
    </div>
  );
};
