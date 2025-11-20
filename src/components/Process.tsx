import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-mech-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4">
            ENGINEERING <span className="text-neon-green">PROCESS</span>
          </h2>
          <p className="text-gray-400">How I transform abstract requirements into functional hardware.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-mech-dark p-4 rounded-xl border border-gray-800 hover:border-neon-green/50 transition-all group"
              >
                <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-gray-900">
                   <img src={step.image} alt={step.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute top-2 left-2 bg-neon-green text-mech-dark text-xs font-bold px-2 py-1 rounded font-mono">
                     {step.year}
                   </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
                
                <div className="mt-4 flex justify-end md:hidden">
                  <ChevronRight className="text-gray-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;