import React, { useState } from 'react';
import { Trophy, PauseCircle, PlayCircle } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';

const Achievements: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const renderItems = () => (
    ACHIEVEMENTS.map((item, index) => (
      <div 
        key={`${item.id}-${index}`} 
        className="relative flex-shrink-0 w-80 group/card"
      >
        <div className="w-full h-60 rounded-lg overflow-hidden border border-white/10 relative">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="mt-4 border-l-2 border-neon-blue pl-4">
          <p className="text-white text-base font-mono font-bold leading-tight group-hover/card:text-neon-blue transition-colors">
            {item.title}
          </p>
        </div>
      </div>
    ))
  );

  return (
    <section className="py-12 bg-black border-y border-white/10 overflow-hidden select-none relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="text-neon-blue animate-pulse" size={24} />
          <h2 className="text-xl font-mono font-bold text-white tracking-widest">HONORS & ACHIEVEMENTS</h2>
        </div>
        <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
          {isPaused ? <PlayCircle size={14} /> : <PauseCircle size={14} />}
          {isPaused ? "CLICK TO RESUME" : "CLICK AREA TO PAUSE"}
        </div>
      </div>

      {/* Marquee Container */}
      <div
        className="relative w-full flex gap-8 overflow-hidden cursor-pointer"
        onClick={() => setIsPaused(!isPaused)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsPaused(!isPaused);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={isPaused}
        aria-label={isPaused ? 'Resume achievements scroll' : 'Pause achievements scroll'}
      >
        {/* First Track */}
        <div 
          className="flex gap-8 shrink-0"
          style={{
            animation: 'marquee 30s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {renderItems()}
        </div>
        {/* Second Track - identical copy for seamless loop */}
        <div 
          className="flex gap-8 shrink-0"
          style={{
            animation: 'marquee 30s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {renderItems()}
        </div>
      </div>

      {/* CSS for Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default Achievements;