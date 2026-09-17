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
import { Logo } from '../components/Logo';

export const ProductMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─────────────────────────────────────────────────────────────
  // SCENE TIMING ARCHITECTURE (Total: 360 frames / 12.0s @ 30fps)
  //
  // Shot 1 (Frames 0 - 45 | 0.0s - 1.5s):
  //   Home / Product Identity (home_page.png)
  //   Narrative Beat: "ANALYZE."
  //
  // Shot 2 (Frames 45 - 90 | 1.5s - 3.0s):
  //   GitHub Roast (roast_page.png quote)
  //   Narrative Beat: "ROAST."
  //
  // Shot 3 (Frames 90 - 135 | 3.0s - 4.5s):
  //   Quantitative Score (roast_page.png score HUD)
  //   Narrative Beat: "IMPROVE."
  //
  // Shot 4 (Frames 135 - 180 | 4.5s - 6.0s):
  //   Quick Wins Roadmap (quick_wins_page.png)
  //   Narrative Beat: "REPEAT."
  //
  // Shot 5 (Frames 180 - 225 | 6.0s - 7.5s):
  //   Support / Contact / Community Experience (home_page.png footer)
  //   Narrative Beat: "COMMUNITY & CRAFT."
  //
  // Shot 6 (Frames 225 - 270 | 7.5s - 9.0s):
  //   Quick Return to Roast — The Comedic Payoff
  //   Narrative: "YOUR GITHUB JUST GOT A LITTLE MORE HONEST."
  //   Music reaches its absolute strongest peak!
  //
  // Shot 7 (Frames 270 - 360 | 9.0s - 12.0s):
  //   ABRUPT CUT TO SILENCE (Dead silence for 3.0s)
  //   GitRoasted Logo & Tagline: "Roast your GitHub. Improve your craft."
  // ─────────────────────────────────────────────────────────────

  // Common spring generator helper for snappy editorial transitions
  const getSnapSpring = (startFrame: number) =>
    spring({
      frame: frame - startFrame,
      fps,
      config: { damping: 16, stiffness: 180, mass: 0.7 },
    });

  // ─────────────────────────────────────────────────────────────
  // SHOT MOTIONS & CAMERA PANS
  // ─────────────────────────────────────────────────────────────
  // Shot 1: Home
  const s1Spring = getSnapSpring(0);
  const s1Scale = interpolate(frame, [0, 45], [1.02, 1.10], { extrapolateRight: 'clamp' });

  // Shot 2: Roast
  const s2Spring = getSnapSpring(45);
  const s2Scale = interpolate(frame, [45, 90], [1.18, 1.28], { extrapolateRight: 'clamp' });

  // Shot 3: Score
  const s3Spring = getSnapSpring(90);
  const s3Scale = interpolate(frame, [90, 135], [1.16, 1.24], { extrapolateRight: 'clamp' });
  const s3PanX = interpolate(frame, [90, 135], [-120, -180], { extrapolateRight: 'clamp' });

  // Shot 4: Quick Wins
  const s4Spring = getSnapSpring(135);
  const s4Scale = interpolate(frame, [135, 180], [1.12, 1.20], { extrapolateRight: 'clamp' });

  // Shot 5: Community & Contact
  const s5Spring = getSnapSpring(180);
  const s5Scale = interpolate(frame, [180, 225], [1.08, 1.18], { extrapolateRight: 'clamp' });

  // Shot 6: Return to Roast
  const s6Spring = getSnapSpring(225);
  const s6Scale = interpolate(frame, [225, 270], [1.22, 1.34], { extrapolateRight: 'clamp' });

  // Shot 7: Logo Final Identity (Starts at Frame 270)
  const logoSpring = getSnapSpring(275);
  const logoScale = interpolate(logoSpring, [0, 1], [0.94, 1]);

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
          SELF-CONTAINED AUDIO ARCHITECTURE
          Music drives to its strongest peak at frame 225-270,
          then at Frame 270: ABRUPTLY CUTS TO TOTAL DEADPAN SILENCE.
          ───────────────────────────────────────────────────────────── */}
      {/* 1. Main Montage Driving Beat: Frames 0 - 270 */}
      <Sequence from={0} durationInFrames={270}>
        <Audio src={staticFile('audio/reveal_beat.wav')} volume={0.8} />
      </Sequence>

      {/* 2. Secondary Synth Swell for Peak Intensity: Frames 180 - 270 */}
      <Sequence from={180} durationInFrames={90}>
        <Audio src={staticFile('audio/bridge_energy.wav')} volume={0.65} />
      </Sequence>

      {/* 3. Transition Whooshes */}
      <Sequence from={0} durationInFrames={20}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={44} durationInFrames={20}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.45} />
      </Sequence>
      <Sequence from={89} durationInFrames={20}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.45} />
      </Sequence>
      <Sequence from={134} durationInFrames={20}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.45} />
      </Sequence>
      <Sequence from={179} durationInFrames={20}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={224} durationInFrames={20}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.6} />
      </Sequence>

      {/* 4. Rhythmic Clicks on Word Beats */}
      <Sequence from={0} durationInFrames={15}>
        <Audio src={staticFile('audio/notif_click.wav')} volume={0.45} />
      </Sequence>
      <Sequence from={45} durationInFrames={15}>
        <Audio src={staticFile('audio/click.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={90} durationInFrames={15}>
        <Audio src={staticFile('audio/tick.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={135} durationInFrames={15}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={180} durationInFrames={15}>
        <Audio src={staticFile('audio/click.wav')} volume={0.5} />
      </Sequence>

      {/* Rapid Clicks on Final Payoff Typographic Stack (225 - 270) */}
      <Sequence from={225} durationInFrames={12}>
        <Audio src={staticFile('audio/keystroke.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={236} durationInFrames={12}>
        <Audio src={staticFile('audio/keystroke.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={247} durationInFrames={12}>
        <Audio src={staticFile('audio/keystroke.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={258} durationInFrames={15}>
        <Audio src={staticFile('audio/soft_bass.wav')} volume={0.7} />
      </Sequence>

      {/* Frame 270 - 360: DEAD SILENCE. Zero audio. */}


      {/* ─────────────────────────────────────────────────────────────
          SHOT 1: HOME / PRODUCT IDENTITY (Frames 0 - 45 | 0.0s - 1.5s)
          Narrative Beat: "ANALYZE."
          ───────────────────────────────────────────────────────────── */}
      {frame >= 0 && frame < 45 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [0, 6, 42, 45], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${interpolate(s1Spring, [0, 1], [0.97, 1])})`,
          }}
        >
          {/* Editorial Word Overlay Badge */}
          <div
            style={{
              position: 'absolute',
              top: 52,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '6px 14px',
                borderRadius: 4,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                color: '#8B949E',
                letterSpacing: '0.1em',
              }}
            >
              [ 01 // INPUT ]
            </div>
            <div
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: 42,
                fontWeight: 900,
                color: '#F5F5F5',
                letterSpacing: '-0.03em',
              }}
            >
              ANALYZE<span style={{ color: '#FF8A00' }}>.</span>
            </div>
          </div>

          {/* Browser Device Frame */}
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com — AI-Powered GitHub Roast Engine"
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
              <div
                style={{
                  position: 'absolute',
                  width: 1440,
                  transform: `translate(0px, -110px) scale(${s1Scale})`,
                  transformOrigin: '720px 410px',
                }}
              >
                <Img
                  src={staticFile('home_page.png')}
                  style={{ width: 1440, height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </DeviceFrame>

          {/* Fast Horizontal Orange Wipe Edge at exit */}
          {frame >= 42 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: `${interpolate(frame, [42, 45], [0, 1920])}px`,
                background: 'linear-gradient(90deg, transparent, #FF8A00)',
                zIndex: 60,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          SHOT 2: GITHUB ROAST (Frames 45 - 90 | 1.5s - 3.0s)
          Narrative Beat: "ROAST."
          ───────────────────────────────────────────────────────────── */}
      {frame >= 45 && frame < 90 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [45, 49, 87, 90], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${interpolate(s2Spring, [0, 1], [0.97, 1])})`,
          }}
        >
          {/* Editorial Word Overlay Badge */}
          <div
            style={{
              position: 'absolute',
              top: 52,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '6px 14px',
                borderRadius: 4,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                color: '#FF8A00',
                letterSpacing: '0.1em',
              }}
            >
              [ 02 // VERDICT ]
            </div>
            <div
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: 42,
                fontWeight: 900,
                color: '#FF8A00',
                letterSpacing: '-0.03em',
              }}
            >
              ROAST.
            </div>
          </div>

          {/* Browser Device Frame */}
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com/roast/MdKasif0 — Brutal Verdict"
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
              <div
                style={{
                  position: 'absolute',
                  width: 1440,
                  transform: `translate(0px, -450px) scale(${s2Scale})`,
                  transformOrigin: '720px 480px',
                }}
              >
                <Img
                  src={staticFile('roast_page.png')}
                  style={{ width: 1440, height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </DeviceFrame>

          {/* Vertical Crop Slide Edge at exit */}
          {frame >= 87 && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: `${interpolate(frame, [87, 90], [0, 1080])}px`,
                background: '#050505',
                borderTop: '2px solid #FF8A00',
                zIndex: 60,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          SHOT 3: SCORE (Frames 90 - 135 | 3.0s - 4.5s)
          Narrative Beat: "IMPROVE."
          ───────────────────────────────────────────────────────────── */}
      {frame >= 90 && frame < 135 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [90, 94, 132, 135], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${interpolate(s3Spring, [0, 1], [0.97, 1])})`,
          }}
        >
          {/* Editorial Word Overlay Badge */}
          <div
            style={{
              position: 'absolute',
              top: 52,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '6px 14px',
                borderRadius: 4,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                color: '#8B949E',
                letterSpacing: '0.1em',
              }}
            >
              [ 03 // METRICS ]
            </div>
            <div
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: 42,
                fontWeight: 900,
                color: '#F5F5F5',
                letterSpacing: '-0.03em',
              }}
            >
              IMPROVE<span style={{ color: '#FF8A00' }}>.</span>
            </div>
          </div>

          {/* Browser Device Frame */}
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com/roast/MdKasif0 — Seriousness Score 464 / 1000"
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
              <div
                style={{
                  position: 'absolute',
                  width: 1440,
                  transform: `translate(${s3PanX}px, -140px) scale(${s3Scale})`,
                  transformOrigin: '950px 300px',
                }}
              >
                <Img
                  src={staticFile('roast_page.png')}
                  style={{ width: 1440, height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </DeviceFrame>

          {/* Kinetic Masked Slide at exit */}
          {frame >= 132 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: `${interpolate(frame, [132, 135], [0, 1920])}px`,
                background: '#0B0B0B',
                borderLeft: '2px solid #FF8A00',
                zIndex: 60,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          SHOT 4: QUICK WINS ROADMAP (Frames 135 - 180 | 4.5s - 6.0s)
          Narrative Beat: "REPEAT."
          ───────────────────────────────────────────────────────────── */}
      {frame >= 135 && frame < 180 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [135, 139, 177, 180], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${interpolate(s4Spring, [0, 1], [0.97, 1])})`,
          }}
        >
          {/* Editorial Word Overlay Badge */}
          <div
            style={{
              position: 'absolute',
              top: 52,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '6px 14px',
                borderRadius: 4,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                color: '#22C55E',
                letterSpacing: '0.1em',
              }}
            >
              [ 04 // ROADMAP ]
            </div>
            <div
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: 42,
                fontWeight: 900,
                color: '#F5F5F5',
                letterSpacing: '-0.03em',
              }}
            >
              REPEAT<span style={{ color: '#22C55E' }}>.</span>
            </div>
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
              <div
                style={{
                  position: 'absolute',
                  width: 1440,
                  transform: `translate(0px, -110px) scale(${s4Scale})`,
                  transformOrigin: '720px 400px',
                }}
              >
                <Img
                  src={staticFile('quick_wins_page.png')}
                  style={{ width: 1440, height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </DeviceFrame>

          {/* Orange Scan Line Transition at exit */}
          {frame >= 177 && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${interpolate(frame, [177, 180], [0, 1080])}px`,
                height: 4,
                background: '#FF8A00',
                boxShadow: '0 0 16px #FF8A00',
                zIndex: 60,
              }}
            />
          )}
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          SHOT 5: SUPPORT / CONTACT / COMMUNITY (Frames 180 - 225 | 6.0s - 7.5s)
          Narrative Beat: "COMMUNITY & CRAFT."
          ───────────────────────────────────────────────────────────── */}
      {frame >= 180 && frame < 225 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [180, 184, 222, 225], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${interpolate(s5Spring, [0, 1], [0.97, 1])})`,
          }}
        >
          {/* Editorial Word Overlay Badge */}
          <div
            style={{
              position: 'absolute',
              top: 52,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: '#0B0B0B',
                border: '1px solid #21262D',
                padding: '6px 14px',
                borderRadius: 4,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                color: '#8B949E',
                letterSpacing: '0.1em',
              }}
            >
              [ 05 // ECOSYSTEM ]
            </div>
            <div
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: 34,
                fontWeight: 800,
                color: '#F5F5F5',
                letterSpacing: '-0.02em',
              }}
            >
              COMMUNITY <span style={{ color: '#FF8A00' }}>&amp; CRAFT.</span>
            </div>
          </div>

          {/* Browser Device Frame */}
          <DeviceFrame
            width={1440}
            height={820}
            title="gitroasted.com — Built for Developers Who Can Handle the Heat"
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
              <div
                style={{
                  position: 'absolute',
                  width: 1440,
                  transform: `translate(0px, -1480px) scale(${s5Scale})`,
                  transformOrigin: '720px 1480px',
                }}
              >
                <Img
                  src={staticFile('home_page.png')}
                  style={{ width: 1440, height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </DeviceFrame>

          {/* Bottom verified pill */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              padding: '6px 18px',
              borderRadius: 4,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              color: '#8B949E',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#FF8A00' }}>❯</span>
            <span>GET IN TOUCH • DISCORD • GITHUB • COFFEE</span>
          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          SHOT 6: QUICK RETURN TO ROAST — THE COMEDIC PAYOFF
          (Frames 225 - 270 | 7.5s - 9.0s)
          "YOUR GITHUB JUST GOT A LITTLE MORE HONEST."
          Music reaches its absolute strongest crescendo!
          ───────────────────────────────────────────────────────────── */}
      {frame >= 225 && frame < 270 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            overflow: 'hidden',
          }}
        >
          {/* Dimmed Background Roast Screenshot for Authentic Context */}
          <div
            style={{
              position: 'absolute',
              width: 1920,
              opacity: 0.22,
              filter: 'grayscale(0.4) contrast(1.2)',
              transform: `scale(${s6Scale}) translateY(-260px)`,
              transformOrigin: 'center center',
            }}
          >
            <Img
              src={staticFile('roast_page.png')}
              style={{ width: 1920, height: 'auto', display: 'block' }}
            />
          </div>

          {/* Cinematic Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at center, rgba(5,5,5,0.7) 30%, rgba(5,5,5,0.96) 85%)',
            }}
          />

          {/* Diagnostic Monospace Badge */}
          <div
            style={{
              background: '#0B0B0B',
              border: '1px solid #FF8A00',
              padding: '6px 18px',
              borderRadius: 4,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              color: '#FF8A00',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 32,
              zIndex: 30,
            }}
          >
            VERDICT // REALITY CHECK
          </div>

          {/* Massive Typographic Payoff Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1.05,
              zIndex: 30,
              textAlign: 'center',
            }}
          >
            {/* Line 1: YOUR GITHUB */}
            {frame >= 225 && (
              <div
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  color: '#8B949E',
                  letterSpacing: '-0.03em',
                  transform: `scale(${interpolate(
                    spring({
                      frame: frame - 225,
                      fps,
                      config: { damping: 14, stiffness: 220 },
                    }),
                    [0, 1],
                    [0.92, 1]
                  )})`,
                }}
              >
                YOUR GITHUB
              </div>
            )}

            {/* Line 2: JUST GOT */}
            {frame >= 236 && (
              <div
                style={{
                  fontSize: 74,
                  fontWeight: 900,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  color: '#F5F5F5',
                  letterSpacing: '-0.03em',
                  marginTop: 6,
                  transform: `scale(${interpolate(
                    spring({
                      frame: frame - 236,
                      fps,
                      config: { damping: 14, stiffness: 220 },
                    }),
                    [0, 1],
                    [0.92, 1]
                  )})`,
                }}
              >
                JUST GOT
              </div>
            )}

            {/* Line 3: A LITTLE */}
            {frame >= 247 && (
              <div
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  color: '#8B949E',
                  letterSpacing: '-0.03em',
                  marginTop: 6,
                  transform: `scale(${interpolate(
                    spring({
                      frame: frame - 247,
                      fps,
                      config: { damping: 14, stiffness: 220 },
                    }),
                    [0, 1],
                    [0.92, 1]
                  )})`,
                }}
              >
                A LITTLE
              </div>
            )}

            {/* Line 4: MORE HONEST. */}
            {frame >= 258 && (
              <div
                style={{
                  fontSize: 90,
                  fontWeight: 900,
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  color: '#FF8A00',
                  letterSpacing: '-0.03em',
                  marginTop: 8,
                  transform: `scale(${interpolate(
                    spring({
                      frame: frame - 258,
                      fps,
                      config: { damping: 12, stiffness: 240 },
                    }),
                    [0, 1],
                    [0.90, 1]
                  )})`,
                }}
              >
                MORE HONEST.
              </div>
            )}
          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────────────────
          SHOT 7: ABRUPT CUT TO SILENCE & LOGO IDENTITY
          (Frames 270 - 360 | 9.0s - 12.0s)
          Music is abruptly CUT at frame 270.
          TOTAL DEADPAN SILENCE for ~2.5+ seconds.
          Logo enters cleanly at frame 275 and holds.
          ───────────────────────────────────────────────────────────── */}
      {frame >= 270 && (
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
          {frame >= 275 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 28,
                transform: `scale(${logoScale})`,
                opacity: interpolate(logoSpring, [0, 0.3], [0, 1]),
              }}
            >
              {/* Flame Mark + Brand Name Lockup */}
              <Logo size={96} showText={true} />

              {/* Exact Tagline From Product: Roast your GitHub. Improve your craft. */}
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#8B949E',
                  letterSpacing: '0.06em',
                  textAlign: 'center',
                }}
              >
                Roast your GitHub. Improve your craft.
              </div>

              {/* Minimal Terminal Prompt Pill */}
              <div
                style={{
                  marginTop: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 22px',
                  borderRadius: 6,
                  background: '#0B0B0B',
                  border: '1px solid #21262D',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 14,
                  color: '#F5F5F5',
                }}
              >
                <span style={{ color: '#FF8A00' }}>❯</span>
                <span>gitroasted.com</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
