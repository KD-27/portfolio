import React from 'react';
import { ArrowRight } from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import type { ThoughtLabArticle } from '../types';
import { CONTAINER } from '../utils/layout';
import Contact from './Contact';

interface ThoughtLabPageProps {
  onSelectArticle: (articleId: string) => void;
}

const ArticleCard: React.FC<{ article: ThoughtLabArticle; onClick: () => void }> = ({ article, onClick }) => {
  const isComingSoon = article.status === 'coming-soon';

  return (
    <button onClick={onClick} className="group text-left" aria-label={`Read ${article.title}`}>
      <div className="relative overflow-hidden rounded-sm bg-wash">
        <img
          src={article.coverImage}
          alt=""
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {isComingSoon && (
          <span className="absolute left-3 top-3 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink">
            Coming soon
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-faint">
        {[article.publishedDate, article.readTime].filter(Boolean).join(' · ')}
      </p>
      <h3 className="mt-1.5 font-serif text-2xl leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">
        {article.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{article.subtitle}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
        Read
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
};

const ThoughtLabPage: React.FC<ThoughtLabPageProps> = ({ onSelectArticle }) => {
  const visible = THOUGHT_LAB_DATA.articles.filter((a) => a.status !== 'draft');
  const groups = [
    {
      id: 'essays',
      title: 'Perspectives',
      blurb: 'Essays and technical deep dives',
      articles: visible.filter((a) => a.category !== 'project' && a.category !== 'hardware'),
    },
    {
      id: 'hardware',
      title: 'Built by hand',
      blurb: "Hardware I've designed, soldered and debugged on the bench",
      articles: visible.filter((a) => a.category === 'hardware'),
    },
    {
      id: 'ai',
      title: 'Built with AI',
      blurb: "Apps and tools I've built with AI as a collaborator",
      articles: visible.filter((a) => a.category === 'project'),
    },
  ].filter((g) => g.articles.length > 0);

  return (
    <>
      <main>
        <section className={`${CONTAINER} pt-12 pb-12 md:pt-20 md:pb-16`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Writing · {visible.length} entries
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
            Thought Lab
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            {THOUGHT_LAB_DATA.introduction}
          </p>
          {groups.length > 1 && (
            <nav className="mt-8 flex flex-wrap gap-2" aria-label="Thought Lab sections">
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#thought-lab`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`lab-${g.id}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full border border-rule bg-card px-3.5 py-1.5 text-sm text-muted hover:border-ink hover:text-ink transition-colors"
                >
                  {g.title} <span className="text-faint">{g.articles.length}</span>
                </a>
              ))}
            </nav>
          )}
        </section>

        {groups.map((group) => (
          <section key={group.id} id={`lab-${group.id}`} className="border-t border-rule">
            <div className={`${CONTAINER} py-14 md:py-20`}>
              <div className="mb-10 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-3xl tracking-tight text-ink">{group.title}</h2>
                <p className="text-sm text-muted">{group.blurb}</p>
              </div>
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {group.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} onClick={() => onSelectArticle(article.id)} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <p className={`${CONTAINER} pb-14 text-sm text-faint`}>
          These are my personal perspectives and don't represent any organisation.
        </p>
      </main>
      <Contact />
    </>
  );
};

export default ThoughtLabPage;
