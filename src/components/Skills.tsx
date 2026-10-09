import React from 'react';
import { SKILLS } from '../constants';
import Section from './Section';

const Skills: React.FC = () => (
  <Section id="skills" label="Skills" title="Skills & tools">
    <dl className="divide-y divide-rule border-y border-rule">
      {SKILLS.map((category) => (
        <div key={category.title} className="grid gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
          <dt className="text-[15px] font-medium text-ink">{category.title}</dt>
          <dd>
            <p className="text-[15px] leading-relaxed text-muted">{category.skills.join(', ')}</p>
            {category.usedIn && category.usedIn.length > 0 && (
              <p className="mt-1 text-sm text-faint">Applied in {category.usedIn.join(', ')}</p>
            )}
          </dd>
        </div>
      ))}
    </dl>
  </Section>
);

export default Skills;
