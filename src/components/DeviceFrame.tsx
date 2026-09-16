import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  title?: string;
  scale?: number;
  style?: React.CSSProperties;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  width = 1440,
  height = 820,
  title = 'gitroasted.com',
  scale = 1,
  style = {},
}) => {
  return (
    <div
      style={{
        width,
        height,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        borderRadius: 8,
        background: '#0B0B0B',
        border: '1px solid #21262D',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {/* Chrome Header */}
      <div
        style={{
          height: 40,
          background: '#111111',
          borderBottom: '1px solid #21262D',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Subtle macOS Traffic Lights */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#FF5F56',
              opacity: 0.85,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#FFBD2E',
              opacity: 0.85,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#27C93F',
              opacity: 0.85,
            }}
          />
        </div>

        {/* Center URL Address Bar */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#050505',
            border: '1px solid #21262D',
            padding: '3px 16px',
            borderRadius: 6,
            color: '#8B949E',
            fontSize: 12,
            fontFamily: "'Geist Mono', monospace",
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>{title}</span>
        </div>
      </div>

      {/* Viewport Content */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: '#050505',
        }}
      >
        {children}
      </div>
    </div>
  );
};
