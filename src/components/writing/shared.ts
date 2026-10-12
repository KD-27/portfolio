import type { ThoughtLabArticle } from '../../types';

export interface TemplateProps {
  articles: ThoughtLabArticle[];
  onOpenArticle: (articleId: string) => void;
}

export const GROUPS: { id: NonNullable<ThoughtLabArticle['category']>; title: string; blurb: string }[] = [
  { id: 'project', title: 'Built with AI', blurb: "Apps and tools I've built with AI as a collaborator" },
  { id: 'hardware', title: 'Built by hand', blurb: "Hardware I've designed, soldered and debugged on the bench" },
  { id: 'perspective', title: 'Perspectives', blurb: 'Essays and technical deep dives' },
];

export const metaLine = (a: ThoughtLabArticle) => [a.publishedDate, a.readTime].filter(Boolean).join(' · ');
