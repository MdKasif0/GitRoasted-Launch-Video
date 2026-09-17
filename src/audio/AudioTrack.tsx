import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

export const AudioTrack: React.FC = () => {
  return (
    <>
      {/* Note: Scenes 1, 2, 3, 4, and 5 (0 - 1560f) have self-contained procedurally synchronized audio cues */}

      {/* 6. Quick Wins Scene Chime (Starts at frame 1560) */}
      <Sequence from={1560} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={1630} durationInFrames={90}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.7} />
      </Sequence>
      {[1680, 1720, 1760].map((f, i) => (
        <Sequence key={`win-${i}`} from={f} durationInFrames={15}>
          <Audio src={staticFile('audio/click.wav')} volume={0.4} />
        </Sequence>
      ))}

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
