import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DeviceFrame } from '../components/DeviceFrame';
import { ScreenshotReveal } from '../components/ScreenshotReveal';
import { KineticText } from '../components/KineticText';

export const QuickWins: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 65f): Kinetic transition thesis
  // Phase 2 (65 - 360f): Real Quick Wins page & score leap
  const showUI = frame >= 65;

  const uiSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.8 },
  });
  const uiScale = interpolate(uiSpring, [0, 1], [0.97, 1]);

  // Smooth camera pan from score boost header down into the 5 actionable tasks
  const panY = interpolate(
    frame,
    [65, 140, 240, 360],
    [-20, -40, -140, -180],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const zoom = interpolate(
    frame,
    [65, 140, 240, 360],
    [1.0, 1.05, 1.08, 1.1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
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
      {/* PHASE 1: Thesis statement (0 - 65f) */}
      {!showUI && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            textAlign: 'center',
          }}
        >
          <KineticText
            text="A roast is just entertainment."
            delay={5}
            fontSize={60}
            color="#8B949E"
          />
          <div style={{ marginTop: 8 }}>
            <KineticText
              text="Until it becomes an action plan."
              delay={25}
              fontSize={72}
              color="#F5F5F5"
              highlightWords={['action', 'plan.']}
              highlightColor="#22C55E"
            />
          </div>
        </div>
      )}

      {/* PHASE 2: Real Quick Wins interface (65 - 360f) */}
      {showUI && (
        <div
          style={{
            position: 'absolute',
            transform: `scale(${uiScale}) translateY(${interpolate(
              uiSpring,
              [0, 1],
              [40, 0]
            )}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com/quick-wins — Actionable Roadmap"
          >
            <ScreenshotReveal
              src="quick_wins_page.png"
              scale={zoom}
              panY={panY}
              borderRadius={0}
              boxShadow="none"
              border="none"
            />
          </DeviceFrame>

          {/* Clean Callout Badge on +135 points leap (frames 100 - 220) */}
          {frame >= 100 && frame < 220 && (
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 40,
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '10px 20px',
                borderRadius: 6,
                boxShadow: '0 12px 28px rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transform: `scale(${interpolate(
                  spring({
                    frame: frame - 100,
                    fps,
                    config: { damping: 18, stiffness: 140, mass: 0.8 },
                  }),
                  [0, 1],
                  [0.97, 1]
                )})`,
              }}
            >
              <span style={{ color: '#22C55E', fontSize: 18 }}>⚡</span>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#8B949E',
                    fontWeight: 600,
                    fontFamily: "'Geist Mono', monospace",
                  }}
                >
                  Personalized Roadmap
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: '#22C55E',
                    fontWeight: 700,
                    fontFamily: "'Geist Mono', monospace",
                  }}
                >
                  463 ➔ 598 (+135 pts)
                </div>
              </div>
            </div>
          )}

          {/* Takeaway footer pill */}
          {frame >= 230 && (
            <div
              style={{
                position: 'absolute',
                bottom: 25,
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '12px 28px',
                borderRadius: 6,
                boxShadow: '0 16px 36px rgba(0,0,0,0.9)',
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                color: '#F5F5F5',
              }}
            >
              Small changes. A bigger GitHub score. Immediate redemption.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
