
import React, { useState } from 'react';
import { Trophy, PauseCircle, PlayCircle } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';

const Achievements: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

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
        className="relative w-full flex overflow-hidden cursor-pointer group"
        onClick={() => setIsPaused(!isPaused)}
      >
        {/* Scrolling Track */}
        <div 
            className="flex gap-8 min-w-full"
            style={{
                animation: 'marquee 15s linear infinite', // Increased speed further (26s -> 15s)
                animationPlayState: isPaused ? 'paused' : 'running'
            }}
        >
            {/* Duplicate list to create seamless loop */}
            {[...ACHIEVEMENTS, ...ACHIEVEMENTS, ...ACHIEVEMENTS].map((item, index) => (
                <div 
                    key={`${item.id}-${index}`} 
                    className="relative flex-shrink-0 w-80 group/card"
                >
                    {/* Increased height from h-40 to h-60 for a taller, bigger look */}
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
            ))}
        </div>
      </div>

      {/* CSS for Marquee Animation */}
      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); } 
        }
      `}</style>
    </section>
  );
};

export default Achievements;