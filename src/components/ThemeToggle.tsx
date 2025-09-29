'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/lib/theme';

export function ThemeToggle() {
  const t = useTranslations('theme');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === Theme.DARK;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleTheme();
  };

  return (
    <div className="relative">
      {/* Exact CodePen Structure with Inline Styles - Optimized Size */}
      <div 
        className="cursor-pointer"
        onClick={handleClick}
        style={{
          width: '3.6em',
          height: '2em',
          boxShadow: '0.04em 0.04em 0.11em 0.045em #ffffffee',
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
          borderRadius: '12em',
        }}
      >
        {/* Inset shadow overlay */}
        <div 
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            boxShadow: 'inset 0.075em 0.075em 0.22em 0.022em #000000bb',
            position: 'absolute',
            zIndex: 1,
            borderRadius: '12em',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div 
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: isDark ? '#1f2234' : '#2e83bf',
            position: 'relative',
            isolation: 'isolate',
            transition: 'all 1s ease',
          }}
        >
          {/* Satellite */}
          <div 
            style={{
              width: '1.6em',
              height: '1.6em',
              position: 'absolute',
              top: '12%',
              left: isDark ? '55%' : '11%',
              borderRadius: '50%',
              isolation: 'isolate',
              zIndex: 1,
              transition: 'all 1s ease',
              transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            {/* Satellite shadow */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                boxShadow: `
                  inset 0.045em 0.045em 0.075em #ffffff88,
                  -0.045em -0.045em 0.075em #ffffff88,
                  inset -0.045em -0.045em 0.075em #00000066,
                  0.045em 0.045em 0.075em #00000066,
                  0.04em 0.04em 0.22em 0.09em #00000039
                `,
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '50%',
                zIndex: 2,
              }}
            />

            {/* Sun */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#fbc72d',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
                borderRadius: '50%',
              }}
            >
              {/* Moon - slides in from right when dark, slides out to right when light */}
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#cccfd9',
                  boxShadow: `
                    inset 0.045em 0.045em 0.075em #ffffff88,
                    -0.045em -0.045em 0.075em #ffffff88,
                    inset -0.045em -0.045em 0.075em #00000066,
                    0.045em 0.045em 0.075em #00000066,
                    0.04em 0.04em 0.22em 0.09em #00000039
                  `,
                  position: 'absolute',
                  top: 0,
                  left: isDark ? '0%' : '100%',
                  transform: isDark ? 'rotate(0deg)' : 'rotate(60deg)',
                  borderRadius: '50%',
                  transition: 'all 1s ease',
                }}
              >
                {/* Moon dots/craters */}
                <div style={{
                  width: '18%', height: '18%', backgroundColor: '#9da8bc',
                  position: 'absolute', borderRadius: '50%',
                  top: '20%', left: '45%'
                }} />
                <div style={{
                  width: '18%', height: '18%', backgroundColor: '#9da8bc',
                  position: 'absolute', borderRadius: '50%',
                  top: '50%', left: '25%', transform: 'scale(2)'
                }} />
                <div style={{
                  width: '18%', height: '18%', backgroundColor: '#9da8bc',
                  position: 'absolute', borderRadius: '50%',
                  top: '60%', left: '62%', transform: 'scale(1.2)'
                }} />
              </div>
            </div>

            {/* Rays */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                transform: isDark ? 'scale(0.85)' : 'scale(1)',
                transition: 'all 1s ease',
              }}
            >
              <div style={{
                width: '100%', height: '100%', backgroundColor: '#ffffff1a',
                backdropFilter: 'blur(0.004em)', position: 'absolute',
                top: 0, left: 0, borderRadius: '50%', transform: 'scale(2)'
              }} />
              <div style={{
                width: '100%', height: '100%', backgroundColor: '#ffffff1a',
                backdropFilter: 'blur(0.004em)', position: 'absolute',
                top: 0, left: 0, borderRadius: '50%', transform: 'scale(2.9)'
              }} />
              <div style={{
                width: '100%', height: '100%', backgroundColor: '#ffffff1a',
                backdropFilter: 'blur(0.004em)', position: 'absolute',
                top: 0, left: 0, borderRadius: '50%', transform: 'scale(3.8)'
              }} />
            </div>
          </div>

          {/* Stars */}
          <div 
            style={{
              width: '70%',
              height: '100%',
              position: 'absolute',
              top: isDark ? '0%' : '-100%',
              left: 0,
              transition: 'all 1s ease',
            }}
          >
            {[
              { top: '12%', left: '25%', scale: 1 },
              { top: '30%', left: '10%', scale: 0.4 },
              { top: '35%', left: '60%', scale: 0.3 },
              { top: '25%', left: '77.5%', scale: 1.1 },
              { top: '45%', left: '27.5%', scale: 0.3 },
              { top: '50%', left: '58.5%', scale: 0.2 },
              { top: '55%', left: '77.5%', scale: 0.3 },
              { top: '65%', left: '18%', scale: 0.2 },
              { top: '72.5%', left: '15%', scale: 0.2 },
              { top: '80%', left: '30%', scale: 0.24 },
              { top: '75%', left: '62.5%', scale: 0.5 }
            ].map((star, i) => (
              <div
                key={i}
                style={{
                  width: '0.375em',
                  height: '0.375em',
                  backgroundColor: '#f8fcff',
                  clipPath: 'polygon(50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0 50%, 35% 35%)',
                  position: 'absolute',
                  top: star.top,
                  left: star.left,
                  transform: `scale(${star.scale})`,
                }}
              />
            ))}
          </div>

          {/* Clouds */}
          <div 
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: isDark ? '100%' : '0',
              left: 0,
              isolation: 'isolate',
              transition: 'all 1s ease',
            }}
          >
            {/* Cloudset 1 */}
            <div style={{
              width: '100%', height: '100%', position: 'absolute',
              bottom: '-15%', right: '-10%', zIndex: 1
            }}>
              {[
                { bottom: '-24%', left: '0%', scale: 1, color: '#f5faff' },
                { bottom: '-20%', left: '14%', scale: 1.3, color: '#f5faff' },
                { bottom: '-15%', left: '27.5%', scale: 1.3, color: '#f5faff' },
                { bottom: '-12%', left: '40%', scale: 0.9, color: '#f5faff' },
                { bottom: '-7.5%', left: '52.5%', scale: 1.1, color: '#f5faff' },
                { bottom: '0%', left: '67.5%', scale: 1.3, color: '#f5faff' },
                { bottom: '25%', left: '80%', scale: 1.55, color: '#f5faff' }
              ].map((cloud, i) => (
                <div
                  key={i}
                  style={{
                    width: '0.975em',
                    height: '0.975em',
                    backgroundColor: cloud.color,
                    position: 'absolute',
                    bottom: cloud.bottom,
                    left: cloud.left,
                    transform: `scale(${cloud.scale})`,
                    borderRadius: '50%',
                  }}
                />
              ))}
            </div>

            {/* Cloudset 2 */}
            <div style={{
              width: '100%', height: '100%', position: 'absolute',
              bottom: '0%', right: '-6%', transform: 'rotate(-5deg)'
            }}>
              {[
                { bottom: '-24%', left: '0%', scale: 1 },
                { bottom: '-18%', left: '15%', scale: 1.3 },
                { bottom: '-7.5%', left: '29%', scale: 1.3 },
                { bottom: '-12%', left: '40%', scale: 0.9 },
                { bottom: '-1%', left: '52.5%', scale: 1.1 },
                { bottom: '4%', left: '67.5%', scale: 1.3 },
                { bottom: '25%', left: '80%', scale: 1.55 }
              ].map((cloud, i) => (
                <div
                  key={i}
                  style={{
                    width: '0.975em',
                    height: '0.975em',
                    backgroundColor: '#a7cbea',
                    position: 'absolute',
                    bottom: cloud.bottom,
                    left: cloud.left,
                    transform: `scale(${cloud.scale})`,
                    borderRadius: '50%',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Label - Screen Reader Only */}
      <div className="sr-only">
        <span>{isDark ? t('dark') : t('light')}</span>
      </div>
    </div>
  );
}