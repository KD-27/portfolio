import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import type { ThoughtLabArticle } from '../types';

interface ThoughtLabCTAProps {
  onNavigate: () => void;
  onSelectArticle: (articleId: string) => void;
}

const CATEGORY_LABELS: Record<NonNullable<ThoughtLabArticle['category']>, string> = {
  perspective: 'Essay',
  project: 'AI build',
  hardware: 'Hardware',
};

const PREVIEW_COUNT = 3;

const PreviewCard: React.FC<{
  article: ThoughtLabArticle;
  featured?: boolean;
  index: number;
  onClick: () => void;
}> = ({ article, featured = false, index, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    aria-label={`Read ${article.title}`}
    className={`group relative text-left rounded-2xl overflow-hidden border border-white/10 bg-mech-surface hover:border-neon-purple/40 transition-colors ${
      featured ? 'md:row-span-2 min-h-[320px] md:min-h-[460px]' : 'min-h-[220px]'
    }`}
  >
    <img
      src={article.coverImage}
      alt=""
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-[1.03] transition-all duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-mech-dark via-mech-dark/70 to-transparent" />

    <div className="relative h-full flex flex-col justify-end p-6 md:p-7">
      <div className="flex items-center gap-3 mb-3 font-code text-[11px] uppercase tracking-wider">
        <span className="text-neon-purple">
          {article.category ? CATEGORY_LABELS[article.category] : 'Essay'}
        </span>
        {article.readTime && (
          <span className="flex items-center gap-1 text-gray-400">
            <Clock size={11} /> {article.readTime}
          </span>
        )}
      </div>
      <h3 className={`font-mono font-bold text-white leading-tight mb-2 ${featured ? 'text-2xl md:text-4xl' : 'text-xl'}`}>
        {article.title}
      </h3>
      <p className={`text-gray-300 leading-relaxed ${featured ? 'text-sm md:text-base max-w-lg' : 'text-sm line-clamp-2'}`}>
        {article.subtitle}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-neon-purple transition-colors">
        Read {featured ? 'the write-up' : 'more'}
        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </div>
  </motion.button>
);

const ThoughtLabCTA: React.FC<ThoughtLabCTAProps> = ({ onNavigate, onSelectArticle }) => {
  const published = THOUGHT_LAB_DATA.articles.filter((a) => a.status === 'published');
  const [featured, ...rest] = published.slice(0, PREVIEW_COUNT);

  if (!featured) return null;

  return (
    <section id="thought-lab" className="py-24 bg-mech-dark relative overflow-hidden">
      <div className="absolute right-[-10%] top-0 w-[600px] h-[600px] rounded-full bg-neon-purple/10 blur-[140px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="font-code text-xs uppercase tracking-wider text-neon-purple mb-3">
              Thought Lab · {published.length} write-ups
            </p>
            <h2 className="font-mono font-bold text-4xl md:text-5xl text-white tracking-tight mb-3">
              Ideas I'm building on
            </h2>
            <p className="text-gray-400 max-w-xl leading-relaxed">
              Essays, hardware builds and AI-assisted tools. The thinking behind the work,
              written up as I go.
            </p>
          </div>
          <button
            onClick={onNavigate}
            className="group self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neon-purple/40 text-white font-semibold hover:bg-neon-purple/10 transition-colors"
          >
            View all {published.length}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <PreviewCard article={featured} featured index={0} onClick={() => onSelectArticle(featured.id)} />
          {rest.map((article, i) => (
            <PreviewCard
              key={article.id}
              article={article}
              index={i + 1}
              onClick={() => onSelectArticle(article.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThoughtLabCTA;
