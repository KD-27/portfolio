import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, Calendar, Tag, Share2, 
  Brain, AlertTriangle, Users, Cpu, Blocks, Hand, 
  Scale, MessageSquare, GitBranch, Shield, FlaskConical,
  Construction, Info, AlertCircle, Lightbulb, Play
} from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import type { ContentBlock } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={24} />,
  AlertTriangle: <AlertTriangle size={24} />,
  Users: <Users size={24} />,
  Cpu: <Cpu size={24} />,
  Blocks: <Blocks size={24} />,
  Hand: <Hand size={24} />,
  Scale: <Scale size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  GitBranch: <GitBranch size={24} />,
  Shield: <Shield size={24} />
};

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

const VideoBlock: React.FC<{ src: string; caption?: string }> = ({ src, caption }) => {
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  
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
    <figure className="my-8 group w-full sm:w-3/5 mx-auto">
      <div className="aspect-video rounded-lg overflow-hidden border border-white/10 group-hover:border-neon-blue/40 bg-black relative shadow-lg shadow-black/40 transition-colors duration-300">
        {isYouTube ? (
          <iframe
            src={getEmbedUrl(src)}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <video
            src={src}
            controls
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
        return <VideoBlock src={block.src} caption={block.caption} />;
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
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="p-2 text-gray-400 hover:text-neon-purple transition-colors"
            title="Copy link"
          >
            <Share2 size={18} />
          </button>
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
                  {iconMap[article.icon] || <FlaskConical size={24} />}
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