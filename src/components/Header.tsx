import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HERO_DATA, SOCIAL_LINKS } from '../constants';
import { CONTAINER } from '../utils/layout';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onHome: () => void;
  onSection: (sectionId: string) => void;
  onWriting: () => void;
  /** Highlights "Writing" while the Thought Lab pages are open */
  writingActive?: boolean;
}

const SECTIONS = [
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

type Theme = 'light' | 'dark';

// index.html sets data-theme before first paint; this keeps it in sync after that
const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#18181b' : '#f4f1ea');
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage blocked (private mode): the choice just won't persist
    }
  };

  return { theme, toggle };
};

const Header: React.FC<HeaderProps> = ({ onHome, onSection, onWriting, writingActive = false }) => {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const go = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  const linkClass = 'text-sm text-muted hover:text-ink transition-colors';

  const themeButton = <ThemeToggle dark={theme === 'dark'} onToggle={toggle} />;

  return (
    <header
      className="sticky top-0 z-40 border-b border-rule bg-bar/90 backdrop-blur-md transition-colors"
    >
      <div className={`${CONTAINER} flex h-16 items-center justify-between`}>
        <button
          onClick={go(onHome)}
          aria-label={`${HERO_DATA.name}, home`}
          title={HERO_DATA.name}
          className="-ml-1 rounded-sm p-1 opacity-90 transition-opacity hover:opacity-100"
        >
          {/* Black mark on transparent; inverted to white in dark mode */}
          <img
            src={`${import.meta.env.BASE_URL}logo-mark.png`}
            alt=""
            width={315}
            height={236}
            className="h-7 w-auto dark:invert"
          />
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          <button onClick={go(() => onSection('research'))} className={linkClass}>Research</button>
          <button onClick={go(() => onSection('projects'))} className={linkClass}>Projects</button>
          <button
            onClick={go(onWriting)}
            className={writingActive ? 'text-sm text-ink underline decoration-accent decoration-2 underline-offset-[6px]' : linkClass}
          >
            Writing
          </button>
          <button onClick={go(() => onSection('experience'))} className={linkClass}>Experience</button>
          <button onClick={go(() => onSection('contact'))} className={linkClass}>Contact</button>
          <a
            href={SOCIAL_LINKS.resume}
            download
            className="rounded-full border border-ink/80 px-4 py-1.5 text-sm font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            CV
          </a>
          {themeButton}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {themeButton}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="-mr-2 p-2 text-ink"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className={`${CONTAINER} flex flex-col pb-4 md:hidden`} aria-label="Mobile">
          {SECTIONS.slice(0, 2).map((s) => (
            <button key={s.id} onClick={go(() => onSection(s.id))} className="py-2.5 text-left text-base text-ink">
              {s.label}
            </button>
          ))}
          <button onClick={go(onWriting)} className="py-2.5 text-left text-base text-ink">Writing</button>
          {SECTIONS.slice(2).map((s) => (
            <button key={s.id} onClick={go(() => onSection(s.id))} className="py-2.5 text-left text-base text-ink">
              {s.label}
            </button>
          ))}
          <a href={SOCIAL_LINKS.resume} download className="py-2.5 text-base font-medium text-accent">
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
