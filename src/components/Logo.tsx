import React from 'react';

export const FlameIcon: React.FC<{ size?: number }> = ({ size = 48 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF8A00" />
            <stop offset="100%" stopColor="#FF9F1C" />
          </linearGradient>
          <linearGradient id="innerFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF9F1C" />
            <stop offset="100%" stopColor="#FFD166" />
          </linearGradient>
        </defs>

        {/* Outer Flame */}
        <path
          d="M50 8C52 24 64 34 70 46C76 58 74 74 62 86C50 98 32 96 22 84C10 70 12 48 26 36C28 42 32 46 36 47C35 37 39 25 50 8Z"
          fill="url(#flameGrad)"
        />

        {/* Inner Flame */}
        <path
          d="M50 48C53 58 60 64 56 74C52 82 40 84 34 76C30 70 32 60 38 54C40 58 43 60 45 61C45 56 46 51 50 48Z"
          fill="url(#innerFlameGrad)"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

export const Logo: React.FC<{
  size?: number;
  showText?: boolean;
  tagline?: string;
}> = ({ size = 48, showText = true, tagline }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.28,
        fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
      }}
    >
      <FlameIcon size={size} />
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: size * 0.72,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            <span style={{ color: '#F5F5F5' }}>Git</span>
            <span style={{ color: '#FF8A00' }}>Roasted</span>
          </div>
          {tagline && (
            <div
              style={{
                fontSize: size * 0.22,
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#8B949E',
                textTransform: 'uppercase',
                fontFamily: "'Geist Mono', monospace",
                marginTop: size * 0.12,
              }}
            >
              {tagline}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
