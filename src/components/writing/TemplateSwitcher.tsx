import React from 'react';
import { TEMPLATES, saveTemplate, type TemplateId } from './templates';

// Preview-only: rendered on the dev server so layouts can be compared side by side
const TemplateSwitcher: React.FC<{ value: TemplateId; onChange: (id: TemplateId) => void }> = ({ value, onChange }) => (
  <div className="fixed bottom-5 left-1/2 z-50 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full border border-rule bg-card/95 p-1 shadow-xl backdrop-blur">
    <span className="hidden px-3 font-mono text-[10px] sm:inline uppercase tracking-[0.14em] text-faint">Thought Lab</span>
    {TEMPLATES.map((t, i) => (
      <button
        key={t.id}
        onClick={() => {
          saveTemplate(t.id);
          onChange(t.id);
          document.getElementById('writing')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`flex-shrink-0 rounded-full px-2.5 py-1.5 text-sm transition-colors sm:px-3 ${
          value === t.id ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
        }`}
      >
        <span className="mr-1 font-mono text-[11px] opacity-60">{i + 1}</span>
        {t.label}
      </button>
    ))}
  </div>
);

export default TemplateSwitcher;
