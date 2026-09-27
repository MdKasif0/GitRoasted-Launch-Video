import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene02DeveloperCallout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat 1: Frame 0 - 60
  const beat1Spring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Beat 2: Frame 60 - 120
  const beat2Spring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Beat 3: Frame 120 - 180
  const beat3Spring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Background Soft Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 138, 0, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Top Banner Tag */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          padding: '8px 24px',
          borderRadius: 30,
          boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF8A00' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Real Developer Telemetry
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '-0.03em',
          textAlign: 'center',
          marginBottom: 50,
          lineHeight: 1.15,
        }}
      >
        Your GitHub profile quietly <br />
        <span style={{ color: '#FF8A00' }}>documents everything you build.</span>
      </div>

      {/* Dynamic 3-Card Staggered Presentation */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1500,
          perspective: 1200,
        }}
      >
        {/* Card 1: 47 Repositories */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 24,
            padding: 36,
            boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08)',
            transform: `translateY(${interpolate(beat1Spring, [0, 1], [80, 0])}px) scale(${beat1Spring})`,
            opacity: beat1Spring,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Repository Audit
            </span>
            <span style={{ background: '#FEE2E2', color: '#B91C1C', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              Audit Alert
            </span>
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: '#0F172A', marginTop: 16 }}>
            47 <span style={{ fontSize: 20, color: '#64748B', fontWeight: 500 }}>Projects</span>
          </div>
          <p style={{ fontSize: 16, color: '#475569', marginTop: 12, lineHeight: 1.5, fontWeight: 500 }}>
            3 active, 44 abandoned after the first weekend. 0 open-source licenses attached.
          </p>
          <div style={{ marginTop: 24, padding: '12px 16px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13, color: '#0F172A', fontWeight: 600 }}>
            📌 Status: Massive potential, zero follow-through
          </div>
        </div>

        {/* Card 2: 3 AM Commit History */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            border: frame >= 60 ? '2px solid #FF8A00' : '1px solid #E2E8F0',
            borderRadius: 24,
            padding: 36,
            boxShadow: frame >= 60 ? '0 25px 60px -12px rgba(255, 138, 0, 0.15)' : '0 20px 45px -10px rgba(15, 23, 42, 0.08)',
            transform: `translateY(${interpolate(beat2Spring, [0, 1], [80, 0])}px) scale(${frame >= 60 ? beat2Spring : 0.95})`,
            opacity: frame >= 60 ? beat2Spring : 0.4,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#FF8A00', textTransform: 'uppercase' }}>
              Commit Forensic
            </span>
            <span style={{ background: '#FEF3C7', color: '#B45309', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              3:14 AM
            </span>
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['git commit -m "fix"', 'git commit -m "fix final"', 'git commit -m "WHY IS IT BROKEN"'].map((c, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  color: i === 2 ? '#B91C1C' : '#334155',
                  background: '#F8FAFC',
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontWeight: 600,
                  borderLeft: i === 2 ? '3px solid #EF4444' : '3px solid #CBD5E1',
                }}
              >
                {c}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, fontSize: 13, color: '#B45309', fontWeight: 600 }}>
            🔥 Desperation rating: 99.4%
          </div>
        </div>

        {/* Card 3: README Coming Soon */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 24,
            padding: 36,
            boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08)',
            transform: `translateY(${interpolate(beat3Spring, [0, 1], [80, 0])}px) scale(${frame >= 120 ? beat3Spring : 0.95})`,
            opacity: frame >= 120 ? beat3Spring : 0.4,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              README Inspection
            </span>
            <span style={{ background: '#F1F5F9', color: '#475569', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              Documentation
            </span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginTop: 16 }}>
            &quot;Coming soon...&quot;
          </div>
          <p style={{ fontSize: 15, color: '#64748B', marginTop: 12, lineHeight: 1.5, fontWeight: 500 }}>
            Last updated: 1,095 days ago (3 years). Zero description, zero installation steps.
          </p>
          <div style={{ marginTop: 24, padding: '12px 16px', background: '#FEF2F2', borderRadius: 12, border: '1px solid #FEE2E2', fontSize: 13, color: '#991B1B', fontWeight: 700 }}>
            💀 Emotional Damage Confirmed
          </div>
        </div>
      </div>
    </div>
  );
};
