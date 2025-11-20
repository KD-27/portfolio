import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Binary, Cog, Zap } from 'lucide-react';
import { HERO_DATA } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 w-full h-full bg-mech-dark">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-neon-blue rounded-full mix-blend-screen filter blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-neon-purple rounded-full mix-blend-screen filter blur-[128px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 z-0" 
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
               backgroundSize: '40px 40px' 
             }}>
        </div>
      </div>

      {/* Floating Icons (Decorative) */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 md:left-1/4 text-white/10"
      >
        <Cog size={120} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-10 md:right-1/4 text-white/10"
      >
        <Binary size={100} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-neon-blue mb-4 tracking-widest text-sm md:text-base uppercase">
            {HERO_DATA.title}
          </p>
          <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-tight">
            {HERO_DATA.name}
          </h1>
          <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-300 mb-8">
            {HERO_DATA.tagline}
          </h2>
          <p className="font-sans text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            {HERO_DATA.intro}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projects" className="group relative px-8 py-4 bg-neon-blue/10 border border-neon-blue/50 text-neon-blue font-mono font-bold overflow-hidden rounded transition-all hover:bg-neon-blue hover:text-mech-dark">
              <span className="relative z-10 flex items-center gap-2">
                VIEW PROJECTS <Zap size={18} />
              </span>
            </a>
            <a href="#contact" className="px-8 py-4 text-white font-mono hover:text-neon-purple transition-colors">
              CONTACT ME
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-500"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;