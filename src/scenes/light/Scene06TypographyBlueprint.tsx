import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene06TypographyBlueprint: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const rotation = interpolate(frame, [0, 60], [-15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Precision Blueprint Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Concentric Guide Circles */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          border: '1px solid #CBD5E1',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: '1px solid #E2E8F0',
          opacity: 0.6,
        }}
      />

      {/* Diagonal Crosshairs */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 1,
          background: '#CBD5E1',
          transform: 'rotate(45deg)',
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 1,
          background: '#CBD5E1',
          transform: 'rotate(-45deg)',
          opacity: 0.35,
        }}
      />

      {/* Top Telemetry */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          fontFamily: "'Geist Mono', monospace",
          fontSize: 13,
          fontWeight: 700,
          color: '#64748B',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        [ TYPOGRAPHIC SPECIFICATION // GRID 1.0 ]
      </div>

      {/* Center Interactive Typography Bounding Boxes */}
      <div
        style={{
          position: 'relative',
          width: 380,
          height: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scaleSpring}) rotate(${rotation}deg)`,
        }}
      >
        {/* Outer Bounding Box */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid #94A3B8',
          }}
        >
          {/* Crop Corners */}
          <div style={{ position: 'absolute', top: -4, left: -4, width: 8, height: 8, background: '#0F172A' }} />
          <div style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: '#0F172A' }} />
          <div style={{ position: 'absolute', bottom: -4, left: -4, width: 8, height: 8, background: '#0F172A' }} />
          <div style={{ position: 'absolute', bottom: -4, right: -4, width: 8, height: 8, background: '#0F172A' }} />
        </div>

        {/* Diagonal Line in Box */}
        <div
          style={{
            position: 'absolute',
            width: '141%',
            height: 1,
            background: '#CBD5E1',
            transform: 'rotate(45deg)',
          }}
        />

        {/* Top-Left Box: Flame Orange Serif */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '50%',
            background: 'linear-gradient(135deg, #FF8A00 0%, #EA580C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: 90,
            fontFamily: 'serif',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(255, 138, 0, 0.3)',
          }}
        >
          G
        </div>

        {/* Bottom-Right Box: Light Slate Sans */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '50%',
            height: '50%',
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F172A',
            fontSize: 90,
            fontWeight: 800,
            fontFamily: "'Geist', sans-serif",
          }}
        >
          R
        </div>
      </div>

      {/* Bottom Editorial Callout */}
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>
          ROAST YOUR GITHUB.
        </div>
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 14,
            fontWeight: 600,
            color: '#FF8A00',
            marginTop: 6,
            letterSpacing: '0.08em',
          }}
        >
          SCORE: 464 // STATUS: CERTIFIED ROASTED // FIXES AVAILABLE: 5
        </div>
      </div>
    </div>
  );
};
