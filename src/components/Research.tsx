import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { OWN_NAME, RESEARCH_PAPERS } from '../constants';
import type { ResearchPaper } from '../types';
import Section from './Section';

const isUnderReview = (date: string) => date.toLowerCase() === 'under review';
const isAccepted = (date: string) => date.toLowerCase() === 'accepted';

const SUMMARY_ROWS = [
  ['problem', 'Problem'],
  ['built', 'Built'],
  ['result', 'Result'],
  ['limitation', 'Limitation'],
] as const;

const Authors: React.FC<{ authors: string[] }> = ({ authors }) => (
  <p className="mt-2 text-sm text-muted">
    {authors.map((name, i) => (
      <React.Fragment key={name}>
        {i > 0 && (name === 'et al.' ? ' ' : ', ')}
        {name === OWN_NAME ? <strong className="font-semibold text-ink">{name}</strong> : name}
      </React.Fragment>
    ))}
  </p>
);

const PaperRow: React.FC<{ paper: ResearchPaper }> = ({ paper }) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const pending = isUnderReview(paper.date);
  const hasLink = paper.link && paper.link !== '#';
  const abstractId = `abstract-${paper.id}`;

  const cover = (
    <div className="overflow-hidden rounded-sm border border-rule bg-white shadow-sm">
      <img
        src={paper.image}
        alt=""
        loading="lazy"
        className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );

  const thumb = (
    <img
      src={paper.image}
      alt=""
      loading="lazy"
      className="aspect-[3/4] w-[72px] rounded-sm border border-rule bg-white object-cover object-top shadow-sm"
    />
  );

  return (
    <li className="grid gap-5 py-8 first:pt-0 sm:grid-cols-[1fr_220px] sm:gap-x-10 sm:gap-y-6 sm:py-10 lg:grid-cols-[1fr_300px]">
      <div className="min-w-0">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span
                className={`inline-flex items-center gap-1.5 font-medium ${pending ? 'text-warn' : 'text-ok'}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${pending ? 'bg-warn' : 'bg-ok'}`} />
                {pending ? 'Under review' : isAccepted(paper.date) ? 'Accepted' : paper.date}
              </span>
              <span className="text-rule">/</span>
              <span className="font-mono text-xs uppercase tracking-wider text-faint">{paper.venue}</span>
            </div>

            <h3 className="font-serif text-xl leading-snug text-ink md:text-[1.4rem]">{paper.title}</h3>
            <Authors authors={paper.authors} />
            <p className="mt-1 text-sm italic text-muted">{paper.publisher}</p>
            <p className="mt-2 text-sm text-ink">{paper.contribution}</p>
          </div>

          {/* Phones: small first-page preview beside the title (the big one is hidden below sm) */}
          {hasLink ? (
            <a href={paper.link} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true" className="flex-shrink-0 sm:hidden">
              {thumb}
            </a>
          ) : (
            <div className="flex-shrink-0 sm:hidden">{thumb}</div>
          )}
        </div>

        <dl className="mt-4 grid max-w-2xl grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
          {SUMMARY_ROWS.map(([key, label]) =>
            paper.summary[key] ? (
              <React.Fragment key={key}>
                <dt className="font-mono text-[11px] uppercase leading-5 tracking-wider text-faint">{label}</dt>
                <dd className="leading-5 text-muted">{paper.summary[key]}</dd>
              </React.Fragment>
            ) : null
          )}
        </dl>

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
          {/* Phones only: from sm up the keywords sit under the cover */}
          <span className="text-faint sm:hidden">{paper.tags.join(' · ')}</span>
        </div>
      </div>

      <div className="hidden sm:block">
        {hasLink ? (
          <a href={paper.link} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true" className="group block">
            {cover}
          </a>
        ) : (
          cover
        )}
        <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-faint">Keywords</p>
        <ul className="mt-2 flex flex-col items-start gap-1.5">
          {paper.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-rule bg-card px-3 py-0.5 text-sm text-muted">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Full width under both the text and the cover */}
      {showAbstract && (
        <p id={abstractId} className="border-l-2 border-accent/40 pl-4 text-justify hyphens-auto text-[15px] leading-relaxed text-muted sm:col-span-2">
          {paper.abstract}
        </p>
      )}
    </li>
  );
};

const Research: React.FC = () => {
  const underReview = RESEARCH_PAPERS.filter((p) => isUnderReview(p.date)).length;
  const accepted = RESEARCH_PAPERS.filter((p) => isAccepted(p.date)).length;
  const counts = [
    [RESEARCH_PAPERS.length - underReview - accepted, 'published'],
    [accepted, 'accepted'],
    [underReview, 'under review'],
  ] as const;

  return (
    <Section id="research" label="Research" title="Publications">
      <p className="-mt-6 mb-8 md:mb-10 text-sm text-muted">
        {counts
          .filter(([n]) => n > 0)
          .map(([n, label]) => `${n} ${label}`)
          .join(' · ')}
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
