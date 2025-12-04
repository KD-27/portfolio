import React, { useState, useEffect } from 'react';
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
import ThoughtLabCTA from './components/ThoughtLabCTA';
import ThoughtLabPage from './components/ThoughtLabPage';
import ThoughtLabArticlePage from './components/ThoughtLabArticlePage';

type PageView = 'home' | 'thought-lab' | 'thought-lab-article';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const handleBootComplete = () => {
    setLoading(false);
  };

  const navigateToThoughtLab = () => {
    setCurrentPage('thought-lab');
    window.scrollTo(0, 0);
  };

  const navigateToArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('thought-lab-article');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedArticleId(null);
    window.scrollTo(0, 0);
  };

  const navigateBackToLab = () => {
    setCurrentPage('thought-lab');
    setSelectedArticleId(null);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (currentPage !== 'home') {
        navigateToHome();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'thought-lab') {
      window.history.pushState(null, '', '#thought-lab');
    } else if (currentPage === 'thought-lab-article' && selectedArticleId) {
      window.history.pushState(null, '', `#thought-lab/${selectedArticleId}`);
    }
  }, [currentPage, selectedArticleId]);

  const renderPage = () => {
    switch (currentPage) {
      case 'thought-lab':
        return (
          <ThoughtLabPage 
            onBack={navigateToHome} 
            onSelectArticle={navigateToArticle}
          />
        );
      case 'thought-lab-article':
        return selectedArticleId ? (
          <ThoughtLabArticlePage 
            articleId={selectedArticleId}
            onBack={navigateToHome}
            onBackToLab={navigateBackToLab}
          />
        ) : null;
      default:
        return (
          <div className="bg-mech-dark min-h-screen selection:bg-neon-blue selection:text-mech-dark animate-fade-in">
            <Navbar />
            <main>
              <Hero />
              <Projects />
              <Research />
              <Process />
              <Skills />
              <ThoughtLabCTA onNavigate={navigateToThoughtLab} />
              <FunSection />
              <Achievements />
              <About />
              <Contact />
            </main>
          </div>
        );
    }
  };

  return (
    <>
      {loading ? (
        <BootLoader onComplete={handleBootComplete} />
      ) : (
        renderPage()
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