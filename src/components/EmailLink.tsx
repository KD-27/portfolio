import React from 'react';
import { SOCIAL_LINKS } from '../constants';

interface EmailLinkProps {
  className?: string;
  children: React.ReactNode;
}

// mailto: does nothing on machines without a default mail app, so email links open
// Gmail's compose window in a new tab with the address already in the To field.
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SOCIAL_LINKS.email)}`;

const EmailLink: React.FC<EmailLinkProps> = ({ className = '', children }) => (
  <a href={GMAIL_COMPOSE} target="_blank" rel="noreferrer" className={className}>
    {children}
  </a>
);

export default EmailLink;
