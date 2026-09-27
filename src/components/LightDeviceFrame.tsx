import React from 'react';

interface LightDeviceFrameProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  title?: string;
  scale?: number;
  style?: React.CSSProperties;
}

export const LightDeviceFrame: React.FC<LightDeviceFrameProps> = ({
  children,
  width = 1440,
  height = 860,
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
        borderRadius: 14,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow:
          '0 30px 80px -20px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {/* Light Chrome Header */}
      <div
        style={{
          height: 44,
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#FF5F56',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
            }}
          />
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#FFBD2E',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
            }}
          />
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#27C93F',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
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
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
            padding: '4px 20px',
            borderRadius: 8,
            color: '#334155',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "'Geist Mono', monospace",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
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
          background: '#FAFAFA',
        }}
      >
        {children}
      </div>
    </div>
  );
};
