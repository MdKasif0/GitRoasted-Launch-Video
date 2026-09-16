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
import { DeviceFrame } from '../components/DeviceFrame';
import { ScreenshotReveal } from '../components/ScreenshotReveal';

export const Roast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle camera shake on the comedic impact at frame 180 (strictly < 2px)
  const isShaking = frame >= 180 && frame < 194;
  const shakeDecay = isShaking ? Math.max(0, 1.4 - (frame - 180) * 0.1) : 0;
  const shakeX = isShaking ? Math.sin((frame - 180) * 1.8) * shakeDecay : 0;
  const shakeY = isShaking ? Math.cos((frame - 180) * 2.3) * (shakeDecay * 0.8) : 0;

  // Phase 1 & 2 Camera dynamics (Frames 0 - 125)
  // Starts at overview, then slow pushes in and crops directly onto the first roast line
  const phase1Scale = interpolate(
    frame,
    [0, 45, 72, 125],
    [1.02, 1.15, 1.62, 1.65],
    { extrapolateRight: 'clamp' }
  );
  const phase1PanY = interpolate(
    frame,
    [0, 45, 72, 125],
    [-180, -300, -665, -670],
    { extrapolateRight: 'clamp' }
  );

  // Phase 4 Camera dynamics (Frames 180 - 240)
  // Extreme close-up crop on the second roast line & diagnosis
  const phase4Scale = interpolate(
    frame,
    [180, 240],
    [1.68, 1.74],
    { extrapolateRight: 'clamp' }
  );
  const phase4PanY = interpolate(
    frame,
    [180, 240],
    [-840, -850],
    { extrapolateRight: 'clamp' }
  );

  // Phase 6 Transition to Score (Frames 340 - 360)
  const scoreTransitionPush = interpolate(
    frame,
    [340, 360],
    [1.0, 1.15],
    { extrapolateRight: 'clamp' }
  );
  const scoreTransitionOpacity = interpolate(
    frame,
    [348, 360],
    [1, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#050505',
        position: 'relative',
        overflow: 'hidden',
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          AUDIO ARCHITECTURE (Self-contained with precise comedic silence)
          ───────────────────────────────────────────────────────────── */}
      {/* 1. Ambience Part 1: Frames 0 - 72 */}
      <Sequence from={0} durationInFrames={72}>
        <Audio src={staticFile('audio/roast_ambience.wav')} volume={0.45} />
      </Sequence>

      {/* 2. COMEDIC SILENCE: Frames 72 - 92 (approx 666ms)
             -> NO AUDIO AT ALL. Complete stillness while viewer reads. */}

      {/* 3. The Tiny Click breaking silence at Frame 92 */}
      <Sequence from={92} durationInFrames={15}>
        <Audio src={staticFile('audio/click.wav')} volume={0.5} />
      </Sequence>

      {/* 4. Ambience Part 2 resumes with subtle bass hit: Frames 94 - 125 */}
      <Sequence from={94} durationInFrames={31}>
        <Audio src={staticFile('audio/soft_bass.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={94} durationInFrames={31}>
        <Audio
          src={staticFile('audio/roast_ambience.wav')}
          startFrom={94}
          volume={0.4}
        />
      </Sequence>

      {/* 5. Cut to Black Audio: Soft tape stop cutoff at Frame 125 */}
      <Sequence from={125} durationInFrames={20}>
        <Audio src={staticFile('audio/tape_stop.wav')} volume={0.35} />
      </Sequence>

      {/* 6. Cut back to UI at Frame 180: Sub bass hit + crisp click */}
      <Sequence from={180} durationInFrames={40}>
        <Audio src={staticFile('audio/soft_bass.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={180} durationInFrames={15}>
        <Audio src={staticFile('audio/notif_click.wav')} volume={0.45} />
      </Sequence>

      {/* 7. "WE CHECKED THE DATA." at Frame 240 */}
      <Sequence from={240} durationInFrames={35}>
        <Audio src={staticFile('audio/soft_bass.wav')} volume={0.5} />
      </Sequence>

      {/* 8. "IT CHECKED BACK." at Frame 268 */}
      <Sequence from={268} durationInFrames={20}>
        <Audio src={staticFile('audio/keystroke.wav')} volume={0.55} />
      </Sequence>

      {/* 9. "Okay. You have been roasted." at Frame 315 */}
      <Sequence from={315} durationInFrames={20}>
        <Audio src={staticFile('audio/notif_click.wav')} volume={0.35} />
      </Sequence>

      {/* 10. Whoosh transition into the Score scene at Frame 342 */}
      <Sequence from={342} durationInFrames={25}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>


      {/* ─────────────────────────────────────────────────────────────
          PHASE 1 & 2: UI Appears & Zoom into Roast Line (Frames 0 - 125)
          ───────────────────────────────────────────────────────────── */}
      {frame < 125 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {/* Top metadata pill */}
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
            <span>GitRoasted AI Verdict // @MdKasif0</span>
            <span style={{ color: '#626A75' }}>•</span>
            <span style={{ color: '#F5F5F5' }}>42 Repositories Audited</span>
          </div>

          {/* Device Frame containing actual roast_page.png */}
          <div
            style={{
              transform: `scale(${interpolate(
                spring({ frame, fps, config: { damping: 22, stiffness: 130 } }),
                [0, 1],
                [0.96, 1]
              )})`,
            }}
          >
            <DeviceFrame
              width={1440}
              height={820}
              title="gitroasted.com/roast/MdKasif0 — The Roast"
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <ScreenshotReveal
                  src="roast_page.png"
                  scale={phase1Scale}
                  panY={phase1PanY}
                  borderRadius={0}
                  boxShadow="none"
                  border="none"
                />

                {/* Subtle orange accent spotlight box on the first roast sentence */}
                {frame >= 55 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 310,
                      left: 60,
                      width: 1320,
                      height: 200,
                      border: '1px solid #FF8A00',
                      borderRadius: 4,
                      background: 'rgba(255, 138, 0, 0.04)',
                      boxShadow: '0 0 24px rgba(255, 138, 0, 0.12)',
                      pointerEvents: 'none',
                      opacity: interpolate(
                        frame,
                        [55, 68],
                        [0, 1],
                        { extrapolateRight: 'clamp' }
                      ),
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: 16,
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
                      Devastating Observation
                    </div>
                  </div>
                )}
              </div>
            </DeviceFrame>
          </div>

          {/* Comedic silence indicator pill (Frames 72 - 92) */}
          {frame >= 72 && frame < 92 && (
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '6px 16px',
                borderRadius: 4,
                color: '#626A75',
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                opacity: 0.8,
              }}
            >
              [ ... ]
            </div>
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 3: Cut to Black — "THAT FELT PERSONAL." (Frames 125 - 180)
          ───────────────────────────────────────────────────────────── */}
      {frame >= 125 && frame < 180 && (
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
          {/* Monospace tag */}
          <div
            style={{
              color: '#8B949E',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Audit Finding // Section 01
          </div>

          {/* Large Deadpan Headline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: '#F5F5F5',
              fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textAlign: 'center',
            }}
          >
            <span>THAT FELT PERSONAL.</span>
            {/* Blinking Orange Cursor */}
            <span
              style={{
                display: 'inline-block',
                width: 14,
                height: 48,
                backgroundColor: '#FF8A00',
                opacity: Math.floor((frame - 125) / 10) % 2 === 0 ? 1 : 0,
              }}
            />
          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 4: Cut Back to UI & Extreme Close-up (Frames 180 - 240)
          ───────────────────────────────────────────────────────────── */}
      {frame >= 180 && frame < 240 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Device Frame with extreme close-up on second roast line */}
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com/roast/MdKasif0 — The Roast"
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <ScreenshotReveal
                src="roast_page.png"
                scale={phase4Scale}
                panY={phase4PanY}
                borderRadius={0}
                boxShadow="none"
                border="none"
              />

              {/* Precise spotlight framing around "...README files read like a toddler's diary" */}
              <div
                style={{
                  position: 'absolute',
                  top: '38%',
                  left: '10%',
                  width: '80%',
                  height: '24%',
                  border: '1px solid #FF8A00',
                  borderRadius: 4,
                  background: 'rgba(255, 138, 0, 0.04)',
                  boxShadow: '0 0 20px rgba(255, 138, 0, 0.12)',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: 16,
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
                  DIAGNOSIS
                </div>
              </div>
            </div>
          </DeviceFrame>

          {/* Grounded Monospace Callout Badge */}
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
              gap: 10,
            }}
          >
            <span style={{ color: '#FF8A00' }}>Observation:</span>
            <span>65 stars across 42 repositories.</span>
            <span style={{ color: '#626A75' }}>//</span>
            <span style={{ color: '#8B949E' }}>README reads like a toddler's diary.</span>
          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 5: "WE CHECKED THE DATA." -> Pause -> "IT CHECKED BACK."
          (Frames 240 - 315)
          ───────────────────────────────────────────────────────────── */}
      {frame >= 240 && frame < 315 && (
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
          {/* Subtle background telemetry grid representing real data */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              opacity: 0.05,
              padding: '60px 100px',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              color: '#8B949E',
              pointerEvents: 'none',
            }}
          >
            <div>repo_count: 42 | stars: 65 | followers: 12 | commits_last_year: 47</div>
            <div>impact_metric: 137/250 | consistency: 29/200 | quality_rating: 80/150</div>
            <div>readme_analysis: "coming soon" detected in 18 repositories</div>
            <div>git_remote: origin/main | direct_pushes_detected: 89%</div>
          </div>

          {/* Audit Badge */}
          <div
            style={{
              padding: '6px 16px',
              borderRadius: 4,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              color: '#8B949E',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            System Audit // Fact-Check
          </div>

          {/* Line 1: "WE CHECKED THE DATA." */}
          <div
            style={{
              color: '#F5F5F5',
              fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              opacity: interpolate(frame, [240, 248], [0, 1], { extrapolateRight: 'clamp' }),
              transform: `translateY(${interpolate(
                frame,
                [240, 248],
                [10, 0],
                { extrapolateRight: 'clamp' }
              )}px)`,
            }}
          >
            WE CHECKED THE DATA.
          </div>

          {/* Comedic Pause between 248 and 268 */}

          {/* Line 2: "IT CHECKED BACK." */}
          {frame >= 268 && (
            <div
              style={{
                marginTop: 18,
                color: '#FF8A00',
                fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                opacity: interpolate(frame, [268, 274], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `scale(${interpolate(
                  spring({ frame: frame - 268, fps, config: { damping: 18, stiffness: 140 } }),
                  [0, 1],
                  [0.96, 1]
                )})`,
              }}
            >
              IT CHECKED BACK.
            </div>
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          PHASE 6: "Okay. You have been roasted." -> Transition into Score
          (Frames 315 - 360)
          ───────────────────────────────────────────────────────────── */}
      {frame >= 315 && (
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
            opacity: scoreTransitionOpacity,
            transform: `scale(${scoreTransitionPush})`,
          }}
        >
          {/* Understated deadpan resolution */}
          <div
            style={{
              color: '#8B949E',
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              marginBottom: 10,
              opacity: interpolate(frame, [315, 322], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            Okay.
          </div>

          <div
            style={{
              color: '#F5F5F5',
              fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
              fontSize: 50,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textAlign: 'center',
              opacity: interpolate(frame, [324, 332], [0, 1], { extrapolateRight: 'clamp' }),
              transform: `translateY(${interpolate(
                frame,
                [324, 332],
                [8, 0],
                { extrapolateRight: 'clamp' }
              )}px)`,
            }}
          >
            You have been roasted.
          </div>

          {/* Next scene teaser: Subtle Orange Indicator */}
          {frame >= 338 && (
            <div
              style={{
                marginTop: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 18px',
                borderRadius: 20,
                background: '#0B0B0B',
                border: '1px solid #21262D',
                color: '#FF8A00',
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                opacity: interpolate(frame, [338, 345], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <span>THE NUMBERS DON'T LIE</span>
              <span>➔</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
