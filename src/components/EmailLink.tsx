import React from 'react';
import { SOCIAL_LINKS } from '../constants';

interface EmailLinkProps {
  className?: string;
  children: React.ReactNode;
}

// A plain mailto: link, so it opens whatever mail client the visitor uses (Outlook on
// university mail, for example). The footer address can still be copied with one click.
const EmailLink: React.FC<EmailLinkProps> = ({ className = '', children }) => (
  <a href={`mailto:${SOCIAL_LINKS.email}`} className={className}>
    {children}
  </a>
);

export default EmailLink;
