import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, ArrowRight, Sparkles } from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';

interface ThoughtLabCTAProps {
  onNavigate: () => void;
}

const ThoughtLabCTA: React.FC<ThoughtLabCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 bg-mech-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(188, 19, 254, 0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-mech-surface to-mech-dark border border-white/10 rounded-xl p-8 md:p-10 relative overflow-hidden group hover:border-neon-purple/30 transition-all duration-500">
            
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-neon-purple/10 to-transparent" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center group-hover:border-neon-purple/50 transition-colors">
                    <FlaskConical className="w-10 h-10 text-neon-purple" strokeWidth={1.5} />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-neon-purple/60 animate-pulse" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-xs font-mono text-neon-purple/80 uppercase tracking-widest">New Section</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-mono text-white mb-3">
                  {THOUGHT_LAB_DATA.ctaTitle}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
                  {THOUGHT_LAB_DATA.ctaSubtitle}
                </p>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={onNavigate}
                  className="group/btn relative px-6 py-3 bg-transparent border border-neon-purple/50 text-neon-purple font-mono font-bold rounded-lg overflow-hidden transition-all duration-300 hover:border-neon-purple hover:shadow-[0_0_20px_rgba(188,19,254,0.3)] flex items-center gap-3"
                >
                  <span className="relative z-10">Explore My Thought Lab</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-neon-purple/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThoughtLabCTA;