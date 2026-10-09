import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { HERO_DATA } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background: one soft glow + a faint dot grid that fades out toward the edges */}
      <div className="absolute inset-0 bg-mech-dark">
        <div className="absolute left-1/2 top-[-20%] -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-neon-blue/10 blur-[140px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="inline-flex items-center gap-2 font-code text-neon-blue mb-6 tracking-wider text-xs md:text-sm uppercase px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
            {HERO_DATA.title}
          </p>
          <h1 className="font-mono font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-[1.05]">
            {HERO_DATA.name}
          </h1>
          <h2 className="font-mono font-medium text-xl md:text-3xl text-gray-300 mb-6">
            {HERO_DATA.tagline}
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {HERO_DATA.intro}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-mech-dark font-semibold rounded-lg transition-colors hover:bg-neon-blue"
            >
              View projects
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 text-white font-semibold rounded-lg border border-white/15 hover:border-white/40 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;
