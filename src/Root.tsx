import React from 'react';
import { Composition } from 'remotion';
import { GitRoastedLaunch } from './compositions/GitRoastedLaunch';
import { GitRoastedLaunchLight } from './compositions/GitRoastedLaunchLight';
import { Scene01MobileHook } from './scenes/light/Scene01MobileHook';
import { Scene02DeveloperCallout } from './scenes/light/Scene02DeveloperCallout';
import { Scene03IsometricBars } from './scenes/light/Scene03IsometricBars';
import { Scene04HeroTileMatrix } from './scenes/light/Scene04HeroTileMatrix';
import { Scene05LayeredHomepage } from './scenes/light/Scene05LayeredHomepage';
import { Scene06TypographyBlueprint } from './scenes/light/Scene06TypographyBlueprint';
import { Scene07VortexTunnel } from './scenes/light/Scene07VortexTunnel';
import { Scene08ScoreDialTurntable } from './scenes/light/Scene08ScoreDialTurntable';
import { Scene09AnnotatedReport } from './scenes/light/Scene09AnnotatedReport';
import { Scene10QuickWinsInteractive } from './scenes/light/Scene10QuickWinsInteractive';
import { Scene11FloatingMetricPills } from './scenes/light/Scene11FloatingMetricPills';
import { Scene12FinalCTA } from './scenes/light/Scene12FinalCTA';
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
      {/* 46-second Master Reference-Quality Light Launch Film (1920x1080 @ 30fps) */}
      <Composition
        id="GitRoastedLightLaunch"
        component={GitRoastedLaunchLight}
        durationInFrames={1380}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Individual Light Scene Compositions for Studio Inspection */}
      <Composition id="Light-01-MobileHook" component={Scene01MobileHook} durationInFrames={240} fps={30} width={1920} height={1080} />
      <Composition id="Light-02-Callout" component={Scene02DeveloperCallout} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="Light-03-IsometricBars" component={Scene03IsometricBars} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="Light-04-HeroMatrix" component={Scene04HeroTileMatrix} durationInFrames={90} fps={30} width={1920} height={1080} />
      <Composition id="Light-05-Homepage" component={Scene05LayeredHomepage} durationInFrames={90} fps={30} width={1920} height={1080} />
      <Composition id="Light-06-Typography" component={Scene06TypographyBlueprint} durationInFrames={60} fps={30} width={1920} height={1080} />
      <Composition id="Light-07-Tunnel" component={Scene07VortexTunnel} durationInFrames={90} fps={30} width={1920} height={1080} />
      <Composition id="Light-08-ScoreDial" component={Scene08ScoreDialTurntable} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="Light-09-AnnotatedReport" component={Scene09AnnotatedReport} durationInFrames={60} fps={30} width={1920} height={1080} />
      <Composition id="Light-10-QuickWins" component={Scene10QuickWinsInteractive} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="Light-11-MetricPills" component={Scene11FloatingMetricPills} durationInFrames={90} fps={30} width={1920} height={1080} />
      <Composition id="Light-12-FinalCTA" component={Scene12FinalCTA} durationInFrames={120} fps={30} width={1920} height={1080} />

      {/* Legacy 85-second Master Composition */}
      <Composition
        id="GitRoastedLaunch"
        component={GitRoastedLaunch}
        durationInFrames={2550}
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
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="04-Roast"
        component={Roast}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="05-Score"
        component={Score}
        durationInFrames={270}
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
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="08-Finale"
        component={Finale}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
