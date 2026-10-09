import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
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
    // Unlock page scroll before navigating; the menu's effect cleanup runs too late for scrollIntoView
    document.body.style.overflow = '';
    setOpen(false);
    fn();
  };

  const linkClass = 'text-sm text-muted hover:text-ink transition-colors';

  // Phone menu: slides in from the right over a blurred page; Esc or a tap outside closes it
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      // Hand focus back to the burger only when the menu was actually open
      if (wasOpen.current) burgerRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const mobileItems = [
    { label: 'Research', onClick: () => onSection('research') },
    { label: 'Projects', onClick: () => onSection('projects') },
    { label: 'Writing', onClick: onWriting },
    { label: 'Experience', onClick: () => onSection('experience') },
    { label: 'Contact', onClick: () => onSection('contact') },
  ];

  const socials = [
    { label: 'Email', href: `mailto:${SOCIAL_LINKS.email}` },
    { label: 'GitHub', href: SOCIAL_LINKS.github },
    { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  ];

  const themeButton = <ThemeToggle dark={theme === 'dark'} onToggle={toggle} />;

  return (
    <>
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
              ref={burgerRef}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 p-2 text-ink"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

      </header>

      {/* Outside <header>: its backdrop-blur would otherwise trap these fixed layers inside the bar */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-md transition-[opacity,visibility] duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col border-l border-rule bg-paper shadow-2xl transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:hidden ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-rule bg-bar px-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Menu</span>
          <button ref={closeRef} onClick={() => setOpen(false)} aria-label="Close menu" className="-mr-2 rounded-full p-2 text-ink hover:bg-wash">
            <X size={22} />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-5 py-4">
          {mobileItems.map((item, i) => {
            const active = item.label === 'Writing' && writingActive;
            return (
              <li
                key={item.label}
                className={`transition-[opacity,transform] duration-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
              >
                <button
                  onClick={go(item.onClick)}
                  className="group flex w-full items-baseline gap-4 border-b border-rule py-4 text-left"
                >
                  <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`font-serif text-[1.65rem] leading-none tracking-tight transition-colors group-hover:text-accent ${active ? 'text-accent' : 'text-ink'}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex-shrink-0 space-y-5 border-t border-rule px-5 py-6">
          <a
            href={SOCIAL_LINKS.resume}
            download
            className="flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-accent transition-colors"
          >
            <Download size={16} /> Download CV
          </a>
          <div className="flex items-center justify-center gap-6">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-sm font-medium text-muted hover:text-ink"
              >
                {link.label} <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
