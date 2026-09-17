import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

export const AudioTrack: React.FC = () => {
  return (
    <>
      {/* Note: Scenes 1 through 7 (0 - 2280f) have self-contained procedurally synchronized audio cues */}

      {/* 8. Finale Final Impact (Starts at frame 2280) */}
      <Sequence from={2280} durationInFrames={90}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={2310} durationInFrames={90}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.5} />
      </Sequence>
    </>
  );
};
