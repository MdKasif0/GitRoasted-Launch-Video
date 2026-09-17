import React from 'react';
import {
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { DeviceFrame } from '../components/DeviceFrame';
import { ScoreCounter, SegmentedScoreBar } from '../components/ProgressBar';

export const Score: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera dynamics for Phase 2 (Frames 48 - 140)
  // Starts centered on the score gauge, then slowly pushes toward it as requested
  const cameraScale = interpolate(
    frame,
    [48, 92, 140],
    [1.15, 1.18, 1.28],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cameraPanY = interpolate(
    frame,
    [48, 92, 140],
    [20, 20, 15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cameraPanX = interpolate(
    frame,
    [48, 92, 140],
    [-320, -320, -320],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Badge entry spring when score settles (Frame 92)
  const badgeSpring = spring({
    frame: frame - 92,
    fps,
    config: { damping: 16, stiffness: 150 },
  });

  // Bridge card slide-up in Phase 4 (Frames 220 - 270)
  const bridgeSlideSpring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 18, stiffness: 140 },
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#050505',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          AUDIO ARCHITECTURE
          ───────────────────────────────────────────────────────────── */}
      {/* 1. Prologue subtle tone: Frame 0 */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('audio/soft_bass.wav')} volume={0.3} />
      </Sequence>
      <Sequence from={20} durationInFrames={20}>
        <Audio src={staticFile('audio/notif_click.wav')} volume={0.35} />
      </Sequence>

      {/* 2. Low Cinematic Bass Rise: Frames 48 - 94 */}
      <Sequence from={48} durationInFrames={46}>
        <Audio src={staticFile('audio/score_rise.wav')} volume={0.65} />
      </Sequence>

      {/* 3. Soft UI Ticks during count-up: Frames 54 - 90 */}
      {[54, 60, 66, 72, 78, 84, 90].map((f, i) => (
        <Sequence key={`tick-${i}`} from={f} durationInFrames={10}>
          <Audio src={staticFile('audio/tick.wav')} volume={0.35} />
        </Sequence>
      ))}

      {/* 4. Single Definitive Impact on Score Reveal: Frame 92 */}
      <Sequence from={92} durationInFrames={40}>
        <Audio src={staticFile('audio/score_impact.wav')} volume={0.8} />
      </Sequence>

      {/* 5. Bass removed at Frame 140 during "BUT THE SCORE ISN'T THE POINT." */}
      <Sequence from={140} durationInFrames={15}>
        <Audio src={staticFile('audio/click.wav')} volume={0.4} />
      </Sequence>

      {/* 6. Return to Energetic Rhythm on "WHAT YOU DO NEXT IS.": Frame 205 */}
      <Sequence from={205} durationInFrames={65}>
        <Audio src={staticFile('audio/bridge_energy.wav')} volume={0.6} />
      </Sequence>

      {/* 7. Whoosh transition into Quick Wins: Frame 252 */}
      <Sequence from={252} durationInFrames={25}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.45} />
      </Sequence>


      {/* ─────────────────────────────────────────────────────────────
          PHASE 1: "YOUR GITHUB SCORE" -> "EVERYTHING HAS A SCORE."
          (Frames 0 - 48 | 0.0s - 1.6s)
          ───────────────────────────────────────────────────────────── */}
      {frame < 48 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            opacity: interpolate(frame, [0, 8, 42, 48], [0, 1, 1, 0], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {/* Metadata tag */}
          <div
            style={{
              padding: '6px 18px',
              borderRadius: 4,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              color: '#8B949E',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Audit Telemetry // Seriousness Rating
          </div>

          {/* Line 1: YOUR GITHUB SCORE */}
          <div
            style={{
              color: '#F5F5F5',
              fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            YOUR GITHUB SCORE
          </div>

          {/* Line 2: EVERYTHING HAS A SCORE. (Frame 20+) */}
          {frame >= 20 && (
            <div
              style={{
                marginTop: 14,
                color: '#8B949E',
                fontFamily: "'Geist Mono', monospace",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                opacity: interpolate(frame, [20, 28], [0, 1], {
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              Everything has a score.
            </div>
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 2: Reveal Real Score UI & Count-Up (Frames 48 - 140)
          (1.6s - 4.67s)
          ───────────────────────────────────────────────────────────── */}
      {frame >= 48 && frame < 140 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [48, 56, 134, 140], [0, 1, 1, 0], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {/* Top disclaimer pill treating it strictly as a real example screenshot */}
          <div
            style={{
              position: 'absolute',
              top: 48,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '6px 20px',
              borderRadius: 6,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              color: '#8B949E',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              zIndex: 30,
            }}
          >
            <span style={{ color: '#FF8A00' }}>⚡</span>
            <span>Example Profile Audit // @MdKasif0</span>
            <span style={{ color: '#626A75' }}>•</span>
            <span style={{ color: '#F5F5F5' }}>Seriousness Metric Engine</span>
          </div>

          {/* Device Frame containing roast_page.png */}
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com/roast/MdKasif0 — Seriousness Score & Metrics"
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 1440,
                  transform: `translate(${cameraPanX}px, ${cameraPanY}px) scale(${cameraScale})`,
                  transformOrigin: '1142px 247px',
                }}
              >
                <Img
                  src={staticFile('roast_page.png')}
                  style={{
                    width: 1440,
                    height: 'auto',
                    display: 'block',
                  }}
                />

                {/* Dynamic Live Counter Overlay precisely masking and animating the screenshot score */}
                {frame < 96 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 124,
                      left: 875,
                      width: 475,
                      height: 245,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 8,
                      background: '#080A0C',
                      padding: '10px 18px',
                      borderRadius: 6,
                      opacity: interpolate(frame, [92, 96], [1, 0], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      }),
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
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
                      startFrame={52}
                      durationInFrames={40}
                      fontSize={68}
                    />

                    <SegmentedScoreBar
                      progress={interpolate(frame, [52, 92], [0, 0.464], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      })}
                      totalSegments={10}
                    />

                    {frame >= 92 && (
                      <div
                        style={{
                          marginTop: 4,
                          padding: '4px 14px',
                          borderRadius: 20,
                          background: 'rgba(255, 138, 0, 0.08)',
                          border: '1px solid #FF8A00',
                          color: '#FF8A00',
                          fontSize: 13,
                          fontWeight: 700,
                          fontFamily: "'Geist Mono', monospace",
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        🔥 Rising Developer
                      </div>
                    )}
                  </div>
                )}

                {/* Subtle orange hairline accent spotlighting the score & surrounding interface after score settles */}
                {frame >= 96 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 115,
                      left: 870,
                      width: 485,
                      height: 265,
                      border: '1px solid rgba(255, 138, 0, 0.5)',
                      borderRadius: 8,
                      background: 'rgba(255, 138, 0, 0.03)',
                      pointerEvents: 'none',
                      opacity: interpolate(frame, [96, 108], [0, 1], {
                        extrapolateRight: 'clamp',
                      }),
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: -11,
                        left: 16,
                        background: '#0B0B0B',
                        border: '1px solid #FF8A00',
                        padding: '2px 10px',
                        borderRadius: 3,
                        color: '#FF8A00',
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      VERIFIED SERIOUSNESS SCORE
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DeviceFrame>

          {/* Grounded Monospace Metric Diagnostic Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: 36,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              padding: '10px 24px',
              borderRadius: 6,
              color: '#F5F5F5',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 14,
              boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ color: '#FF8A00' }}>464 / 1000</span>
            <span style={{ color: '#626A75' }}>•</span>
            <span style={{ color: '#8B949E' }}>Impact 137/250</span>
            <span style={{ color: '#626A75' }}>•</span>
            <span style={{ color: '#8B949E' }}>Consistency 29/200</span>
            <span style={{ color: '#626A75' }}>•</span>
            <span style={{ color: '#8B949E' }}>Quality 80/150</span>
            <span style={{ color: '#626A75' }}>•</span>
            <span style={{ color: '#22C55E' }}>Activity 50/50</span>
          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 3: "BUT THE SCORE ISN'T THE POINT." (Frames 140 - 205)
          (4.67s - 6.83s | Serious, Thoughtful Pivot with Bass Removed)
          ───────────────────────────────────────────────────────────── */}
      {frame >= 140 && frame < 205 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
            opacity: interpolate(frame, [140, 146, 198, 205], [0, 1, 1, 0], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {/* Subtle Category Pill */}
          <div
            style={{
              padding: '6px 18px',
              borderRadius: 4,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              color: '#8B949E',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            The Reality
          </div>

          {/* Headline: BUT THE SCORE ISN'T THE POINT. */}
          <div
            style={{
              color: '#F5F5F5',
              fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              transform: `translateY(${interpolate(
                frame,
                [140, 148],
                [10, 0],
                { extrapolateRight: 'clamp' }
              )}px)`,
            }}
          >
            BUT THE SCORE ISN'T THE POINT.
          </div>

          {/* Contemplative subtext */}
          <div
            style={{
              marginTop: 18,
              color: '#626A75',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 14,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            [ Pause ]
          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 4: "WHAT YOU DO NEXT IS." -> Bridge into Quick Wins
          (Frames 205 - 270 | 6.83s - 9.0s | Orange Highlight & Energy)
          ───────────────────────────────────────────────────────────── */}
      {frame >= 205 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
          }}
        >
          {/* Headline: WHAT YOU DO NEXT IS. */}
          <div
            style={{
              color: '#FF8A00',
              fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
              fontSize: 58,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textAlign: 'center',
              transform: `scale(${interpolate(
                spring({ frame: frame - 205, fps, config: { damping: 18, stiffness: 140 } }),
                [0, 1],
                [0.96, 1]
              )})`,
            }}
          >
            WHAT YOU DO NEXT IS.
          </div>

          {/* Bridge into Quick Wins teaser card */}
          {frame >= 218 && (
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '14px 28px',
                borderRadius: 8,
                background: '#0B0B0B',
                border: '1px solid #FF8A00',
                boxShadow: '0 12px 32px rgba(255, 138, 0, 0.15)',
                transform: `translateY(${interpolate(bridgeSlideSpring, [0, 1], [20, 0])}px)`,
                opacity: interpolate(bridgeSlideSpring, [0, 1], [0, 1]),
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 16,
                  color: '#F5F5F5',
                }}
              >
                <span style={{ color: '#8B949E' }}>463</span>
                <span style={{ color: '#FF8A00' }}>➔</span>
                <span style={{ color: '#22C55E', fontWeight: 700 }}>598</span>
                <span
                  style={{
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid #22C55E',
                    color: '#22C55E',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  +135 PTS
                </span>
              </div>

              <div style={{ width: 1, height: 20, background: '#21262D' }} />

              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  color: '#FF8A00',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Actionable Quick Wins ➔
              </div>
            </div>
          )}

          {/* Sleek Orange Sweep Line at the bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 3,
              width: `${interpolate(frame, [205, 270], [0, 100], {
                extrapolateRight: 'clamp',
              })}%`,
              background: '#FF8A00',
              boxShadow: '0 0 12px #FF8A00',
            }}
          />
        </div>
      )}
    </div>
  );
};
