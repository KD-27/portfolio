import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { getYoutubeEmbedUrl, isVideo, isYoutube } from '../utils/media';
import { useVariant } from '../utils/variant';
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

const Gallery: React.FC<{ items: string[]; title: string }> = ({ items, title }) => {
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const count = items.length;
  const step = useCallback((delta: number) => setActive((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count, step]);

  // Keep the active thumbnail in view inside the strip
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  const arrow = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/70';

  return (
    <div className="flex flex-col bg-black lg:h-full">
      {/* Fixed 16:9 on small screens; fills the left column on large ones */}
      <div className="relative aspect-video w-full overflow-hidden bg-black lg:aspect-auto lg:min-h-0 lg:flex-1">
        <MediaViewer src={items[active]} title={title} />
        {count > 1 && (
          <>
            <button onClick={() => step(-1)} aria-label="Previous media" className={`${arrow} left-3`}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => step(1)} aria-label="Next media" className={`${arrow} right-3`}>
              <ChevronRight size={20} />
            </button>
            <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] text-white/90">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>
      {count > 1 && (
        <div ref={stripRef} className="relative flex flex-shrink-0 gap-2 overflow-x-auto border-b border-rule bg-wash px-4 py-3 md:px-6 lg:border-b-0 lg:border-r">
          {items.map((media, idx) => (
            <button
              key={media}
              onClick={() => setActive(idx)}
              aria-label={`Show media ${idx + 1}`}
              aria-pressed={idx === active}
              className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-sm transition ${
                idx === active ? 'ring-2 ring-accent ring-offset-2 ring-offset-wash' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <MediaThumb src={media} alt="" className="h-full w-full" />
              {isVideo(media) && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                  <Play size={14} fill="currentColor" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const LABEL = 'font-mono text-[11px] uppercase tracking-[0.14em] text-faint';

interface ProjectDialogProps {
  project: Project;
  index: number;
  total: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({ project, index, total, onNavigate, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gallery = project.gallery ?? [];
  const hasMedia = gallery.length > 0;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Start each project at the top, with focus inside the dialog
  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0);
    textRef.current?.scrollTo(0, 0);
    dialogRef.current?.focus();
  }, [project.id]);

  const paragraphs = (project.longDescription || project.description)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const prev = PROJECTS[(index - 1 + total) % total];
  const next = PROJECTS[(index + 1) % total];
  const iconButton = 'rounded-full p-2 text-muted transition-colors hover:bg-wash hover:text-ink';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in sm:p-4 lg:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="flex h-[100dvh] w-full max-w-[1600px] flex-col overflow-hidden bg-paper shadow-2xl outline-none animate-modal-in sm:h-full sm:rounded-xl"
      >
        <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-rule bg-bar px-4 py-2 md:px-6">
          <span className={`${LABEL} truncate`}>
            Project {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            <span className="hidden sm:inline"> · {project.title}</span>
          </span>
          <div className="flex flex-shrink-0 items-center gap-1">
            {total > 1 && (
              <>
                <button onClick={() => onNavigate(index - 1)} aria-label={`Previous project: ${prev.title}`} className={iconButton}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => onNavigate(index + 1)} aria-label={`Next project: ${next.title}`} className={iconButton}>
                  <ChevronRight size={18} />
                </button>
                <span className="mx-1 h-5 w-px bg-rule" />
              </>
            )}
            <button onClick={onClose} aria-label="Close project" className={iconButton}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Small screens: one scrolling column. Large screens: media left, text scrolls on the right */}
        <div
          ref={bodyRef}
          className={`min-h-0 flex-1 overflow-y-auto lg:overflow-hidden ${
            hasMedia ? 'lg:grid lg:grid-cols-[minmax(0,1.65fr)_minmax(400px,1fr)]' : ''
          }`}
        >
          {hasMedia && (
            <div className="lg:min-h-0">
              <Gallery key={project.id} items={gallery} title={project.title} />
            </div>
          )}

          <div ref={textRef} className="lg:h-full lg:overflow-y-auto">
            <article className={`px-5 py-8 md:px-10 md:py-10 ${hasMedia ? '' : 'mx-auto max-w-3xl'}`}>
              <h2 id="project-dialog-title" className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-[2.25rem]">
                {project.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">{project.description}</p>

              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-rule bg-card px-2.5 py-1 text-xs text-muted">{tag}</li>
                ))}
              </ul>

              <h3 className={`mt-10 mb-3 ${LABEL}`}>Overview</h3>
              <div className="space-y-4 text-[15.5px] leading-[1.75] text-ink/85">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>

              {project.details.length > 0 && (
                <>
                  <h3 className={`mt-10 mb-4 ${LABEL}`}>Key features &amp; results</h3>
                  <ul className={`grid gap-2.5 ${hasMedia ? '' : 'sm:grid-cols-2'}`}>
                    {project.details.map((detail, i) => (
                      <li key={detail} className="flex gap-3 rounded-md border border-rule bg-card p-3.5 text-[14.5px] leading-relaxed text-ink/90">
                        <span className="font-mono text-xs leading-6 text-accent">{String(i + 1).padStart(2, '0')}</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
                >
                  View source <ArrowUpRight size={15} />
                </a>
              )}
            </article>

            {total > 1 && (
              <div className="grid grid-cols-2 border-t border-rule">
                <button onClick={() => onNavigate(index - 1)} className="group px-5 py-5 text-left transition-colors hover:bg-wash md:px-10">
                  <span className="flex items-center gap-1 text-xs text-faint">
                    <ChevronLeft size={14} /> Previous
                  </span>
                  <span className="mt-1 block font-serif text-base leading-snug text-ink group-hover:text-accent">{prev.title}</span>
                </button>
                <button
                  onClick={() => onNavigate(index + 1)}
                  className="group border-l border-rule px-5 py-5 text-right transition-colors hover:bg-wash md:px-10"
                >
                  <span className="flex items-center justify-end gap-1 text-xs text-faint">
                    Next <ChevronRight size={14} />
                  </span>
                  <span className="mt-1 block font-serif text-base leading-snug text-ink group-hover:text-accent">{next.title}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Card cover: prefer the first still image, since video frames don't always render as thumbnails
const coverFor = (project: Project) =>
  project.gallery?.find((m) => !isVideo(m)) ?? project.gallery?.[0];

const Projects: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const navigate = useCallback((i: number) => setSelected((i + PROJECTS.length) % PROJECTS.length), []);

  // Phones: cards sit in a horizontal swipe row; track which one is in view for the dots
  const railRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(0);

  const onRailScroll = () => {
    const rail = railRef.current;
    const first = rail?.children[0] as HTMLElement | undefined;
    if (!rail || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(rail).columnGap || '0');
    setInView(Math.min(PROJECTS.length - 1, Math.round(rail.scrollLeft / step)));
  };

  const scrollToCard = (i: number) => {
    const rail = railRef.current;
    const card = rail?.children[i] as HTMLElement | undefined;
    // The rail is `relative`, so offsetLeft is measured from its own edge
    if (rail && card) rail.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft), behavior: 'smooth' });
  };

  const variant = useVariant('projects', 'features');
  const kicker = (project: Project, index: number, count = 3) =>
    `${String(index + 1).padStart(2, '0')} · ${project.tags.slice(0, count).join(' · ')}`;
  const readMore = (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ink group-hover:text-accent transition-colors">
      Read case study
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </span>
  );
  const cover = (project: Project, className: string) =>
    coverFor(project) ? (
      <MediaThumb src={coverFor(project)!} alt={project.title} className={`w-full transition-transform duration-500 group-hover:scale-[1.02] ${className}`} />
    ) : (
      <div className={`w-full ${className}`} />
    );
  const card = (project: Project, index: number, compact = false) => (
    <button
      key={project.id}
      onClick={() => setSelected(index)}
      className="group flex w-full flex-col rounded-lg border border-rule bg-bar p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-faint/50 hover:shadow-lg hover:shadow-black/5 sm:p-4"
      aria-label={`Open project: ${project.title}`}
    >
      <div className="overflow-hidden rounded-md bg-wash">{cover(project, 'aspect-[16/10]')}</div>
      <div className={`flex flex-1 flex-col pt-5 pb-3 ${compact ? 'px-1' : 'px-2 sm:px-3'}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{kicker(project, index, compact ? 2 : 3)}</p>
        <h3 className={`mt-2 font-serif leading-snug tracking-tight text-ink group-hover:text-accent transition-colors ${compact ? 'text-xl' : 'text-2xl'}`}>
          {project.title}
        </h3>
        <p className={`mt-2 leading-relaxed text-muted ${compact ? 'text-sm line-clamp-3' : 'text-[15px]'}`}>{project.description}</p>
        {readMore}
      </div>
    </button>
  );
  const dialog = selected !== null && (
    <ProjectDialog project={PROJECTS[selected]} index={selected} total={PROJECTS.length} onNavigate={navigate} onClose={close} />
  );

  // Wide card: image on the left, text on the right
  const wide = (project: Project, index: number) => (
    <button
      key={project.id}
      onClick={() => setSelected(index)}
      className="group grid w-full overflow-hidden rounded-lg border border-rule bg-bar text-left transition-all duration-300 hover:border-faint/50 hover:shadow-lg hover:shadow-black/5 md:grid-cols-[1.25fr_1fr]"
      aria-label={`Open project: ${project.title}`}
    >
      <div className="overflow-hidden bg-wash">{cover(project, 'aspect-[16/10] md:aspect-auto md:h-full')}</div>
      <div className="flex flex-col p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{kicker(project, index)}</p>
        <h3 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>
        {readMore}
      </div>
    </button>
  );

  // Option F: every project as a wide feature card, stacked
  if (variant === 'features') {
    return (
      <Section id="projects" label="Projects" title="University projects">
        <div className="grid gap-6 lg:gap-8">{PROJECTS.map((p, i) => wide(p, i))}</div>
        {dialog}
      </Section>
    );
  }

  // Option B: the lead project as a wide feature, the other four in a 2 × 2 grid
  if (variant === 'feature') {
    const [lead, ...rest] = PROJECTS;
    return (
      <Section id="projects" label="Projects" title="University projects">
        {wide(lead, 0)}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-8 lg:gap-8">{rest.map((p, i) => card(p, i + 1))}</div>
        {dialog}
      </Section>
    );
  }

  // Option C: editorial rows, image and text alternating sides, no card boxes
  if (variant === 'rows') {
    return (
      <Section id="projects" label="Projects" title="University projects">
        <div className="divide-y divide-rule border-y border-rule">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setSelected(index)}
              className="group grid w-full items-center gap-6 py-8 text-left md:grid-cols-2 md:gap-10 md:py-10"
              aria-label={`Open project: ${project.title}`}
            >
              <div className={`overflow-hidden rounded-md bg-wash ${index % 2 ? 'md:order-2' : ''}`}>{cover(project, 'aspect-[16/10]')}</div>
              <div className="flex flex-col">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{kicker(project, index)}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-ink group-hover:text-accent transition-colors md:text-[1.75rem]">
                  {project.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>
                {readMore}
              </div>
            </button>
          ))}
        </div>
        {dialog}
      </Section>
    );
  }

  // Option D: a numbered index, one line per project with a small thumbnail
  if (variant === 'index') {
    return (
      <Section id="projects" label="Projects" title="University projects">
        <div className="divide-y divide-rule border-y border-rule">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setSelected(index)}
              className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-5 text-left transition-colors hover:bg-wash/60 sm:grid-cols-[2.5rem_1fr_9rem] sm:gap-6 sm:px-3"
              aria-label={`Open project: ${project.title}`}
            >
              <span className="hidden font-mono text-sm text-faint sm:block">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <h3 className="font-serif text-xl leading-snug tracking-tight text-ink group-hover:text-accent transition-colors md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted line-clamp-2">{project.description}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{project.tags.slice(0, 3).join(' · ')}</p>
              </div>
              <div className="w-24 overflow-hidden rounded-md bg-wash sm:w-36">{cover(project, 'aspect-[4/3]')}</div>
            </button>
          ))}
        </div>
        {dialog}
      </Section>
    );
  }

  // Option E: two wide cards on top, three narrower ones below
  if (variant === 'mosaic') {
    return (
      <Section id="projects" label="Projects" title="University projects">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={`flex ${index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
              {card(project, index, index >= 2)}
            </div>
          ))}
        </div>
        {dialog}
      </Section>
    );
  }

  return (
    <Section id="projects" label="Projects" title="University projects">
      <div
        ref={railRef}
        onScroll={onRailScroll}
        className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-8"
      >
        {PROJECTS.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setSelected(index)}
            className="group flex w-[84%] flex-shrink-0 snap-start flex-col rounded-lg border border-rule bg-bar p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-faint/50 hover:shadow-lg hover:shadow-black/5 sm:w-auto sm:p-4"
            aria-label={`Open project: ${project.title}`}
          >
            <div className="overflow-hidden rounded-md bg-wash">
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
            <div className="flex flex-1 flex-col px-2 pt-5 pb-3 sm:px-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                {String(index + 1).padStart(2, '0')} · {project.tags.slice(0, 3).join(' · ')}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ink group-hover:text-accent transition-colors">
                Read case study
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
        {PROJECTS.map((project, i) => (
          <button
            key={project.id}
            onClick={() => scrollToCard(i)}
            aria-label={`Show project ${i + 1}: ${project.title}`}
            aria-current={i === inView}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === inView ? 'w-6 bg-ink' : 'w-1.5 bg-faint/50'}`}
          />
        ))}
        <span className="ml-2 font-mono text-[11px] text-faint">
          {inView + 1} / {PROJECTS.length}
        </span>
      </div>

      {selected !== null && (
        <ProjectDialog
          project={PROJECTS[selected]}
          index={selected}
          total={PROJECTS.length}
          onNavigate={navigate}
          onClose={close}
        />
      )}
    </Section>
  );
};

export default Projects;
