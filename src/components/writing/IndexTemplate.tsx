import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { categoryLabel } from '../../utils/thoughtLab';
import Section from '../Section';
import type { TemplateProps } from './shared';

// Magazine contents page: big numbered titles, and the cover floats beside the cursor on hover
const IndexTemplate: React.FC<TemplateProps & { onOpenLab: () => void }> = ({ articles, onOpenArticle, onOpenLab }) => {
  const listRef = useRef<HTMLOListElement>(null);
  const [hover, setHover] = useState<{ src: string; x: number; y: number } | null>(null);

  const track = (src: string) => (e: React.MouseEvent) => {
    const box = listRef.current?.getBoundingClientRect();
    if (!box) return;
    // Keep the 256px preview inside the list
    setHover({ src, x: Math.min(e.clientX - box.left + 24, box.width - 280), y: e.clientY - box.top });
  };

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
      <p className="-mt-6 mb-8 max-w-2xl text-[15px] leading-relaxed text-muted md:mb-10">
        Ideas, builds and experiments, written up as I go.
      </p>

      <ol ref={listRef} className="relative border-t border-ink" onMouseLeave={() => setHover(null)}>
        {articles.map((a, i) => (
          <li key={a.id} className="border-b border-rule">
            <button
              onClick={() => onOpenArticle(a.id)}
              onMouseMove={track(a.coverImage)}
              className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 text-left md:grid-cols-[3.5rem_1fr_9rem_1.5rem]"
            >
              <span className="font-mono text-sm text-faint">{String(i + 1).padStart(2, '0')}</span>
              <span className="min-w-0">
                <span className="block font-serif text-2xl leading-tight tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 md:text-[2rem]">
                  {a.title}
                </span>
                <span className="mt-1.5 block text-sm text-muted">{a.subtitle}</span>
                <img src={a.coverImage} alt="" loading="lazy" className="mt-4 aspect-[16/9] w-full rounded-sm object-cover md:hidden" />
              </span>
              <span className="hidden text-right md:block">
                <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{categoryLabel(a)}</span>
                <span className="mt-1 block text-xs text-faint">{a.publishedDate}</span>
              </span>
              <ArrowUpRight size={18} className="hidden self-center text-faint transition-colors group-hover:text-accent md:block" />
            </button>
          </li>
        ))}

        {hover && (
          <img
            src={hover.src}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute z-10 hidden w-64 -translate-y-1/2 rounded-sm shadow-2xl ring-1 ring-black/10 md:block"
            style={{ left: hover.x, top: hover.y }}
          />
        )}
      </ol>
    </Section>
  );
};

export default IndexTemplate;
