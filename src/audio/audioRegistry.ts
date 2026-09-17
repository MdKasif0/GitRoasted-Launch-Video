import { staticFile } from 'remotion';

/**
 * Centralized Audio Registry for GitRoasted Launch Film.
 * References strictly local, royalty-free audio assets from public/audio/.
 */
export const AUDIO = {
  musicMain: staticFile('audio/music_main.mp3'),
  keyboard: staticFile('audio/keyboard_soft.wav'),
  click: staticFile('audio/ui_click.wav'),
  clickSoft: staticFile('audio/ui_click_soft.wav'),
  tick: staticFile('audio/ui_tick.wav'),
  whooshShort: staticFile('audio/whoosh_short.wav'),
  whooshFast: staticFile('audio/whoosh_fast.wav'),
  whooshDeep: staticFile('audio/whoosh_deep.wav'),
  techSlide: staticFile('audio/tech_slide.wav'),
  softImpact: staticFile('audio/soft_impact.wav'),
  bassImpact: staticFile('audio/bass_impact.wav'),
  riser: staticFile('audio/digital_riser.wav'),
  notification: staticFile('audio/notification_soft.wav'),
  logoChime: staticFile('audio/logo_chime.wav'),
} as const;

export type AudioKey = keyof typeof AUDIO;
