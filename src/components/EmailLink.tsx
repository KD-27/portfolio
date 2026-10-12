import React, { useEffect, useRef, useState } from 'react';
import { SOCIAL_LINKS } from '../constants';

interface EmailLinkProps {
  className?: string;
  children: React.ReactNode;
}

// mailto: does nothing on machines without a default mail app (common on Windows),
// so the click also copies the address and briefly says so. The mailto still fires
// for visitors who do have a mail app set up.
const EmailLink: React.FC<EmailLinkProps> = ({ className = '', children }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleClick = () => {
    navigator.clipboard
      ?.writeText(SOCIAL_LINKS.email)
      .then(() => {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => {});
  };

  return (
    <a href={`mailto:${SOCIAL_LINKS.email}`} onClick={handleClick} className={`relative ${className}`}>
      {children}
      <span
        role="status"
        className={`pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 font-sans text-xs font-medium text-paper no-underline transition-opacity duration-200 [text-decoration:none] ${
          copied ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {copied ? 'Email copied' : ''}
      </span>
    </a>
  );
};

export default EmailLink;
