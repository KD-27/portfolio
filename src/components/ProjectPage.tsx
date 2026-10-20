import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Link2, Play } from 'lucide-react';
import { PROJECTS } from '../constants';
import { getYoutubeEmbedUrl, isVideo, isYoutube } from '../utils/media';
import Contact from './Contact';
import MediaThumb from './MediaThumb';
import { ContentBlockRenderer } from './ThoughtLabArticlePage';

interface ProjectPageProps {
  slug: string;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
}

// Reading column, matching the Thought Lab article page; the gallery runs wider
const COLUMN = 'mx-auto w-full max-w-[720px] px-5';
const WIDE = 'mx-auto w-full max-w-[1040px] px-5';
const LABEL = 'font-mono text-[11px] uppercase tracking-[0.14em] text-faint';

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
    strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' });
  }, [active]);

  const arrow = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/70';

  return (
    <div className="overflow-hidden rounded-md bg-black">
      <div className="relative aspect-video w-full">
        <MediaViewer src={items[active]} title={title} />
        {count > 1 && (
          <>
            <button onClick={() => step(-1)} aria-label="Previous media" className={`${arrow} left-3`}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => step(1)} aria-label="Next media" className={`${arrow} right-3`}>
              <ChevronRight size={20} />
            </button>
            <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>
      {count > 1 && (
        <div ref={stripRef} className="relative flex gap-2 overflow-x-auto bg-wash px-3 py-3">
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

const ProjectPage: React.FC<ProjectPageProps> = ({ slug, onBack, onSelectProject }) => {
  const [copied, setCopied] = useState(false);
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];

  if (!project) {
    return (
      <div className={`${COLUMN} py-32 text-center`}>
        <p className="mb-4 text-muted">Project not found.</p>
        <button onClick={onBack} className="font-medium text-accent hover:underline">
          Back to projects
        </button>
      </div>
    );
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied or unavailable — nothing to fall back to here.
    }
  };

  const total = PROJECTS.length;
  const next = PROJECTS[(index + 1) % total];
  const gallery = project.gallery ?? [];
  const paragraphs = (project.longDescription || project.description)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <main>
        <article>
          <header className={`${COLUMN} pt-10 md:pt-16`}>
            <button
              onClick={onBack}
              className="group mb-10 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
              University projects
            </button>

            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              University project · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-ink md:text-6xl">{project.title}</h1>
            <p className="mt-5 font-serif text-xl leading-snug text-muted md:text-2xl">{project.description}</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-rule py-4 text-sm text-muted">
              <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-rule bg-card px-2.5 py-1 text-xs text-muted">{tag}</li>
                ))}
              </ul>
              <button
                onClick={handleCopyLink}
                aria-label={copied ? 'Link copied' : 'Copy project link'}
                className={`inline-flex items-center gap-1.5 transition-colors ${copied ? 'text-ok' : 'hover:text-ink'}`}
              >
                {copied ? <Check size={15} /> : <Link2 size={15} />}
                <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
              </button>
            </div>
          </header>

          {gallery.length > 0 && (
            <figure className={`${WIDE} mt-10`}>
              <Gallery key={project.slug} items={gallery} title={project.title} />
            </figure>
          )}

          <div className={`${COLUMN} py-12 md:py-16`}>
            {project.role && (
              <div className="mb-12 border-l-2 border-accent pl-5">
                <h2 className={`mb-2 ${LABEL}`}>My role</h2>
                <p className="text-[15.5px] leading-relaxed text-ink/85">{project.role}</p>
              </div>
            )}

            <h2 className={`mb-4 ${LABEL}`}>Overview</h2>
            <div className="space-y-6 text-[17px] leading-[1.75] text-ink/85">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            {project.details.length > 0 && (
              <>
                <h2 className={`mt-14 mb-4 ${LABEL}`}>Key features &amp; results</h2>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.details.map((detail, i) => (
                    <li key={detail} className="flex gap-3 rounded-md border border-rule bg-card p-3.5 text-[14.5px] leading-relaxed text-ink/90">
                      <span className="font-mono text-xs leading-6 text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {project.sections && project.sections.length > 0 && (
              <section className="mt-20" aria-label="In depth">
                <h2 className={`-mb-8 ${LABEL}`}>In depth</h2>
                {project.sections.map((block, i) => (
                  <ContentBlockRenderer key={i} block={block} />
                ))}
              </section>
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
          </div>
        </article>

        <nav className="border-t border-rule" aria-label="More projects">
          <div className={`${COLUMN} flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between`}>
            {total > 1 ? (
              <button onClick={() => onSelectProject(next.slug)} className="group text-left">
                <span className="text-sm text-faint">Next project</span>
                <span className="mt-1 flex items-center gap-2 font-serif text-2xl text-ink group-hover:text-accent transition-colors">
                  {next.title}
                  <ArrowRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            ) : <span />}
            <button onClick={onBack} className="text-sm text-muted hover:text-ink">All projects</button>
          </div>
        </nav>
      </main>
      <Contact />
    </>
  );
};

export default ProjectPage;
