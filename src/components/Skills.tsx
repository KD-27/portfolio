import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Cpu, Code, Layers, Bot, Eye, Wrench } from 'lucide-react';
import { SKILLS } from '../constants';
import type { SkillCategory } from '../types';

const icons: Record<string, React.ReactNode> = {
  PenTool: <PenTool size={20} />,
  Cpu: <Cpu size={20} />,
  Code: <Code size={20} />,
  Layers: <Layers size={20} />,
  Bot: <Bot size={20} />,
  Eye: <Eye size={20} />,
  Wrench: <Wrench size={20} />
};

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, duration: 0.5 }}
    className="group flex flex-col bg-mech-surface border border-white/10 rounded-2xl p-6 hover:border-neon-blue/40 transition-colors"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-neon-blue/10 text-neon-blue">
        {icons[category.icon]}
      </div>
      <h3 className="font-mono font-semibold text-lg text-white">{category.title}</h3>
    </div>

    <div className="flex flex-wrap gap-2">
      {category.skills.map((skill) => (
        <span
          key={skill}
          className="text-sm text-gray-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
        >
          {skill}
        </span>
      ))}
    </div>

    {category.usedIn && category.usedIn.length > 0 && (
      <p className="mt-auto pt-5 text-xs text-gray-500">
        <span className="font-code uppercase tracking-wider text-gray-600">Used in </span>
        {category.usedIn.join(' · ')}
      </p>
    )}
  </motion.div>
);

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-mech-dark relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="font-code text-xs uppercase tracking-wider text-neon-blue mb-3">
            Toolchain
          </p>
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-white tracking-tight mb-3">
            Skills & tools
          </h2>
          <p className="text-gray-400 max-w-xl leading-relaxed">
            What I reach for when taking a robot from CAD to a working prototype.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
