import React from 'react';
import { PROCESS_STEPS } from '../constants';
import Section from './Section';

// Journey entries are stored oldest-first; a CV reads newest-first.
const Experience: React.FC = () => {
  const entries = [...PROCESS_STEPS].reverse();

  return (
    <Section id="experience" label="Experience" title="Experience & education">
      <ol className="relative border-l border-rule">
        {entries.map((step, i) => {
          const current = i === 0;
          const [role, org] = step.title.split('|').map((part) => part.trim());
          return (
            <li key={step.title} className="relative pb-10 pl-8 last:pb-0">
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
    </Section>
  );
};

export default Experience;
