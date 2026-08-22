import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Research from './components/Research';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import About from './components/About';
import Contact from './components/Contact';
import BootLoader from './components/BootLoader';
import Process from './components/Process';
import ThoughtLabCTA from './components/ThoughtLabCTA';

const ThoughtLabPage = lazy(() => import('./components/ThoughtLabPage'));
const ThoughtLabArticlePage = lazy(() => import('./components/ThoughtLabArticlePage'));

const PageLoading: React.FC = () => (
  <div className="min-h-screen bg-mech-dark flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-2 border-neon-blue/30 border-t-neon-blue animate-spin" />
  </div>
);

type PageView = 'home' | 'thought-lab' | 'thought-lab-article';

// Parses '#thought-lab' / '#thought-lab/<articleId>' out of the current URL so a
// direct link (or a page refresh) lands back on the view it was copied from.
const parseHash = (): { page: PageView; articleId: string | null } => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { page: 'home', articleId: null };

  const [section, rawArticleId] = hash.split('/');
  if (section === 'thought-lab') {
    return rawArticleId
      ? { page: 'thought-lab-article', articleId: decodeURIComponent(rawArticleId) }
      : { page: 'thought-lab', articleId: null };
  }
  return { page: 'home', articleId: null };
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageView>(() => parseHash().page);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(() => parseHash().articleId);

  const handleBootComplete = () => {
    setLoading(false);
  };

  const navigateToThoughtLab = () => {
    setCurrentPage('thought-lab');
    setSelectedArticleId(null);
    window.history.pushState(null, '', '#thought-lab');
    window.scrollTo(0, 0);
  };

  const navigateToArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('thought-lab-article');
    window.history.pushState(null, '', `#thought-lab/${encodeURIComponent(articleId)}`);
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedArticleId(null);
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  };

  const navigateBackToLab = () => {
    setCurrentPage('thought-lab');
    setSelectedArticleId(null);
    window.history.pushState(null, '', '#thought-lab');
    window.scrollTo(0, 0);
  };

  // Restore state from the URL on browser Back/Forward (rather than always bouncing home)
  useEffect(() => {
    const handlePopState = () => {
      const { page, articleId } = parseHash();
      setCurrentPage(page);
      setSelectedArticleId(articleId);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
        <Suspense fallback={<PageLoading />}>
          {renderPage()}
        </Suspense>
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