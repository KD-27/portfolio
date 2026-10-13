import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import { CONTAINER } from '../utils/layout';

interface WritingProps {
  onOpenLab: () => void;
  onOpenArticle: (articleId: string) => void;
}

// Tile spans on a 4-column bento grid: one hero, then a mix of wide and square tiles
const SPANS = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-2',
];

const Writing: React.FC<WritingProps> = ({ onOpenLab, onOpenArticle }) => {
  const published = THOUGHT_LAB_DATA.articles.filter((a) => a.status === 'published');

  if (!published.length) return null;

  return (
    <section id="writing" className="border-t border-rule">
      <div className={`${CONTAINER} py-12 md:py-24`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Side projects</p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-[2.5rem]">Thought Lab</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              Ideas, builds and experiments, written up as I go.
            </p>
          </div>
          <button
            onClick={onOpenLab}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
          >
            All {published.length} entries
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid auto-rows-[260px] gap-3 md:grid-cols-4 md:auto-rows-[230px]">
          {published.map((article, i) => {
            const hero = i === 0;
            const span = SPANS[i] ?? 'md:col-span-2';
            return (
              <button
                key={article.id}
                onClick={() => onOpenArticle(article.id)}
                aria-label={`Read ${article.title}`}
                className={`group relative overflow-hidden rounded-md bg-wash text-left ${span}`}
              >
                <img
                  src={article.coverImage}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 from-15% via-black/65 via-45% to-black/0 to-80%" />
                <ArrowUpRight
                  size={20}
                  className="absolute right-4 top-4 text-white opacity-0 transition-opacity group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
                  <h3 className={`font-serif leading-tight tracking-tight text-white ${hero ? 'text-3xl md:text-[2.2rem]' : 'text-xl'}`}>
                    {article.title}
                  </h3>
                  {/* Square tiles are too narrow for a subtitle; the hero and wide tiles get one */}
                  {(hero || span.includes('col-span-2')) && (
                    <p className={`mt-2 text-sm leading-relaxed text-white/75 ${hero ? 'max-w-md' : 'line-clamp-1'}`}>
                      {article.subtitle}
                    </p>
                  )}
                  {hero && (
                    <p className="mt-3 text-xs text-white/60">
                      {[article.publishedDate, article.readTime].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Writing;
