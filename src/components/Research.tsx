import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { RESEARCH_PAPERS, SOCIAL_LINKS } from '../constants';

const isUnderReview = (date: string) => date.toLowerCase() === 'under review';

const Research: React.FC = () => {
  const underReview = RESEARCH_PAPERS.filter((p) => isUnderReview(p.date)).length;
  const published = RESEARCH_PAPERS.length - underReview;

  return (
    <section id="research" className="py-24 bg-mech-surface relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-code text-xs uppercase tracking-wider text-neon-blue mb-3">
              Research · {published} published · {underReview} under review
            </p>
            <h2 className="font-mono font-bold text-4xl md:text-5xl text-white tracking-tight">
              Publications
            </h2>
          </div>
          <a
            href={SOCIAL_LINKS.scholar}
            target="_blank"
            rel="noreferrer"
            className="group self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white font-semibold hover:border-white/40 transition-colors"
          >
            <GraduationCap size={18} /> Google Scholar
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
          </a>
        </div>

        <ol className="divide-y divide-white/10 border-y border-white/10">
          {RESEARCH_PAPERS.map((paper, index) => {
            const pending = isUnderReview(paper.date);
            const hasLink = paper.link && paper.link !== '#';

            return (
              <motion.li
                key={paper.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group grid grid-cols-1 md:grid-cols-[3rem_1fr_220px] gap-5 md:gap-8 py-8 md:py-10"
              >
                {/* Index */}
                <span className="hidden md:block font-code text-sm text-gray-600 pt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="min-w-0 order-2 md:order-none">
                  <div className="flex flex-wrap items-center gap-2 mb-4 font-code text-[11px] uppercase tracking-wider">
                    <span
                      className={`px-2.5 py-1 rounded-full border ${
                        pending
                          ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                          : 'border-neon-green/30 bg-neon-green/10 text-neon-green'
                      }`}
                    >
                      {pending ? 'Under review' : `Published ${paper.date}`}
                    </span>
                    <span className="px-2.5 py-1 rounded-full border border-white/10 text-gray-300" title={paper.publisher}>
                      {paper.venue}
                    </span>
                  </div>

                  <h3 className="font-mono font-semibold text-xl md:text-2xl text-white leading-snug mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{paper.publisher}</p>
                  <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mb-5 max-w-3xl">
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {hasLink && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-neon-blue hover:text-white transition-colors"
                      >
                        View paper <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="order-1 md:order-none aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-mech-dark">
                  <img
                    src={paper.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                  />
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Research;
