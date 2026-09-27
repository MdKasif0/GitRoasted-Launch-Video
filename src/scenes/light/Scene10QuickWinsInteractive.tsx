import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Cursor } from '../../components/Cursor';

export const Scene10QuickWinsInteractive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-in for the task cards
  const slideProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Cursor motion path
  const cursorX = interpolate(frame, [15, 55, 80], [1200, 680, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [15, 55, 80], [700, 480, 520], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Click action at frame 60
  const isClicked = frame >= 60;
  const clickBounce = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Score countup from 464 to 599 (+135 pts)
  const scoreSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const currentScore = Math.round(interpolate(scoreSpring, [0, 1], [464, 599]));

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* Top Header & Dynamic Live Score Counter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1300,
          marginBottom: 40,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#16A34A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Actionable Improvement Plan
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>
            The roast is free. The fixes are the point.
          </div>
        </div>

        {/* Live Score Counter Pill */}
        <div
          style={{
            background: '#FFFFFF',
            border: '2px solid #E2E8F0',
            borderRadius: 20,
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
            transform: isClicked ? `scale(${interpolate(clickBounce, [0, 1], [1.12, 1.0])})` : 'scale(1)',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: '#64748B' }}>Live Score:</span>
          <span style={{ fontSize: 36, fontWeight: 800, color: isClicked ? '#16A34A' : '#FF8A00' }}>
            {currentScore}
          </span>
          <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}>/ 1000</span>
          {isClicked && (
            <span style={{ fontSize: 14, fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '4px 8px', borderRadius: 6 }}>
              +135 pts! 🚀
            </span>
          )}
        </div>
      </div>

      {/* Quick Wins Task Cards Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          width: '100%',
          maxWidth: 1300,
          transform: `translateY(${interpolate(slideProgress, [0, 1], [60, 0])}px)`,
          opacity: slideProgress,
        }}
      >
        {/* Task 1: Clicked Interactive Task */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            border: isClicked ? '2px solid #22C55E' : '1px solid #E2E8F0',
            padding: '24px 32px',
            boxShadow: isClicked ? '0 15px 35px rgba(34, 197, 94, 0.12)' : '0 8px 20px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: isClicked ? `scale(${interpolate(clickBounce, [0, 1], [1.02, 1.0])})` : 'scale(1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Interactive Checkbox */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: isClicked ? '#22C55E' : '#F1F5F9',
                border: isClicked ? 'none' : '2px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 18,
                boxShadow: isClicked ? '0 4px 10px rgba(34, 197, 94, 0.3)' : 'none',
              }}
            >
              {isClicked ? '✓' : ''}
            </div>

            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                Add open-source license to 47 public repositories
              </div>
              <div style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                Unlicensed code cannot be legally used by other developers. Quick 1-click MIT template.
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#DCFCE7',
              color: '#15803D',
              fontSize: 15,
              fontWeight: 800,
              padding: '8px 18px',
              borderRadius: 30,
            }}
          >
            +25 pts
          </div>
        </div>

        {/* Task 2 */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            padding: '24px 32px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: 0.9,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F1F5F9', border: '2px solid #CBD5E1' }} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                Set up automated GitHub Actions CI workflow
              </div>
              <div style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                Prove to interviewers that your code compiles and passes automated tests.
              </div>
            </div>
          </div>
          <div style={{ background: '#DCFCE7', color: '#15803D', fontSize: 15, fontWeight: 800, padding: '8px 18px', borderRadius: 30 }}>
            +30 pts
          </div>
        </div>

        {/* Task 3 */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            padding: '24px 32px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: 0.85,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F1F5F9', border: '2px solid #CBD5E1' }} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                Complete your GitHub bio and custom README overview
              </div>
              <div style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                Replace placeholder text with real project descriptions and working live demos.
              </div>
            </div>
          </div>
          <div style={{ background: '#DCFCE7', color: '#15803D', fontSize: 15, fontWeight: 800, padding: '8px 18px', borderRadius: 30 }}>
            +40 pts
          </div>
        </div>
      </div>

      {/* Interactive Cursor with Label */}
      <Cursor
        x={cursorX}
        y={cursorY}
        label="@MdKasif0"
        clicked={frame >= 58 && frame <= 68}
      />

      {/* Tooltip confirmation on click */}
      {frame >= 65 && (
        <div
          style={{
            position: 'absolute',
            left: cursorX + 24,
            top: cursorY - 35,
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 100,
          }}
        >
          Quick Win Completed! ✨
        </div>
      )}
    </div>
  );
};
