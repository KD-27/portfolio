import type { ThoughtLabArticle } from '../types';

export const CATEGORY_LABELS: Record<NonNullable<ThoughtLabArticle['category']>, string> = {
  perspective: 'Essay',
  hardware: 'Hardware build',
  project: 'Built with AI',
};

export const categoryLabel = (article: ThoughtLabArticle) => CATEGORY_LABELS[article.category ?? 'perspective'];
