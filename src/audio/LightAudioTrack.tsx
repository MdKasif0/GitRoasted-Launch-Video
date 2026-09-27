import React from 'react';
import { Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';

interface LightAudioCue {
  id: string;
  frame: number;
  durationInFrames: number;
  file: string;
  volume: number;
}

const LIGHT_AUDIO_CUES: LightAudioCue[] = [
  // Scene 1: Mobile Hook (0 - 240)
  { id: 's1-notif', frame: 20, durationInFrames: 30, file: staticFile('audio/notification_soft.wav'), volume: 0.55 },
  { id: 's1-reply', frame: 80, durationInFrames: 20, file: staticFile('audio/ui_click_bright.mp3'), volume: 0.45 },
  { id: 's1-pullback', frame: 120, durationInFrames: 40, file: staticFile('audio/whoosh_fast.wav'), volume: 0.5 },
  { id: 's1-telemetry', frame: 175, durationInFrames: 35, file: staticFile('audio/tech_slide.wav'), volume: 0.4 },

  // Scene 2: Developer Callouts (240 - 420)
  { id: 's2-trans', frame: 240, durationInFrames: 35, file: staticFile('audio/whoosh_deep.wav'), volume: 0.45 },
  { id: 's2-c1', frame: 260, durationInFrames: 25, file: staticFile('audio/soft_impact.wav'), volume: 0.45 },
  { id: 's2-c2', frame: 310, durationInFrames: 25, file: staticFile('audio/soft_impact.wav'), volume: 0.45 },
  { id: 's2-c3', frame: 360, durationInFrames: 30, file: staticFile('audio/bass_impact.wav'), volume: 0.45 },

  // Scene 3: Isometric Bars (420 - 540)
  { id: 's3-swoosh', frame: 420, durationInFrames: 35, file: staticFile('audio/tech_slide.wav'), volume: 0.45 },
  { id: 's3-b1', frame: 440, durationInFrames: 15, file: staticFile('audio/tick.wav'), volume: 0.35 },
  { id: 's3-b2', frame: 450, durationInFrames: 15, file: staticFile('audio/tick.wav'), volume: 0.35 },
  { id: 's3-b3', frame: 460, durationInFrames: 15, file: staticFile('audio/tick.wav'), volume: 0.35 },
  { id: 's3-b4', frame: 470, durationInFrames: 15, file: staticFile('audio/tick.wav'), volume: 0.35 },
  { id: 's3-b5', frame: 480, durationInFrames: 15, file: staticFile('audio/tick.wav'), volume: 0.35 },
  { id: 's3-metric', frame: 500, durationInFrames: 30, file: staticFile('audio/ui_ping.mp3'), volume: 0.45 },

  // Scene 4: Hero Tile Matrix (540 - 630)
  { id: 's4-slam', frame: 540, durationInFrames: 35, file: staticFile('audio/soft_impact.wav'), volume: 0.55 },
  { id: 's4-dof', frame: 575, durationInFrames: 25, file: staticFile('audio/whoosh_short.wav'), volume: 0.35 },

  // Scene 5: Layered Homepage (630 - 720)
  { id: 's5-slide', frame: 630, durationInFrames: 35, file: staticFile('audio/tech_slide.wav'), volume: 0.45 },
  { id: 's5-pop', frame: 660, durationInFrames: 25, file: staticFile('audio/ui_click_bright.mp3'), volume: 0.4 },

  // Scene 6: Typography Blueprint (720 - 780)
  { id: 's6-cut', frame: 720, durationInFrames: 30, file: staticFile('audio/whoosh_fast.wav'), volume: 0.5 },
  { id: 's6-snap', frame: 740, durationInFrames: 20, file: staticFile('audio/tick.wav'), volume: 0.4 },

  // Scene 7: Vortex Tunnel (780 - 870)
  { id: 's7-entry', frame: 780, durationInFrames: 45, file: staticFile('audio/whoosh_deep.wav'), volume: 0.6 },
  { id: 's7-accel', frame: 830, durationInFrames: 35, file: staticFile('audio/whoosh_fast.wav'), volume: 0.5 },

  // Scene 8: Score Dial Turntable (870 - 990)
  { id: 's8-impact', frame: 870, durationInFrames: 30, file: staticFile('audio/soft_impact.wav'), volume: 0.5 },
  { id: 's8-rise', frame: 885, durationInFrames: 50, file: staticFile('audio/score_rise.wav'), volume: 0.4 },
  { id: 's8-lock', frame: 940, durationInFrames: 40, file: staticFile('audio/score_impact.wav'), volume: 0.6 },

  // Scene 9: Annotated Report (990 - 1050)
  { id: 's9-paper', frame: 990, durationInFrames: 30, file: staticFile('audio/whoosh_short.wav'), volume: 0.4 },
  { id: 's9-marker', frame: 1005, durationInFrames: 30, file: staticFile('audio/tech_slide.wav'), volume: 0.45 },
  { id: 's9-stamp', frame: 1025, durationInFrames: 30, file: staticFile('audio/soft_impact.wav'), volume: 0.5 },

  // Scene 10: Quick Wins Interactive (1050 - 1170)
  { id: 's10-in', frame: 1050, durationInFrames: 35, file: staticFile('audio/tech_slide.wav'), volume: 0.45 },
  { id: 's10-click', frame: 1110, durationInFrames: 20, file: staticFile('audio/click.wav'), volume: 0.55 },
  { id: 's10-chime', frame: 1120, durationInFrames: 40, file: staticFile('audio/chime.wav'), volume: 0.5 },

  // Scene 11: Floating Metric Pills (1170 - 1260)
  { id: 's11-whoosh', frame: 1170, durationInFrames: 35, file: staticFile('audio/whoosh.wav'), volume: 0.45 },
  { id: 's11-p1', frame: 1180, durationInFrames: 20, file: staticFile('audio/ui_click_soft.wav'), volume: 0.4 },
  { id: 's11-p2', frame: 1190, durationInFrames: 20, file: staticFile('audio/ui_click_soft.wav'), volume: 0.4 },
  { id: 's11-p3', frame: 1200, durationInFrames: 20, file: staticFile('audio/ui_click_soft.wav'), volume: 0.4 },

  // Scene 12: Final CTA & Brand Lockup (1260 - 1380)
  { id: 's12-cta', frame: 1260, durationInFrames: 35, file: staticFile('audio/soft_impact.wav'), volume: 0.5 },
  { id: 's12-pulse', frame: 1295, durationInFrames: 25, file: staticFile('audio/click.wav'), volume: 0.45 },
  { id: 's12-brand', frame: 1320, durationInFrames: 60, file: staticFile('audio/logo_chime.wav'), volume: 0.65 },
];

export const LightAudioTrack: React.FC = () => {
  const currentFrame = useCurrentFrame();

  // Dynamic music bed volume: gentle fade-in, steady energetic bed, smooth fade out at finale
  const musicVolume = (frame: number) => {
    return interpolate(
      frame,
      [0, 30, 1320, 1375],
      [0.05, 0.38, 0.38, 0.0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
  };

  return (
    <>
      {/* MASTER MUSIC BED: 1380 frames (46.0s) */}
      <Sequence from={0} durationInFrames={1380}>
        <Audio
          src={staticFile('audio/music_main.mp3')}
          volume={(f) => musicVolume(f)}
        />
      </Sequence>

      {/* SYNCHRONIZED SFX CUELAYER */}
      {LIGHT_AUDIO_CUES.map((cue) => (
        <Sequence
          key={cue.id}
          from={cue.frame}
          durationInFrames={cue.durationInFrames}
        >
          <Audio src={cue.file} volume={cue.volume} />
        </Sequence>
      ))}
    </>
  );
};
