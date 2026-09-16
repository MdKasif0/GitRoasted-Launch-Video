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
import { Logo } from '../components/Logo';

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 105f (Documentary text)
  // Phase 2: 105 - 122f (Cut to black & typing sound)
  // Phase 3: 122 - 186f (Developer-style GitHub interface rapid inspection)
  // Phase 4: 186 - 220f (Freeze: "We decided to investigate.")
  // Phase 5: 220 - 258f (Hard cut: GitRoasted Logo)
  // Phase 6: 258 - 270f (Fast orange line wipe)

  const logoSpring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.96, 1.0]);

  // Line wipe progress across screen width (0 to 1920)
  const wipeX = interpolate(frame, [258, 270], [0, 1920], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: '#F5F5F5',
      }}
    >
      {/* ================= AUDIO DESIGN ================= */}
      {/* Low-volume cinematic electronic bed */}
      <Sequence from={0} durationInFrames={258}>
        <Audio src={staticFile('audio/drone.wav')} volume={0.35} />
      </Sequence>

      {/* Subtle keyboard typing sound in black pause */}
      {[108, 111, 114, 117].map((f, i) => (
        <Sequence key={`key-${i}`} from={f} durationInFrames={8}>
          <Audio src={staticFile('audio/keystroke.wav')} volume={0.5} />
        </Sequence>
      ))}

      {/* UI clicks during rapid inspection flashes */}
      {[122, 138, 154, 170].map((f, i) => (
        <Sequence key={`click-${i}`} from={f} durationInFrames={10}>
          <Audio src={staticFile('audio/click.wav')} volume={0.4} />
        </Sequence>
      ))}

      {/* Hard cut logo impact */}
      <Sequence from={220} durationInFrames={38}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.65} />
      </Sequence>

      {/* Fast orange line wipe whoosh */}
      <Sequence from={258} durationInFrames={12}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.55} />
      </Sequence>

      {/* ================= PHASE 1: DOCUMENTARY OPENING (0 - 105f) ================= */}
      {frame < 105 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          {/* Very small monospace text */}
          {frame >= 15 && (
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.28em',
                color: '#8B949E',
                textTransform: 'uppercase',
                marginBottom: 28,
                opacity: interpolate(frame, [15, 22], [0, 1], {
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              YOUR GITHUB PROFILE
            </div>
          )}

          {/* Pause -> Then: is probably saying more about you */}
          {frame >= 35 && (
            <div
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 54,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#F5F5F5',
                lineHeight: 1.15,
                opacity: interpolate(frame, [35, 43], [0, 1], {
                  extrapolateRight: 'clamp',
                }),
                transform: `translateY(${interpolate(frame, [35, 45], [10, 0], {
                  extrapolateRight: 'clamp',
                })}px)`,
              }}
            >
              is probably saying more about you
            </div>
          )}

          {/* Pause -> Then: than you intended. */}
          {frame >= 65 && (
            <div
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 54,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#8B949E',
                lineHeight: 1.15,
                marginTop: 10,
                opacity: interpolate(frame, [65, 73], [0, 1], {
                  extrapolateRight: 'clamp',
                }),
                transform: `translateY(${interpolate(frame, [65, 75], [10, 0], {
                  extrapolateRight: 'clamp',
                })}px)`,
              }}
            >
              than you intended.
            </div>
          )}
        </div>
      )}

      {/* ================= PHASE 3: DEVELOPER-STYLE GITHUB INTERFACE (122 - 186f) ================= */}
      {frame >= 122 && frame < 186 && (
        <div
          style={{
            width: 1200,
            height: 640,
            backgroundColor: '#0B0B0B',
            border: '1px solid #21262D',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
          }}
        >
          {/* Interface Header Bar */}
          <div
            style={{
              height: 48,
              backgroundColor: '#111111',
              borderBottom: '1px solid #21262D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* GitHub Mark */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5F5F5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 14,
                  color: '#8B949E',
                }}
              >
                github.com / <strong style={{ color: '#F5F5F5' }}>MdKasif0</strong>
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                color: '#626A75',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                }}
              />
              <span>PUBLIC PROFILE INSPECTION</span>
            </div>
          </div>

          {/* Rapid Flashes Container */}
          <div
            style={{
              flex: 1,
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* FLASH A (122 - 138f): Profile Information */}
            {frame >= 122 && frame < 138 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 28,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 6,
                      backgroundColor: '#161B22',
                      border: '1px solid #30363D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      color: '#F5F5F5',
                      fontFamily: "'Geist Mono', monospace",
                      fontWeight: 700,
                    }}
                  >
                    MK
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Geist', 'Inter', sans-serif",
                        fontSize: 32,
                        fontWeight: 700,
                        color: '#F5F5F5',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Md Kasif Uddin
                    </div>
                    <div
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 16,
                        color: '#8B949E',
                      }}
                    >
                      @MdKasif0 · Developer
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      padding: '20px 24px',
                      borderRadius: 6,
                      background: '#111111',
                      border: '1px solid #21262D',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: 800,
                        fontFamily: "'Geist Mono', monospace",
                        color: '#F5F5F5',
                      }}
                    >
                      42
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#8B949E',
                        fontFamily: "'Geist', sans-serif",
                        marginTop: 4,
                      }}
                    >
                      Public Repositories
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '20px 24px',
                      borderRadius: 6,
                      background: '#111111',
                      border: '1px solid #21262D',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: 800,
                        fontFamily: "'Geist Mono', monospace",
                        color: '#F5F5F5',
                      }}
                    >
                      138
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#8B949E',
                        fontFamily: "'Geist', sans-serif",
                        marginTop: 4,
                      }}
                    >
                      Followers
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '20px 24px',
                      borderRadius: 6,
                      background: '#111111',
                      border: '1px solid #21262D',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: 800,
                        fontFamily: "'Geist Mono', monospace",
                        color: '#F5F5F5',
                      }}
                    >
                      102
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#8B949E',
                        fontFamily: "'Geist', sans-serif",
                        marginTop: 4,
                      }}
                    >
                      Following
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FLASH B (138 - 154f): Repositories & Commits */}
            {frame >= 138 && frame < 154 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#626A75',
                    textTransform: 'uppercase',
                  }}
                >
                  RECENT REPOSITORY COMMITS ON MAIN
                </div>

                {[
                  {
                    hash: '8f3a91c',
                    msg: 'fixed bug again',
                    time: '3:14 AM',
                    branch: 'main',
                  },
                  {
                    hash: 'e4b12d0',
                    msg: 'update readme',
                    time: 'May 20',
                    branch: 'main',
                  },
                  {
                    hash: 'a99f01b',
                    msg: 'wip',
                    time: '2:41 AM',
                    branch: 'main',
                  },
                  {
                    hash: '4c771fa',
                    msg: 'init',
                    time: 'May 12',
                    branch: 'main',
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 18px',
                      borderRadius: 6,
                      background: '#111111',
                      border: '1px solid #21262D',
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 15,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ color: '#FF8A00' }}>{c.hash}</span>
                      <span style={{ color: '#F5F5F5' }}>"{c.msg}"</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ color: '#626A75' }}>branch: {c.branch}</span>
                      <span style={{ color: '#8B949E' }}>{c.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FLASH C (154 - 170f): Languages */}
            {frame >= 154 && frame < 170 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 22,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#626A75',
                    textTransform: 'uppercase',
                  }}
                >
                  LANGUAGE DISTRIBUTION ACROSS 42 REPOSITORIES
                </div>

                {/* Segmented language distribution bar */}
                <div
                  style={{
                    height: 24,
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    display: 'flex',
                    background: '#161B22',
                  }}
                >
                  <div style={{ width: '48%', background: '#3178C6' }} />
                  <div style={{ width: '22%', background: '#E34F26' }} />
                  <div style={{ width: '14%', background: '#3572A5' }} />
                  <div style={{ width: '10%', background: '#F7DF1E' }} />
                  <div style={{ width: '6%', background: '#563D7C' }} />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 12,
                  }}
                >
                  {[
                    { name: 'TypeScript', pct: '48%', color: '#3178C6' },
                    { name: 'HTML', pct: '22%', color: '#E34F26' },
                    { name: 'Python', pct: '14%', color: '#3572A5' },
                    { name: 'JavaScript', pct: '10%', color: '#F7DF1E' },
                    { name: 'CSS', pct: '6%', color: '#563D7C' },
                  ].map((lang, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        borderRadius: 6,
                        background: '#111111',
                        border: '1px solid #21262D',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontFamily: "'Geist', sans-serif",
                          fontSize: 15,
                          fontWeight: 600,
                          color: '#F5F5F5',
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: lang.color,
                          }}
                        />
                        <span>{lang.name}</span>
                      </div>
                      <div
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 20,
                          fontWeight: 700,
                          color: '#8B949E',
                        }}
                      >
                        {lang.pct}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FLASH D (170 - 186f): Activity & Heatmap */}
            {frame >= 170 && frame < 186 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 22,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: '#626A75',
                      textTransform: 'uppercase',
                    }}
                  >
                    CONTRIBUTION MATRIX & STREAK AUDIT
                  </div>
                  <div
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 13,
                      color: '#FF8A00',
                      fontWeight: 600,
                    }}
                  >
                    Current Streak: 1 day
                  </div>
                </div>

                {/* Abstracted GitHub Contribution Grid (48 cols x 7 rows) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(48, 1fr)',
                    gridTemplateRows: 'repeat(7, 1fr)',
                    gap: 4,
                    padding: 16,
                    borderRadius: 6,
                    background: '#111111',
                    border: '1px solid #21262D',
                  }}
                >
                  {Array.from({ length: 48 * 7 }).map((_, idx) => {
                    // Realistically sparse GitHub grid
                    const isGreen = (idx * 17 + 5) % 11 === 0;
                    const isDarkGreen = (idx * 23) % 7 === 0;
                    const isRecent = idx > 48 * 7 - 5;
                    const bg = isRecent
                      ? '#22C55E'
                      : isGreen
                      ? '#26A641'
                      : isDarkGreen
                      ? '#0E4429'
                      : '#161B22';

                    return (
                      <div
                        key={idx}
                        style={{
                          width: '100%',
                          aspectRatio: '1',
                          borderRadius: 2,
                          backgroundColor: bg,
                        }}
                      />
                    );
                  })}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 14,
                    color: '#8B949E',
                  }}
                >
                  <span>Total Commits: 90</span>
                  <span>Stars: 65</span>
                  <span>Pull Requests: 12</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= PHASE 4: SUDDEN FREEZE (186 - 220f) ================= */}
      {frame >= 186 && frame < 220 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            zIndex: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 48,
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#F5F5F5',
            }}
          >
            We decided to investigate.
          </span>
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor: '#FF8A00',
            }}
          />
        </div>
      )}

      {/* ================= PHASE 5: HARD CUT — GITROASTED LOGO (220 - 258f) ================= */}
      {frame >= 220 && frame < 258 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            transform: `scale(${logoScale})`,
            zIndex: 30,
          }}
        >
          <Logo size={110} showText={true} />

          <div
            style={{
              marginTop: 10,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#626A75',
              textTransform: 'uppercase',
            }}
          >
            BRUTAL FEEDBACK. BETTER DEVELOPERS.
          </div>
        </div>
      )}

      {/* ================= PHASE 6: FAST ORANGE LINE WIPE (258 - 270f) ================= */}
      {frame >= 258 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          {/* Wiped black panel behind line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: wipeX,
              height: '100%',
              backgroundColor: '#050505',
            }}
          />

          {/* Razor-sharp GitRoasted orange wipe beam */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: Math.max(0, wipeX - 3),
              width: 4,
              height: '100%',
              backgroundColor: '#FF8A00',
              boxShadow: '0 0 12px #FF8A00',
            }}
          />
        </div>
      )}
    </div>
  );
};
