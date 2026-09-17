import React from 'react';
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { DeviceFrame } from '../components/DeviceFrame';

export const QuickWins: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─────────────────────────────────────────────────────────────
  // SCENE TIMING ARCHITECTURE (Total: 360 frames / 12.0s @ 30fps)
  // Phase 1 (Frames 0 - 64): Thesis Statement ("THE ROAST IS FREE. ... THE FIXES ARE THE POINT.")
  // Phase 2 (Frames 64 - 220): Rapid Editorial Montage of Real UI Tasks
  //   - Beat 1 (64 - 112f): Task 01 (Add license) + camera push toward progress
  //   - Beat 2 (112 - 160f): Task 02 (Add topics) + quick horizontal transition
  //   - Beat 3 (160 - 220f): Task 03 & Score/Potential relationship (463 -> 598 +135 pts)
  // Phase 3 (Frames 220 - 285): Complete Composition (Full Quick Wins page)
  // Phase 4 (Frames 285 - 360): Punchy Resolution ("SMALL FIXES." -> "BETTER GITHUB." -> "BETTER ROAST.")
  // ─────────────────────────────────────────────────────────────

  // Virtual camera kinematics for the Real UI Montage (Phase 2 & Phase 3: 64 - 285f)
  // Camera Pan X
  const cameraPanX = interpolate(
    frame,
    [
      64, 80,         // Frame 64-80: zooms into Task 01 on left
      112, 122,       // Frame 112-122: rapid horizontal whip-pan to Task 02 on right
      160, 175,       // Frame 160-175: horizontal pan centers for Score / Potential
      220, 245,       // Frame 220-245: pull-back to center
    ],
    [
      0, 280,         // Task 01 centered
      280, -280,      // Task 02 centered
      -280, 0,        // Score/Potential centered
      0, 0,           // Complete page centered
    ],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Camera Pan Y
  const cameraPanY = interpolate(
    frame,
    [
      64, 80,         // Frame 64-80: pans down to row 1
      112, 122,       // Frame 112-122: stays level across row 1
      160, 175,       // Frame 160-175: sweeps up to Roadmap score card
      220, 245,       // Frame 220-245: pull-back to center
    ],
    [
      0, -125,        // Row 1 (Task 01)
      -125, -125,     // Row 1 (Task 02)
      -125, 80,       // Roadmap Card + Task 03
      80, -15,        // Full composition vertical center
    ],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Camera Scale / Zoom
  const cameraScale = interpolate(
    frame,
    [64, 80, 112, 117, 124, 160, 175, 220, 245, 285],
    [1.2, 1.55, 1.68, 1.50, 1.62, 1.62, 1.38, 1.38, 1.0, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // UI Container Entrance Spring (Frame 64)
  const uiEnterSpring = spring({
    frame: frame - 64,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });

  // Highlight Box Opacities for the 3 montage beats
  const task01Highlight = interpolate(frame, [72, 78, 108, 112], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const task02Highlight = interpolate(frame, [122, 128, 156, 160], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scoreHighlight = interpolate(frame, [175, 182, 216, 220], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          PHASE 1: THE THESIS STATEMENT (Frames 0 - 64 | 0.0s - 2.13s)
          "THE ROAST IS FREE. ... THE FIXES ARE THE POINT."
          ───────────────────────────────────────────────────────────── */}
      {frame < 64 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            opacity: interpolate(frame, [58, 64], [1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {/* Diagnostic Subheader Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 4,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              color: '#8B949E',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            <span style={{ color: '#FF8A00' }}>⚡</span>
            <span>PRODUCT THESIS // ACTIONABLE OUTCOMES</span>
          </div>

          {/* Line 1: "THE ROAST IS FREE." */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              fontFamily: "'Geist', -apple-system, sans-serif",
              color: '#8B949E',
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            THE ROAST IS FREE.
          </div>

          {/* Line 2: "THE FIXES ARE THE POINT." (Appears after pause at frame 42) */}
          {frame >= 42 ? (
            <div
              style={{
                marginTop: 12,
                fontSize: 68,
                fontWeight: 800,
                fontFamily: "'Geist', -apple-system, sans-serif",
                color: '#F5F5F5',
                letterSpacing: '-0.03em',
                textAlign: 'center',
                transform: `scale(${interpolate(
                  spring({
                    frame: frame - 42,
                    fps,
                    config: { damping: 14, stiffness: 180 },
                  }),
                  [0, 1],
                  [0.96, 1]
                )})`,
              }}
            >
              <span>THE FIXES </span>
              <span style={{ color: '#FF8A00' }}>ARE THE POINT.</span>
            </div>
          ) : (
            // Deliberate pause placeholder for perfect visual stability
            <div style={{ height: 82, marginTop: 12 }} />
          )}

          {/* Subtext: "You don't just get roasted. You get a plan." */}
          {frame >= 48 && (
            <div
              style={{
                marginTop: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 15,
                color: '#8B949E',
                letterSpacing: '0.04em',
                opacity: interpolate(frame, [48, 56], [0, 1], {
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <span style={{ color: '#FF8A00' }}>❯</span>
              <span>You don't just get roasted. You get a plan.</span>
            </div>
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 2 & 3: REAL QUICK WINS INTERFACE MONTAGE
          (Frames 64 - 285 | 2.13s - 9.5s)
          ───────────────────────────────────────────────────────────── */}
      {frame >= 64 && frame < 285 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [64, 72, 278, 285], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${interpolate(uiEnterSpring, [0, 1], [0.97, 1])})`,
          }}
        >
          {/* Top telemetry disclaimer pill */}
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
            <span>Actionable Roadmap // @MdKasif0</span>
            <span style={{ color: '#626A75' }}>•</span>
            <span style={{ color: '#F5F5F5' }}>Verified Product Actions</span>
          </div>

          {/* Browser Device Frame */}
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com/quick-wins — Actionable Developer Roadmap"
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
              {/* Virtual Camera Controlled Image Wrapper */}
              <div
                style={{
                  position: 'absolute',
                  width: 1440,
                  transform: `translate(${cameraPanX}px, ${cameraPanY}px) scale(${cameraScale})`,
                  transformOrigin: '720px 480px',
                  transition: 'transform 0.04s linear',
                }}
              >
                <Img
                  src={staticFile('quick_wins_page.png')}
                  style={{
                    width: 1440,
                    height: 'auto',
                    display: 'block',
                  }}
                />

                {/* ──────────────────────────────────────────────────
                    BEAT 1 HIGHLIGHT: TASK 01 (Add license to public repos)
                    Frames 72 - 112
                    ────────────────────────────────────────────────── */}
                <div
                  style={{
                    position: 'absolute',
                    top: 470,
                    left: 200,
                    width: 505,
                    height: 165,
                    border: '1px solid rgba(255, 138, 0, 0.75)',
                    borderRadius: 8,
                    background: 'rgba(255, 138, 0, 0.04)',
                    pointerEvents: 'none',
                    opacity: task01Highlight,
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
                    TASK 01 // LEGAL HYGIENE
                  </div>
                </div>

                {/* ──────────────────────────────────────────────────
                    BEAT 2 HIGHLIGHT: TASK 02 (Add topics to repos)
                    Frames 122 - 160
                    ────────────────────────────────────────────────── */}
                <div
                  style={{
                    position: 'absolute',
                    top: 470,
                    left: 735,
                    width: 505,
                    height: 165,
                    border: '1px solid rgba(255, 138, 0, 0.75)',
                    borderRadius: 8,
                    background: 'rgba(255, 138, 0, 0.04)',
                    pointerEvents: 'none',
                    opacity: task02Highlight,
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
                    TASK 02 // SEARCH DISCOVERABILITY
                  </div>
                </div>

                {/* ──────────────────────────────────────────────────
                    BEAT 3 HIGHLIGHT: SCORE / POTENTIAL RELATIONSHIP
                    (Current Score 463 ──> Potential Score 598 +135 pts)
                    Frames 175 - 220
                    ────────────────────────────────────────────────── */}
                <div
                  style={{
                    position: 'absolute',
                    top: 250,
                    left: 200,
                    width: 1040,
                    height: 125,
                    border: '1px solid rgba(34, 197, 94, 0.85)',
                    borderRadius: 8,
                    background: 'rgba(34, 197, 94, 0.04)',
                    pointerEvents: 'none',
                    opacity: scoreHighlight,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -11,
                      left: 16,
                      background: '#0B0B0B',
                      border: '1px solid #22C55E',
                      padding: '2px 10px',
                      borderRadius: 3,
                      color: '#22C55E',
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    SCORE POTENTIAL // +135 PTS
                  </div>
                </div>
              </div>
            </div>
          </DeviceFrame>

          {/* Bottom Telemetry Bar: Appears during complete composition (Frames 235 - 285) */}
          {frame >= 235 && (
            <div
              style={{
                position: 'absolute',
                bottom: 36,
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '8px 24px',
                borderRadius: 6,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.08em',
                color: '#8B949E',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                opacity: interpolate(frame, [235, 248], [0, 1], {
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <span style={{ color: '#22C55E' }}>5 VERIFIED ACTIONS</span>
              <span style={{ color: '#626A75' }}>•</span>
              <span style={{ color: '#FF8A00' }}>+135 POINT POTENTIAL</span>
              <span style={{ color: '#626A75' }}>•</span>
              <span style={{ color: '#F5F5F5' }}>REAL ACTIONABLE PLAN</span>
            </div>
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 4: PUNCHY EDITORIAL RESOLUTION
          (Frames 285 - 360 | 9.5s - 12.0s)
          "SMALL FIXES." -> "BETTER GITHUB." -> "BETTER ROAST."
          ───────────────────────────────────────────────────────────── */}
      {frame >= 285 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
          }}
        >
          {/* Step 1: "SMALL FIXES." (Frames 285 - 310) */}
          {frame < 310 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                transform: `scale(${interpolate(
                  spring({
                    frame: frame - 285,
                    fps,
                    config: { damping: 14, stiffness: 200 },
                  }),
                  [0, 1],
                  [0.96, 1]
                )})`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#626A75',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                01 // EFFORT
              </div>
              <div
                style={{
                  fontSize: 78,
                  fontWeight: 800,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  color: '#F5F5F5',
                  letterSpacing: '-0.03em',
                  textAlign: 'center',
                }}
              >
                SMALL FIXES.
              </div>
            </div>
          )}

          {/* Step 2: "BETTER GITHUB." (Frames 310 - 335) */}
          {frame >= 310 && frame < 335 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                transform: `scale(${interpolate(
                  spring({
                    frame: frame - 310,
                    fps,
                    config: { damping: 14, stiffness: 200 },
                  }),
                  [0, 1],
                  [0.96, 1]
                )})`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#626A75',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                02 // OUTCOME
              </div>
              <div
                style={{
                  fontSize: 78,
                  fontWeight: 800,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  color: '#F5F5F5',
                  letterSpacing: '-0.03em',
                  textAlign: 'center',
                }}
              >
                BETTER GITHUB.
              </div>
            </div>
          )}

          {/* Step 3: "BETTER ROAST." (Frames 335 - 360) */}
          {frame >= 335 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                transform: `scale(${interpolate(
                  spring({
                    frame: frame - 335,
                    fps,
                    config: { damping: 14, stiffness: 200 },
                  }),
                  [0, 1],
                  [0.95, 1]
                )})`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#FF8A00',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                03 // VERDICT
              </div>
              <div
                style={{
                  fontSize: 88,
                  fontWeight: 800,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  color: '#FF8A00',
                  letterSpacing: '-0.03em',
                  textAlign: 'center',
                }}
              >
                BETTER ROAST.
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 15,
                  color: '#8B949E',
                  letterSpacing: '0.04em',
                }}
              >
                Converts criticism into code.
              </div>
            </div>
          )}

          {/* High velocity orange baseline sweep line into Scene 7 (Montage) */}
          {frame >= 350 && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: '#FF8A00',
                transform: `scaleX(${interpolate(frame, [350, 360], [0, 1], {
                  extrapolateRight: 'clamp',
                })})`,
                transformOrigin: 'left center',
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
