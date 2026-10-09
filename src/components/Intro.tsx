import React from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { ABOUT_DATA, ACHIEVEMENTS, HERO_DATA, PROJECTS, RESEARCH_PAPERS, SOCIAL_LINKS } from '../constants';
import { CONTAINER } from '../utils/layout';

const LINKS = [
  { label: 'Email', href: `mailto:${SOCIAL_LINKS.email}` },
  { label: 'Google Scholar', href: SOCIAL_LINKS.scholar },
  { label: 'GitHub', href: SOCIAL_LINKS.github },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
];

const STATS = [
  { value: String(RESEARCH_PAPERS.length), label: 'Research papers' },
  { value: String(PROJECTS.length), label: 'Featured projects' },
  { value: String(ACHIEVEMENTS.length), label: 'Honours & awards' },
  { value: '3.91', label: 'CGPA, First Class' },
];

const Intro: React.FC = () => {
  const paragraphs = ABOUT_DATA.bio.split(/\n\s*\n/);

  return (
    <section id="about" className={`${CONTAINER} pt-12 pb-16 md:pt-20 md:pb-24`}>
      <div className="grid gap-10 md:grid-cols-[1fr_280px] md:gap-16">
        <div className="order-2 md:order-1">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {HERO_DATA.role} · {HERO_DATA.affiliation}
          </p>
          <h1 className="font-serif text-[2.75rem] leading-[1.05] tracking-tight text-ink md:text-7xl">
            {HERO_DATA.name}
          </h1>
          <p className="mt-6 font-serif text-2xl leading-snug text-ink/80 md:text-[1.75rem]">
            {HERO_DATA.tagline}
          </p>

          <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-ink">Research interests</p>
            <ul className="flex flex-wrap gap-2">
              {HERO_DATA.interests.map((interest) => (
                <li key={interest} className="rounded-full border border-rule bg-white px-3 py-1 text-sm text-muted">
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={SOCIAL_LINKS.resume}
              download
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
            >
              <Download size={16} /> Download CV
            </a>
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

        <div className="order-1 md:order-2">
          <figure className="w-40 md:w-full">
            <img
              src={ABOUT_DATA.photo}
              alt={`Portrait of ${HERO_DATA.name}`}
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
            <figcaption className="mt-3 hidden text-xs leading-relaxed text-faint md:block">
              {HERO_DATA.title}. {HERO_DATA.intro}
            </figcaption>
          </figure>
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-2 border-t border-rule md:mt-20 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-6 ${i % 2 === 1 ? 'pl-6 border-l border-rule' : ''} ${i >= 2 ? 'border-t border-rule md:border-t-0' : ''} md:pl-6 md:first:pl-0 ${i > 0 ? 'md:border-l md:border-rule' : ''}`}
          >
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="mt-1 font-serif text-4xl tracking-tight text-ink">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Intro;
