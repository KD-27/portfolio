
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Maximize2, X, Layers, Code, Cpu } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Move to the next project (Center moves Left, Right moves Center)
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  // Move to the previous project (Center moves Right, Left moves Center)
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  // Calculate properties for each card based on its distance from active index
  const getCardStyle = (index: number) => {
    const length = PROJECTS.length;
    const relativeIndex = (index - activeIndex + length) % length;

    let position = 'hidden';
    if (relativeIndex === 0) position = 'center';
    else if (relativeIndex === 1) position = 'right';
    else if (relativeIndex === length - 1) position = 'left';

    // Animation Variants
    const styles = {
      center: {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 20,
        filter: 'blur(0px)',
        rotateY: 0,
      },
      left: {
        x: '-60%', // Moves to the left
        scale: 0.75,
        opacity: 0.6,
        zIndex: 10,
        filter: 'blur(4px)',
        rotateY: 15, // Tilted in
      },
      right: {
        x: '60%', // Moves to the right
        scale: 0.75,
        opacity: 0.6,
        zIndex: 10,
        filter: 'blur(4px)',
        rotateY: -15, // Tilted in
      },
      hidden: {
        x: '0%',
        scale: 0,
        opacity: 0,
        zIndex: 0,
        filter: 'blur(10px)',
        rotateY: 0,
      }
    };

    return { position, style: styles[position as keyof typeof styles] };
  };

  return (
    <section id="projects" className="py-24 bg-mech-dark relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="mb-16 text-center">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-5xl font-bold font-mono text-white mb-4"
          >
            FEATURED <span className="text-neon-blue">SYSTEMS</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
            // INTERACTIVE PROJECT DATABASE
          </p>
        </div>

        {/* Carousel Arena */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-1000">
          
          {/* Navigation Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-2 md:left-10 z-40 p-4 bg-mech-surface/80 text-white rounded-full hover:bg-neon-blue hover:text-black transition-all border border-white/10 backdrop-blur-md shadow-lg group"
          >
            <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-2 md:right-10 z-40 p-4 bg-mech-surface/80 text-white rounded-full hover:bg-neon-blue hover:text-black transition-all border border-white/10 backdrop-blur-md shadow-lg group"
          >
            <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Cards */}
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {PROJECTS.map((project, index) => {
              const { position, style } = getCardStyle(index);
              const isCenter = position === 'center';

              return (
                <motion.div
                  key={project.id}
                  initial={style}
                  animate={style}
                  transition={{ 
                    duration: 0.5, 
                    ease: "circOut", // Sharp movement
                  }}
                  onClick={() => {
                    if (position === 'left') handlePrev();
                    else if (position === 'right') handleNext();
                    else if (position === 'center') setSelectedProject(project);
                  }}
                  className={`absolute w-[85%] md:w-[65%] bg-mech-surface rounded-xl overflow-hidden border shadow-2xl flex flex-col cursor-pointer
                    ${isCenter ? 'border-neon-blue/40' : 'border-white/5 hover:border-white/20'}`}
                  style={{
                    height: '100%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-[45%] w-full overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-gradient-to-t from-mech-surface to-transparent z-10" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
                    />
                    {isCenter && (
                      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur p-2 rounded-full text-neon-blue border border-neon-blue/30 group hover:bg-neon-blue hover:text-black transition-all">
                        <Maximize2 size={20} />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20">
                    <h3 className={`font-mono font-bold text-white mb-3 transition-all ${isCenter ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                      {project.title}
                    </h3>
                    
                    {/* Only show full details if center */}
                    <div className={`flex-1 flex flex-col transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-20'}`}>
                        <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-3">
                          {project.description}
                        </p>
                        
                        <div className="space-y-3 mb-6">
                          {project.details.slice(0, 3).map((detail, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-gray-300 font-mono">
                              <span className="text-neon-blue mt-0.5">{'>'}</span>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs font-mono font-bold bg-white/5 text-gray-300 border border-white/10 rounded">
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expanded Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-lg"
            onClick={() => setSelectedProject(null)} // Close on background click
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()} // Prevent click through
              className="bg-mech-surface w-full max-w-6xl max-h-[90vh] rounded-2xl border border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden flex flex-col relative"
            >
               {/* Close Button */}
               <button 
                 onClick={() => setSelectedProject(null)}
                 className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 hover:text-white transition-colors border border-white/10"
               >
                 <X size={24} />
               </button>

               <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
                 
                 {/* Left: Visuals (Scrollable on mobile, sticky on desktop) */}
                 <div className="w-full md:w-1/2 bg-black relative flex flex-col">
                    <div className="h-64 md:h-[50%] w-full">
                       <img 
                         src={selectedProject.image} 
                         alt={selectedProject.title} 
                         className="w-full h-full object-cover opacity-90"
                       />
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mech-surface/90 md:to-transparent md:bg-gradient-to-t" />
                    </div>
                    
                    {/* Gallery Grid */}
                    <div className="flex-1 p-4 grid grid-cols-3 gap-2 bg-[#050507]">
                       {selectedProject.gallery?.map((img, idx) => (
                         <div key={idx} className="relative aspect-square rounded overflow-hidden border border-white/10 hover:border-neon-blue/50 transition-colors group">
                            <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         </div>
                       )) || (
                         <div className="col-span-3 flex items-center justify-center text-gray-600 font-mono text-sm border border-dashed border-gray-800 rounded">
                           // IMAGERY CLASSIFIED
                         </div>
                       )}
                    </div>
                 </div>

                 {/* Right: Content (Scrollable) */}
                 <div className="w-full md:w-1/2 p-8 overflow-y-auto custom-scrollbar">
                    <div className="mb-6">
                       <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">{selectedProject.title}</h2>
                       <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-sm font-mono font-bold bg-neon-blue/10 text-neon-blue border border-neon-blue/20 rounded-full">
                              {tag}
                            </span>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-8">
                       {/* Deep Dive */}
                       <div>
                         <div className="flex items-center gap-2 text-white font-mono font-bold mb-3 border-b border-white/10 pb-2">
                           <Code size={18} className="text-neon-purple" />
                           <h3>TECHNICAL DEEP DIVE</h3>
                         </div>
                         <p className="text-gray-300 leading-relaxed">
                           {selectedProject.longDescription || selectedProject.description}
                         </p>
                       </div>

                       {/* Specs / Details */}
                       <div>
                         <div className="flex items-center gap-2 text-white font-mono font-bold mb-3 border-b border-white/10 pb-2">
                           <Layers size={18} className="text-neon-green" />
                           <h3>SYSTEM ARCHITECTURE</h3>
                         </div>
                         <ul className="space-y-3">
                           {selectedProject.details.map((detail, i) => (
                             <li key={i} className="flex items-start gap-3 text-gray-300">
                               <Cpu size={16} className="mt-1 flex-shrink-0 text-gray-500" />
                               <span>{detail}</span>
                             </li>
                           ))}
                         </ul>
                       </div>

                       {/* Actions */}
                       {selectedProject.link && (
                         <div className="pt-6">
                           <a 
                             href={selectedProject.link} 
                             target="_blank" 
                             rel="noreferrer"
                             className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded hover:bg-neon-blue transition-colors font-mono"
                           >
                             VIEW SOURCE <ExternalLink size={18} />
                           </a>
                         </div>
                       )}
                    </div>
                 </div>

               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
