import type { ThoughtLabArticle } from '../types';

export const CATEGORY_LABELS: Record<NonNullable<ThoughtLabArticle['category']>, string> = {
  perspective: 'Essay',
  software: 'Open-source release',
  hardware: 'Hardware build',
  project: 'Built with AI',
};

export const categoryLabel = (article: ThoughtLabArticle) => CATEGORY_LABELS[article.category ?? 'perspective'];
