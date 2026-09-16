import React from 'react';
import { useCurrentFrame } from 'remotion';

export const Noise: React.FC<{ opacity?: number }> = ({ opacity = 0.018 }) => {
  const frame = useCurrentFrame();
  const shiftX = (frame % 4) * 20;
  const shiftY = ((frame * 3) % 4) * 20;

  return (
    <div
      style={{
        position: 'absolute',
        inset: -40,
        opacity,
        pointerEvents: 'none',
        zIndex: 999,
        mixBlendMode: 'screen',
        transform: `translate(${shiftX}px, ${shiftY}px)`,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)`,
        backgroundSize: '16px 16px',
      }}
    />
  );
};
