import React, { useState } from 'react';
import { LayoutGrid, X } from 'lucide-react';
import { setVariant, useVariant } from '../utils/variant';

// Preview-only panel for trying section layouts side by side; not meant for the live site.
const GROUPS = [
  {
    param: 'lab',
    section: 'writing',
    title: 'Thought Lab',
    fallback: 'bento',
    options: [
      { id: 'bento', label: 'Current bento' },
      { id: 'wide', label: 'K · Small wide cards' },
      { id: 'preview', label: 'L · List + preview' },
      { id: 'carousel', label: 'M · Carousel' },
      { id: 'timeline', label: 'N · Timeline' },
    ],
  },
];

const Group: React.FC<(typeof GROUPS)[number]> = ({ param, section, title, fallback, options }) => {
  const current = useVariant(param, fallback);
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => {
              setVariant(param, o.id);
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
              current === o.id ? 'border-ink bg-ink text-paper' : 'border-rule text-muted hover:border-ink hover:text-ink'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const LayoutSwitcher: React.FC = () => {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper shadow-lg"
      >
        <LayoutGrid size={16} /> Layouts
      </button>
    );
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 rounded-lg border border-rule bg-paper/95 p-4 shadow-xl backdrop-blur sm:inset-x-auto sm:left-4 sm:bottom-4 sm:w-[380px]">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-ink">Layout preview</p>
        <button onClick={() => setOpen(false)} aria-label="Hide layout panel" className="text-faint hover:text-ink">
          <X size={16} />
        </button>
      </div>
      <div className="space-y-4">
        {GROUPS.map((g) => (
          <Group key={g.param} {...g} />
        ))}
      </div>
    </div>
  );
};

export default LayoutSwitcher;
