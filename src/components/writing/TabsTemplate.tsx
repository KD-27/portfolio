import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { categoryLabel } from '../../utils/thoughtLab';
import Section from '../Section';
import Cover from './Cover';
import { GROUPS, metaLine, type TemplateProps } from './shared';

const TabsTemplate: React.FC<TemplateProps & { onOpenLab: () => void }> = ({ articles, onOpenArticle, onOpenLab }) => {
  const [tab, setTab] = useState<string>('all');
  const tabs = [
    { id: 'all', title: 'All', count: articles.length },
    ...GROUPS.map((g) => ({ id: g.id, title: g.title, count: articles.filter((a) => (a.category ?? 'perspective') === g.id).length })),
  ].filter((t) => t.count > 0);
  const shown = tab === 'all' ? articles : articles.filter((a) => (a.category ?? 'perspective') === tab);
  const blurb = GROUPS.find((g) => g.id === tab)?.blurb ?? 'Ideas, builds and experiments, written up as I go.';

  return (
    <Section
      id="writing"
      label="Writing"
      title="Thought Lab"
      action={
        <button onClick={onOpenLab} className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors">
          All {articles.length} entries
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      }
    >
      <div className="-mt-4 mb-3 flex flex-wrap gap-2" role="tablist" aria-label="Thought Lab categories">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              tab === t.id ? 'border-ink bg-ink text-paper' : 'border-rule bg-card text-muted hover:border-ink hover:text-ink'
            }`}
          >
            {t.title} <span className={tab === t.id ? 'opacity-60' : 'text-faint'}>{t.count}</span>
          </button>
        ))}
      </div>
      <p className="mb-8 text-sm text-muted">{blurb}</p>

      <div key={tab} className="grid animate-fade-in items-start gap-x-6 gap-y-10 sm:grid-cols-2">
        {shown.map((a) => (
          <button key={a.id} onClick={() => onOpenArticle(a.id)} className="group text-left">
            <div className="overflow-hidden rounded-sm bg-wash">
              <Cover src={a.coverImage} className="aspect-[16/10]" />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{categoryLabel(a)}</p>
            <h3 className="mt-1.5 font-serif text-2xl leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">
              {a.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.subtitle}</p>
            <p className="mt-3 text-sm text-faint">{metaLine(a)}</p>
          </button>
        ))}
      </div>
    </Section>
  );
};

export default TabsTemplate;
