import React from 'react';
import { Composition } from 'remotion';
import { GitRoastedLaunch } from './compositions/GitRoastedLaunch';
import { ColdOpen } from './scenes/ColdOpen';
import { Problem } from './scenes/Problem';
import { Reveal } from './scenes/Reveal';
import { Roast } from './scenes/Roast';
import { Score } from './scenes/Score';
import { QuickWins } from './scenes/QuickWins';
import { ProductMontage } from './scenes/ProductMontage';
import { Finale } from './scenes/Finale';
import './styles/global.css';

export const Root: React.FC = () => {
  return (
    <>
      {/* 80-second Master Composition (1920x1080 @ 30fps) */}
      <Composition
        id="GitRoastedLaunch"
        component={GitRoastedLaunch}
        durationInFrames={2400}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Individual Scene Compositions for Rapid Studio Preview */}
      <Composition
        id="01-ColdOpen"
        component={ColdOpen}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="02-Problem"
        component={Problem}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="03-Reveal"
        component={Reveal}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="04-Roast"
        component={Roast}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="05-Score"
        component={Score}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="06-QuickWins"
        component={QuickWins}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="07-ProductMontage"
        component={ProductMontage}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="08-Finale"
        component={Finale}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
