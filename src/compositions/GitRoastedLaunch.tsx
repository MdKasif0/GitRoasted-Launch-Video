import React from 'react';
import { Series } from 'remotion';
import { ColdOpen } from '../scenes/ColdOpen';
import { Problem } from '../scenes/Problem';
import { Reveal } from '../scenes/Reveal';
import { Roast } from '../scenes/Roast';
import { Score } from '../scenes/Score';
import { QuickWins } from '../scenes/QuickWins';
import { ProductMontage } from '../scenes/ProductMontage';
import { Finale } from '../scenes/Finale';
import { Noise } from '../components/Noise';
import { AudioTrack } from '../audio/AudioTrack';

export const GitRoastedLaunch: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#050505',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 80-second Master Scene Timeline */}
      <Series>
        {/* Scene 1: Cold Open (9s / 270 frames) */}
        <Series.Sequence durationInFrames={270}>
          <ColdOpen />
        </Series.Sequence>

        {/* Scene 2: The Problem & Second Opinion (11s / 330 frames) */}
        <Series.Sequence durationInFrames={330}>
          <Problem />
        </Series.Sequence>

        {/* Scene 3: Main Product Reveal (11s / 330 frames) */}
        <Series.Sequence durationInFrames={330}>
          <Reveal />
        </Series.Sequence>

        {/* Scene 4: The Roast (12s / 360 frames) */}
        <Series.Sequence durationInFrames={360}>
          <Roast />
        </Series.Sequence>

        {/* Scene 5: Seriousness Score (9s / 270 frames) */}
        <Series.Sequence durationInFrames={270}>
          <Score />
        </Series.Sequence>

        {/* Scene 6: Quick Wins (12s / 360 frames) */}
        <Series.Sequence durationInFrames={360}>
          <QuickWins />
        </Series.Sequence>

        {/* Scene 7: Product Montage (10s / 300 frames) */}
        <Series.Sequence durationInFrames={300}>
          <ProductMontage />
        </Series.Sequence>

        {/* Scene 8: Finale (6s / 180 frames) */}
        <Series.Sequence durationInFrames={180}>
          <Finale />
        </Series.Sequence>
      </Series>

      {/* Synchronized Sound Effects */}
      <AudioTrack />

      {/* Filmic Ambient Noise Overlay */}
      <Noise opacity={0.018} />
    </div>
  );
};
