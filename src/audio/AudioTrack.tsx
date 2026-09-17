import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

export const AudioTrack: React.FC = () => {
  return (
    <>
      {/* Note: Scenes 1 through 6 (0 - 1920f) have self-contained procedurally synchronized audio cues */}

      {/* 7. Product Montage rapid cuts (Starts at frame 1920) */}
      <Sequence from={1920} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={2020} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>

      {/* 8. Finale Final Impact (Starts at frame 2220) */}
      <Sequence from={2220} durationInFrames={90}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={2260} durationInFrames={90}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.5} />
      </Sequence>
    </>
  );
};
