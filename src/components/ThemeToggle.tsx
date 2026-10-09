import React from 'react';

// Sun-and-sky / moon-and-stars switch, after the "Toggle Button (Light and Dark Mode)" Figma community file
const SKY_DAY = '#1e7bf2';
const SKY_NIGHT = '#2b2e38';
const SUN = '#f5c719';
const MOON = '#c9c9c9';
const CRATER = '#8d9195';

const STARS = [
  { x: 9, y: 6, s: 2 },
  { x: 16, y: 15, s: 1.5 },
  { x: 7, y: 19, s: 1.5 },
  { x: 22, y: 8, s: 1 },
  { x: 25, y: 18, s: 2 },
  { x: 14, y: 4, s: 1 },
];

// Cloud bank along the bottom right of the day sky
const CLOUDS = [
  { x: 30, y: 17, r: 7, o: 0.75 },
  { x: 38, y: 13, r: 8, o: 0.75 },
  { x: 47, y: 10, r: 9, o: 0.75 },
  { x: 33, y: 21, r: 7, o: 1 },
  { x: 42, y: 19, r: 8, o: 1 },
  { x: 52, y: 16, r: 9, o: 1 },
];

const CRATERS = [
  { x: 5, y: 5, s: 6 },
  { x: 12, y: 10, s: 5 },
  { x: 6, y: 14, s: 3.5 },
];

const EASE = 'duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]';

const ThemeToggle: React.FC<{ dark: boolean; onToggle: () => void }> = ({ dark, onToggle }) => (
  <button
    type="button"
    role="switch"
    aria-checked={dark}
    aria-label="Dark mode"
    title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    onClick={onToggle}
    className={`relative h-7 w-[58px] flex-shrink-0 overflow-hidden rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.35)] transition-colors ${EASE} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
    style={{ backgroundColor: dark ? SKY_NIGHT : SKY_DAY }}
  >
    {/* Stars: fade in from above at night */}
    {STARS.map((star) => (
      <span
        key={`${star.x}-${star.y}`}
        className={`absolute rounded-full bg-white transition-all ${EASE}`}
        style={{
          left: star.x,
          top: star.y,
          width: star.s,
          height: star.s,
          opacity: dark ? 0.9 : 0,
          transform: dark ? 'none' : 'translateY(-8px)',
        }}
      />
    ))}

    {/* Clouds: sink out of view at night */}
    <span
      className={`absolute inset-0 transition-transform ${EASE}`}
      style={{ transform: dark ? 'translateY(22px)' : 'none' }}
    >
      {CLOUDS.map((cloud) => (
        <span
          key={`${cloud.x}-${cloud.y}`}
          className="absolute rounded-full bg-white"
          style={{ left: cloud.x, top: cloud.y, width: cloud.r * 2, height: cloud.r * 2, opacity: cloud.o }}
        />
      ))}
    </span>

    {/* Knob: sun on the left by day, moon on the right by night */}
    <span
      className={`absolute top-[3px] left-[3px] h-[22px] w-[22px] overflow-hidden rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-all ${EASE}`}
      style={{
        transform: dark ? 'translateX(30px) rotate(-30deg)' : 'none',
        backgroundColor: dark ? MOON : SUN,
        boxShadow: dark
          ? '0 1px 3px rgba(0,0,0,0.45), inset -2px -2px 4px rgba(0,0,0,0.18)'
          : '0 0 0 3px rgba(255,255,255,0.14), 0 0 0 6px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(190,120,0,0.35)',
      }}
    >
      {CRATERS.map((c) => (
        <span
          key={`${c.x}-${c.y}`}
          className={`absolute rounded-full transition-opacity ${EASE}`}
          style={{ left: c.x, top: c.y, width: c.s, height: c.s, backgroundColor: CRATER, opacity: dark ? 1 : 0 }}
        />
      ))}
    </span>
  </button>
);

export default ThemeToggle;
