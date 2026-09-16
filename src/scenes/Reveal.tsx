import React from 'react';
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Logo, FlameIcon } from '../components/Logo';
import { DeviceFrame } from '../components/DeviceFrame';
import { ScreenshotReveal } from '../components/ScreenshotReveal';
import { Cursor } from '../components/Cursor';

export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TIMELINE PHASES (Total: 330 frames / 11.0s @ 30fps)
  // Phase 1 (0 - 72f):   "MEET" -> Logo -> "GITROASTED" -> "Roast your GitHub. Improve your craft."
  // Phase 2 (72 - 135f): "YOUR GITHUB. UNDER REVIEW." -> Real Home UI -> Typing "@MdKasif0" -> Click "Roast Me"
  // Phase 3 (135 - 210f): The Roast / Result Interface Reveal (roast_page.png hero spotlight)
  // Phase 4 (210 - 270f): Seriousness Score (464 / 1000 & Breakdown)
  // Phase 5 (270 - 330f): Quick Wins Teaser (+135 pts potential & action cards)

  // ---------------- SPRING & MOTION DYNAMICS ----------------

  // Phase 1 Springs
  const meetSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160, mass: 0.7 },
  });

  const logoSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 16, stiffness: 180, mass: 0.8 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.92, 1.0]);

  const taglinesSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });

  // Phase 1 Exit Opacity (fades out 66 - 74)
  const titleExitOpacity = interpolate(frame, [66, 74], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 - Home UI Entrance (72 - 135)
  const uiSpring = spring({
    frame: frame - 72,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.8 },
  });
  const uiScale = interpolate(uiSpring, [0, 1], [0.96, 1.0]);
  const uiTranslateY = interpolate(uiSpring, [0, 1], [30, 0]);

  // Typing animation for "@MdKasif0" (between 88 and 116)
  const usernameText = '@MdKasif0';
  const charsTyped = Math.floor(
    interpolate(frame, [88, 116], [0, usernameText.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const currentTyped = usernameText.slice(0, charsTyped);

  // Cursor coordinates in Phase 2 (Home page)
  // Inside DeviceFrame (1440x820): input box is centered at y = 472px
  // username start: x = 552px, y = 472px
  // Roast Me button: x = 965px, y = 472px
  let cursorX = 1100;
  let cursorY = 650;
  let cursorClicked = false;
  let cursorLabel: string | undefined = undefined;

  if (frame >= 80 && frame < 135) {
    cursorX = interpolate(
      frame,
      [80, 88, 116, 126],
      [1100, 540, 540, 965],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    cursorY = interpolate(
      frame,
      [80, 88, 116, 126],
      [650, 472, 472, 472],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    cursorClicked = frame >= 126 && frame <= 134;
    if (frame >= 118 && frame < 134) cursorLabel = 'Roast';
  } else if (frame >= 135 && frame < 210) {
    // Hovering on the roast quote
    cursorX = interpolate(frame, [135, 175], [965, 820], {
      extrapolateRight: 'clamp',
    });
    cursorY = interpolate(frame, [135, 175], [472, 380], {
      extrapolateRight: 'clamp',
    });
  } else if (frame >= 210 && frame < 270) {
    // Tracing across the score breakdown
    cursorX = interpolate(frame, [210, 250], [820, 1020], {
      extrapolateRight: 'clamp',
    });
    cursorY = interpolate(frame, [210, 250], [380, 560], {
      extrapolateRight: 'clamp',
    });
  } else if (frame >= 270) {
    // Resting on +135 pts boost
    cursorX = interpolate(frame, [270, 310], [1020, 720], {
      extrapolateRight: 'clamp',
    });
    cursorY = interpolate(frame, [270, 310], [560, 440], {
      extrapolateRight: 'clamp',
    });
  }

  // Camera slow push-in across the UI phases (72 to 330)
  const cameraZoom = interpolate(frame, [72, 330], [1.0, 1.05], {
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
        color: '#F5F5F5',
        overflow: 'hidden',
        fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
      }}
    >
      {/* ================= AUDIO DESIGN ================= */}
      {/* 1. Energetic 122 BPM Tech Groove (Starts building at f=0) */}
      <Sequence from={0} durationInFrames={330}>
        <Audio src={staticFile('audio/reveal_beat.wav')} volume={0.48} />
      </Sequence>

      {/* 2. Soft Bass Hit on "MEET" (f=0) */}
      <Sequence from={0} durationInFrames={25}>
        <Audio src={staticFile('audio/soft_bass.wav')} volume={0.65} />
      </Sequence>

      {/* 3. Micro click on Logo appearance (f=20) */}
      <Sequence from={20} durationInFrames={15}>
        <Audio src={staticFile('audio/click.wav')} volume={0.5} />
      </Sequence>

      {/* 4. Subtle Impact on "GITROASTED" (f=30) */}
      <Sequence from={30} durationInFrames={40}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.65} />
      </Sequence>

      {/* 5. Whoosh into Home Page UI (f=72) */}
      <Sequence from={72} durationInFrames={35}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.45} />
      </Sequence>

      {/* 6. Keystrokes typing "@MdKasif0" (f=88 to 116) */}
      {[88, 92, 96, 100, 104, 108, 112, 116].map((f, i) => (
        <Sequence key={`key-${i}`} from={f} durationInFrames={8}>
          <Audio src={staticFile('audio/keystroke.wav')} volume={0.4} />
        </Sequence>
      ))}

      {/* 7. Crisp UI Click on "Roast Me" button (f=126) */}
      <Sequence from={126} durationInFrames={20}>
        <Audio src={staticFile('audio/click.wav')} volume={0.7} />
      </Sequence>

      {/* 8. Impact on Roast View reveal (f=135) */}
      <Sequence from={135} durationInFrames={45}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={135} durationInFrames={30}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.4} />
      </Sequence>

      {/* 9. Soft bass hit on Score focus (f=210) */}
      <Sequence from={210} durationInFrames={25}>
        <Audio src={staticFile('audio/soft_bass.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={218} durationInFrames={15}>
        <Audio src={staticFile('audio/tick.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={228} durationInFrames={15}>
        <Audio src={staticFile('audio/tick.wav')} volume={0.55} />
      </Sequence>

      {/* 10. Chime on Quick Wins teaser (f=270) */}
      <Sequence from={270} durationInFrames={45}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={315} durationInFrames={25}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.4} />
      </Sequence>

      {/* ================= PHASE 1: TITLE & LOGO LOCKUP (0 - 74f) ================= */}
      {frame < 75 && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            opacity: titleExitOpacity,
            zIndex: 30,
          }}
        >
          {/* "MEET" */}
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.32em',
              color: '#8B949E',
              textTransform: 'uppercase',
              opacity: interpolate(meetSpring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(meetSpring, [0, 1], [10, 0])}px)`,
              marginBottom: 16,
            }}
          >
            MEET
          </div>

          {/* Logo & GITROASTED */}
          {frame >= 20 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                transform: `scale(${logoScale})`,
                opacity: interpolate(frame, [20, 26], [0, 1]),
              }}
            >
              <FlameIcon size={76} />
              <div
                style={{
                  fontSize: 84,
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ color: '#F5F5F5' }}>GIT</span>
                <span style={{ color: '#FF8A00' }}>ROASTED</span>
              </div>
            </div>
          )}

          {/* Product Taglines */}
          {frame >= 40 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                marginTop: 24,
                opacity: interpolate(taglinesSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(
                  taglinesSpring,
                  [0, 1],
                  [14, 0]
                )}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#F5F5F5',
                  lineHeight: 1.3,
                }}
              >
                Roast your GitHub.{' '}
                <span style={{ color: '#8B949E' }}>Improve your craft.</span>
              </div>

              {/* Subtle orange accent line */}
              <div
                style={{
                  width: 56,
                  height: 2,
                  backgroundColor: '#FF8A00',
                  marginTop: 4,
                }}
              />

              {/* Official product tagline badge */}
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  color: '#FF8A00',
                  textTransform: 'uppercase',
                  background: '#0B0B0B',
                  padding: '5px 18px',
                  borderRadius: 6,
                  border: '1px solid #21262D',
                  marginTop: 6,
                }}
              >
                BRUTAL FEEDBACK. BETTER DEVELOPERS.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= PHASES 2 - 5: REAL GITROASTED INTERFACES ================= */}
      {frame >= 72 && (
        <div
          style={{
            position: 'absolute',
            width: 1920,
            height: 1080,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${uiScale * cameraZoom}) translateY(${uiTranslateY}px)`,
            opacity: interpolate(uiSpring, [0, 0.5], [0, 1]),
          }}
        >
          {/* Top Caption: "YOUR GITHUB. UNDER REVIEW." */}
          <div
            style={{
              position: 'absolute',
              top: 48,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '6px 20px',
              borderRadius: 6,
              backgroundColor: '#0B0B0B',
              border: '1px solid #21262D',
              zIndex: 50,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#FF8A00',
                boxShadow: '0 0 8px #FF8A00',
              }}
            />
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#F5F5F5',
                textTransform: 'uppercase',
              }}
            >
              {frame < 135
                ? 'YOUR GITHUB. UNDER REVIEW.'
                : frame < 210
                ? 'ANALYSIS COMPLETE // BRUTAL VERDICT'
                : frame < 270
                ? 'SERIOUSNESS SCORE // QUANTITATIVE DIAGNOSIS'
                : 'ACTIONABLE QUICK WINS // +135 PTS'}
            </span>
          </div>

          {/* Device Frame wrapping the authentic interfaces */}
          <div style={{ marginTop: 42 }}>
            <DeviceFrame
              width={1440}
              height={820}
              title="gitroasted.com — AI GitHub Analysis & Roast"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  backgroundColor: '#050505',
                }}
              >
                {/* 1. HOME PAGE UI (72 - 135f) */}
                {frame < 135 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      left: 0,
                      top: 0,
                    }}
                  >
                    <ScreenshotReveal
                      src="home_page.png"
                      scale={1.0}
                      panY={-75}
                      borderRadius={0}
                      boxShadow="none"
                      border="none"
                    />

                    {/* Simulated live typing inside the actual input field */}
                    {frame >= 86 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 457,
                          left: 518,
                          width: 190,
                          fontFamily: "'Geist', 'Inter', sans-serif",
                          fontSize: 20,
                          fontWeight: 500,
                          color: '#F5F5F5',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          zIndex: 20,
                          backgroundColor: '#0d1017',
                          padding: '3px 8px',
                          borderRadius: 4,
                        }}
                      >
                        <span>{currentTyped}</span>
                        {frame < 126 && Math.floor(frame / 6) % 2 === 0 && (
                          <span
                            style={{
                              display: 'inline-block',
                              width: 2,
                              height: 22,
                              backgroundColor: '#FF8A00',
                            }}
                          />
                        )}
                      </div>
                    )}

                    {/* Button Highlight on Click */}
                    {frame >= 126 && frame < 135 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 454,
                          left: 900,
                          width: 140,
                          height: 48,
                          border: '2px solid #FF8A00',
                          borderRadius: 6,
                          pointerEvents: 'none',
                          boxShadow: '0 0 16px rgba(255, 138, 0, 0.4)',
                        }}
                      />
                    )}
                  </div>
                )}

                {/* 2. ROAST PAGE HERO SPOTLIGHT (135 - 210f) */}
                {frame >= 135 && frame < 210 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      left: 0,
                      top: 0,
                    }}
                  >
                    <ScreenshotReveal
                      src="roast_page.png"
                      scale={1.12}
                      panY={-80}
                      borderRadius={0}
                      boxShadow="none"
                      border="none"
                    />

                    {/* Subtle focus change / highlight over the verbatim roast quote */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 240,
                        left: 280,
                        width: 880,
                        height: 220,
                        border: '1px solid #FF8A00',
                        borderRadius: 8,
                        boxShadow: '0 0 30px rgba(255, 138, 0, 0.25)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Small Callout Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 216,
                        left: 292,
                        backgroundColor: '#FF8A00',
                        color: '#050505',
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        padding: '2px 10px',
                        borderRadius: 4,
                        textTransform: 'uppercase',
                      }}
                    >
                      AI VERDICT
                    </div>
                  </div>
                )}

                {/* 3. SERIOUSNESS SCORE & BREAKDOWN (210 - 270f) */}
                {frame >= 210 && frame < 270 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      left: 0,
                      top: 0,
                    }}
                  >
                    <ScreenshotReveal
                      src="roast_page.png"
                      scale={1.22}
                      panY={-380}
                      borderRadius={0}
                      boxShadow="none"
                      border="none"
                    />

                    {/* Subtle orange accent line highlighting the score dial */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 200,
                        left: 310,
                        width: 420,
                        height: 280,
                        border: '1px solid #FF8A00',
                        borderRadius: 8,
                        boxShadow: '0 0 24px rgba(255, 138, 0, 0.2)',
                        pointerEvents: 'none',
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: 176,
                        left: 322,
                        backgroundColor: '#FF8A00',
                        color: '#050505',
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        padding: '2px 10px',
                        borderRadius: 4,
                        textTransform: 'uppercase',
                      }}
                    >
                      SCORE BREAKDOWN // 464 PTS
                    </div>
                  </div>
                )}

                {/* 4. QUICK WINS ACTIONABLE TEASER (270 - 330f) */}
                {frame >= 270 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      left: 0,
                      top: 0,
                    }}
                  >
                    <ScreenshotReveal
                      src="quick_wins_page.png"
                      scale={1.12}
                      panY={-120}
                      borderRadius={0}
                      boxShadow="none"
                      border="none"
                    />

                    {/* Positive green highlight over the +135 pts score improvement */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 180,
                        left: 340,
                        width: 760,
                        height: 160,
                        border: '1px solid #22C55E',
                        borderRadius: 8,
                        boxShadow: '0 0 30px rgba(34, 197, 94, 0.25)',
                        pointerEvents: 'none',
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: 156,
                        left: 352,
                        backgroundColor: '#22C55E',
                        color: '#050505',
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        padding: '2px 10px',
                        borderRadius: 4,
                        textTransform: 'uppercase',
                      }}
                    >
                      ACTIONABLE ROADMAP // +135 PTS
                    </div>
                  </div>
                )}

                {/* Real interactive cursor traversing the views */}
                <Cursor
                  x={cursorX}
                  y={cursorY}
                  clicked={cursorClicked}
                  label={cursorLabel}
                />
              </div>
            </DeviceFrame>
          </div>
        </div>
      )}
    </div>
  );
};
