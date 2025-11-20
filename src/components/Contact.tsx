import React from 'react';
import { Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-black text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-mono font-bold text-white mb-6">LET'S BUILD SOMETHING</h2>
        <p className="text-gray-400 mb-8">
          Currently open for new opportunities in Robotics, Automation, and Embedded Systems.
        </p>
        <a 
          href={`mailto:${SOCIAL_LINKS.email}`} 
          className="inline-flex items-center gap-3 px-8 py-4 bg-neon-blue text-black font-bold text-lg rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,243,255,0.4)]"
        >
          <Mail /> SAY HELLO
        </a>
        <footer className="mt-20 text-gray-600 text-sm font-mono">
          <p>© {new Date().getFullYear()} Kaveesha Dhananjaya. Built with React & Tailwind.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;