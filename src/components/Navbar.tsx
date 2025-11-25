
import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Handle background change
      setScrolled(window.scrollY > 50);

      // Handle Progress Bar
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Journey', href: '#process' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-mech-dark/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <Cpu className="h-8 w-8 text-neon-blue animate-spin-slow" />
            <span className="font-mono font-bold text-xl tracking-wider text-white">KD<span className="text-neon-blue">.DEV</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-mono text-sm text-gray-300 hover:text-neon-blue transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            {/* Flashy Tap Me Button */}
            <a 
              href="#fun" 
              className="relative group px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-mono font-bold text-white text-sm overflow-hidden shadow-[0_0_15px_rgba(188,19,254,0.5)] hover:scale-105 transition-transform"
            >
               <span className="relative z-10 flex items-center gap-2">
                 TAP ME <Zap size={14} className="fill-white" />
               </span>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               <div className="absolute inset-0 rounded-full ring-2 ring-white/50 animate-ping opacity-30"></div>
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-mech-surface border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-neon-blue block px-3 py-2 rounded-md text-base font-medium font-mono"
              >
                {link.name}
              </a>
            ))}
            <a
                href="#fun"
                onClick={() => setIsOpen(false)}
                className="text-white bg-neon-purple/20 border border-neon-purple hover:bg-neon-purple block px-3 py-2 rounded-md text-base font-medium font-mono mt-4 text-center"
              >
                TAP ME TO PLAY
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
