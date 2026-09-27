import React from 'react';

interface LightPhoneFrameProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const LightPhoneFrame: React.FC<LightPhoneFrameProps> = ({
  children,
  width = 440,
  height = 900,
  style = {},
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 54,
        background: '#FFFFFF',
        border: '8px solid #E2E8F0',
        outline: '2px solid rgba(0, 0, 0, 0.04)',
        boxShadow:
          '0 30px 90px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 0 0 2px #F8FAFC',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* Dynamic Island */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 124,
          height: 35,
          borderRadius: 20,
          background: '#0F172A',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
        }}
      >
        {/* Camera Lens reflection */}
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: '#1E293B',
            boxShadow: 'inset 0 0 3px #0284C7',
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#0284C7',
            opacity: 0.6,
          }}
        />
      </div>

      {/* iOS Status Bar */}
      <div
        style={{
          height: 48,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 28px 0',
          fontSize: 14,
          fontWeight: 600,
          color: '#0F172A',
          fontFamily: "'Geist', -apple-system, sans-serif",
          zIndex: 40,
        }}
      >
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* Signal */}
          <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="0.5" />
            <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
            <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" />
            <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
          </svg>
          {/* Battery */}
          <div
            style={{
              width: 24,
              height: 12,
              border: '1.5px solid #0F172A',
              borderRadius: 3.5,
              padding: 1.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '80%',
                height: '100%',
                background: '#0F172A',
                borderRadius: 1.5,
              }}
            />
          </div>
        </div>
      </div>

      {/* Screen Viewport */}
      <div
        style={{
          flex: 1,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#FAFAFA',
        }}
      >
        {children}
      </div>

      {/* Home Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 140,
          height: 4,
          borderRadius: 2,
          background: '#CBD5E1',
          zIndex: 50,
        }}
      />
    </div>
  );
};
