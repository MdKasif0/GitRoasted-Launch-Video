import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const SegmentedScoreBar: React.FC<{
  progress: number; // 0 to 1
  totalSegments?: number;
}> = ({ progress, totalSegments = 10 }) => {
  const activeSegments = progress * totalSegments;

  return (
    <div style={{ display: 'flex', gap: 5, width: '100%', maxWidth: 300 }}>
      {Array.from({ length: totalSegments }).map((_, i) => {
        const isFilled = i < Math.floor(activeSegments);
        const isPartial = i === Math.floor(activeSegments);
        const partialFrac = activeSegments - Math.floor(activeSegments);

        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 3,
              background: '#161B22',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {isFilled && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#FF8A00',
                }}
              />
            )}
            {isPartial && (
              <div
                style={{
                  width: `${partialFrac * 100}%`,
                  height: '100%',
                  background: '#FF8A00',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ScoreCounter: React.FC<{
  startScore?: number;
  endScore?: number;
  startFrame?: number;
  durationInFrames?: number;
  fontSize?: number;
}> = ({
  startScore = 0,
  endScore = 464,
  startFrame = 0,
  durationInFrames = 40,
  fontSize = 90,
}) => {
  const frame = useCurrentFrame();
  const currentScore = Math.floor(
    interpolate(
      frame,
      [startFrame, startFrame + durationInFrames],
      [startScore, endScore],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    )
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 12,
        fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 800,
          color: '#FF8A00',
          letterSpacing: '-0.04em',
        }}
      >
        {currentScore}
      </span>
      <span
        style={{
          fontSize: fontSize * 0.38,
          fontWeight: 500,
          color: '#8B949E',
          letterSpacing: '-0.02em',
        }}
      >
        / 1000
      </span>
    </div>
  );
};

export const PotentialScoreTrack: React.FC<{
  current: number; // e.g. 463
  potential: number; // e.g. 598
  max?: number;
  progress?: number; // 0 to 1
}> = ({ current, potential, max = 1000, progress = 1 }) => {
  const currentPct = (current / max) * 100;
  const potentialPct = (potential / max) * 100;
  const animatedPotentialPct = currentPct + (potentialPct - currentPct) * progress;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 600,
        height: 10,
        background: '#161B22',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Potential Boost Area */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${animatedPotentialPct}%`,
          background: '#22C55E',
          borderRadius: 4,
          transition: 'width 0.1s ease',
        }}
      />
      {/* Current Core Area */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${currentPct}%`,
          background: '#FF8A00',
          borderRadius: '4px 0 0 4px',
        }}
      />
    </div>
  );
};
