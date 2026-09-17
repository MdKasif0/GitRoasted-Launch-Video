import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Logo } from '../components/Logo';

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TIMELINE PHASES (Total: 330 frames / 11.0s @ 30fps)
  // 1. 0 - 42f:   "YOU BUILD THINGS."
  // 2. 42 - 72f:  Quick UI/code-inspired typography
  // 3. 72 - 114f: "YOU PUSH CODE."
  // 4. 114 - 142f: Quick pipeline transition
  // 5. 142 - 186f: "YOU CREATE 47 REPOSITORIES."
  // 6. 186 - 206f: Pause / Silence / Blinking cursor
  // 7. 206 - 236f: "AND SOMEHOW..."
  // 8. 236 - 252f: Large whitespace
  // 9. 252 - 292f: "...your README still says \"coming soon.\""
  // 10. 292 - 330f: GitRoasted logo subtly appears: "Maybe your GitHub deserves a second opinion."

  // Spring animation for "47" punch in Beat 5
  const spring47 = spring({
    frame: frame - 142,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.6 },
  });
  const scale47 = interpolate(spring47, [0, 1], [1.16, 1.0]);

  // Spring animation for subtle Logo in Beat 10
  const springLogo = spring({
    frame: frame - 292,
    fps,
    config: { damping: 18, stiffness: 160, mass: 0.8 },
  });
  const scaleLogo = interpolate(springLogo, [0, 1], [0.94, 1.0]);
  const opacityLogo = interpolate(frame, [292, 298], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cursor coordinates across the sequence
  let cursorX = 960;
  let cursorY = 540;
  let cursorOpacity = 0.85;

  if (frame < 42) {
    // Gliding across "YOU BUILD THINGS."
    cursorX = interpolate(frame, [0, 42], [760, 1160], {
      extrapolateRight: 'clamp',
    });
    cursorY = 560;
  } else if (frame >= 42 && frame < 72) {
    // Top-right inspection of compile logs
    cursorX = interpolate(frame, [42, 72], [1050, 1220]);
    cursorY = interpolate(frame, [42, 72], [420, 580]);
  } else if (frame >= 72 && frame < 114) {
    // Resting on "PUSH CODE"
    cursorX = interpolate(frame, [72, 114], [820, 1100]);
    cursorY = 540;
  } else if (frame >= 114 && frame < 142) {
    // Tracing pipeline from left to right
    cursorX = interpolate(frame, [114, 142], [640, 1280]);
    cursorY = 540;
  } else if (frame >= 142 && frame < 186) {
    // Hovering under "47"
    cursorX = 960;
    cursorY = interpolate(frame, [142, 160], [520, 560], {
      extrapolateRight: 'clamp',
    });
  } else if (frame >= 186 && frame < 252) {
    // Hidden during silence & whitespace pauses
    cursorOpacity = 0;
  } else if (frame >= 252 && frame < 292) {
    // Pointing right at "coming soon." in fake README
    cursorX = interpolate(frame, [252, 280], [920, 1080], {
      extrapolateRight: 'clamp',
    });
    cursorY = 640;
  } else if (frame >= 292) {
    // Smoothly guiding down toward bottom-right for product reveal transition
    cursorX = interpolate(frame, [292, 330], [960, 1340]);
    cursorY = interpolate(frame, [292, 330], [600, 780]);
  }

  // Blinking cursor opacity for Beat 6 (186 - 206f)
  const blinkState = Math.floor((frame - 186) / 6) % 2 === 0;

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
      {/* ================= VISUAL BEATS ================= */}

      {/* BEAT 1: "YOU BUILD THINGS." (0 - 42f) */}
      {frame < 42 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 14,
              letterSpacing: '0.14em',
              color: '#626A75',
              textTransform: 'uppercase',
            }}
          >
            <span>[01 // CREATION]</span>
            <span style={{ color: '#30363D' }}>·</span>
            <span>TIMELINE: CONTINUOUS</span>
          </div>

          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#F5F5F5',
              lineHeight: 1.05,
            }}
          >
            YOU BUILD THINGS.
          </div>

          <div
            style={{
              width: 48,
              height: 2,
              backgroundColor: '#FF8A00',
              marginTop: 4,
            }}
          />
        </div>
      )}

      {/* BEAT 2: Quick UI / Code-Inspired Typography (42 - 72f) */}
      {frame >= 42 && frame < 72 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            width: 860,
          }}
        >
          <div
            style={{
              width: '100%',
              backgroundColor: '#0B0B0B',
              border: '1px solid #21262D',
              borderRadius: 8,
              padding: '28px 36px',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 17,
              lineHeight: 1.75,
              color: '#8B949E',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: '1px solid #161B22',
                fontSize: 13,
                color: '#626A75',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                }}
              />
              <span>WORKSPACE // ARCHITECTURE_V4</span>
              <span style={{ marginLeft: 'auto' }}>1,840 COMMITS LOGGED</span>
            </div>

            <div style={{ color: '#F5F5F5' }}>
              <span style={{ color: '#FF8A00' }}>❯</span> cargo build --release
              --bin core
            </div>
            <div>
              &nbsp;&nbsp;Compiling <span style={{ color: '#F5F5F5' }}>ast-engine</span>{' '}
              v2.1.0
            </div>
            <div>
              &nbsp;&nbsp;Optimizing codegen pipeline{' '}
              <span style={{ color: '#22C55E' }}>[342 modules]</span>
            </div>
            <div
              style={{
                color: '#22C55E',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 4,
              }}
            >
              <span>✓ BUILD SUCCESSFUL</span>
              <span style={{ color: '#626A75' }}>· target/release in 1.48s</span>
            </div>

            {/* Fast micro fill bar */}
            <div
              style={{
                width: '100%',
                height: 3,
                backgroundColor: '#161B22',
                borderRadius: 2,
                marginTop: 18,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, (frame - 42) * 5)}%`,
                  height: '100%',
                  backgroundColor: '#FF8A00',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* BEAT 3: "YOU PUSH CODE." (72 - 114f) */}
      {frame >= 72 && frame < 114 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 22,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 14,
              letterSpacing: '0.14em',
              color: '#626A75',
              textTransform: 'uppercase',
            }}
          >
            <span>[02 // SYNCHRONIZATION]</span>
            <span style={{ color: '#30363D' }}>·</span>
            <span>BRANCH: MAIN</span>
          </div>

          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#F5F5F5',
              lineHeight: 1.05,
            }}
          >
            YOU PUSH <span style={{ color: '#FF8A00' }}>CODE.</span>
          </div>

          {/* Clean monospace commit snippet */}
          <div
            style={{
              padding: '8px 24px',
              borderRadius: 6,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 16,
              color: '#8B949E',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 4,
            }}
          >
            <span style={{ color: '#FF8A00' }}>$</span>
            <span style={{ color: '#F5F5F5' }}>git push origin main</span>
            <span style={{ color: '#30363D' }}>|</span>
            <span style={{ color: '#22C55E' }}>● remote up to date</span>
          </div>
        </div>
      )}

      {/* BEAT 4: Quick Pipeline Transition (114 - 142f) */}
      {frame >= 114 && frame < 142 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            width: 980,
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.14em',
              color: '#626A75',
              textTransform: 'uppercase',
            }}
          >
            DEVELOPMENT LIFECYCLE // AUTOMATED REPETITION
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              width: '100%',
            }}
          >
            {[
              { label: 'WRITE', sub: 'editor.local' },
              { label: 'COMMIT', sub: 'git.local' },
              { label: 'PUSH', sub: 'origin.main' },
              { label: 'DEPLOY', sub: 'edge.network' },
            ].map((node, i) => (
              <React.Fragment key={node.label}>
                <div
                  style={{
                    backgroundColor: '#0B0B0B',
                    border:
                      i === 2
                        ? '1px solid #FF8A00'
                        : '1px solid #21262D',
                    borderRadius: 8,
                    padding: '16px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    minWidth: 140,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontWeight: 700,
                      fontSize: 18,
                      color: i === 2 ? '#FF8A00' : '#F5F5F5',
                    }}
                  >
                    {node.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 12,
                      color: '#626A75',
                    }}
                  >
                    {node.sub}
                  </span>
                </div>

                {i < 3 && (
                  <div
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      color: '#30363D',
                      fontSize: 18,
                    }}
                  >
                    ───▶
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* BEAT 5: "YOU CREATE 47 REPOSITORIES." (142 - 186f) */}
      {frame >= 142 && frame < 186 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 14,
              letterSpacing: '0.14em',
              color: '#626A75',
              textTransform: 'uppercase',
            }}
          >
            [03 // VOLUME] · AUDIT REPORT
          </div>

          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#F5F5F5',
              lineHeight: 1.05,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <span>YOU CREATE</span>
            <span
              style={{
                display: 'inline-block',
                transform: `scale(${scale47})`,
                color: '#FF8A00',
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 900,
                backgroundColor: '#111111',
                padding: '0 20px',
                borderRadius: 8,
                border: '1px solid #FF8A00',
              }}
            >
              47
            </span>
            <span>REPOSITORIES.</span>
          </div>

          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 16,
              color: '#8B949E',
              display: 'flex',
              gap: 16,
              marginTop: 6,
            }}
          >
            <span>repositories: 47</span>
            <span style={{ color: '#30363D' }}>·</span>
            <span>public: 44</span>
            <span style={{ color: '#30363D' }}>·</span>
            <span>private: 3</span>
            <span style={{ color: '#30363D' }}>·</span>
            <span>archived: 0</span>
          </div>
        </div>
      )}

      {/* BEAT 6: PAUSE / SILENCE / BLINKING CURSOR (186 - 206f) */}
      {frame >= 186 && frame < 206 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Complete stillness. Only the blinking orange terminal block cursor */}
          <div
            style={{
              width: 18,
              height: 38,
              backgroundColor: blinkState ? '#FF8A00' : 'transparent',
              borderRadius: 2,
            }}
          />
        </div>
      )}

      {/* BEAT 7: "AND SOMEHOW..." (206 - 236f) */}
      {frame >= 206 && frame < 236 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 66,
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#F5F5F5',
              fontStyle: 'normal',
            }}
          >
            AND SOMEHOW...
          </div>
        </div>
      )}

      {/* BEAT 8: LARGE WHITESPACE / BLACKOUT PAUSE (236 - 252f) */}
      {frame >= 236 && frame < 252 && null}

      {/* BEAT 9: "...your README still says \"coming soon.\"" (252 - 292f) */}
      {frame >= 252 && frame < 292 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: '#F5F5F5',
              lineHeight: 1.1,
            }}
          >
            ...your README still says{' '}
            <span style={{ color: '#FF8A00' }}>"coming soon."</span>
          </div>

          {/* Fake generic README conceptual preview block (clearly conceptual, not real user data) */}
          <div
            style={{
              width: 760,
              backgroundColor: '#0B0B0B',
              border: '1px solid #21262D',
              borderRadius: 8,
              overflow: 'hidden',
              textAlign: 'left',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header tab */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 20px',
                backgroundColor: '#111111',
                borderBottom: '1px solid #21262D',
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                color: '#8B949E',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  stroke="#8B949E"
                  strokeWidth="2"
                />
                <path d="M14 2v6h6" stroke="#8B949E" strokeWidth="2" />
              </svg>
              <span>README.md</span>
              <span
                style={{
                  marginLeft: 'auto',
                  color: '#626A75',
                  fontSize: 12,
                }}
              >
                (committed 3 years ago)
              </span>
            </div>

            {/* Content body */}
            <div
              style={{
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#F5F5F5',
                  letterSpacing: '-0.02em',
                }}
              >
                # next-gen-universal-project
              </div>
              <div
                style={{
                  padding: '12px 18px',
                  borderLeft: '3px solid #FF8A00',
                  backgroundColor: '#161B22',
                  borderRadius: '0 6px 6px 0',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 16,
                  color: '#F5F5F5',
                }}
              >
                &gt; Coming soon! Star the repo for updates.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 10: SUBTLE GITROASTED LOGO & SECOND OPINION (292 - 330f) */}
      {frame >= 292 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
            textAlign: 'center',
            opacity: opacityLogo,
            transform: `scale(${scaleLogo})`,
          }}
        >
          {/* Subtle Logo lockup */}
          <Logo size={42} showText={true} />

          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#F5F5F5',
              maxWidth: 960,
              lineHeight: 1.18,
            }}
          >
            Maybe your GitHub deserves a{' '}
            <span
              style={{
                color: '#FF8A00',
                borderBottom: '2px solid #FF8A00',
                paddingBottom: 2,
              }}
            >
              second opinion.
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 14,
              color: '#8B949E',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>Telemetry</span>
            <span style={{ color: '#FF8A00' }}>•</span>
            <span>Brutal Roast</span>
            <span style={{ color: '#FF8A00' }}>•</span>
            <span>Quick Wins</span>
          </div>
        </div>
      )}

      {/* ================= FLOATING SUBTLE OS CURSOR ================= */}
      {cursorOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            pointerEvents: 'none',
            opacity: cursorOpacity,
            zIndex: 100,
            transition: 'opacity 0.2s ease',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
              fill="#F5F5F5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
