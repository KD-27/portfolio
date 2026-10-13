import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

// Quiet "← Label" link at the top of a sub-page, matching the article page's back link
const BackLink: React.FC<BackLinkProps> = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="group mb-10 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
  >
    <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
    {children}
  </button>
);

export default BackLink;
