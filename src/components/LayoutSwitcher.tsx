import React, { useState } from 'react';
import { LayoutGrid, X } from 'lucide-react';
import { setVariant, useVariant } from '../utils/variant';

// Preview-only panel for trying section layouts side by side; not meant for the live site.
const GROUPS = [
  {
    param: 'lab',
    section: 'writing',
    title: 'Thought Lab',
    fallback: 'marquee',
    options: [
      { id: 'bento', label: 'Current bento' },
      { id: 'wall', label: 'P · Tilted wall' },
      { id: 'marquee', label: 'Q · Sliding rows' },
      { id: 'collage', label: 'R · Collage' },
      { id: 'preview-all', label: 'L2 · Full list + preview' },
    ],
  },
  {
    param: 'cta',
    section: 'writing',
    title: 'Button (sliding rows)',
    fallback: 'white',
    options: [
      { id: 'white', label: '1 · White pill (now)' },
      { id: 'dark', label: '2 · Dark pill + count' },
      { id: 'glass', label: '3 · Frosted panel' },
      { id: 'circle', label: '4 · Round badge' },
      { id: 'below', label: '5 · Line underneath' },
    ],
  },
  {
    param: 'count',
    section: 'writing',
    title: 'Pretend there are…',
    fallback: '7',
    options: [
      { id: '7', label: '7 entries (today)' },
      { id: '15', label: '15 entries' },
      { id: '25', label: '25 entries' },
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

// Number setting saved in the URL like the layout choices, e.g. ?wash=20
const Slider: React.FC<{ param: string; label: string; fallback: string; min: number; max: number; step: number }> = ({
  param,
  label,
  fallback,
  min,
  max,
  step,
}) => {
  const value = useVariant(param, fallback);
  return (
    <label className="block">
      <span className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        {label}
        <span className="text-ink">{value}%</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setVariant(param, e.target.value)}
        className="w-full accent-[var(--color-accent)]"
      />
    </label>
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
        <Slider param="wash" label="Hover wash" fallback="20" min={0} max={70} step={5} />
        <Slider param="hoverspeed" label="Hover speed (of normal)" fallback="35" min={0} max={100} step={5} />
      </div>
    </div>
  );
};

export default LayoutSwitcher;
