import React, { useEffect, useRef, useState } from 'react';
import { SOCIAL_LINKS } from '../constants';

// Older browsers (and non-HTTPS pages) have no async clipboard API
const fallbackCopy = (text: string) => {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  return ok;
};

// The address itself, shown in full: clicking copies it rather than opening a mail app
const CopyEmail: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const showCopied = () => {
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const handleClick = () => {
    const email = SOCIAL_LINKS.email;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(showCopied, () => fallbackCopy(email) && showCopied());
    } else if (fallbackCopy(email)) {
      showCopied();
    }
  };

  return (
    <button type="button" onClick={handleClick} title="Copy email address" className={`relative text-left ${className}`}>
      {SOCIAL_LINKS.email}
      <span
        role="status"
        className={`pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 font-sans text-xs font-medium text-paper transition-opacity duration-200 ${
          copied ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {copied ? 'Email copied' : ''}
      </span>
    </button>
  );
};

export default CopyEmail;
