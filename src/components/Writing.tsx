import React from 'react';
import { ArrowRight } from 'lucide-react';
import { THOUGHT_LAB_DATA } from '../constants';
import { categoryLabel } from '../utils/thoughtLab';
import Section from './Section';

interface WritingProps {
  onOpenLab: () => void;
  onOpenArticle: (articleId: string) => void;
}

const Writing: React.FC<WritingProps> = ({ onOpenLab, onOpenArticle }) => {
  const published = THOUGHT_LAB_DATA.articles.filter((a) => a.status === 'published');
  const [featured, ...rest] = published;

  if (!featured) return null;

  return (
    <Section
      id="writing"
      label="Writing"
      title="Thought Lab"
      action={
        <button
          onClick={onOpenLab}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
        >
          All {published.length} entries
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      }
    >
      <p className="-mt-6 mb-8 md:mb-10 max-w-2xl text-[15px] leading-relaxed text-muted">
        Ideas, builds and experiments, written up as I go.
      </p>

      {/* Featured entry */}
      <button
        onClick={() => onOpenArticle(featured.id)}
        className="group grid w-full gap-6 text-left md:grid-cols-[1.15fr_1fr] md:gap-10"
      >
        <div className="overflow-hidden rounded-sm bg-wash">
          <img
            src={featured.coverImage}
            alt=""
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Latest · {categoryLabel(featured)}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-ink group-hover:text-accent transition-colors md:text-[2.1rem]">
            {featured.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{featured.subtitle}</p>
          <p className="mt-4 text-sm text-faint">
            {[featured.publishedDate, featured.readTime].filter(Boolean).join(' · ')}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            Read the write-up
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </button>

      {/* Remaining entries */}
      {rest.length > 0 && (
        <ul className="mt-12 divide-y divide-rule border-t border-rule">
          {rest.map((article) => (
            <li key={article.id}>
              <button
                onClick={() => onOpenArticle(article.id)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-5 py-5 text-left sm:grid-cols-[140px_1fr_96px]"
              >
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-faint sm:block">
                  {categoryLabel(article)}
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-xl leading-snug text-ink group-hover:text-accent transition-colors">
                    {article.title}
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted">{article.subtitle}</span>
                </span>
                <img
                  src={article.coverImage}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-20 rounded-sm object-cover sm:w-24"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
};

export default Writing;
