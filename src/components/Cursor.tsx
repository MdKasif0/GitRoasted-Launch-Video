import React from 'react';

interface CursorProps {
  x: number;
  y: number;
  clicked?: boolean;
  label?: string;
}

export const Cursor: React.FC<CursorProps> = ({
  x,
  y,
  clicked = false,
  label,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 100,
        transform: `translate(-2px, -2px) scale(${clicked ? 0.94 : 1})`,
        transition: 'transform 0.08s ease-out',
      }}
    >
      {/* Crisp 200ms Click Ripple */}
      {clicked && (
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '2px solid #FF8A00',
            transform: 'translate(-50%, -50%)',
            opacity: 0.8,
          }}
        />
      )}

      {/* Modern Developer Cursor */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7))',
        }}
      >
        <path
          d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
          fill="#0B0B0B"
          stroke="#FF8A00"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {label && (
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            background: '#111111',
            border: '1px solid #21262D',
            color: '#FF8A00',
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
            fontFamily: "'Geist Mono', monospace",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
