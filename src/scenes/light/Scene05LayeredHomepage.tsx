import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { LightDeviceFrame } from '../../components/LightDeviceFrame';

export const Scene05LayeredHomepage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera glide
  const camRotateY = interpolate(frame, [0, 90], [-10, 8]);
  const camRotateX = interpolate(frame, [0, 90], [6, 2]);
  const camTranslateY = interpolate(frame, [0, 90], [20, -15]);

  const floatSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
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
        perspective: 1400,
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 138, 0, 0.09) 0%, rgba(255,255,255,0) 70%)',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* 3D Tilted Device Container */}
      <div
        style={{
          transform: `translateY(${camTranslateY}px) rotateY(${camRotateY}deg) rotateX(${camRotateX}deg) scale(0.92)`,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        <LightDeviceFrame width={1400} height={820} title="gitroasted.com">
          <Img
            src={staticFile('home_page.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </LightDeviceFrame>

        {/* Floating Layer 1: Elevated Search Input (+60px Z) */}
        <div
          style={{
            position: 'absolute',
            top: 420,
            left: '50%',
            transform: `translateX(-50%) translateZ(${interpolate(floatSpring, [0, 1], [0, 70])}px)`,
            background: '#FFFFFF',
            border: '2px solid #FF8A00',
            borderRadius: 14,
            padding: '16px 28px',
            boxShadow: '0 25px 60px -10px rgba(255, 138, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            zIndex: 40,
            opacity: floatSpring,
          }}
        >
          <span style={{ fontSize: 20, color: '#94A3B8', fontFamily: "'Geist Mono', monospace" }}>github.com/</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', fontFamily: "'Geist Mono', monospace" }}>
            MdKasif0
          </span>
          <div
            style={{
              width: 2,
              height: 24,
              background: '#FF8A00',
              opacity: frame % 20 < 10 ? 1 : 0,
            }}
          />
        </div>

        {/* Floating Layer 2: Glowing Roast CTA Button (+100px Z) */}
        <div
          style={{
            position: 'absolute',
            top: 510,
            left: '50%',
            transform: `translateX(-50%) translateZ(${interpolate(floatSpring, [0, 1], [0, 110])}px)`,
            background: 'linear-gradient(135deg, #FF8A00 0%, #EA580C 100%)',
            color: '#FFFFFF',
            borderRadius: 14,
            padding: '16px 44px',
            boxShadow: '0 25px 50px -10px rgba(234, 88, 12, 0.4)',
            fontSize: 20,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 50,
            opacity: floatSpring,
          }}
        >
          <span>Roast Me</span>
          <span>🔥</span>
        </div>

        {/* Floating Layer 3: Top Right Social Proof Pill (+80px Z) */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            right: 40,
            transform: `translateZ(${interpolate(floatSpring, [0, 1], [0, 85])}px)`,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 30,
            padding: '10px 22px',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 40,
            opacity: floatSpring,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
            10,000+ developers roasted today
          </span>
        </div>
      </div>
    </div>
  );
};
