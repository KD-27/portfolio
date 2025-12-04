import React from 'react';
import { motion } from 'framer-motion';
import { 
  FlaskConical, ArrowLeft, Clock, ChevronRight,
  Brain, AlertTriangle, Users, Cpu, Blocks, Hand, 
  Scale, MessageSquare, GitBranch, Shield
} from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import type { ThoughtLabArticle } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={20} />,
  AlertTriangle: <AlertTriangle size={20} />,
  Users: <Users size={20} />,
  Cpu: <Cpu size={20} />,
  Blocks: <Blocks size={20} />,
  Hand: <Hand size={20} />,
  Scale: <Scale size={20} />,
  MessageSquare: <MessageSquare size={20} />,
  GitBranch: <GitBranch size={20} />,
  Shield: <Shield size={20} />
};

interface ThoughtLabPageProps {
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
}

const ArticleCard: React.FC<{ 
  article: ThoughtLabArticle; 
  index: number;
  onClick: () => void;
}> = ({ article, index, onClick }) => {
  const isComingSoon = article.status === 'coming-soon';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={onClick}
      className={`group relative bg-mech-surface border border-white/5 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-neon-purple/30 hover:shadow-[0_0_30px_rgba(188,19,254,0.1)] ${isComingSoon ? 'opacity-80' : ''}`}
    >
      <div className="relative h-44 overflow-hidden">
        <img 
          src={article.coverImage} 
          alt={article.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mech-surface via-mech-surface/50 to-transparent" />
        
        <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-mech-dark/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-neon-purple">
          {iconMap[article.icon] || <FlaskConical size={20} />}
        </div>

        {isComingSoon && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-neon-purple/20 backdrop-blur-sm border border-neon-purple/30 rounded-full">
            <span className="text-xs font-mono text-neon-purple">COMING SOON</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-purple transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {article.subtitle}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
            {article.readTime && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {article.readTime}
              </span>
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-neon-purple group-hover:translate-x-1 transition-all" />
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
          {article.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ThoughtLabPage: React.FC<ThoughtLabPageProps> = ({ onBack, onSelectArticle }) => {
  const publishedArticles = THOUGHT_LAB_DATA.articles.filter(a => a.status !== 'draft');

  return (
    <div className="min-h-screen bg-mech-dark">
      <header className="sticky top-0 z-50 bg-mech-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors font-mono text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>
        </div>
      </header>

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full filter blur-[100px]" />
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 mb-6">
              <FlaskConical className="w-8 h-8 text-neon-purple" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-white mb-4">
              {THOUGHT_LAB_DATA.pageTitle}
            </h1>
            <p className="text-gray-500 font-mono text-sm md:text-base mb-8">
              {THOUGHT_LAB_DATA.pageSubtitle}
            </p>

            <div className="max-w-3xl mx-auto">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {THOUGHT_LAB_DATA.introduction}
              </p>
            </div>
          </motion.div>


        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedArticles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                index={index}
                onClick={() => onSelectArticle(article.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm font-mono">
            More articles coming soon. These are my personal perspectives and don't represent any organization.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThoughtLabPage;