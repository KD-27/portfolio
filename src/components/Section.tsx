import React from 'react';
import { CONTAINER } from '../utils/layout';

interface SectionProps {
  id: string;
  /** Small label in the left margin, e.g. "Publications" */
  label: string;
  title?: string;
  /** Optional link or button shown to the right of the title */
  action?: React.ReactNode;
  children: React.ReactNode;
}

// Two-column academic layout: a quiet label in the margin, content on the right.
const Section: React.FC<SectionProps> = ({ id, label, title, action, children }) => (
  <section id={id} className="border-t border-rule">
    <div className={`${CONTAINER} py-16 md:py-24`}>
      <div className="grid gap-6 md:grid-cols-[160px_1fr] md:gap-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint md:sticky md:top-24">
            {label}
          </p>
        </div>
        <div className="min-w-0">
          {(title || action) && (
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              {title && (
                <h2 className="font-serif text-3xl md:text-[2.5rem] leading-tight tracking-tight text-ink">
                  {title}
                </h2>
              )}
              {action}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  </section>
);

export default Section;
