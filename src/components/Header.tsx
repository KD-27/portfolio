import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HERO_DATA, SOCIAL_LINKS } from '../constants';
import { CONTAINER } from '../utils/layout';

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

const Header: React.FC<HeaderProps> = ({ onHome, onSection, onWriting, writingActive = false }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  const linkClass = 'text-sm text-muted hover:text-ink transition-colors';

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/85 backdrop-blur-md transition-colors ${
        scrolled || open ? 'border-b border-rule' : 'border-b border-transparent'
      }`}
    >
      <div className={`${CONTAINER} flex h-16 items-center justify-between`}>
        <button onClick={go(onHome)} className="font-serif text-xl tracking-tight text-ink">
          {HERO_DATA.name}
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
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="-mr-2 p-2 text-ink md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
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
