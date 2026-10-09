import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';
import Section from './Section';

// Phones show the latest few roles until "Show all" is pressed; larger screens show everything
const MOBILE_VISIBLE = 3;

// Journey entries are stored oldest-first; a CV reads newest-first.
const Experience: React.FC = () => {
  const entries = [...PROCESS_STEPS].reverse();
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = entries.length - MOBILE_VISIBLE;

  return (
    <Section id="experience" label="Experience" title="Experience & education">
      <ol className="relative border-l border-rule">
        {entries.map((step, i) => {
          const current = i === 0;
          const [role, org] = step.title.split('|').map((part) => part.trim());
          return (
            <li
              key={step.title}
              className={`relative pb-8 pl-8 last:pb-0 md:pb-10 ${i >= MOBILE_VISIBLE && !expanded ? 'hidden md:block' : ''}`}
            >
              <span
                className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full ${
                  current ? 'bg-accent ring-4 ring-accent-soft' : 'border border-faint bg-paper'
                }`}
              />
              <div className="grid gap-1 md:grid-cols-[120px_1fr] md:gap-8">
                <p className="font-mono text-xs leading-7 text-faint">
                  {step.year}
                  {current && <span className="ml-2 text-accent">Now</span>}
                </p>
                <div>
                  <h3 className="font-serif text-xl leading-snug text-ink">
                    {role}
                    {org && <span className="text-muted"> · {org}</span>}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{step.description.trim()}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-rule bg-card px-4 py-2 text-sm font-medium text-ink md:hidden"
        >
          {expanded ? 'Show fewer' : `Show all ${entries.length}`}
          <ChevronDown size={15} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </Section>
  );
};

export default Experience;
