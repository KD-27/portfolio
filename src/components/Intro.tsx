import React from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { ABOUT_DATA, HERO_DATA, RESEARCH_PAPERS, SOCIAL_LINKS } from '../constants';
import { CONTAINER } from '../utils/layout';

const LINKS = [
  { label: 'Email', href: `mailto:${SOCIAL_LINKS.email}` },
  { label: 'GitHub', href: SOCIAL_LINKS.github },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
];

const STATS = [
  { value: String(RESEARCH_PAPERS.length), label: 'Research papers' },
  { value: '3.91', label: 'CGPA, First Class' },
];

const CvButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a
    href={SOCIAL_LINKS.resume}
    download
    className={`items-center gap-2 rounded-full bg-ink font-medium text-paper hover:bg-accent transition-colors ${className}`}
  >
    <Download size={16} /> Download CV
  </a>
);

// Phones get a compact header (round photo beside the name, figures + CV in one strip) so the
// first screen says who, what and the key numbers; from md up it's the two-column layout.
const Intro: React.FC = () => {
  const paragraphs = ABOUT_DATA.bio.split(/\n\s*\n/);

  return (
    <section id="about" className={`${CONTAINER} pt-8 pb-12 md:pt-20 md:pb-24`}>
      <div className="grid gap-10 md:grid-cols-[1fr_280px] md:gap-16">
        <div>
          <div className="flex items-center gap-4 md:block">
            <img
              src={ABOUT_DATA.photo}
              alt=""
              className="h-[76px] w-[76px] flex-shrink-0 rounded-full object-cover ring-1 ring-rule md:hidden"
            />
            <div className="min-w-0">
              <p className="mb-5 hidden font-mono text-[11px] uppercase tracking-[0.14em] text-faint md:block">
                {HERO_DATA.role} · {HERO_DATA.affiliation}
              </p>
              <h1 className="font-serif text-[2.1rem] leading-[1.05] tracking-tight text-ink sm:text-[2.75rem] md:text-7xl">
                {HERO_DATA.name}
              </h1>
              <p className="mt-1.5 text-[13px] leading-snug text-muted md:hidden">
                {HERO_DATA.role}
                <br />
                {HERO_DATA.affiliation}
              </p>
            </div>
          </div>

          <p className="mt-5 font-serif text-[1.35rem] leading-snug text-ink/80 md:mt-6 md:text-[1.75rem]">
            {HERO_DATA.tagline}
          </p>

          <div className="mt-6 flex items-center gap-5 border-y border-rule py-3.5 md:hidden">
            <dl className="flex gap-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-[11px] leading-tight text-muted">{stat.label}</dt>
                  <dd className="font-serif text-[1.7rem] leading-none tracking-tight text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <CvButton className="ml-auto inline-flex flex-shrink-0 px-4 py-2 text-[13px]" />
          </div>

          <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted md:mt-8 md:text-base">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-ink">Research interests</p>
            <ul className="flex flex-wrap gap-2">
              {HERO_DATA.interests.map((interest) => (
                <li key={interest} className="rounded-full border border-rule bg-card px-3 py-1 text-sm text-muted">
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-10">
            <CvButton className="hidden px-5 py-2.5 text-sm md:inline-flex" />
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="group inline-flex items-center gap-0.5 text-sm font-medium text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-accent transition-colors"
              >
                {link.label}
                <ArrowUpRight size={14} className="text-faint group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src={ABOUT_DATA.photo}
            alt={`Portrait of ${HERO_DATA.name}`}
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />

          {/* Headline figures sit right under the photo so they're visible without scrolling */}
          <dl className="mt-5 grid grid-cols-2 border-y border-rule">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col-reverse py-4 ${i > 0 ? 'border-l border-rule pl-5' : ''}`}>
                <dt className="mt-2 text-xs leading-snug text-muted">{stat.label}</dt>
                <dd className="font-serif text-4xl leading-none tracking-tight text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-xs leading-relaxed text-faint">
            {HERO_DATA.title}. {HERO_DATA.intro}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
