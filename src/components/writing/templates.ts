export const TEMPLATES = [
  { id: 'current', label: 'Current' },
  { id: 'bento', label: 'Bento' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'index', label: 'Index' },
  { id: 'shelves', label: 'Shelves' },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]['id'];

const KEY = 'lab-template';

export const readTemplate = (): TemplateId => {
  const fromUrl = new URLSearchParams(window.location.search).get('lab');
  const saved = fromUrl ?? localStorage.getItem(KEY);
  return TEMPLATES.some((t) => t.id === saved) ? (saved as TemplateId) : 'current';
};

export const saveTemplate = (id: TemplateId) => localStorage.setItem(KEY, id);
