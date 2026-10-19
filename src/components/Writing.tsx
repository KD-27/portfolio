import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import type { ThoughtLabArticle } from '../types';
import { CONTAINER } from '../utils/layout';
import { useVariant } from '../utils/variant';

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
  'md:col-span-1',
  'md:col-span-1',
];

const CATEGORY_LABEL: Record<NonNullable<ThoughtLabArticle['category']>, string> = {
  software: 'Open source',
  perspective: 'Perspectives',
  hardware: 'Built by hand',
  project: 'Built with AI',
};
const categoryOf = (a: ThoughtLabArticle) => CATEGORY_LABEL[a.category ?? 'perspective'];
// 'October 2026' -> sortable timestamp; undated entries sort first
const dateOf = (a: ThoughtLabArticle) => (a.publishedDate ? Date.parse(`1 ${a.publishedDate}`) : 0);

// How many entries the bounded layouts show before handing over to the full Thought Lab page
const HOME_LIMIT = 6;

const Kicker: React.FC<{ article: ThoughtLabArticle; className?: string }> = ({ article, className = '' }) => (
  <p className={`font-mono text-[11px] uppercase tracking-[0.14em] text-faint ${className}`}>
    {[categoryOf(article), article.readTime].filter(Boolean).join(' · ')}
  </p>
);

// Image on top, text below: the card used by the grid, tabs and rail layouts
const LabCard: React.FC<{ article: ThoughtLabArticle; onClick: () => void; className?: string; large?: boolean }> = ({ article, onClick, className = '', large = false }) => (
  <button onClick={onClick} className={`group text-left ${className}`} aria-label={`Read ${article.title}`}>
    <div className="overflow-hidden rounded-md bg-wash">
      <img
        src={article.coverImage}
        alt=""
        loading="lazy"
        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <Kicker article={article} className="mt-4" />
    <h3 className={`mt-1.5 font-serif leading-snug tracking-tight text-ink group-hover:text-accent transition-colors ${large ? 'text-3xl' : 'text-xl'}`}>
      {article.title}
    </h3>
    <p className={`mt-1.5 leading-relaxed text-muted ${large ? 'max-w-xl text-[15px]' : 'text-sm line-clamp-2'}`}>{article.subtitle}</p>
  </button>
);

const Writing: React.FC<WritingProps> = ({ onOpenLab, onOpenArticle }) => {
  const published = THOUGHT_LAB_DATA.articles.filter((a) => a.status === 'published');
  const byCategory = Object.values(CATEGORY_LABEL)
    .map((title) => ({ title, items: published.filter((a) => categoryOf(a) === title) }))
    .filter((group) => group.items.length);
  const variant = useVariant('lab', 'bento');
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(0);
  // Oldest to newest; same-month entries keep their listed order
  const chronological = [...published].sort((a, b) => dateOf(a) - dateOf(b));
  const railRef = useRef<HTMLDivElement>(null);

  // The timeline opens scrolled to its newest end
  useEffect(() => {
    const rail = railRef.current;
    if (variant === 'timeline' && rail) rail.scrollLeft = rail.scrollWidth;
  }, [variant]);

  if (!published.length) return null;

  const allLink = (
    <button
      onClick={onOpenLab}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
    >
      All {published.length} entries
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </button>
  );

  const scrollRail = (dir: number) => {
    const rail = railRef.current;
    if (rail) rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' });
  };
  const railArrow = 'rounded-full border border-rule p-2 text-ink transition-colors hover:border-ink';

  const header = (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Side projects</p>
        <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-[2.5rem]">Thought Lab</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
          Ideas, builds and experiments, written up as I go.
        </p>
      </div>
      <div className="flex items-center gap-4">
        {(variant === 'rail' || variant === 'timeline') && (
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => scrollRail(-1)} aria-label="Scroll back" className={railArrow}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scrollRail(1)} aria-label="Scroll forward" className={railArrow}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
        {allLink}
      </div>
    </div>
  );

  const body = () => {
    // Option B: the newest entry large on the left, the next four as a list on the right
    if (variant === 'feature') {
      const [lead, ...rest] = published;
      return (
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <button onClick={() => onOpenArticle(lead.id)} className="group text-left" aria-label={`Read ${lead.title}`}>
            <div className="overflow-hidden rounded-md bg-wash">
              <img src={lead.coverImage} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <Kicker article={lead} className="mt-5" />
            <h3 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink group-hover:text-accent transition-colors">{lead.title}</h3>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">{lead.subtitle}</p>
          </button>
          <div className="flex flex-col">
            <ul className="divide-y divide-rule border-y border-rule">
              {rest.slice(0, 4).map((a) => (
                <li key={a.id}>
                  <button onClick={() => onOpenArticle(a.id)} className="group grid w-full grid-cols-[1fr_6rem] items-center gap-4 py-4 text-left" aria-label={`Read ${a.title}`}>
                    <div className="min-w-0">
                      <Kicker article={a} />
                      <h3 className="mt-1 font-serif text-lg leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">{a.title}</h3>
                    </div>
                    <div className="overflow-hidden rounded bg-wash">
                      <img src={a.coverImage} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {rest.length > 4 && (
              <button onClick={onOpenLab} className="group mt-4 inline-flex items-center gap-1.5 self-start text-sm text-muted hover:text-accent transition-colors">
                {rest.length - 4} more in the Thought Lab
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>
      );
    }

    // Option C: one swipeable row of every entry; grows sideways instead of down
    if (variant === 'rail') {
      return (
        <div ref={railRef} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:px-0 md:scroll-px-0">
          {published.map((a) => (
            <LabCard key={a.id} article={a} onClick={() => onOpenArticle(a.id)} className="w-[78%] flex-shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3rem)/3.3)]" />
          ))}
        </div>
      );
    }

    // Option D: a plain three-column grid of the latest six, the rest on the Thought Lab page
    if (variant === 'grid') {
      return (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {published.slice(0, HOME_LIMIT).map((a) => (
            <LabCard key={a.id} article={a} onClick={() => onOpenArticle(a.id)} />
          ))}
        </div>
      );
    }

    // Option E: the same grid with category tabs, so each strand stays findable as it grows
    if (variant === 'tabs') {
      const categories = ['All', ...Object.values(CATEGORY_LABEL).filter((c) => published.some((a) => categoryOf(a) === c))];
      const shown = published.filter((a) => filter === 'All' || categoryOf(a) === filter);
      return (
        <>
          <div className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {categories.map((c) => {
              const count = c === 'All' ? published.length : published.filter((a) => categoryOf(a) === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`flex-shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                    filter === c ? 'border-ink bg-ink text-paper' : 'border-rule text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {c} <span className={filter === c ? 'text-paper/60' : 'text-faint'}>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.slice(0, HOME_LIMIT).map((a) => (
              <LabCard key={a.id} article={a} onClick={() => onOpenArticle(a.id)} />
            ))}
          </div>
        </>
      );
    }

    // Option F: magazine front page, one big story with two beside it and three below
    if (variant === 'magazine') {
      const [lead, ...rest] = published;
      return (
        <>
          <div className="grid gap-x-6 gap-y-10 lg:grid-cols-3">
            <LabCard article={lead} onClick={() => onOpenArticle(lead.id)} large className="self-start lg:col-span-2 lg:row-span-2" />
            {rest.slice(0, 2).map((a) => (
              <LabCard key={a.id} article={a} onClick={() => onOpenArticle(a.id)} />
            ))}
          </div>
          {rest.length > 2 && (
            <div className="mt-10 grid gap-x-6 gap-y-10 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.slice(2, 5).map((a) => (
                <LabCard key={a.id} article={a} onClick={() => onOpenArticle(a.id)} />
              ))}
            </div>
          )}
        </>
      );
    }

    // Option G: a text index, one line per entry; holds many entries in little space
    if (variant === 'index') {
      return (
        <ul className="divide-y divide-rule border-y border-rule">
          {published.slice(0, 8).map((a) => (
            <li key={a.id}>
              <button
                onClick={() => onOpenArticle(a.id)}
                className="group grid w-full items-baseline gap-1 py-5 text-left transition-colors hover:bg-wash/60 md:grid-cols-[11rem_1fr_auto] md:gap-6 md:px-3"
                aria-label={`Read ${a.title}`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{categoryOf(a)}</span>
                <span className="min-w-0">
                  <span className="block font-serif text-xl leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">{a.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{a.subtitle}</span>
                </span>
                <span className="hidden items-center gap-1.5 text-sm text-faint md:inline-flex">
                  {a.readTime}
                  <ArrowUpRight size={15} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      );
    }

    // Option H: shelves, one row per category with its three newest entries
    if (variant === 'shelves') {
      return (
        <div className="space-y-12">
          {byCategory.map((shelf) => (
            <div key={shelf.title}>
              <div className="mb-5 flex items-baseline justify-between border-b border-rule pb-3">
                <h3 className="font-serif text-2xl tracking-tight text-ink">{shelf.title}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{shelf.items.length} {shelf.items.length === 1 ? 'entry' : 'entries'}</span>
              </div>
              <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {shelf.items.slice(0, 3).map((a) => (
                  <LabCard key={a.id} article={a} onClick={() => onOpenArticle(a.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Option I: one column per category, newest entry as a card and the rest as titles
    if (variant === 'columns') {
      return (
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {byCategory.map((col) => (
            <div key={col.title}>
              <p className="mb-4 border-b border-rule pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                {col.title} · {col.items.length}
              </p>
              <LabCard article={col.items[0]} onClick={() => onOpenArticle(col.items[0].id)} />
              {col.items.length > 1 && (
                <ul className="mt-5 divide-y divide-rule border-t border-rule">
                  {col.items.slice(1, 5).map((a) => (
                    <li key={a.id}>
                      <button onClick={() => onOpenArticle(a.id)} className="group w-full py-3 text-left" aria-label={`Read ${a.title}`}>
                        <span className="font-serif text-lg leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">{a.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Option J: the bento's dark image tiles, but in an even grid of the latest six
    if (variant === 'tiles') {
      return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {published.slice(0, HOME_LIMIT).map((a) => (
            <button
              key={a.id}
              onClick={() => onOpenArticle(a.id)}
              aria-label={`Read ${a.title}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-md bg-wash text-left"
            >
              <img src={a.coverImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 from-15% via-black/60 via-45% to-black/0 to-80%" />
              <div className="absolute inset-x-0 bottom-0 p-5 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">{categoryOf(a)}</p>
                <h3 className="mt-1.5 font-serif text-xl leading-tight tracking-tight text-white">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75 line-clamp-2">{a.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      );
    }

    // Option K: small versions of the project cards, image left and text right, four in two columns
    if (variant === 'wide') {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {published.slice(0, 4).map((a) => (
            <button
              key={a.id}
              onClick={() => onOpenArticle(a.id)}
              aria-label={`Read ${a.title}`}
              className="group grid grid-cols-[38%_1fr] overflow-hidden rounded-lg border border-rule bg-bar text-left transition-all duration-300 hover:border-faint/50 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="overflow-hidden bg-wash">
                <img src={a.coverImage} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex min-h-[8.5rem] flex-col p-4 md:p-5">
                <Kicker article={a} />
                <h3 className="mt-1.5 font-serif text-lg leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted line-clamp-2">{a.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      );
    }

    // Option L: titles on the left; the one under the pointer previews on the right
    if (variant === 'preview') {
      const list = published.slice(0, 5);
      const current = list[Math.min(active, list.length - 1)];
      return (
        <div className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:gap-10">
          <ul className="divide-y divide-rule border-y border-rule">
            {list.map((a, i) => (
              <li key={a.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => onOpenArticle(a.id)}
                  aria-label={`Read ${a.title}`}
                  className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="min-w-0">
                    <Kicker article={a} />
                    <span className={`mt-1 block font-serif text-xl leading-snug tracking-tight transition-colors ${i === active ? 'text-accent' : 'text-ink'}`}>
                      {a.title}
                    </span>
                  </span>
                  <ArrowRight size={16} className={`flex-shrink-0 transition-all ${i === active ? 'translate-x-0 text-accent opacity-100' : '-translate-x-1 opacity-0'}`} />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => onOpenArticle(current.id)} aria-label={`Read ${current.title}`} className="hidden text-left md:block">
            <div className="overflow-hidden rounded-md bg-wash">
              <img key={current.id} src={current.coverImage} alt="" className="aspect-[16/10] w-full object-cover animate-[fadeIn_.3s_ease]" />
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{current.subtitle}</p>
          </button>
        </div>
      );
    }

    // Option M: one entry at a time, large, with arrows and dots; holds any number
    if (variant === 'carousel') {
      const current = published[active % published.length];
      const go = (d: number) => setActive((i) => (i + d + published.length) % published.length);
      return (
        <div>
          <button
            onClick={() => onOpenArticle(current.id)}
            aria-label={`Read ${current.title}`}
            className="group grid w-full overflow-hidden rounded-lg border border-rule bg-bar text-left md:grid-cols-[1.4fr_1fr]"
          >
            <div className="overflow-hidden bg-wash">
              <img key={current.id} src={current.coverImage} alt="" className="aspect-[16/10] w-full object-cover animate-[fadeIn_.3s_ease] md:aspect-auto md:h-full" />
            </div>
            <div className="flex flex-col p-6 md:min-h-[18rem] md:p-8">
              <Kicker article={current} />
              <h3 className="mt-2 font-serif text-2xl leading-tight tracking-tight text-ink group-hover:text-accent transition-colors md:text-3xl">{current.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{current.subtitle}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ink group-hover:text-accent transition-colors">
                Read <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {published.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${a.title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active % published.length ? 'w-6 bg-ink' : 'w-1.5 bg-faint/50'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous entry" className={railArrow}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => go(1)} aria-label="Next entry" className={railArrow}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Option N: a horizontal timeline, oldest to newest, opened at the newest end
    if (variant === 'timeline') {
      return (
        <div ref={railRef} className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <ol className="relative flex w-max min-w-full gap-5">
            <span className="absolute inset-x-0 top-[5px] h-px bg-rule" aria-hidden />
            {chronological.map((a, i) => {
              const newMonth = i === 0 || chronological[i - 1].publishedDate !== a.publishedDate;
              return (
                <li key={a.id} className="relative w-[200px] flex-shrink-0">
                  <span className={`relative block h-2.5 w-2.5 rounded-full ring-4 ring-paper ${newMonth ? 'bg-ink' : 'bg-faint'}`} />
                  <p className={`mt-3 mb-3 font-mono text-[11px] uppercase tracking-[0.14em] ${newMonth ? 'text-ink' : 'text-faint'}`}>{a.publishedDate}</p>
                  <button onClick={() => onOpenArticle(a.id)} aria-label={`Read ${a.title}`} className="group block text-left">
                    <div className="overflow-hidden rounded-md bg-wash">
                      <img src={a.coverImage} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{categoryOf(a)}</p>
                    <h3 className="mt-1 font-serif text-base leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">{a.title}</h3>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      );
    }

    // Option A (current): bento grid
    return (
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
    );
  };

  return (
    <section id="writing" className="border-t border-rule">
      <div className={`${CONTAINER} py-12 md:py-24`}>
        {header}
        {body()}
      </div>
    </section>
  );
};

export default Writing;
