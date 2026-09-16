import React from 'react';
import { Img, staticFile } from 'remotion';

interface ScreenshotRevealProps {
  src: string;
  scale?: number;
  panX?: number;
  panY?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  opacity?: number;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  boxShadow?: string;
  border?: string;
}

export const ScreenshotReveal: React.FC<ScreenshotRevealProps> = ({
  src,
  scale = 1,
  panX = 0,
  panY = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  opacity = 1,
  width = '100%',
  height = '100%',
  borderRadius = 6,
  boxShadow = '0 12px 32px rgba(0,0,0,0.85)',
  border = '1px solid #21262D',
}) => {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius,
        boxShadow,
        border,
        opacity,
        perspective: 1200,
        backgroundColor: '#050505',
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          transform: `translate(${panX}px, ${panY}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
          transformOrigin: 'top center',
          transition: 'transform 0.05s linear',
        }}
      />
    </div>
  );
};
