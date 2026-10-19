import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import { CONTAINER } from '../utils/layout';

interface WritingProps {
  onOpenLab: () => void;
}

// Each row moves at a fixed pace per tile, so adding entries never speeds it up
// (tuned by eye at 15 entries: 100 s and 120 s per loop)
const SECONDS_PER_TILE = [100 / 15, 120 / 15];
// On hover the rows keep moving at this fraction of their speed, under a wash of page colour
const HOVER_SPEED = 0.3;
// Rows alternate cover, word, cover, word. A row needs at least 3 covers (6 tiles) to be
// wider than the visible strip, so 9 entries fill three rows without repeating any cover.
const MIN_COVERS_PER_ROW = 3;
const ROWS = 3;
// Below that, the top and bottom rows share these many covers, half a row apart
const SHARED_COVERS = 4;

// Word tiles fill the rows until there are enough covers; each new entry replaces one
// One word each, all six letters, so the tiles read evenly
const WORDS = [
  'Builds', 'Robots', 'Design', 'Sketch', 'Solder', 'Motion', 'Sensor', 'Signal',
  'Wonder', 'Tinker', 'Theory', 'Models', 'Puzzle', 'Sparks', 'Trials',
];
// Three quiet tones so neighbouring word tiles differ
const WORD_TONES = ['border border-rule bg-bar text-ink', 'bg-ink text-paper', 'bg-accent-soft text-accent'];

type Tile = { kind: 'cover'; src: string } | { kind: 'word'; word: string; tone: string };

// Repeat the list until it has at least n items
const atLeast = <T,>(items: T[], n: number) =>
  Array.from({ length: Math.max(n, items.length) }, (_, i) => items[i % items.length]);

// Which covers go in each row. From 9 entries every cover appears once. Before that, the top
// and bottom rows (same direction, same speed) share covers half a row apart, so a cover
// leaving one row is coming into the other; the middle row holds the rest.
const coverRows = (covers: string[]): string[][] => {
  if (covers.length >= ROWS * MIN_COVERS_PER_ROW) {
    return Array.from({ length: ROWS }, (_, r) => covers.filter((_, i) => i % ROWS === r));
  }
  const shared = atLeast(covers.slice(0, SHARED_COVERS), SHARED_COVERS);
  const rest = covers.slice(SHARED_COVERS);
  const middle = atLeast(rest.length ? rest : covers, MIN_COVERS_PER_ROW);
  const half = shared.length / 2;
  return [shared, middle, [...shared.slice(half), ...shared.slice(0, half)]];
};

// Turn each row of covers into tiles: cover, word, cover, word, so like never sits next to like
const buildRows = (covers: string[]): Tile[][] => {
  let wordIndex = 0;
  return coverRows(covers).map((row, r) =>
    row.flatMap((src): Tile[] => {
      const word = WORDS[wordIndex % WORDS.length];
      const tone = WORD_TONES[(wordIndex + r) % WORD_TONES.length];
      wordIndex += 1;
      return [{ kind: 'cover', src }, { kind: 'word', word, tone }];
    }),
  );
};

// The home page's Thought Lab section: three rows of every entry's cover sliding past in
// opposite directions. The whole block opens the Thought Lab page.
const Writing: React.FC<WritingProps> = ({ onOpenLab }) => {
  const rowsRef = useRef<HTMLDivElement>(null);
  const published = THOUGHT_LAB_DATA.articles.filter((a) => a.status === 'published');

  if (!published.length) return null;

  const rows = buildRows(published.map((a) => a.coverImage));

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
                style={{ animationDuration: `${row.length * SECONDS_PER_TILE[r % 2]}s` }}
                className={`flex w-max gap-4 ${
                  r % 2 ? 'motion-safe:animate-[marquee_120s_linear_infinite_reverse]' : 'motion-safe:animate-[marquee_100s_linear_infinite]'
                }`}
              >
                {/* Two copies back to back, so sliding by half loops seamlessly */}
                {[...row, ...row].map((tile, i) =>
                  tile.kind === 'cover' ? (
                    <img key={i} src={tile.src} alt="" loading="lazy" className="aspect-[16/10] w-32 flex-shrink-0 rounded-md object-cover md:w-56" />
                  ) : (
                    <div
                      key={i}
                      aria-hidden
                      className={`flex aspect-[16/10] w-32 flex-shrink-0 items-center justify-center rounded-md md:w-56 ${tile.tone}`}
                    >
                      <span className="font-serif text-xl tracking-tight md:text-3xl">{tile.word}</span>
                    </div>
                  ),
                )}
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
