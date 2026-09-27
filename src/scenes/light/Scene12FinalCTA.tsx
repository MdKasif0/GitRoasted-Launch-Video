import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FlameIcon } from '../../components/Logo';

export const Scene12FinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: CTA Card (Frames 0 to 65)
  const ctaCardSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Phase 1 exit (Frames 55 to 70)
  const ctaCardExit = interpolate(frame, [55, 68], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaCardScaleDown = interpolate(frame, [55, 68], [1, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2: Brand Lockup Reveal (Starts at Frame 60)
  const brandSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Continuous subtle logo float
  const logoBob = Math.sin(((frame - 60) / 30) * Math.PI) * 6;

  // URL button pulse
  const buttonPulse = Math.sin((frame / 15) * Math.PI) * 0.03 + 1;

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
        perspective: 1200,
        fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Background Subtle Gradient Glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 138, 0, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `scale(${interpolate(frame, [0, 120], [0.8, 1.2])})`,
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern */}
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

      {/* PHASE 1: CTA Card */}
      {frame < 72 && (
        <div
          style={{
            position: 'absolute',
            width: 840,
            background: '#FFFFFF',
            borderRadius: 28,
            padding: '56px 64px',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow:
              '0 30px 80px rgba(15, 23, 42, 0.08), 0 8px 24px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transform: `translateY(${interpolate(ctaCardSpring, [0, 1], [60, 0])}px) scale(${ctaCardSpring * ctaCardScaleDown})`,
            opacity: ctaCardSpring * ctaCardExit,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 9999,
              background: '#FFF7ED',
              border: '1px solid #FFEDD5',
              fontSize: 14,
              fontWeight: 700,
              color: '#FF8A00',
              marginBottom: 24,
              letterSpacing: '0.04em',
            }}
          >
            <span>🔥</span> FREE INSTANT AUDIT
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.03em',
              margin: '0 0 16px 0',
              lineHeight: 1.15,
            }}
          >
            Ready to see what your
            <br />
            GitHub really says?
          </h2>

          <p
            style={{
              fontSize: 18,
              color: '#64748B',
              margin: '0 0 36px 0',
              maxWidth: 520,
              lineHeight: 1.5,
            }}
          >
            Get an honest roast, discover your true developer score, and unlock a customized roadmap of quick wins.
          </p>

          {/* Input Simulation Bar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              background: '#F8FAFC',
              borderRadius: 16,
              border: '1.5px solid #E2E8F0',
              padding: '8px 10px 8px 20px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 500 }}>
              github.com/
            </span>
            <span
              style={{
                fontSize: 17,
                color: '#0F172A',
                fontWeight: 600,
                flex: 1,
                textAlign: 'left',
              }}
            >
              your-username
            </span>

            {/* Submit Button */}
            <div
              style={{
                background: 'linear-gradient(135deg, #FF8A00 0%, #FF5A00 100%)',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 8px 20px rgba(255, 138, 0, 0.35)',
                transform: `scale(${frame > 40 ? buttonPulse : 1})`,
              }}
            >
              <span>Get Roasted</span>
              <span>🔥</span>
            </div>
          </div>

          {/* Subtext */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginTop: 24,
              fontSize: 13,
              fontWeight: 600,
              color: '#94A3B8',
            }}
          >
            <span>✓ No authentication needed</span>
            <span>•</span>
            <span>✓ Instant analysis</span>
            <span>•</span>
            <span>✓ 100% Free</span>
          </div>
        </div>
      )}

      {/* PHASE 2: Brand Lockup Finale (Frame 60+) */}
      {frame >= 58 && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transform: `translateY(${interpolate(brandSpring, [0, 1], [40, 0]) + logoBob}px) scale(${brandSpring})`,
            opacity: brandSpring,
          }}
        >
          {/* Flame Icon with Radiant Light Glow */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            {/* Ambient Pulse Ring */}
            <div
              style={{
                position: 'absolute',
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 138, 0, 0.25) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <FlameIcon size={100} />
          </div>

          {/* Brand Name */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: '-0.04em',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1,
            }}
          >
            <span style={{ color: '#0F172A' }}>Git</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #FF8A00 0%, #FF5A00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Roasted
            </span>
          </h1>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: '#475569',
              letterSpacing: '-0.02em',
              marginBottom: 32,
            }}
          >
            Roast your GitHub. Improve your craft.
          </div>

          {/* Domain Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 32px',
              borderRadius: 9999,
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
            }}
          >
            <span style={{ fontSize: 16, color: '#10B981' }}>●</span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.01em',
              }}
            >
              gitroasted.com
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
