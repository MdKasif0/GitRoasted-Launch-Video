import React from 'react';
import { Audio, Sequence, useCurrentFrame } from 'remotion';
import { AUDIO } from './audioRegistry';
import { AUDIO_CUES, getMusicVolume } from './audioTimeline';

/**
 * Professional Centralized Audio Architecture for GitRoasted Launch Film.
 *
 * Implements:
 * 1. Single master instrumental music track (music_main.mp3) with dynamic volume shaping.
 * 2. 47 frame-exact synchronized SFX cues mapped to visual events.
 * 3. Intentional deadpan silence blocks (e.g. "THAT FELT PERSONAL.", "AND SOMEHOW...").
 * 4. Automatic audio ducking (-2 to -4 dB) during prominent text and UI impacts.
 * 5. Full resolution hold: music fades out by frame 2340 (78.0s), holding 5.3+ seconds in clean silence.
 */
export const AudioTrack: React.FC = () => {
  const currentFrame = useCurrentFrame();

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. MASTER MUSIC BED: audio/music_main.mp3 (Frames 0 - 2340)
          ───────────────────────────────────────────────────────────── */}
      <Sequence from={0} durationInFrames={2340}>
        <Audio
          src={AUDIO.musicMain}
          volume={(f) => getMusicVolume(f)}
        />
      </Sequence>

      {/* ─────────────────────────────────────────────────────────────
          2. SYNCHRONIZED SFX CUELAYER (Frames 0 - 2340)
          All visual action triggers a corresponding, restrained sound.
          Frames 2340 - 2550 contain zero SFX (pure clean silence).
          ───────────────────────────────────────────────────────────── */}
      {AUDIO_CUES.map((cue) => (
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
