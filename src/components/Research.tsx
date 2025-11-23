
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Calendar, Bookmark } from 'lucide-react';
import { RESEARCH_PAPERS } from '../constants';

const Research: React.FC = () => {
  return (
    <section id="research" className="py-20 bg-mech-surface relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/5 rounded-full filter blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 flex items-center gap-4">
          <div className="p-3 bg-mech-dark rounded-lg border border-white/10">
             <FileText className="text-neon-purple" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-mono font-bold text-white tracking-tight">
              ACADEMIC <span className="text-neon-purple">RESEARCH</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              // PUBLICATIONS & CONFERENCE PROCEEDINGS
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {RESEARCH_PAPERS.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-mech-dark border border-white/5 rounded-xl overflow-hidden hover:border-neon-purple/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Abstract Visual Representation */}
                <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                  <img 
                    src={paper.image} 
                    alt={paper.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-mech-dark/90 md:bg-gradient-to-l md:from-mech-dark md:to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-500 mb-3">
                     <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                       <Calendar size={12} /> {paper.date}
                     </span>
                     <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-neon-purple">
                       <Bookmark size={12} /> {paper.publisher}
                     </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-neon-purple transition-colors">
                    {paper.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {paper.abstract}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                     <div className="flex gap-2 flex-wrap">
                        {paper.tags.map((tag, tagIndex) => (
                          <motion.span 
                            key={tag}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            // Calculate delay: Base card delay + 0.4s pause + staggered index
                            transition={{ delay: (index * 0.1) + 0.4 + (tagIndex * 0.1), duration: 0.3 }}
                            className="text-xs text-gray-500 font-mono border border-gray-800 px-2 py-1 rounded"
                          >
                            {tag}
                          </motion.span>
                        ))}
                     </div>
                     <a 
                      href={paper.link}
                      onClick={(e) => { if (paper.link === '#') e.preventDefault(); }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-white hover:text-neon-purple transition-colors"
                    >
                      READ PAPER <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
