
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Research from './components/Research';
import Skills from './components/Skills';
import FunSection from './components/FunSection';
import Achievements from './components/Achievements';
import About from './components/About';
import Contact from './components/Contact';
import BootLoader from './components/BootLoader';
import Process from './components/Process';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Handle loading completion
  const handleBootComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <BootLoader onComplete={handleBootComplete} />
      ) : (
        <div className="bg-mech-dark min-h-screen selection:bg-neon-blue selection:text-mech-dark animate-fade-in">
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Research />
            <Process />
            <Skills />
            <FunSection />
            <Achievements />
            <About />
            <Contact />
          </main>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
      `}</style>
    </>
  );
};

export default App;
