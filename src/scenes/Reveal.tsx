import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Logo } from '../components/Logo';
import { DeviceFrame } from '../components/DeviceFrame';
import { ScreenshotReveal } from '../components/ScreenshotReveal';
import { Cursor } from '../components/Cursor';

export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo spring entrance (scale from 0.97 to 1)
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.97, 1]);

  // UI entrance (scale from 0.97 to 1)
  const uiSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.8 },
  });
  const uiScale = interpolate(uiSpring, [0, 1], [0.97, 1]);

  // Typing animation for "MdKasif0" (between frames 130 and 185)
  const fullText = 'MdKasif0';
  const charsTyped = Math.floor(
    interpolate(frame, [130, 185], [0, fullText.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const currentTypedText = fullText.slice(0, charsTyped);

  // In DeviceFrame 1440x820, input box is centered at y = 472px
  // username start: x = 552px, y = 472px
  // Roast Me button center: x = 965px, y = 472px
  const cursorX = interpolate(
    frame,
    [100, 130, 190, 220],
    [1100, 552, 552, 965],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const cursorY = interpolate(
    frame,
    [100, 130, 190, 220],
    [700, 472, 472, 472],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const isClicked = frame >= 230 && frame <= 245;

  // Camera slow push-in (1.0 to 1.05)
  const cameraZoom = interpolate(frame, [230, 300], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
      {/* PHASE 1: Logo & Brand Identity (0 - 80f) */}
      {frame < 95 && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 22,
            transform: `scale(${logoScale})`,
            opacity: interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0]),
            zIndex: 10,
          }}
        >
          <Logo size={90} showText={true} />

          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#FF8A00',
              textTransform: 'uppercase',
              background: '#0B0B0B',
              padding: '6px 20px',
              borderRadius: 6,
              border: '1px solid #21262D',
            }}
          >
            BRUTAL FEEDBACK. BETTER DEVELOPERS.
          </div>
        </div>
      )}

      {/* PHASE 2: Real Landing Page in Device Frame (75 - 300f) */}
      {frame >= 75 && (
        <div
          style={{
            position: 'absolute',
            transform: `scale(${uiScale * cameraZoom}) translateY(${interpolate(
              uiSpring,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: interpolate(uiSpring, [0, 0.4], [0, 1]),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DeviceFrame width={1440} height={820} title="gitroasted.com — AI GitHub Roast">
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <ScreenshotReveal
                src="home_page.png"
                scale={1.0}
                panY={-75}
                borderRadius={0}
                boxShadow="none"
                border="none"
              />

              {/* Dynamic typing overlay sitting directly inside the input bar */}
              {frame >= 120 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 457,
                    left: 518,
                    width: 180,
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#F5F5F5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    zIndex: 20,
                    background: '#0d1017',
                    padding: '3px 8px',
                    borderRadius: 4,
                  }}
                >
                  <span>{currentTypedText}</span>
                  {frame < 220 && Math.floor(frame / 6) % 2 === 0 && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 2,
                        height: 22,
                        background: '#FF8A00',
                      }}
                    />
                  )}
                </div>
              )}

              {/* Simulated User Cursor inside the frame */}
              {frame >= 100 && frame < 260 && (
                <Cursor
                  x={cursorX}
                  y={cursorY}
                  clicked={isClicked}
                  label={frame >= 190 && frame < 235 ? 'Roast' : undefined}
                />
              )}
            </div>
          </DeviceFrame>
        </div>
      )}
    </div>
  );
};
