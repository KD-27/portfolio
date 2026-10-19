import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { isVideo } from '../utils/media';
import MediaThumb from './MediaThumb';
import Section from './Section';

interface ProjectsProps {
  onOpenProject: (slug: string) => void;
}

// Card cover: prefer the first still image, since video frames don't always render as thumbnails
const coverFor = (project: Project) =>
  project.gallery?.find((m) => !isVideo(m)) ?? project.gallery?.[0];

// Every project as a wide card: image on the left, text on the right; each opens its own page
const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => (
  <Section id="projects" label="Projects" title="University projects">
    <div className="grid gap-6 lg:gap-8">
      {PROJECTS.map((project, index) => {
        const cover = coverFor(project);
        return (
          <button
            key={project.id}
            onClick={() => onOpenProject(project.slug)}
            className="group grid w-full overflow-hidden rounded-lg border border-rule bg-bar text-left transition-all duration-300 hover:border-faint/50 hover:shadow-lg hover:shadow-black/5 md:grid-cols-[1.25fr_1fr]"
            aria-label={`Open project: ${project.title}`}
          >
            <div className="overflow-hidden bg-wash">
              {cover ? (
                <MediaThumb
                  src={cover}
                  alt={project.title}
                  className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.02] md:aspect-auto md:h-full"
                />
              ) : (
                <div className="aspect-[16/10] w-full md:aspect-auto md:h-full" />
              )}
            </div>
            <div className="flex flex-col p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                {String(index + 1).padStart(2, '0')} · {project.tags.slice(0, 3).join(' · ')}
              </p>
              <h3 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ink group-hover:text-accent transition-colors">
                Read case study
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        );
      })}
    </div>
  </Section>
);

export default Projects;
