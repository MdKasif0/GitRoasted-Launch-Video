import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

export const AudioTrack: React.FC = () => {
  return (
    <>
      {/* 1. Cold Open Atmosphere */}
      <Sequence from={0} durationInFrames={240}>
        <Audio src={staticFile('audio/drone.wav')} volume={0.4} />
      </Sequence>
      {/* Keystrokes for cold open lines */}
      <Sequence from={15} durationInFrames={15}>
        <Audio src={staticFile('audio/keystroke.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={65} durationInFrames={15}>
        <Audio src={staticFile('audio/keystroke.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={125} durationInFrames={15}>
        <Audio src={staticFile('audio/keystroke.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={185} durationInFrames={15}>
        <Audio src={staticFile('audio/keystroke.wav')} volume={0.6} />
      </Sequence>

      {/* 2. Problem Scene Snaps */}
      <Sequence from={240} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={295} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={350} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={410} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>

      {/* 3. Reveal Flame Impact */}
      <Sequence from={510} durationInFrames={90}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.75} />
      </Sequence>
      {/* Typing into input bar */}
      {[630, 636, 642, 648, 654, 660, 666, 672].map((f, i) => (
        <Sequence key={i} from={f} durationInFrames={10}>
          <Audio src={staticFile('audio/keystroke.wav')} volume={0.45} />
        </Sequence>
      ))}
      {/* Click Roast Me */}
      <Sequence from={740} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={750} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.6} />
      </Sequence>

      {/* 4. The Roast Scene Impact */}
      <Sequence from={810} durationInFrames={90}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.7} />
      </Sequence>
      {/* Roast punchlines */}
      <Sequence from={930} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={1050} durationInFrames={30}>
        <Audio src={staticFile('audio/click.wav')} volume={0.5} />
      </Sequence>

      {/* 5. Score Scene: Rollup ticks & impact */}
      <Sequence from={1200} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      {[1215, 1225, 1235, 1245, 1255, 1265].map((f, i) => (
        <Sequence key={`tick-${i}`} from={f} durationInFrames={10}>
          <Audio src={staticFile('audio/tick.wav')} volume={0.5} />
        </Sequence>
      ))}
      <Sequence from={1270} durationInFrames={60}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.6} />
      </Sequence>

      {/* 6. Quick Wins Scene Chime */}
      <Sequence from={1560} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={1630} durationInFrames={90}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.7} />
      </Sequence>
      {[1680, 1720, 1760, 1800, 1840].map((f, i) => (
        <Sequence key={`win-${i}`} from={f} durationInFrames={15}>
          <Audio src={staticFile('audio/click.wav')} volume={0.4} />
        </Sequence>
      ))}

      {/* 7. Product Montage rapid cuts */}
      <Sequence from={1920} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={2040} durationInFrames={60}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.5} />
      </Sequence>

      {/* 8. Finale Final Impact */}
      <Sequence from={2220} durationInFrames={90}>
        <Audio src={staticFile('audio/impact.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={2260} durationInFrames={90}>
        <Audio src={staticFile('audio/chime.wav')} volume={0.5} />
      </Sequence>
    </>
  );
};
