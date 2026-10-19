import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import { CONTAINER } from '../utils/layout';

interface WritingProps {
  onOpenLab: () => void;
}

// Each row moves at a fixed pace per cover, so adding entries never speeds it up
// (tuned by eye at 15 entries: 100 s and 120 s per loop)
const SECONDS_PER_COVER = [100 / 15, 120 / 15];
// On hover the rows keep moving at this fraction of their speed, under a wash of page colour
const HOVER_SPEED = 0.3;
const MIN_COVERS_PER_ROW = 8;

// The home page's Thought Lab section: three rows of every entry's cover sliding past in
// opposite directions. The whole block opens the Thought Lab page.
const Writing: React.FC<WritingProps> = ({ onOpenLab }) => {
  const rowsRef = useRef<HTMLDivElement>(null);
  const published = THOUGHT_LAB_DATA.articles.filter((a) => a.status === 'published');

  if (!published.length) return null;

  const covers = published.map((a) => a.coverImage);
  // Repeat the covers until a row is long enough to loop, offset so the rows differ
  const rows = [0, 2, 4].map((offset) =>
    Array.from({ length: Math.max(MIN_COVERS_PER_ROW, covers.length) }, (_, i) => covers[(i + offset) % covers.length]),
  );

  // Changing playbackRate (not the duration) eases the speed without the rows jumping
  const setRowSpeed = (rate: number) =>
    rowsRef.current?.getAnimations({ subtree: true }).forEach((a) => a.updatePlaybackRate(rate));

  return (
    <section id="writing" className="border-t border-rule">
      <div className={`${CONTAINER} py-12 md:py-24`}>
        <div className="mb-8 md:mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Side projects</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-[2.5rem]">Thought Lab</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Ideas, builds and experiments, written up as I go.
          </p>
        </div>

        <button
          onClick={onOpenLab}
          onMouseEnter={() => setRowSpeed(HOVER_SPEED)}
          onMouseLeave={() => setRowSpeed(1)}
          onFocus={() => setRowSpeed(HOVER_SPEED)}
          onBlur={() => setRowSpeed(1)}
          aria-label={`Open the Thought Lab: ${published.length} entries`}
          className="group relative block w-full overflow-hidden py-2 text-left"
        >
          <div ref={rowsRef} className="relative space-y-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            {rows.map((row, r) => (
              <div
                key={r}
                style={{ animationDuration: `${row.length * SECONDS_PER_COVER[r % 2]}s` }}
                className={`flex w-max gap-4 ${
                  r % 2 ? 'motion-safe:animate-[marquee_120s_linear_infinite_reverse]' : 'motion-safe:animate-[marquee_100s_linear_infinite]'
                }`}
              >
                {/* Two copies back to back, so sliding by half loops seamlessly */}
                {[...row, ...row].map((src, i) => (
                  <img key={i} src={src} alt="" loading="lazy" className="aspect-[16/10] w-40 flex-shrink-0 rounded-md object-cover md:w-56" />
                ))}
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-paper opacity-0 transition-opacity duration-200 group-hover:opacity-60" />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-4 rounded-full bg-ink py-1.5 pl-6 pr-1.5 text-sm font-medium text-paper shadow-xl">
              Explore the Thought Lab
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                <ArrowRight size={16} />
              </span>
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Writing;
