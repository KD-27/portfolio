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
// Tiles per row: enough that one copy of a row is wider than the screen, so nothing shows twice
const TILES_PER_ROW = 8;
const ROWS = 3;

// Word tiles fill the rows until there are enough covers; each new entry replaces one
const WORDS: [string, string][] = [
  ['Ideas', 'worth testing'],
  ['Builds', 'from the bench'],
  ['Experiments', 'some fail, all teach'],
  ['Write-ups', 'how it actually went'],
  ['Open source', 'released and documented'],
  ['Built by hand', 'soldered and debugged'],
  ['Built with AI', 'AI as a collaborator'],
  ['Prototypes', 'rough, then refined'],
  ['Passion projects', 'after hours'],
  ['Lessons learned', 'kept, not hidden'],
  ['Robotics', 'walk, map, navigate'],
  ['Curiosity', 'where it starts'],
  ['Field notes', 'what the data said'],
  ['Side quests', 'small detours'],
  ['Tinkering', 'weekends well spent'],
  ['Iteration', 'v1 to v5'],
  ['Embedded', 'small chips, big jobs'],
  ['Questions', 'more than answers'],
];
// Three quiet tones so neighbouring word tiles differ
const WORD_TONES = ['border border-rule bg-bar text-ink', 'bg-ink text-paper', 'bg-accent-soft text-accent'];

type Tile = { kind: 'cover'; src: string } | { kind: 'word'; word: string; note: string; tone: string };

// Deal the covers round the rows so each appears once, then spread word tiles between them
const buildRows = (coverImages: string[]): Tile[][] => {
  let wordIndex = 0;
  return Array.from({ length: ROWS }, (_, r) => {
    const covers = coverImages.filter((_, i) => i % ROWS === r);
    const length = Math.max(TILES_PER_ROW, covers.length);
    // Cover k sits at an evenly spaced slot, shifted per row so covers don't line up in columns
    const coverAt = new Map(covers.map((src, k) => [Math.floor(((k + r * 0.4) * length) / covers.length), src]));
    return Array.from({ length }, (_, i): Tile => {
      const src = coverAt.get(i);
      if (src) return { kind: 'cover', src };
      const [word, note] = WORDS[wordIndex % WORDS.length];
      const tone = WORD_TONES[(wordIndex + r) % WORD_TONES.length];
      wordIndex += 1;
      return { kind: 'word', word, note, tone };
    });
  });
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
                    <img key={i} src={tile.src} alt="" loading="lazy" className="aspect-[16/10] w-40 flex-shrink-0 rounded-md object-cover md:w-56" />
                  ) : (
                    <div
                      key={i}
                      aria-hidden
                      className={`flex aspect-[16/10] w-40 flex-shrink-0 flex-col justify-end rounded-md p-4 md:w-56 md:p-5 ${tile.tone}`}
                    >
                      <span className="font-serif text-xl leading-tight tracking-tight md:text-2xl">{tile.word}</span>
                      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] opacity-60">{tile.note}</span>
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
