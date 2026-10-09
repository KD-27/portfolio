import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-mech-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-code text-xs uppercase tracking-wider text-neon-green mb-3">Journey</p>
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-white tracking-tight mb-3">
            How I got here
          </h2>
          <p className="text-gray-400">The milestones that shaped me into the engineer I am today.</p>
        </div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-px bg-gradient-to-b from-neon-green/60 via-white/15 to-neon-green/60 z-0"></div>

          <div className="flex flex-col gap-16 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isCurrent = index === PROCESS_STEPS.length - 1;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-20 ${
                    isCurrent ? 'bg-neon-green' : 'bg-mech-surface border-2 border-neon-green/70'
                  }`}>
                    {isCurrent && <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-40"></div>}
                  </div>

                  {/* Content */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${
                    isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      {/* Year */}
                      <span className={`inline-flex items-center gap-2 font-code text-sm text-neon-green ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        {step.year}
                        {isCurrent && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-neon-green/10 border border-neon-green/30">
                            Now
                          </span>
                        )}
                      </span>
                      
                      {/* Title */}
                      <h3 className="font-mono text-xl md:text-2xl font-semibold text-white mt-2 mb-3 group-hover:text-neon-green transition-colors whitespace-normal">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2"></div>

                  {/* Mobile Chevron */}
                  <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2">
                    <ChevronRight className="text-gray-700" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;