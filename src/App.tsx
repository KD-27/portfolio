
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Research from './components/Research';
import Skills from './components/Skills';
import FunSection from './components/FunSection';
import Achievements from './components/Achievements';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="bg-mech-dark min-h-screen selection:bg-neon-blue selection:text-mech-dark">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Research />
        <Skills />
        <FunSection />
        <Achievements />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default App;
