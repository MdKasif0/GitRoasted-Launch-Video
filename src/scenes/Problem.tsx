import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticText } from '../components/KineticText';

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: '#F5F5F5',
        overflow: 'hidden',
      }}
    >
      {/* PHASE 1: 0 - 80f */}
      {frame < 80 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
          }}
        >
          {/* Commit tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 20px',
              borderRadius: 6,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 16,
              color: '#8B949E',
            }}
          >
            <span>commit 8f3a91c</span>
            <span style={{ color: '#30363D' }}>|</span>
            <span style={{ color: '#F5F5F5' }}>"fixed bug again"</span>
          </div>

          <KineticText
            text="We push straight to main at 3:14 AM."
            delay={5}
            fontSize={68}
            highlightWords={['main', '3:14']}
            highlightColor="#FF8A00"
          />
        </div>
      )}

      {/* PHASE 2: 80 - 160f */}
      {frame >= 80 && frame < 160 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              padding: '5px 16px',
              borderRadius: 6,
              background: '#0B0B0B',
              border: '1px solid #21262D',
              color: '#FF8A00',
              fontFamily: "'Geist Mono', monospace",
              fontSize: 15,
            }}
          >
            ★ Starred by @you (self-validation)
          </div>

          <KineticText
            text="We star our own repositories."
            delay={85}
            fontSize={70}
            highlightWords={['own']}
            highlightColor="#FF8A00"
          />

          <div style={{ marginTop: 8 }}>
            <KineticText
              text="And pray nobody opens the commit history."
              delay={105}
              fontSize={40}
              color="#8B949E"
            />
          </div>
        </div>
      )}

      {/* PHASE 3: 160 - 270f */}
      {frame >= 160 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
            textAlign: 'center',
          }}
        >
          {frame < 210 ? (
            <KineticText
              text="Who is going to tell you the truth?"
              delay={165}
              fontSize={76}
              color="#F5F5F5"
              highlightWords={['truth?']}
              highlightColor="#FF8A00"
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 800,
                  color: '#F5F5F5',
                  letterSpacing: '-0.03em',
                  fontFamily: "'Geist', 'Inter', sans-serif",
                }}
              >
                ...Your coworkers won't.
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  color: '#8B949E',
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                (They are doing the exact same thing)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
