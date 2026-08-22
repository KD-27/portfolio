import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Maximize2, X, Layers, Code, Cpu, Play } from 'lucide-react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveMediaIndex(0);
  };

  const closeProject = () => setSelectedProject(null);

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

  // Close on Escape and move focus into the dialog when it opens
  useEffect(() => {
    if (!selectedProject) return;

    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const getCardStyle = (index: number) => {
    const length = PROJECTS.length;
    const relativeIndex = (index - activeIndex + length) % length;

    let position = 'hidden';
    if (relativeIndex === 0) position = 'center';
    else if (relativeIndex === 1) position = 'right';
    else if (relativeIndex === length - 1) position = 'left';

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
        x: '-60%',
        scale: 0.75,
        opacity: 0.6,
        zIndex: 10,
        filter: 'blur(4px)',
        rotateY: 15,
      },
      right: {
        x: '60%',
        scale: 0.75,
        opacity: 0.6,
        zIndex: 10,
        filter: 'blur(4px)',
        rotateY: -15,
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

  // Helper to check if URL is a video
  const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || 
           url.includes('youtube.com') || 
           url.includes('youtu.be');
  };

  const isYoutube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');
  
  const getEmbedUrl = (url: string) => {
    if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    return url;
  };

  // Get the first gallery item as the card thumbnail
  const getCardThumbnail = (project: Project) => {
    if (project.gallery && project.gallery.length > 0) {
      return project.gallery[0];
    }
    return '';
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
            aria-label="Previous project"
            className="absolute left-2 md:left-10 z-40 p-4 bg-mech-surface/80 text-white rounded-full hover:bg-neon-blue hover:text-black transition-all border border-white/10 backdrop-blur-md shadow-lg group"
          >
            <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next project"
            className="absolute right-2 md:right-10 z-40 p-4 bg-mech-surface/80 text-white rounded-full hover:bg-neon-blue hover:text-black transition-all border border-white/10 backdrop-blur-md shadow-lg group"
          >
            <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Cards */}
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {PROJECTS.map((project, index) => {
              const { position, style } = getCardStyle(index);
              const isCenter = position === 'center';
              const thumbnailUrl = getCardThumbnail(project);
              const thumbnailIsVideo = isVideo(thumbnailUrl);

              return (
                <motion.div
                  key={project.id}
                  initial={style}
                  animate={style}
                  transition={{ 
                    duration: 0.5, 
                    ease: "circOut",
                  }}
                  onClick={() => {
                    if (position === 'left') handlePrev();
                    else if (position === 'right') handleNext();
                    else if (position === 'center') openProject(project);
                  }}
                  onKeyDown={(e) => {
                    if (isCenter && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      openProject(project);
                    }
                  }}
                  role={isCenter ? 'button' : undefined}
                  tabIndex={isCenter ? 0 : undefined}
                  aria-label={isCenter ? `View details for ${project.title}` : undefined}
                  className={`absolute w-[85%] md:w-[65%] bg-mech-surface rounded-xl overflow-hidden border shadow-2xl flex flex-col cursor-pointer
                    ${isCenter ? 'border-neon-blue/40' : 'border-white/5 hover:border-white/20'}`}
                  style={{
                    height: '100%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Image/Video Section - NO play button overlay */}
                  <div className="relative h-[45%] w-full overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-gradient-to-t from-mech-surface to-transparent z-10" />
                    {thumbnailUrl ? (
                      thumbnailIsVideo && !isYoutube(thumbnailUrl) ? (
                        <video 
                          src={thumbnailUrl}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover opacity-90"
                          onMouseEnter={(e) => isCenter && e.currentTarget.play()}
                          onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        />
                      ) : (
                        <img 
                          src={thumbnailUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 font-mono text-sm">
                        // NO MEDIA
                      </div>
                    )}
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
            onClick={closeProject}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              tabIndex={-1}
              className="bg-mech-surface w-full max-w-6xl max-h-[90vh] rounded-2xl border border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden flex flex-col relative outline-none"
            >
               {/* Close Button */}
               <button
                 onClick={closeProject}
                 aria-label="Close project details"
                 className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 hover:text-white transition-colors border border-white/10"
               >
                 <X size={24} />
               </button>

               <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
                 
                 {/* Left: Media Viewer + Gallery */}
                 <div className="w-full md:w-1/2 bg-black relative flex flex-col">
                    {/* Main Media Display */}
                    <div className="h-64 md:h-[55%] w-full bg-black flex items-center justify-center relative">
                       {selectedProject.gallery && selectedProject.gallery[activeMediaIndex] ? (
                         (() => {
                           const currentMedia = selectedProject.gallery[activeMediaIndex];
                           if (isYoutube(currentMedia)) {
                             return (
                               <iframe 
                                 src={getEmbedUrl(currentMedia)} 
                                 title={selectedProject.title}
                                 className="w-full h-full"
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                 allowFullScreen
                               />
                             );
                           } else if (isVideo(currentMedia)) {
                             return (
                               <video 
                                 key={currentMedia}
                                 src={currentMedia} 
                                 controls 
                                 autoPlay 
                                 muted 
                                 loop
                                 className="w-full h-full object-contain"
                               />
                             );
                           } else {
                             return (
                               <img 
                                 src={currentMedia} 
                                 alt={selectedProject.title} 
                                 className="w-full h-full object-contain"
                               />
                             );
                           }
                         })()
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-600 font-mono text-sm">
                           // NO MEDIA AVAILABLE
                         </div>
                       )}
                    </div>
                    
                    {/* Gallery Thumbnails - Scrollable Grid */}
                    <div className="flex-1 p-4 bg-[#050507] overflow-y-auto">
                       {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                         <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                           {selectedProject.gallery.map((media, idx) => {
                             const mediaIsVideo = isVideo(media);
                             const isActive = idx === activeMediaIndex;
                             
                             return (
                               <div
                                 key={idx}
                                 onClick={() => setActiveMediaIndex(idx)}
                                 onKeyDown={(e) => {
                                   if (e.key === 'Enter' || e.key === ' ') {
                                     e.preventDefault();
                                     setActiveMediaIndex(idx);
                                   }
                                 }}
                                 role="button"
                                 tabIndex={0}
                                 aria-label={`View media ${idx + 1}`}
                                 aria-pressed={isActive}
                                 className={`relative aspect-square rounded overflow-hidden cursor-pointer transition-all duration-200 group
                                   ${isActive
                                     ? 'ring-2 ring-neon-blue border-neon-blue'
                                     : 'border border-white/10 hover:border-neon-blue/50'
                                   }`}
                               >
                                  {mediaIsVideo && !isYoutube(media) ? (
                                    <>
                                      <video 
                                        src={media}
                                        muted
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                      />
                                      {/* Play icon overlay for video thumbnails */}
                                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                        <Play size={24} className="text-white/80 group-hover:text-neon-blue transition-colors" fill="currentColor" />
                                      </div>
                                    </>
                                  ) : isYoutube(media) ? (
                                    <>
                                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                        <Play size={24} className="text-red-500" fill="currentColor" />
                                      </div>
                                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <Play size={24} className="text-white/80" fill="currentColor" />
                                      </div>
                                    </>
                                  ) : (
                                    <img 
                                      src={media} 
                                      alt={`Gallery ${idx + 1}`} 
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                  )}
                                  
                                  {/* Active indicator */}
                                  {isActive && (
                                    <div className="absolute inset-0 border-2 border-neon-blue rounded pointer-events-none" />
                                  )}
                               </div>
                             );
                           })}
                         </div>
                       ) : (
                         <div className="h-full flex items-center justify-center text-gray-600 font-mono text-sm border border-dashed border-gray-800 rounded">
                           // IMAGERY CLASSIFIED
                         </div>
                       )}
                    </div>
                 </div>

                 {/* Right: Content (Scrollable) */}
                 <div className="w-full md:w-1/2 p-8 overflow-y-auto custom-scrollbar">
                    <div className="mb-6">
                       <h2 id="project-modal-title" className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">{selectedProject.title}</h2>
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