export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[]; 
  gallery?: string[];
  details: string[];
  link?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level 0-100
  icon: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  year: string;
  image: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  image: string;
  link: string;
  publisher: string;
  date: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  image: string;
}

// =========================================
// 🧪 THOUGHT LAB TYPES
// =========================================

/*
 * CONTENT BLOCK TYPES:
 * 
 * 1. TEXT BLOCK - Regular paragraph
 *    { type: 'text', content: 'Your paragraph here...' }
 * 
 * 2. HEADING BLOCK - Section headers
 *    { type: 'heading', content: 'Section Title', level: 2 }  // level 2 or 3
 * 
 * 3. IMAGE BLOCK - Image with optional caption
 *    { type: 'image', src: '/path/to/image.jpg', caption: 'Description here', alt: 'Alt text' }
 * 
 * 4. VIDEO BLOCK - Video with optional caption (YouTube or local file)
 *    { type: 'video', src: 'https://youtube.com/watch?v=xxx', caption: 'Video description' }
 *    { type: 'video', src: '/path/to/video.mp4', caption: 'Local video' }
 * 
 * 5. QUOTE BLOCK - Blockquote with optional author
 *    { type: 'quote', content: 'Quote text here...', author: 'Person Name' }
 * 
 * 6. LIST BLOCK - Bullet or numbered list
 *    { type: 'list', items: ['Item 1', 'Item 2', 'Item 3'], ordered: false }
 * 
 * 7. DIVIDER BLOCK - Horizontal separator
 *    { type: 'divider' }
 * 
 * 8. CALLOUT BLOCK - Highlighted info box
 *    { type: 'callout', content: 'Important note here', variant: 'info' }  // info, warning, or tip
 */

export type ContentBlock = 
  | { type: 'text'; content: string }
  | { type: 'heading'; content: string; level?: 2 | 3 }
  | { type: 'image'; src: string; caption?: string; alt?: string }
  | { type: 'video'; src: string; caption?: string }
  | { type: 'quote'; content: string; author?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'divider' }
  | { type: 'callout'; content: string; variant?: 'info' | 'warning' | 'tip' };

export interface ThoughtLabArticle {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  coverImage: string;
  introduction: string;
  contentBlocks: ContentBlock[];
  tags: string[];
  status: 'published' | 'draft' | 'coming-soon';
  publishedDate?: string;
  readTime?: string;
}

export interface ThoughtLabData {
  pageTitle: string;
  pageSubtitle: string;
  introduction: string;
  ctaTitle: string;
  ctaSubtitle: string;
  articles: ThoughtLabArticle[];
}