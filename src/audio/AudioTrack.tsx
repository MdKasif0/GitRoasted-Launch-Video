import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

export const AudioTrack: React.FC = () => {
  return (
    <>
      {/* Note: Scenes 1 and 2 (0 - 600f) have self-contained procedurally synchronized audio cues */}

      {/* 3. Reveal Flame Impact (Starts at frame 600) */}
      <Sequence from={600} durationInFrames={90}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.75} />
      </Sequence>
      {/* Typing into input bar */}
      {[690, 696, 702, 708, 714, 720, 726, 732].map((f, i) => (
        <Sequence key={i} from={f} durationInFrames={10}>
          <Audio src={staticFile('audio/keystroke.wav')} volume={0.45} />
        </Sequence>
      ))}
      {/* Click Roast Me */}
      <Sequence from={780} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={790} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.6} />
      </Sequence>

      {/* 4. The Roast Scene Impact (Starts at frame 870) */}
      <Sequence from={870} durationInFrames={90}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.7} />
      </Sequence>
      {/* Roast punchlines */}
      <Sequence from={990} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={1110} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.5} />
      </Sequence>

      {/* 5. Score Scene: Rollup ticks & impact (Starts at frame 1260) */}
      <Sequence from={1260} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      {[1275, 1285, 1295, 1305, 1315, 1325].map((f, i) => (
        <Sequence key={`tick-${i}`} from={f} durationInFrames={10}>
          <Audio src={staticFile('audio/tick.wav')} volume={0.5} />
        </Sequence>
      ))}
      <Sequence from={1330} durationInFrames={60}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.6} />
      </Sequence>

      {/* 6. Quick Wins Scene Chime (Starts at frame 1620) */}
      <Sequence from={1620} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={1690} durationInFrames={90}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.7} />
      </Sequence>
      {[1740, 1780, 1820].map((f, i) => (
        <Sequence key={`win-${i}`} from={f} durationInFrames={15}>
          <Audio src={staticFile('audio/click.wav')} volume={0.4} />
        </Sequence>
      ))}

      {/* 7. Product Montage rapid cuts (Starts at frame 1980) */}
      <Sequence from={1980} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={2100} durationInFrames={60}>
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
