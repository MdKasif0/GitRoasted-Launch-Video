import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KineticText } from '../components/KineticText';

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle camera drift (0.985 to 1.0)
  const scale = interpolate(frame, [0, 240], [0.985, 1.0], {
    extrapolateRight: 'clamp',
  });

  // Cursor blink
  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transform: `scale(${scale})`,
        color: '#F5F5F5',
      }}
    >
      {/* Terminal prompt pill */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 18px',
          borderRadius: 6,
          background: '#0B0B0B',
          border: '1px solid #21262D',
          fontFamily: "'Geist Mono', monospace",
          fontSize: 15,
          color: '#8B949E',
        }}
      >
        <span style={{ color: '#FF8A00' }}>❯</span>
        <span>github.com/observation</span>
        <span
          style={{
            display: 'inline-block',
            width: 7,
            height: 16,
            background: '#FF8A00',
            opacity: cursorBlink ? 1 : 0,
          }}
        />
      </div>

      {/* Rhythmic deadpan statements */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          textAlign: 'center',
        }}
      >
        {frame >= 10 && (
          <div style={{ opacity: frame < 200 ? 1 : interpolate(frame, [200, 230], [1, 0.3]) }}>
            <KineticText
              text="Every developer has a GitHub profile."
              delay={15}
              fontSize={60}
              letterSpacing="-0.035em"
              color="#F5F5F5"
            />
          </div>
        )}

        {frame >= 65 && (
          <div style={{ opacity: frame < 200 ? 1 : interpolate(frame, [200, 230], [1, 0.3]) }}>
            <KineticText
              text="Some have 42 repositories."
              delay={68}
              fontSize={52}
              color="#8B949E"
              highlightWords={['42']}
              highlightColor="#FF8A00"
            />
          </div>
        )}

        {frame >= 120 && (
          <div style={{ opacity: frame < 200 ? 1 : interpolate(frame, [200, 230], [1, 0.3]) }}>
            <KineticText
              text="Most have zero README documentation."
              delay={124}
              fontSize={52}
              color="#8B949E"
              highlightWords={['zero']}
              highlightColor="#FF8A00"
            />
          </div>
        )}

        {frame >= 180 && (
          <div
            style={{
              marginTop: 14,
              padding: '10px 28px',
              borderRadius: 6,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              opacity: interpolate(frame, [180, 185], [0, 1], {
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <KineticText
              text="...and exactly 1 active contribution streak."
              delay={180}
              fontSize={32}
              fontFamily="mono"
              color="#FF8A00"
              nowrap={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};
