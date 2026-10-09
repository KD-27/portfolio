import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Play, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { getYoutubeEmbedUrl, isVideo, isYoutube } from '../utils/media';
import Section from './Section';

// Shows a still for any gallery item. Local videos show their first frame.
const MediaThumb: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  if (isYoutube(src)) {
    return (
      <div className={`flex items-center justify-center bg-wash text-faint ${className}`}>
        <Play size={22} />
      </div>
    );
  }
  if (isVideo(src)) {
    return <video src={`${src}#t=0.1`} muted playsInline preload="metadata" className={`object-cover ${className}`} />;
  }
  return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
};

const MediaViewer: React.FC<{ src: string; title: string }> = ({ src, title }) => {
  if (isYoutube(src)) {
    return (
      <iframe
        src={getYoutubeEmbedUrl(src)}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (isVideo(src)) {
    return <video key={src} src={src} controls autoPlay muted loop playsInline className="h-full w-full object-contain" />;
  }
  return <img src={src} alt={title} className="h-full w-full object-contain" />;
};

const ProjectDialog: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const gallery = project.gallery ?? [];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const paragraphs = (project.longDescription || project.description)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-[2px]" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-3xl overflow-y-auto bg-paper shadow-2xl outline-none"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-rule bg-paper/95 px-5 py-3 backdrop-blur md:px-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Project</span>
          <button onClick={onClose} aria-label="Close project" className="-mr-2 p-2 text-muted hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-8 md:px-10 md:py-10">
          <h2 id="project-dialog-title" className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-4xl">
            {project.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{project.description}</p>

          {gallery.length > 0 && (
            <div className="mt-8">
              <div className="aspect-video w-full overflow-hidden rounded-sm bg-ink">
                <MediaViewer src={gallery[active]} title={project.title} />
              </div>
              {gallery.length > 1 && (
                <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-8">
                  {gallery.map((media, idx) => (
                    <button
                      key={media}
                      onClick={() => setActive(idx)}
                      aria-label={`Show media ${idx + 1}`}
                      aria-pressed={idx === active}
                      className={`relative aspect-square overflow-hidden rounded-sm transition ${
                        idx === active ? 'ring-2 ring-accent ring-offset-2 ring-offset-paper' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <MediaThumb src={media} alt="" className="h-full w-full" />
                      {isVideo(media) && (
                        <span className="absolute inset-0 flex items-center justify-center bg-ink/20 text-white">
                          <Play size={14} fill="currentColor" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_240px]">
            <div>
              <h3 className="mb-3 text-sm font-medium text-ink">Overview</h3>
              <div className="space-y-4 text-[15px] leading-relaxed text-muted">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-ink">Stack</h3>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-sm bg-wash px-2 py-1 text-xs text-muted">{tag}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="mb-4 text-sm font-medium text-ink">Key features & results</h3>
            <ul className="divide-y divide-rule border-y border-rule">
              {project.details.map((detail, i) => (
                <li key={detail} className="flex gap-4 py-3 text-[15px] text-ink/90">
                  <span className="w-6 flex-shrink-0 font-mono text-xs leading-6 text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
            >
              View source <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Card cover: prefer the first still image, since video frames don't always render as thumbnails
const coverFor = (project: Project) =>
  project.gallery?.find((m) => !isVideo(m)) ?? project.gallery?.[0];

const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section id="projects" label="Projects" title="Selected projects">
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setSelected(project)}
            className="group text-left"
            aria-label={`Open project: ${project.title}`}
          >
            <div className="overflow-hidden rounded-sm bg-wash">
              {coverFor(project) ? (
                <MediaThumb
                  src={coverFor(project)!}
                  alt={project.title}
                  className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="aspect-[16/10] w-full" />
              )}
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              {String(index + 1).padStart(2, '0')} · {project.tags.slice(0, 3).join(' · ')}
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              Read case study
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>

      {selected && <ProjectDialog project={selected} onClose={close} />}
    </Section>
  );
};

export default Projects;
