import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Calendar, Tag, Share2, Check,
  Construction, Info, AlertCircle, Lightbulb, Play,
  Download, BarChart3, Crosshair, BookOpen, PenLine, Mic, Clapperboard, Package,
  Monitor, Smartphone, Image as ImageIcon, FileText, CornerDownRight, Workflow,
  type LucideIcon
} from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import type { ContentBlock, FlowStep, FlowOutput, TimelineEntry } from '../types';
import { getThoughtLabIcon } from '../utils/thoughtLabIcons';

interface ThoughtLabArticlePageProps {
  articleId: string;
  onBack: () => void;
  onBackToLab: () => void;
}

// =========================================
// CONTENT BLOCK RENDERERS
// =========================================

// Turns raw URLs inside a string into clickable neon links
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
        className="text-neon-blue hover:text-neon-purple underline decoration-neon-blue/40 hover:decoration-neon-purple/60 underline-offset-2 break-all transition-colors"
      >
        {part}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const TextBlock: React.FC<{ content: string }> = ({ content }) => (
  <p className="text-gray-300 leading-relaxed mb-6">{linkify(content)}</p>
);

const HeadingBlock: React.FC<{ content: string; level?: 2 | 3 | 4 }> = ({ content, level = 2 }) => {
  if (level === 4) {
    return (
      <h4 className="text-lg font-semibold text-gray-300 mt-6 mb-3 tracking-wide">
        {content}
      </h4>
    );
  }
  if (level === 3) {
    return (
      <h3 className="text-xl font-bold text-neon-blue mt-8 mb-4">
        {content}
      </h3>
    );
  }
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 pb-3 border-b border-white/10">
      {content}
    </h2>
  );
};

const EQUATION_FONT = "'JetBrains Mono', 'Fira Code', Menlo, Consolas, 'Courier New', monospace";

const EquationBlock: React.FC<{ content: string }> = ({ content }) => (
  <div className="my-6 flex justify-center">
    <div className="max-w-full overflow-x-auto px-6 py-4 rounded-lg bg-mech-dark border border-neon-blue/25 shadow-[0_0_20px_rgba(0,243,255,0.08)]">
      <p
        className="text-center text-base md:text-lg text-neon-blue whitespace-nowrap"
        style={{ fontFamily: EQUATION_FONT, letterSpacing: '0.02em' }}
      >
        {content}
      </p>
    </div>
  </div>
);

const ImageBlock: React.FC<{ src: string; caption?: string; alt?: string }> = ({ src, caption, alt }) => (
  <figure className="my-8">
    <div className="rounded-lg overflow-hidden border border-white/10 bg-mech-surface">
      <img 
        src={src} 
        alt={alt || caption || 'Article image'} 
        className="w-full h-auto object-cover"
      />
    </div>
    {caption && (
      <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
        {caption}
      </figcaption>
    )}
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
  
  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <figure className={`group mx-auto ${fit ? 'my-4 w-full' : `my-8 ${vertical ? 'w-2/3 sm:w-2/5 max-w-xs' : 'w-full sm:w-3/5'}`}`}>
      <div className={`${vertical ? 'aspect-[9/16]' : 'aspect-video'} rounded-lg overflow-hidden border border-white/10 group-hover:border-neon-blue/40 bg-black relative shadow-lg shadow-black/40 transition-colors duration-300`}>
        {isYouTube ? (
          <iframe
            src={getEmbedUrl(src)}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <video
            ref={videoRef}
            src={src}
            controls
            muted
            loop
            playsInline
            className="w-full h-full"
            preload="metadata"
          >
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-400 text-center flex items-center justify-center gap-2 font-mono">
          <Play size={12} className="text-neon-blue" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const QuoteBlock: React.FC<{ content: string; author?: string }> = ({ content, author }) => (
  <blockquote className="my-8 border-l-4 border-neon-purple pl-6 py-2">
    <p className="text-lg text-gray-300 italic leading-relaxed">"{content}"</p>
    {author && (
      <footer className="mt-3 text-sm text-gray-500">— {author}</footer>
    )}
  </blockquote>
);

const ListBlock: React.FC<{ items: string[]; ordered?: boolean }> = ({ items, ordered }) => {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <ListTag className="my-6 space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-gray-300 leading-relaxed">
          {ordered ? (
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border border-neon-blue/40 text-neon-blue text-xs font-mono flex items-center justify-center">
              {idx + 1}
            </span>
          ) : (
            <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_6px_rgba(188,19,254,0.7)]" />
          )}
          <span>{linkify(item)}</span>
        </li>
      ))}
    </ListTag>
  );
};

const DividerBlock: React.FC = () => (
  <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
);

const CalloutBlock: React.FC<{ content: string; variant?: 'info' | 'warning' | 'tip' }> = ({ 
  content, 
  variant = 'info' 
}) => {
  const styles = {
    info: {
      bg: 'bg-neon-blue/10',
      border: 'border-neon-blue/30',
      icon: <Info className="w-5 h-5 text-neon-blue flex-shrink-0" />,
      text: 'text-neon-blue'
    },
    warning: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      icon: <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />,
      text: 'text-orange-400'
    },
    tip: {
      bg: 'bg-neon-green/10',
      border: 'border-neon-green/30',
      icon: <Lightbulb className="w-5 h-5 text-neon-green flex-shrink-0" />,
      text: 'text-neon-green'
    }
  };

  const style = styles[variant];

  return (
    <div className={`my-6 p-4 rounded-lg border ${style.bg} ${style.border}`}>
      <div className="flex items-start gap-3">
        {style.icon}
        <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

// =========================================
// FLOWCHART BLOCK
// =========================================

const FLOW_ICONS: Record<string, LucideIcon> = {
  Download, BarChart3, Crosshair, BookOpen, PenLine, Mic, Clapperboard, Package,
  Monitor, Smartphone, Image: ImageIcon, FileText
};

// Phases are colored in order of first appearance: blue -> purple -> green
const PHASE_STYLES = [
  { text: 'text-neon-blue', border: 'border-neon-blue/40', bg: 'bg-neon-blue/10', glow: 'shadow-[0_0_18px_rgba(0,243,255,0.35)]' },
  { text: 'text-neon-purple', border: 'border-neon-purple/40', bg: 'bg-neon-purple/10', glow: 'shadow-[0_0_18px_rgba(188,19,254,0.35)]' },
  { text: 'text-neon-green', border: 'border-neon-green/40', bg: 'bg-neon-green/10', glow: 'shadow-[0_0_18px_rgba(10,255,10,0.3)]' }
];

const FlowBlock: React.FC<{ steps: FlowStep[]; outputs?: FlowOutput[]; caption?: string }> = ({ steps, outputs, caption }) => {
  const phases = Array.from(new Set(steps.map(s => s.phase).filter(Boolean))) as string[];
  const styleFor = (phase?: string) => PHASE_STYLES[Math.max(0, phases.indexOf(phase ?? '')) % PHASE_STYLES.length];

  return (
    <figure className="my-10">
      {phases.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {phases.map(phase => {
            const st = styleFor(phase);
            return (
              <span key={phase} className={`px-3 py-1 rounded-full border text-xs font-mono tracking-wider ${st.border} ${st.bg} ${st.text}`}>
                {phase}
              </span>
            );
          })}
        </div>
      )}

      <div className="relative">
        {/* Spine, with a pulse travelling down it */}
        <div className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-neon-blue/50 via-neon-purple/50 to-neon-green/50" />
        <motion.div
          className="absolute left-5 md:left-1/2 -translate-x-1/2 w-1.5 h-10 rounded-full bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        <ol className="space-y-6">
          {steps.map((step, i) => {
            const st = styleFor(step.phase);
            const Icon = FLOW_ICONS[step.icon ?? ''] ?? Workflow;
            const leftSide = i % 2 === 0;
            return (
              <motion.li
                key={i}
                className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_3rem_1fr] gap-x-4 items-center"
                initial={{ opacity: 0, x: leftSide ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45 }}
              >
                <div className={`row-start-1 col-start-1 md:col-start-2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 bg-mech-dark flex items-center justify-center ${st.border} ${st.text} ${st.glow}`}>
                  <Icon size={20} />
                </div>
                <div className={`row-start-1 col-start-2 ${leftSide ? 'md:col-start-1 md:text-right' : 'md:col-start-3'} p-4 rounded-lg bg-mech-surface border border-white/10 hover:border-white/25 transition-colors`}>
                  <div className={`flex items-center gap-2 mb-1 ${leftSide ? 'md:justify-end' : ''}`}>
                    <span className={`font-mono text-xs ${st.text}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-bold text-white">{step.title}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.detail}</p>
                  {step.tools && step.tools.length > 0 && (
                    <div className={`flex flex-wrap gap-1.5 mt-3 ${leftSide ? 'md:justify-end' : ''}`}>
                      {step.tools.map(tool => (
                        <span key={tool} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-gray-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.note && (
                    <div className={`flex items-start gap-1.5 mt-3 px-2 py-1.5 rounded border border-dashed border-orange-400/40 text-[11px] text-orange-300 ${leftSide ? 'md:flex-row-reverse md:text-right' : ''}`}>
                      <CornerDownRight size={12} className="flex-shrink-0 mt-0.5" />
                      <span>{step.note}</span>
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {outputs && outputs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Fork: the spine splits into one branch per output */}
          <div className="relative h-12 mx-5 md:mx-[12.5%]">
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 h-8 w-px bg-neon-green/50" />
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-neon-green/50" />
            {outputs.length > 1 && outputs.map((out, i) => (
              <div
                key={out.label}
                className="hidden md:block absolute top-8 h-4 w-px bg-neon-green/50 -translate-x-1/2"
                style={{ left: `${(i / (outputs.length - 1)) * 100}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {outputs.map(out => {
              const Icon = FLOW_ICONS[out.icon ?? ''] ?? Package;
              return (
                <div key={out.label} className="p-3 rounded-lg border border-neon-green/30 bg-neon-green/5 text-center">
                  <Icon size={22} className="mx-auto mb-2 text-neon-green" />
                  <div className="text-sm font-semibold text-white">{out.label}</div>
                  {out.detail && <div className="text-xs text-gray-500 mt-0.5">{out.detail}</div>}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {caption && (
        <figcaption className="mt-5 text-sm text-gray-500 text-center italic">{caption}</figcaption>
      )}
    </figure>
  );
};

// =========================================
// TIMELINE BLOCK
// =========================================

const TimelineBlock: React.FC<{ entries: TimelineEntry[] }> = ({ entries }) => (
  <div className="relative my-10">
    <div className="absolute top-2 bottom-2 left-5 -translate-x-1/2 w-px bg-gradient-to-b from-neon-blue/60 via-neon-purple/60 to-neon-green/60" />
    <ol className="space-y-10">
      {entries.map((entry, i) => {
        // Color progresses blue -> purple -> green across the timeline
        const st = PHASE_STYLES[Math.min(PHASE_STYLES.length - 1, Math.floor((i * PHASE_STYLES.length) / entries.length))];
        const wide = entry.media?.filter(m => !m.vertical) ?? [];
        const tall = entry.media?.filter(m => m.vertical) ?? [];
        return (
          <motion.li
            key={i}
            className="relative pl-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={`absolute left-5 top-1 -translate-x-1/2 w-10 h-10 rounded-full border-2 bg-mech-dark flex items-center justify-center font-mono text-sm font-bold ${st.border} ${st.text} ${st.glow}`}>
              {i + 1}
            </div>

            <div className="rounded-xl bg-mech-surface border border-white/10 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <span className={`inline-block px-2 py-0.5 mb-2 rounded border text-[11px] font-mono tracking-widest ${st.border} ${st.bg} ${st.text}`}>
                    {entry.label}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2">{entry.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{entry.detail}</p>
                </div>
                {entry.stat && (
                  <div className={`sm:w-40 flex-shrink-0 rounded-lg border px-4 py-3 text-center ${st.border} ${st.bg}`}>
                    <div className={`text-3xl font-black ${st.text}`}>{entry.stat.value}</div>
                    <div className="text-[11px] text-gray-400 mt-1 leading-snug">{entry.stat.label}</div>
                  </div>
                )}
              </div>

              {entry.added && entry.added.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-4">
                  <span className="text-[11px] font-mono text-gray-500 mr-1">+ ADDED</span>
                  {entry.added.map(item => (
                    <span key={item} className="px-2 py-0.5 rounded text-[11px] bg-white/5 border border-white/10 text-gray-300">
                      {item}
                    </span>
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
                <div className="flex flex-wrap justify-center gap-6 mt-2">
                  {tall.map(m => (
                    <div key={m.src} className="w-44 sm:w-52">
                      <VideoBlock src={m.src} caption={m.caption} vertical fit />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  </div>
);

// Main content block renderer
const ContentBlockRenderer: React.FC<{ block: ContentBlock; index: number }> = ({ block, index }) => {
  const rendered = (() => {
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
      default:
        return null;
    }
  })();

  if (block.type === 'divider') return rendered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.02, 0.2) }}
    >
      {rendered}
    </motion.div>
  );
};

// =========================================
// MAIN COMPONENT
// =========================================

const ThoughtLabArticlePage: React.FC<ThoughtLabArticlePageProps> = ({ 
  articleId, 
  onBack,
  onBackToLab
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

  const article = THOUGHT_LAB_DATA.articles.find(a => a.id === articleId);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-mech-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Article not found</p>
          <button 
            onClick={onBackToLab}
            className="text-neon-purple hover:underline font-mono"
          >
            Return to Thought Lab
          </button>
        </div>
      </div>
    );
  }

  const isComingSoon = article.status === 'coming-soon';
  const hasContent = article.contentBlocks && article.contentBlocks.length > 0;

  return (
    <div className="min-h-screen bg-mech-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-mech-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBackToLab}
            className="flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors font-mono text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Thought Lab
          </button>
          <div className="relative flex items-center">
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  aria-live="polite"
                  className="absolute right-full mr-2 whitespace-nowrap text-xs font-mono text-neon-green"
                >
                  Link copied
                </motion.span>
              )}
            </AnimatePresence>
            <button
              onClick={handleCopyLink}
              className={`p-2 transition-colors ${copied ? 'text-neon-green' : 'text-gray-400 hover:text-neon-purple'}`}
              title="Copy link"
              aria-label={copied ? 'Link copied' : 'Copy article link'}
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img 
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mech-dark via-mech-dark/80 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple">
                  {getThoughtLabIcon(article.icon, 24)}
                </div>
                {isComingSoon && (
                  <span className="px-3 py-1 bg-neon-purple/20 border border-neon-purple/40 rounded-full text-xs font-mono text-neon-purple">
                    COMING SOON
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-gray-300 mb-6">
                {article.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-mono">
                {article.readTime && (
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                )}
                {article.publishedDate && (
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {article.publishedDate}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Introduction */}
            <div className="bg-mech-surface border border-white/10 rounded-xl p-6 md:p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-1 self-stretch bg-neon-purple rounded-full flex-shrink-0" />
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  {article.introduction}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {article.tags.map((tag) => (
                <span 
                  key={tag}
                  className="flex items-center gap-1 text-sm font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Main Content */}
            {isComingSoon && !hasContent ? (
              <div className="bg-mech-surface border border-dashed border-white/20 rounded-xl p-12 text-center">
                <Construction className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Content Coming Soon</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  I'm currently working on this article. Check back later for my thoughts, photos, and videos on this topic.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={onBackToLab}
                    className="px-6 py-3 bg-neon-purple/10 border border-neon-purple/30 text-neon-purple font-mono rounded-lg hover:bg-neon-purple/20 transition-colors"
                  >
                    Explore Other Topics
                  </button>
                </div>
              </div>
            ) : (
              <article>
                {article.contentBlocks.map((block, index) => (
                  <ContentBlockRenderer key={index} block={block} index={index} />
                ))}
              </article>
            )}
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onBackToLab}
              className="flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors font-mono"
            >
              <ArrowLeft size={16} />
              Back to Thought Lab
            </button>
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-white transition-colors font-mono text-sm"
            >
              Return to Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThoughtLabArticlePage;