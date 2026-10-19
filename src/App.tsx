import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Header from './components/Header';
import Intro from './components/Intro';
import Research from './components/Research';
import Projects from './components/Projects';
import Writing from './components/Writing';
import Experience from './components/Experience';
import Honours from './components/Honours';
import Skills from './components/Skills';
import Contact from './components/Contact';

const ThoughtLabPage = lazy(() => import('./components/ThoughtLabPage'));
const ThoughtLabArticlePage = lazy(() => import('./components/ThoughtLabArticlePage'));
const HonoursPage = lazy(() => import('./components/HonoursPage'));
const ProjectPage = lazy(() => import('./components/ProjectPage'));

const PageLoading: React.FC = () => <div className="min-h-[60vh]" />;

type PageView = 'home' | 'thought-lab' | 'thought-lab-article' | 'honours' | 'project';

// Parses '#thought-lab' / '#thought-lab/<articleId>' / '#projects/<slug>' / '#honours' out of the current URL so a
// direct link (or a page refresh) lands back on the view it was copied from.
const parseHash = (): { page: PageView; articleId: string | null } => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { page: 'home', articleId: null };

  const [section, rawArticleId] = hash.split('/');
  if (section === 'honours') return { page: 'honours', articleId: null };
  // The project page reuses articleId to carry the project's slug
  if (section === 'projects' && rawArticleId) return { page: 'project', articleId: decodeURIComponent(rawArticleId) };
  if (section === 'thought-lab') {
    return rawArticleId
      ? { page: 'thought-lab-article', articleId: decodeURIComponent(rawArticleId) }
      : { page: 'thought-lab', articleId: null };
  }
  return { page: 'home', articleId: null };
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(() => parseHash().page);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(() => parseHash().articleId);
  // Section to scroll to once the home page has rendered (when navigating from a Thought Lab page)
  const pendingSection = useRef<string | null>(null);

  const navigateToThoughtLab = () => {
    setCurrentPage('thought-lab');
    setSelectedArticleId(null);
    window.history.pushState(null, '', '#thought-lab');
    window.scrollTo(0, 0);
  };

  const navigateToHonours = () => {
    setCurrentPage('honours');
    setSelectedArticleId(null);
    window.history.pushState(null, '', '#honours');
    window.scrollTo(0, 0);
  };

  const navigateToArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('thought-lab-article');
    window.history.pushState(null, '', `#thought-lab/${encodeURIComponent(articleId)}`);
    window.scrollTo(0, 0);
  };

  const navigateToProject = (slug: string) => {
    setSelectedArticleId(slug);
    setCurrentPage('project');
    window.history.pushState(null, '', `#projects/${encodeURIComponent(slug)}`);
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setSelectedArticleId(null);
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  };

  const navigateToSection = (sectionId: string) => {
    if (currentPage === 'home') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    pendingSection.current = sectionId;
    navigateToHome();
  };

  useEffect(() => {
    if (currentPage !== 'home' || !pendingSection.current) return;
    document.getElementById(pendingSection.current)?.scrollIntoView();
    pendingSection.current = null;
  }, [currentPage]);

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
        return <ThoughtLabPage onSelectArticle={navigateToArticle} onBack={() => navigateToSection('writing')} />;
      case 'project':
        return selectedArticleId ? (
          <ProjectPage slug={selectedArticleId} onBack={() => navigateToSection('projects')} onSelectProject={navigateToProject} />
        ) : null;
      case 'honours':
        return <HonoursPage onBack={() => navigateToSection('honours')} />;
      case 'thought-lab-article':
        return selectedArticleId ? (
          <ThoughtLabArticlePage
            articleId={selectedArticleId}
            onBack={navigateToHome}
            onBackToLab={navigateToThoughtLab}
            onSelectArticle={navigateToArticle}
          />
        ) : null;
      default:
        return (
          <>
            <main>
              <Intro />
              <Research />
              <Projects onOpenProject={navigateToProject} />
              <Writing onOpenLab={navigateToThoughtLab} />
              <Experience />
              <Honours onOpenAll={navigateToHonours} />
              <Skills />
            </main>
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        onHome={navigateToHome}
        onSection={navigateToSection}
        onWriting={() => navigateToSection('writing')}
        writingActive={currentPage === 'thought-lab' || currentPage === 'thought-lab-article'}
      />
      <Suspense fallback={<PageLoading />}>{renderPage()}</Suspense>
    </div>
  );
};

export default App;
