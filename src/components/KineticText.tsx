import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface KineticTextProps {
  text: string;
  delay?: number;
  durationInFrames?: number;
  fontSize?: number;
  fontFamily?: 'sans' | 'mono';
  color?: string;
  highlightWords?: string[];
  highlightColor?: string;
  align?: 'left' | 'center' | 'right';
  maxWidth?: number | string;
  letterSpacing?: string;
  lineHeight?: number;
  stagger?: number;
  nowrap?: boolean;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delay = 0,
  fontSize = 64,
  fontFamily = 'sans',
  color = '#F5F5F5',
  highlightWords = [],
  highlightColor = '#FF8A00',
  align = 'center',
  maxWidth,
  letterSpacing = '-0.03em',
  lineHeight = 1.15,
  stagger = 3,
  nowrap = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  const resolvedFont =
    fontFamily === 'mono'
      ? "'Geist Mono', 'JetBrains Mono', monospace"
      : "'Geist', 'Inter', -apple-system, sans-serif";

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: nowrap ? 'nowrap' : 'wrap',
        whiteSpace: nowrap ? 'nowrap' : 'normal',
        justifyContent:
          align === 'center'
            ? 'center'
            : align === 'right'
            ? 'flex-end'
            : 'flex-start',
        maxWidth: maxWidth || (nowrap ? '100%' : '92%'),
        margin: '0 auto',
        textAlign: align,
        lineHeight,
      }}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * stagger;
        const spr = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 18, stiffness: 140, mass: 0.8 },
        });

        const opacity = interpolate(spr, [0, 1], [0, 1]);
        const translateY = interpolate(spr, [0, 1], [16, 0]);
        const scale = interpolate(spr, [0, 1], [0.97, 1]);

        // Clean punctuation for word match
        const cleanWord = word
          .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
          .toLowerCase();
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              marginRight: '0.28em',
              marginBottom: '0.08em',
              fontSize,
              fontFamily: resolvedFont,
              fontWeight: 700,
              letterSpacing,
              color: isHighlight ? highlightColor : color,
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
