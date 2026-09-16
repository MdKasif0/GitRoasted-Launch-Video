import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DeviceFrame } from '../components/DeviceFrame';
import { ScreenshotReveal } from '../components/ScreenshotReveal';
import { ScoreCounter, SegmentedScoreBar } from '../components/ProgressBar';

export const Score: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 140f): Focus on Seriousness Score (464 / 1000)
  // Phase 2 (140 - 360f): Focus on Score Breakdown (Consistency 29, Activity 50/50)
  const panY = interpolate(
    frame,
    [0, 50, 140, 210],
    [-40, -50, -50, -1380],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const zoom = interpolate(
    frame,
    [0, 50, 140, 210],
    [1.0, 1.1, 1.1, 1.18],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const badgeSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.97, 1]);

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
      {/* Real UI in Device Frame */}
      <DeviceFrame
        width={1440}
        height={820}
        title="gitroasted.com/roast/MdKasif0 — Seriousness Score & Metrics"
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

      {/* Live Monospace Counter Overlay in Phase 1 */}
      {frame < 140 && (
        <div
          style={{
            position: 'absolute',
            top: 130,
            right: 280,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 10,
            background: '#0B0B0B',
            border: '1px solid #21262D',
            padding: '20px 30px',
            borderRadius: 6,
            boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#8B949E',
              textTransform: 'uppercase',
              fontFamily: "'Geist Mono', monospace",
            }}
          >
            SERIOUSNESS SCORE
          </div>

          <ScoreCounter
            startScore={0}
            endScore={464}
            startFrame={10}
            durationInFrames={40}
            fontSize={72}
          />

          <SegmentedScoreBar
            progress={interpolate(frame, [10, 50], [0, 0.464], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
            totalSegments={10}
          />

          {frame >= 45 && (
            <div
              style={{
                marginTop: 6,
                padding: '4px 14px',
                borderRadius: 4,
                background: '#111111',
                border: '1px solid #21262D',
                color: '#FF8A00',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Geist Mono', monospace",
                transform: `scale(${badgeScale})`,
              }}
            >
              🔥 Rising Developer
            </div>
          )}
        </div>
      )}

      {/* PHASE 2 Commentary: Consistency vs Activity */}
      {frame >= 160 && frame < 270 && (
        <div
          style={{
            position: 'absolute',
            left: 240,
            bottom: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            background: '#0B0B0B',
            border: '1px solid #21262D',
            padding: '12px 22px',
            borderRadius: 6,
            boxShadow: '0 16px 36px rgba(0,0,0,0.9)',
            transform: `translateY(${interpolate(
              frame,
              [160, 175],
              [12, 0],
              { extrapolateRight: 'clamp' }
            )}px)`,
            opacity: interpolate(frame, [160, 175], [0, 1], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 16,
              color: '#FF8A00',
              fontWeight: 700,
            }}
          >
            <span>Consistency: 29 / 200</span>
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#8B949E',
              fontFamily: "'Geist', 'Inter', sans-serif",
            }}
          >
            One commit on May 20th does not constitute a lifestyle.
          </div>
        </div>
      )}

      {frame >= 280 && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 28px',
            borderRadius: 6,
            background: '#0B0B0B',
            border: '1px solid #21262D',
            boxShadow: '0 16px 36px rgba(0,0,0,0.9)',
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#F5F5F5',
              fontFamily: "'Geist', 'Inter', sans-serif",
            }}
          >
            Numbers do not have feelings. Fortunately.
          </span>
        </div>
      )}
    </div>
  );
};
