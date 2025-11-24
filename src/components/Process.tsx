import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-mech-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4">
            MY <span className="text-neon-green">JOURNEY</span>
          </h2>
          <p className="text-gray-400">The milestones that shaped me into the engineer I am today.</p>
        </div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-green via-neon-green to-gray-800 z-0"></div>

          <div className="flex flex-col gap-16 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;
              
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
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-green z-20 shadow-lg shadow-neon-green/50">
                    <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-30"></div>
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
                      <span className="text-2xl md:text-3xl font-bold font-mono text-neon-green">
                        {step.year}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mt-1 mb-3 group-hover:text-neon-green transition-colors">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm inline-block">
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