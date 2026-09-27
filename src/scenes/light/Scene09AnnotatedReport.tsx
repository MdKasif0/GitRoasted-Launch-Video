import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene09AnnotatedReport: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const paperSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Animated highlighter sweep
  const highlightWidth = interpolate(frame, [15, 45], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Stamp entrance at frame 38
  const stampSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

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
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Background Secondary Floating Papers */}
      <div
        style={{
          position: 'absolute',
          left: 140,
          top: 180,
          width: 380,
          height: 520,
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          transform: 'rotate(-12deg) scale(0.85)',
          opacity: 0.5,
          padding: 28,
        }}
      >
        <div style={{ width: 120, height: 12, background: '#CBD5E1', borderRadius: 6 }} />
        <div style={{ width: '100%', height: 8, background: '#E2E8F0', borderRadius: 4, marginTop: 20 }} />
        <div style={{ width: '80%', height: 8, background: '#E2E8F0', borderRadius: 4, marginTop: 10 }} />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 140,
          bottom: 120,
          width: 380,
          height: 520,
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          transform: 'rotate(10deg) scale(0.85)',
          opacity: 0.5,
          padding: 28,
        }}
      >
        <div style={{ width: 140, height: 12, background: '#CBD5E1', borderRadius: 6 }} />
        <div style={{ width: '90%', height: 8, background: '#E2E8F0', borderRadius: 4, marginTop: 20 }} />
        <div style={{ width: '70%', height: 8, background: '#E2E8F0', borderRadius: 4, marginTop: 10 }} />
      </div>

      {/* Main Focus Document Sheet */}
      <div
        style={{
          width: 780,
          background: '#FFFFFF',
          borderRadius: 24,
          border: '1px solid #CBD5E1',
          boxShadow: '0 30px 80px -15px rgba(15, 23, 42, 0.15)',
          padding: '48px 56px',
          transform: `scale(${paperSpring}) rotateY(-6deg) rotateX(4deg)`,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* Document Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: 24,
            borderBottom: '2px solid #F1F5F9',
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FF8A00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Official Roast Audit Report
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>
              Developer Assessment #464
            </div>
          </div>
          <div style={{ textAlign: 'right', fontFamily: "'Geist Mono', monospace", fontSize: 12, color: '#64748B' }}>
            <div>USER: @MdKasif0</div>
            <div>VERIFIED: GITHUB API</div>
          </div>
        </div>

        {/* Highlighted Roast Text */}
        <div style={{ marginTop: 36, position: 'relative' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 12 }}>
            Section 04 — Narrative Verdict:
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            &quot;A graveyard of unfinished side projects and 3 AM commit messages.&quot;
            {/* Animated Fluorescent Highlighter Line */}
            <div
              style={{
                position: 'absolute',
                left: -4,
                top: 6,
                bottom: 2,
                width: `${highlightWidth}%`,
                background: 'rgba(255, 138, 0, 0.28)',
                zIndex: -1,
                borderRadius: 4,
                transition: 'width 0.1s ease',
              }}
            />
          </div>
        </div>

        {/* Quick Win Prescription Checklist */}
        <div style={{ marginTop: 36, padding: '20px 24px', background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', marginBottom: 10 }}>
            Prescribed Remedies:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#334155', fontWeight: 600 }}>
            <div>✓ Add open-source license to 47 public repositories (+25 pts)</div>
            <div>✓ Add topics and project tags to repositories (+20 pts)</div>
            <div>✓ Set up automated GitHub Actions CI pipeline (+30 pts)</div>
          </div>
        </div>

        {/* Verification Stamp Pop */}
        {frame >= 38 && (
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 50,
              transform: `scale(${stampSpring}) rotate(-14deg)`,
              border: '4px solid #EF4444',
              borderRadius: 16,
              padding: '12px 24px',
              color: '#EF4444',
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 20px rgba(239, 68, 68, 0.2)',
            }}
          >
            ROASTED 🔥
          </div>
        )}
      </div>
    </div>
  );
};
