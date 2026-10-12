import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { categoryLabel } from '../../utils/thoughtLab';
import { CONTAINER } from '../../utils/layout';
import Cover from './Cover';
import { metaLine, type TemplateProps } from './shared';

// Tile spans on a 4-column grid: one hero, then a mix of wide and square tiles
const SPANS = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-2',
];

const BentoTemplate: React.FC<TemplateProps & { onOpenLab: () => void }> = ({ articles, onOpenArticle, onOpenLab }) => (
  <section id="writing" className="border-t border-rule">
    <div className={`${CONTAINER} py-12 md:py-24`}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
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

      <div className="grid auto-rows-[260px] gap-3 md:grid-cols-4 md:auto-rows-[230px]">
        {articles.map((a, i) => {
          const hero = i === 0;
          return (
            <button
              key={a.id}
              onClick={() => onOpenArticle(a.id)}
              className={`group relative overflow-hidden rounded-md bg-wash text-left ${SPANS[i] ?? 'md:col-span-2'}`}
            >
              <Cover src={a.coverImage} className="absolute inset-0 h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/0" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#17171b]">
                {categoryLabel(a)}
              </span>
              <ArrowUpRight
                size={20}
                className="absolute right-4 top-4 text-white opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className={`font-serif leading-tight tracking-tight text-white ${hero ? 'text-3xl md:text-[2.2rem]' : 'text-xl'}`}>
                  {a.title}
                </h3>
                {(hero || SPANS[i]?.includes('col-span-2')) && (
                  <p className={`mt-2 text-sm leading-relaxed text-white/75 ${hero ? 'max-w-md' : 'line-clamp-1'}`}>{a.subtitle}</p>
                )}
                {hero && <p className="mt-3 text-xs text-white/60">{metaLine(a)}</p>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

export default BentoTemplate;
