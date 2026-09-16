import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

export const AudioTrack: React.FC = () => {
  return (
    <>
      {/* Note: Scenes 1, 2, 3, and 4 (0 - 1290f) have self-contained procedurally synchronized audio cues */}

      {/* 5. Score Scene: Rollup ticks & impact (Starts at frame 1290) */}
      <Sequence from={1290} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      {[1305, 1315, 1325, 1335, 1345, 1355].map((f, i) => (
        <Sequence key={`tick-${i}`} from={f} durationInFrames={10}>
          <Audio src={staticFile('audio/tick.wav')} volume={0.5} />
        </Sequence>
      ))}
      <Sequence from={1360} durationInFrames={60}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.6} />
      </Sequence>

      {/* 6. Quick Wins Scene Chime (Starts at frame 1650) */}
      <Sequence from={1650} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={1720} durationInFrames={90}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.7} />
      </Sequence>
      {[1770, 1810, 1850].map((f, i) => (
        <Sequence key={`win-${i}`} from={f} durationInFrames={15}>
          <Audio src={staticFile('audio/click.wav')} volume={0.4} />
        </Sequence>
      ))}

      {/* 7. Product Montage rapid cuts (Starts at frame 2010) */}
      <Sequence from={2010} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={2110} durationInFrames={60}>
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
