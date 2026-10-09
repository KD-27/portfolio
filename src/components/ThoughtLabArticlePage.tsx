import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, Check, Link2,
  Construction, Info, AlertCircle, Lightbulb,
  Download, BarChart3, Crosshair, BookOpen, PenLine, Mic, Clapperboard, Package,
  Monitor, Smartphone, Image as ImageIcon, FileText, CornerDownRight, Workflow,
  Cpu, Wifi, Compass, Activity, Footprints, Ruler, Gauge, SlidersHorizontal, Filter,
  type LucideIcon
} from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import type { ContentBlock, FlowStep, FlowOutput, TimelineEntry } from '../types';
import { getYoutubeEmbedUrl } from '../utils/media';
import { categoryLabel } from '../utils/thoughtLab';
import Contact from './Contact';

interface ThoughtLabArticlePageProps {
  articleId: string;
  onBack: () => void;
  onBackToLab: () => void;
  onSelectArticle: (articleId: string) => void;
}

// Reading column width, shared by the header and the body so they align
const COLUMN = 'mx-auto w-full max-w-[720px] px-5';

// =========================================
// CONTENT BLOCK RENDERERS
// =========================================

// Turns raw URLs inside a string into clickable links
const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const linkify = (text: string): React.ReactNode => {
  const parts = text.split(URL_REGEX);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    URL_REGEX.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noreferrer"
        className="break-all text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
      >
        {part}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const TextBlock: React.FC<{ content: string }> = ({ content }) => (
  <p className="mb-6 text-[17px] leading-[1.75] text-ink/85">{linkify(content)}</p>
);

const HeadingBlock: React.FC<{ content: string; level?: 2 | 3 | 4 }> = ({ content, level = 2 }) => {
  if (level === 4) {
    return <h4 className="mt-6 mb-3 text-base font-semibold text-ink">{content}</h4>;
  }
  if (level === 3) {
    return <h3 className="mt-10 mb-4 font-serif text-2xl leading-snug text-ink">{content}</h3>;
  }
  return (
    <h2 className="mt-16 mb-6 border-t border-rule pt-8 font-serif text-3xl leading-tight tracking-tight text-ink">
      {content}
    </h2>
  );
};

const EquationBlock: React.FC<{ content: string }> = ({ content }) => (
  <div className="my-8 overflow-x-auto rounded-sm border border-rule bg-white px-6 py-5">
    <p className="whitespace-nowrap text-center font-mono text-[15px] text-ink md:text-base">{content}</p>
  </div>
);

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <figcaption className="mt-3 text-sm leading-relaxed text-faint">{children}</figcaption>
);

const ImageBlock: React.FC<{ src: string; caption?: string; alt?: string }> = ({ src, caption, alt }) => (
  <figure className="my-10">
    <img
      src={src}
      alt={alt || caption || 'Article image'}
      loading="lazy"
      className="h-auto w-full rounded-sm border border-rule bg-white"
    />
    {caption && <Caption>{caption}</Caption>}
  </figure>
);

// `fit` fills the parent's width instead of using the article's default video widths
const VideoBlock: React.FC<{ src: string; caption?: string; vertical?: boolean; fit?: boolean }> = ({ src, caption, vertical, fit }) => {
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay (muted, so browsers allow it) while at least half the video is on
  // screen, and pause again once it scrolls away. Only one video plays at a time.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const pauseOthers = () => {
      document.querySelectorAll('video').forEach(other => {
        if (other !== video) other.pause();
      });
    };
    video.addEventListener('play', pauseOthers);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
        else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => {});
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener('play', pauseOthers);
    };
  }, []);

  return (
    <figure className={`mx-auto ${fit ? 'my-4 w-full' : `my-10 ${vertical ? 'w-2/3 max-w-xs sm:w-2/5' : 'w-full'}`}`}>
      <div className={`${vertical ? 'aspect-[9/16]' : 'aspect-video'} overflow-hidden rounded-sm bg-ink`}>
        {isYouTube ? (
          <iframe
            src={getYoutubeEmbedUrl(src)}
            title={caption || 'Video'}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <video ref={videoRef} src={src} controls muted loop playsInline className="h-full w-full" preload="metadata">
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
};

const QuoteBlock: React.FC<{ content: string; author?: string }> = ({ content, author }) => (
  <blockquote className="my-10 border-l-2 border-accent pl-6">
    <p className="font-serif text-2xl italic leading-snug text-ink">“{content}”</p>
    {author && <footer className="mt-3 text-sm text-muted">— {author}</footer>}
  </blockquote>
);

const ListBlock: React.FC<{ items: string[]; ordered?: boolean }> = ({ items, ordered }) => {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <ListTag className="my-6 space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-[17px] leading-[1.7] text-ink/85">
          {ordered ? (
            <span className="mt-[3px] w-5 flex-shrink-0 font-mono text-sm text-faint">{idx + 1}.</span>
          ) : (
            <span className="mt-[11px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/70" />
          )}
          <span className="min-w-0">{linkify(item)}</span>
        </li>
      ))}
    </ListTag>
  );
};

const DividerBlock: React.FC = () => <hr className="my-12 border-rule" />;

const CalloutBlock: React.FC<{ content: string; variant?: 'info' | 'warning' | 'tip' }> = ({
  content,
  variant = 'info'
}) => {
  const styles = {
    info: { box: 'bg-accent-soft border-accent/20', icon: <Info className="h-5 w-5 flex-shrink-0 text-accent" /> },
    warning: { box: 'bg-amber-50 border-amber-200', icon: <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-700" /> },
    tip: { box: 'bg-emerald-50 border-emerald-200', icon: <Lightbulb className="h-5 w-5 flex-shrink-0 text-emerald-700" /> }
  };
  const style = styles[variant];

  return (
    <div className={`my-8 flex items-start gap-3 rounded-sm border p-4 ${style.box}`}>
      {style.icon}
      <p className="text-[15px] leading-relaxed text-ink/85">{content}</p>
    </div>
  );
};

// =========================================
// FLOWCHART BLOCK
// =========================================

const FLOW_ICONS: Record<string, LucideIcon> = {
  Download, BarChart3, Crosshair, BookOpen, PenLine, Mic, Clapperboard, Package,
  Monitor, Smartphone, Image: ImageIcon, FileText,
  Cpu, Wifi, Compass, Activity, Footprints, Ruler, Gauge, SlidersHorizontal, Filter, Lightbulb
};

// Static class names so Tailwind keeps them; the output grid matches the fork's branch count
const OUTPUT_COLS = ['', 'md:grid-cols-1', 'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4'];

// Phases are coloured in order of first appearance: blue -> green -> amber
const PHASE_STYLES = [
  { text: 'text-accent', border: 'border-accent/40', bg: 'bg-accent-soft' },
  { text: 'text-emerald-700', border: 'border-emerald-600/40', bg: 'bg-emerald-50' },
  { text: 'text-amber-700', border: 'border-amber-600/40', bg: 'bg-amber-50' }
];

const FlowBlock: React.FC<{ steps: FlowStep[]; outputs?: FlowOutput[]; caption?: string }> = ({ steps, outputs, caption }) => {
  const phases = Array.from(new Set(steps.map(s => s.phase).filter(Boolean))) as string[];
  const styleFor = (phase?: string) => PHASE_STYLES[Math.max(0, phases.indexOf(phase ?? '')) % PHASE_STYLES.length];

  return (
    <figure className="my-12">
      {phases.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {phases.map(phase => {
            const st = styleFor(phase);
            return (
              <span key={phase} className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${st.border} ${st.bg} ${st.text}`}>
                {phase}
              </span>
            );
          })}
        </div>
      )}

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-5 w-px -translate-x-1/2 bg-rule" />
        <ol className="space-y-5">
          {steps.map((step, i) => {
            const st = styleFor(step.phase);
            const Icon = FLOW_ICONS[step.icon ?? ''] ?? Workflow;
            return (
              <li key={i} className="relative grid grid-cols-[2.5rem_1fr] items-start gap-x-4">
                <div className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-paper ${st.border} ${st.text}`}>
                  <Icon size={18} />
                </div>
                <div className="rounded-sm border border-rule bg-white p-4">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className={`font-mono text-xs ${st.text}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-semibold text-ink">{step.title}</span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted">{step.detail}</p>
                  {step.tools && step.tools.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {step.tools.map(tool => (
                        <span key={tool} className="rounded-sm bg-wash px-2 py-0.5 font-mono text-[11px] text-muted">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.note && (
                    <div className="mt-3 flex items-start gap-1.5 rounded-sm border border-dashed border-amber-400 px-2 py-1.5 text-xs text-amber-800">
                      <CornerDownRight size={12} className="mt-0.5 flex-shrink-0" />
                      <span>{step.note}</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {outputs && outputs.length > 0 && (
        <div className="mt-6 pl-14">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-faint">Outputs</p>
          <div className={`grid grid-cols-2 gap-3 ${OUTPUT_COLS[Math.min(outputs.length, 4)]}`}>
            {outputs.map(out => {
              const Icon = FLOW_ICONS[out.icon ?? ''] ?? Package;
              return (
                <div key={out.label} className="rounded-sm border border-rule bg-white p-3 text-center">
                  <Icon size={20} className="mx-auto mb-2 text-accent" />
                  <div className="text-sm font-semibold text-ink">{out.label}</div>
                  {out.detail && <div className="mt-0.5 text-xs text-faint">{out.detail}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
};

// =========================================
// GALLERY BLOCK
// =========================================

const GalleryBlock: React.FC<{ images: { src: string; caption?: string }[]; caption?: string }> = ({ images, caption }) => (
  <figure className="my-10">
    <div className={`grid grid-cols-2 gap-3 ${images.length % 3 === 0 ? 'md:grid-cols-3' : ''}`}>
      {images.map(img => (
        <div key={img.src}>
          <img
            src={img.src}
            alt={img.caption || caption || 'Gallery image'}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-sm border border-rule bg-white object-cover"
          />
          {img.caption && <p className="mt-2 text-xs leading-snug text-faint">{img.caption}</p>}
        </div>
      ))}
    </div>
    {caption && <Caption>{caption}</Caption>}
  </figure>
);

// =========================================
// TIMELINE BLOCK
// =========================================

const TimelineBlock: React.FC<{ entries: TimelineEntry[] }> = ({ entries }) => (
  <div className="relative my-12">
    <div className="absolute top-2 bottom-2 left-4 w-px -translate-x-1/2 bg-rule" />
    <ol className="space-y-10">
      {entries.map((entry, i) => {
        const wide = entry.media?.filter(m => !m.vertical) ?? [];
        const tall = entry.media?.filter(m => m.vertical) ?? [];
        return (
          <li key={i} className="relative pl-12">
            <div className="absolute left-4 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-accent/40 bg-paper font-mono text-xs text-accent">
              {i + 1}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex-1">
                <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-faint">{entry.label}</p>
                <h4 className="mb-2 font-serif text-xl leading-snug text-ink">{entry.title}</h4>
                <p className="text-[15px] leading-relaxed text-muted">{entry.detail}</p>
              </div>
              {entry.stat && (
                <div className="flex-shrink-0 rounded-sm border border-rule bg-white px-4 py-3 text-center sm:w-36">
                  <div className="font-serif text-3xl text-accent">{entry.stat.value}</div>
                  <div className="mt-1 text-[11px] leading-snug text-faint">{entry.stat.label}</div>
                </div>
              )}
            </div>

            {entry.added && entry.added.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 font-mono text-[11px] text-faint">+ ADDED</span>
                {entry.added.map(item => (
                  <span key={item} className="rounded-sm bg-wash px-2 py-0.5 text-xs text-muted">{item}</span>
                ))}
              </div>
            )}

            {wide.map(m => (
              <div key={m.src} className="mt-2">
                {m.type === 'video'
                  ? <VideoBlock src={m.src} caption={m.caption} fit />
                  : <ImageBlock src={m.src} caption={m.caption} />}
              </div>
            ))}
            {tall.length > 0 && (
              <div className="mt-2 flex flex-wrap justify-center gap-6">
                {tall.map(m => (
                  <div key={m.src} className="w-44 sm:w-52">
                    <VideoBlock src={m.src} caption={m.caption} vertical fit />
                  </div>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  </div>
);

// Main content block renderer
const ContentBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'text':
      return <TextBlock content={block.content} />;
    case 'heading':
      return <HeadingBlock content={block.content} level={block.level} />;
    case 'image':
      return <ImageBlock src={block.src} caption={block.caption} alt={block.alt} />;
    case 'video':
      return <VideoBlock src={block.src} caption={block.caption} vertical={block.vertical} />;
    case 'quote':
      return <QuoteBlock content={block.content} author={block.author} />;
    case 'list':
      return <ListBlock items={block.items} ordered={block.ordered} />;
    case 'divider':
      return <DividerBlock />;
    case 'callout':
      return <CalloutBlock content={block.content} variant={block.variant} />;
    case 'equation':
      return <EquationBlock content={block.content} />;
    case 'flow':
      return <FlowBlock steps={block.steps} outputs={block.outputs} caption={block.caption} />;
    case 'timeline':
      return <TimelineBlock entries={block.entries} />;
    case 'gallery':
      return <GalleryBlock images={block.images} caption={block.caption} />;
    default:
      return null;
  }
};

// =========================================
// MAIN COMPONENT
// =========================================

const ThoughtLabArticlePage: React.FC<ThoughtLabArticlePageProps> = ({
  articleId,
  onBack,
  onBackToLab,
  onSelectArticle
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied or unavailable — nothing to fall back to here.
    }
  };

  const visible = THOUGHT_LAB_DATA.articles.filter(a => a.status !== 'draft');
  const article = THOUGHT_LAB_DATA.articles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className={`${COLUMN} py-32 text-center`}>
        <p className="mb-4 text-muted">Article not found.</p>
        <button onClick={onBackToLab} className="font-medium text-accent hover:underline">
          Return to Thought Lab
        </button>
      </div>
    );
  }

  const isComingSoon = article.status === 'coming-soon';
  const hasContent = article.contentBlocks && article.contentBlocks.length > 0;
  const position = visible.findIndex(a => a.id === article.id);
  const next = visible.length > 1 ? visible[(position + 1) % visible.length] : null;

  return (
    <>
      <main>
        <article>
          {/* Title block */}
          <header className={`${COLUMN} pt-10 md:pt-16`}>
            <button
              onClick={onBackToLab}
              className="group mb-10 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
              Thought Lab
            </button>

            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {categoryLabel(article)}
              {isComingSoon && <span className="text-faint"> · Coming soon</span>}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-ink md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 font-serif text-xl leading-snug text-muted md:text-2xl">{article.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-rule py-4 text-sm text-muted">
              <span>
                {[article.publishedDate, article.readTime].filter(Boolean).join(' · ')}
              </span>
              <button
                onClick={handleCopyLink}
                aria-label={copied ? 'Link copied' : 'Copy article link'}
                className={`inline-flex items-center gap-1.5 transition-colors ${copied ? 'text-emerald-700' : 'hover:text-ink'}`}
              >
                {copied ? <Check size={15} /> : <Link2 size={15} />}
                <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
              </button>
            </div>
          </header>

          {/* Cover */}
          <figure className="mx-auto mt-10 w-full max-w-[960px] px-5">
            <img src={article.coverImage} alt={article.title} className="max-h-[540px] w-full rounded-sm object-cover" />
          </figure>

          {/* Body */}
          <div className={`${COLUMN} py-12 md:py-16`}>
            <p className="mb-8 font-serif text-[1.35rem] leading-relaxed text-ink">{article.introduction}</p>

            <ul className="mb-12 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <li key={tag} className="rounded-full border border-rule bg-white px-3 py-1 text-sm text-muted">{tag}</li>
              ))}
            </ul>

            {isComingSoon && !hasContent ? (
              <div className="rounded-sm border border-dashed border-rule p-12 text-center">
                <Construction className="mx-auto mb-5 h-10 w-10 text-faint" />
                <h3 className="mb-3 font-serif text-2xl text-ink">Coming soon</h3>
                <p className="mx-auto mb-6 max-w-md text-muted">
                  I'm currently working on this article. Check back later for my thoughts, photos, and videos on this topic.
                </p>
                <button onClick={onBackToLab} className="font-medium text-accent hover:underline">
                  Explore other entries
                </button>
              </div>
            ) : (
              article.contentBlocks.map((block, index) => <ContentBlockRenderer key={index} block={block} />)
            )}
          </div>
        </article>

        {/* Next entry */}
        <nav className="border-t border-rule" aria-label="More from the Thought Lab">
          <div className={`${COLUMN} flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between`}>
            {next ? (
              <button onClick={() => onSelectArticle(next.id)} className="group text-left">
                <span className="text-sm text-faint">Next entry</span>
                <span className="mt-1 flex items-center gap-2 font-serif text-2xl text-ink group-hover:text-accent transition-colors">
                  {next.title}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            ) : <span />}
            <div className="flex gap-5 text-sm">
              <button onClick={onBackToLab} className="text-muted hover:text-ink">All entries</button>
              <button onClick={onBack} className="text-muted hover:text-ink">Home</button>
            </div>
          </div>
        </nav>
      </main>
      <Contact />
    </>
  );
};

export default ThoughtLabArticlePage;
