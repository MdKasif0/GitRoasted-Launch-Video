import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DeviceFrame } from '../components/DeviceFrame';
import { ScreenshotReveal } from '../components/ScreenshotReveal';

export const ProductMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shot 1 (0 - 150f): Share Card Studio
  // Shot 2 (150 - 300f): Hall of Flame Leaderboard

  const shot1Spring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  const shot1Scale = interpolate(shot1Spring, [0, 1], [0.97, 1]);

  const shot2Spring = spring({
    frame: frame - 150,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  const shot2Scale = interpolate(shot2Spring, [0, 1], [0.97, 1]);

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
      {/* SHOT 1: Share Card Studio (0 - 150f) */}
      {frame < 150 && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${shot1Scale}) translateY(${interpolate(
              shot1Spring,
              [0, 1],
              [30, 0]
            )}px)`,
            opacity: interpolate(shot1Spring, [0, 0.4], [0, 1]),
          }}
        >
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com/share — Social Card Studio"
          >
            <ScreenshotReveal
              src="share_card_page.png"
              scale={1.1}
              panY={interpolate(frame, [0, 150], [0, -25], {
                extrapolateRight: 'clamp',
              })}
              borderRadius={0}
              boxShadow="none"
              border="none"
            />
          </DeviceFrame>

          {/* Clean metadata badge below device frame */}
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 20px',
              borderRadius: 6,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
            }}
          >
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                color: '#FF8A00',
                fontWeight: 600,
              }}
            >
              SHARE_CARD
            </span>
            <span
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 16,
                color: '#F5F5F5',
                fontWeight: 600,
              }}
            >
              Designed to be shared. Built to start arguments.
            </span>
          </div>
        </div>
      )}

      {/* SHOT 2: Hall of Flame Leaderboard (150 - 300f) */}
      {frame >= 150 && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${shot2Scale}) translateY(${interpolate(
              shot2Spring,
              [0, 1],
              [30, 0]
            )}px)`,
            opacity: interpolate(shot2Spring, [0, 0.4], [0, 1]),
          }}
        >
          <DeviceFrame
            width={1440}
            height={780}
            title="gitroasted.com/leaderboard — Hall of Flame"
          >
            <ScreenshotReveal
              src="leaderboard_page.png"
              scale={1.14}
              panY={interpolate(
                frame,
                [150, 300],
                [-140, -340],
                { extrapolateRight: 'clamp' }
              )}
              borderRadius={0}
              boxShadow="none"
              border="none"
            />
          </DeviceFrame>

          {/* Rhythmic deadpan badges placed cleanly below device frame */}
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              gap: 16,
              zIndex: 30,
            }}
          >
            <div
              style={{
                padding: '8px 22px',
                borderRadius: 6,
                background: '#0B0B0B',
                border: '1px solid #21262D',
                color: '#8B949E',
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Get roasted.
            </div>

            <div
              style={{
                padding: '8px 22px',
                borderRadius: 6,
                background: '#0B0B0B',
                border: '1px solid #21262D',
                color: '#8B949E',
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Fix your repos.
            </div>

            <div
              style={{
                padding: '8px 22px',
                borderRadius: 6,
                background: '#111111',
                border: '1px solid #FF8A00',
                color: '#FF8A00',
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Outrank the legends.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
