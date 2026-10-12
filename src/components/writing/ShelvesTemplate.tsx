import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CONTAINER } from '../../utils/layout';
import Cover from './Cover';
import { GROUPS, metaLine, type TemplateProps } from './shared';
import type { ThoughtLabArticle } from '../../types';

const Shelf: React.FC<{ title: string; blurb: string; items: ThoughtLabArticle[]; onOpenArticle: (id: string) => void }> = ({
  title,
  blurb,
  items,
  onOpenArticle,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => rowRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  return (
    <div className="mt-12 first:mt-0">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl tracking-tight text-ink">
            {title} <span className="font-sans text-sm text-faint">{items.length}</span>
          </h3>
          <p className="mt-1 text-sm text-muted">{blurb}</p>
        </div>
        {items.length > 3 && (
        <div className="hidden gap-2 md:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              onClick={() => nudge(d)}
              aria-label={d < 0 ? `Scroll ${title} left` : `Scroll ${title} right`}
              className="rounded-full border border-rule p-2 text-muted hover:border-ink hover:text-ink transition-colors"
            >
              {d < 0 ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </button>
          ))}
        </div>
        )}
      </div>

      <div ref={rowRef} className="-mx-5 flex items-start snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:scroll-px-0 md:px-0 [scrollbar-width:none]">
        {items.map((a) => (
          <button
            key={a.id}
            onClick={() => onOpenArticle(a.id)}
            className="group w-[78%] flex-shrink-0 snap-start text-left sm:w-[320px]"
          >
            <div className="overflow-hidden rounded-sm bg-wash">
              <Cover src={a.coverImage} className="aspect-[4/3]" />
            </div>
            <h4 className="mt-3 font-serif text-xl leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">
              {a.title}
            </h4>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{a.subtitle}</p>
            <p className="mt-2 text-xs text-faint">{metaLine(a)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// Streaming-app style: one horizontally scrolling shelf per category
const ShelvesTemplate: React.FC<TemplateProps & { onOpenLab: () => void }> = ({ articles, onOpenArticle, onOpenLab }) => (
  <section id="writing" className="border-t border-rule">
    <div className={`${CONTAINER} py-12 md:py-24`}>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Writing</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-[2.5rem]">Thought Lab</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">Ideas, builds and experiments, written up as I go.</p>
        </div>
        <button onClick={onOpenLab} className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors">
          All {articles.length} entries
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {GROUPS.map((g) => {
        const items = articles.filter((a) => (a.category ?? 'perspective') === g.id);
        return items.length ? <Shelf key={g.id} title={g.title} blurb={g.blurb} items={items} onOpenArticle={onOpenArticle} /> : null;
      })}
    </div>
  </section>
);

export default ShelvesTemplate;
