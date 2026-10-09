import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RESEARCH_PAPERS, SOCIAL_LINKS } from '../constants';
import type { ResearchPaper } from '../types';
import Section from './Section';

const isUnderReview = (date: string) => date.toLowerCase() === 'under review';

const PaperRow: React.FC<{ paper: ResearchPaper }> = ({ paper }) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const pending = isUnderReview(paper.date);
  const hasLink = paper.link && paper.link !== '#';
  const abstractId = `abstract-${paper.id}`;

  return (
    <li className="grid gap-5 py-8 first:pt-0 sm:grid-cols-[1fr_168px] sm:gap-8">
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span
            className={`inline-flex items-center gap-1.5 font-medium ${pending ? 'text-amber-700' : 'text-emerald-700'}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${pending ? 'bg-amber-500' : 'bg-emerald-600'}`} />
            {pending ? 'Under review' : paper.date}
          </span>
          <span className="text-rule">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-faint">{paper.venue}</span>
        </div>

        <h3 className="font-serif text-xl leading-snug text-ink md:text-[1.4rem]">{paper.title}</h3>
        <p className="mt-2 text-sm italic text-muted">{paper.publisher}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            aria-expanded={showAbstract}
            aria-controls={abstractId}
            className="font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-accent"
          >
            {showAbstract ? 'Hide abstract' : 'Abstract'}
          </button>
          {hasLink && (
            <a
              href={paper.link}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-0.5 font-medium text-accent hover:underline underline-offset-4"
            >
              View paper <ArrowUpRight size={14} />
            </a>
          )}
          <span className="text-faint">{paper.tags.join(' · ')}</span>
        </div>

        {showAbstract && (
          <p id={abstractId} className="mt-4 max-w-2xl border-l-2 border-accent/40 pl-4 text-[15px] leading-relaxed text-muted">
            {paper.abstract}
          </p>
        )}
      </div>

      <div className="hidden sm:block">
        <img
          src={paper.image}
          alt=""
          loading="lazy"
          className="aspect-[4/3] w-full rounded-sm border border-rule bg-white object-cover object-top"
        />
      </div>
    </li>
  );
};

const Research: React.FC = () => {
  const underReview = RESEARCH_PAPERS.filter((p) => isUnderReview(p.date)).length;

  return (
    <Section
      id="research"
      label="Research"
      title="Publications"
      action={
        <a
          href={SOCIAL_LINKS.scholar}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent transition-colors"
        >
          Google Scholar <ArrowUpRight size={15} />
        </a>
      }
    >
      <p className="-mt-6 mb-10 text-sm text-muted">
        {RESEARCH_PAPERS.length} papers · {RESEARCH_PAPERS.length - underReview} published · {underReview} under review
      </p>
      <ol className="divide-y divide-rule">
        {RESEARCH_PAPERS.map((paper) => (
          <PaperRow key={paper.id} paper={paper} />
        ))}
      </ol>
    </Section>
  );
};

export default Research;
