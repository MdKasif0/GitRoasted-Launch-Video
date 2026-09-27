import React from 'react';
import { Series } from 'remotion';
import { Scene01MobileHook } from '../scenes/light/Scene01MobileHook';
import { Scene02DeveloperCallout } from '../scenes/light/Scene02DeveloperCallout';
import { Scene03IsometricBars } from '../scenes/light/Scene03IsometricBars';
import { Scene04HeroTileMatrix } from '../scenes/light/Scene04HeroTileMatrix';
import { Scene05LayeredHomepage } from '../scenes/light/Scene05LayeredHomepage';
import { Scene06TypographyBlueprint } from '../scenes/light/Scene06TypographyBlueprint';
import { Scene07VortexTunnel } from '../scenes/light/Scene07VortexTunnel';
import { Scene08ScoreDialTurntable } from '../scenes/light/Scene08ScoreDialTurntable';
import { Scene09AnnotatedReport } from '../scenes/light/Scene09AnnotatedReport';
import { Scene10QuickWinsInteractive } from '../scenes/light/Scene10QuickWinsInteractive';
import { Scene11FloatingMetricPills } from '../scenes/light/Scene11FloatingMetricPills';
import { Scene12FinalCTA } from '../scenes/light/Scene12FinalCTA';
import { LightAudioTrack } from '../audio/LightAudioTrack';

/**
 * GitRoasted Launch Film - Light Edition
 *
 * Modeled strictly on the visual language, 3D camera moves, pacing,
 * and high-end motion design of reference_vide4.mp4.
 *
 * Total duration: exactly 46.00s (1,380 frames @ 30fps).
 * 100% Light Theme throughout: pure whites, subtle elevation shadows,
 * crisp dark typography (#0F172A), and vibrant flame-orange (#FF8A00).
 */
export const GitRoastedLaunchLight: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#FAFAFA',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Synchronized Master Audio & SFX Track */}
      <LightAudioTrack />

      {/* 12 Seamless Sequential Scenes */}
      <Series>
        {/* Scene 01: Mobile Hook & 3D Pullback (0:00 - 0:08 | 240 frames) */}
        <Series.Sequence durationInFrames={240}>
          <Scene01MobileHook />
        </Series.Sequence>

        {/* Scene 02: Developer Reality Callouts (0:08 - 0:14 | 180 frames) */}
        <Series.Sequence durationInFrames={180}>
          <Scene02DeveloperCallout />
        </Series.Sequence>

        {/* Scene 03: Isometric Rising 3D Bars (0:14 - 0:18 | 120 frames) */}
        <Series.Sequence durationInFrames={120}>
          <Scene03IsometricBars />
        </Series.Sequence>

        {/* Scene 04: Hero Flame Tile Matrix (0:18 - 0:21 | 90 frames) */}
        <Series.Sequence durationInFrames={90}>
          <Scene04HeroTileMatrix />
        </Series.Sequence>

        {/* Scene 05: Layered 3D Homepage Glide (0:21 - 0:24 | 90 frames) */}
        <Series.Sequence durationInFrames={90}>
          <Scene05LayeredHomepage />
        </Series.Sequence>

        {/* Scene 06: Swiss Typography Blueprint (0:24 - 0:26 | 60 frames) */}
        <Series.Sequence durationInFrames={60}>
          <Scene06TypographyBlueprint />
        </Series.Sequence>

        {/* Scene 07: 3D Vortex Fly-Through (0:26 - 0:29 | 90 frames) */}
        <Series.Sequence durationInFrames={90}>
          <Scene07VortexTunnel />
        </Series.Sequence>

        {/* Scene 08: 464 Score Dial & Turntable Orbit (0:29 - 0:33 | 120 frames) */}
        <Series.Sequence durationInFrames={120}>
          <Scene08ScoreDialTurntable />
        </Series.Sequence>

        {/* Scene 09: Annotated Roast Report & Stamp (0:33 - 0:35 | 60 frames) */}
        <Series.Sequence durationInFrames={60}>
          <Scene09AnnotatedReport />
        </Series.Sequence>

        {/* Scene 10: Interactive Quick Wins & Score Jump (0:35 - 0:39 | 120 frames) */}
        <Series.Sequence durationInFrames={120}>
          <Scene10QuickWinsInteractive />
        </Series.Sequence>

        {/* Scene 11: Floating Parallax Metric Pills (0:39 - 0:42 | 90 frames) */}
        <Series.Sequence durationInFrames={90}>
          <Scene11FloatingMetricPills />
        </Series.Sequence>

        {/* Scene 12: Final CTA & Definitive Brand Lockup (0:42 - 0:46 | 120 frames) */}
        <Series.Sequence durationInFrames={120}>
          <Scene12FinalCTA />
        </Series.Sequence>
      </Series>
    </div>
  );
};
