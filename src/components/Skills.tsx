
import React from 'react';
//import { motion } from 'framer-motion';
import { PenTool, Cpu, Code, Layers, Bot, Eye, Wrench } from 'lucide-react';
import { SKILLS } from '../constants';
import type { SkillCategory } from '../types';

const icons: Record<string, React.ReactNode> = {
  PenTool: <PenTool size={18} />,
  Cpu: <Cpu size={18} />,
  Code: <Code size={18} />,
  Layers: <Layers size={18} />,
  Bot: <Bot size={18} />,
  Eye: <Eye size={18} />,
  Wrench: <Wrench size={18} />
};

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category }) => {
  return (
    <div className="bg-[#0f0f13] border border-white/5 p-6 rounded-sm hover:border-white/20 transition-colors duration-300 h-full">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="text-gray-500">
          {icons[category.icon]}
        </div>
        <h3 className="font-mono text-sm font-bold text-gray-200 tracking-widest uppercase">{category.title}</h3>
      </div>

      <div className="space-y-6">
        {category.skills.map((skill, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-gray-400">{skill.name}</span>
              <span className="text-gray-600">{skill.level}%</span>
            </div>
            {/* Static, clean progress bar */}
            <div className="h-1 w-full bg-gray-900">
              <div 
                className="h-full bg-gray-500" 
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-mech-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-l-2 border-neon-blue pl-6">
          <h2 className="text-2xl font-bold font-mono text-white mb-2 tracking-tight">
            TECHNICAL SPECIFICATIONS
          </h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-wide">
            Competency Matrix & Toolchain
          </p>
        </div>

        {/* Updated Grid for 6 items: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
