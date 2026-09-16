import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DeviceFrame } from '../components/DeviceFrame';
import { ScreenshotReveal } from '../components/ScreenshotReveal';

export const Roast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Intro transition spring (0.97 to 1.0)
  const introSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.8 },
  });
  const introScale = interpolate(introSpring, [0, 1], [0.97, 1]);

  // Camera pan: slow narrative push-down to frame the roast quote
  const panY = interpolate(
    frame,
    [0, 60, 180, 390],
    [-60, -280, -340, -360],
    { extrapolateRight: 'clamp' }
  );

  const zoom = interpolate(
    frame,
    [0, 60, 200, 390],
    [1.0, 1.15, 1.2, 1.22],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Analysis status badge (0 - 55f) */}
      {frame < 55 && (
        <div
          style={{
            position: 'absolute',
            top: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 18px',
            borderRadius: 6,
            background: '#0B0B0B',
            border: '1px solid #21262D',
            color: '#8B949E',
            fontFamily: "'Geist Mono', monospace",
            fontSize: 14,
            fontWeight: 500,
            zIndex: 30,
            opacity: interpolate(frame, [0, 10, 42, 54], [0, 1, 1, 0]),
          }}
        >
          <span style={{ color: '#FF8A00' }}>⚡</span>
          <span>Analyzing @MdKasif0 ... 42 public repositories evaluated</span>
        </div>
      )}

      {/* Device Frame containing roast_page.png */}
      <div
        style={{
          transform: `scale(${introScale}) translateY(${interpolate(
            introSpring,
            [0, 1],
            [30, 0]
          )}px)`,
        }}
      >
        <DeviceFrame
          width={1440}
          height={820}
          title="gitroasted.com/roast/MdKasif0 — The Roast"
        >
          <ScreenshotReveal
            src="roast_page.png"
            scale={zoom}
            panY={panY}
            borderRadius={0}
            boxShadow="none"
            border="none"
          />
        </DeviceFrame>
      </div>

      {/* Deadpan Editorial Commentary Callouts */}
      {frame >= 100 && frame < 190 && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 240,
            background: '#0B0B0B',
            border: '1px solid #21262D',
            padding: '10px 22px',
            borderRadius: 6,
            color: '#F5F5F5',
            fontFamily: "'Geist Mono', monospace",
            fontSize: 15,
            boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
            transform: `translateY(${interpolate(
              frame,
              [100, 115],
              [12, 0],
              { extrapolateRight: 'clamp' }
            )}px)`,
            opacity: interpolate(frame, [100, 115, 175, 190], [0, 1, 1, 0]),
          }}
        >
          <span style={{ color: '#FF8A00' }}>Observation:</span> 65 stars across 42 repos.
        </div>
      )}

      {frame >= 210 && frame < 310 && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 240,
            background: '#0B0B0B',
            border: '1px solid #21262D',
            padding: '10px 22px',
            borderRadius: 6,
            color: '#F5F5F5',
            fontFamily: "'Geist Mono', monospace",
            fontSize: 15,
            boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
            transform: `translateY(${interpolate(
              frame,
              [210, 225],
              [12, 0],
              { extrapolateRight: 'clamp' }
            )}px)`,
            opacity: interpolate(frame, [210, 225, 295, 310], [0, 1, 1, 0]),
          }}
        >
          <span style={{ color: '#FF8A00' }}>Diagnosis:</span> README reads like a toddler's diary.
        </div>
      )}

      {frame >= 320 && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            background: '#0B0B0B',
            border: '1px solid #21262D',
            padding: '12px 28px',
            borderRadius: 6,
            color: '#F5F5F5',
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
            transform: `translateY(${interpolate(
              frame,
              [320, 335],
              [12, 0],
              { extrapolateRight: 'clamp' }
            )}px)`,
            opacity: interpolate(frame, [320, 335], [0, 1], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          Savage. But mathematically accurate.
        </div>
      )}
    </div>
  );
};
