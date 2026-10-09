import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HERO_DATA, SOCIAL_LINKS } from '../constants';
import { CONTAINER } from '../utils/layout';

const LINKS = [
  { label: 'Google Scholar', href: SOCIAL_LINKS.scholar },
  { label: 'GitHub', href: SOCIAL_LINKS.github },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
];

const Contact: React.FC = () => (
  <footer id="contact" className="border-t border-rule bg-wash">
    <div className={`${CONTAINER} py-16 md:py-24`}>
      <div className="grid gap-6 md:grid-cols-[160px_1fr] md:gap-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Contact</p>
        <div>
          <h2 className="max-w-2xl font-serif text-3xl leading-tight tracking-tight text-ink md:text-5xl">
            Open to roles and research collaborations in robotics, automation and embedded systems.
          </h2>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="mt-8 inline-block break-all font-serif text-xl text-accent underline decoration-accent/30 underline-offset-[6px] hover:decoration-accent md:text-2xl"
          >
            {SOCIAL_LINKS.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-0.5 text-sm font-medium text-ink hover:text-accent transition-colors"
              >
                {link.label} <ArrowUpRight size={14} />
              </a>
            ))}
            <a href={SOCIAL_LINKS.resume} download className="text-sm font-medium text-ink hover:text-accent transition-colors">
              CV (PDF)
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col justify-between gap-2 border-t border-rule pt-6 text-xs text-faint sm:flex-row">
        <p>© {new Date().getFullYear()} {HERO_DATA.name}</p>
        <p>Built with React & Tailwind CSS</p>
      </div>
    </div>
  </footer>
);

export default Contact;
