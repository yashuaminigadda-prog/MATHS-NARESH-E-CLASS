import { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { MathBackground } from './components/common/MathBackground';

// Home components
import { HeroSection } from './components/home/HeroSection';
import { CourseCategoriesSection } from './components/home/CourseCategoriesSection';
import { FeaturedVideosSection } from './components/home/FeaturedVideosSection';
import { WhyLearnHereSection } from './components/home/WhyLearnHereSection';
import { AboutTeacherSection } from './components/home/AboutTeacherSection';
import { StudyResourcesPreview } from './components/home/StudyResourcesPreview';
import { YouTubeCtaSection } from './components/home/YouTubeCtaSection';

// Page components
import { CoursesOverviewPage } from './pages/CoursesOverviewPage';
import { CoursePage } from './pages/CoursePage';
import { ChapterPage } from './pages/ChapterPage';
import { StudyMaterialsPage } from './pages/StudyMaterialsPage';
import { YouTubeLessonsPage } from './pages/YouTubeLessonsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';

import type { EducationLevelId, ResourceType } from './types';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path.split('?')[0].split('#')[0] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <main>
          <HeroSection onNavigate={handleNavigate} />
          <CourseCategoriesSection onNavigate={handleNavigate} />
          <FeaturedVideosSection onNavigate={handleNavigate} />
          <WhyLearnHereSection />
          <AboutTeacherSection onNavigate={handleNavigate} />
          <StudyResourcesPreview onNavigate={handleNavigate} />
          <YouTubeCtaSection />
        </main>
      );
    }

    if (currentPath === '/courses') {
      return <CoursesOverviewPage onNavigate={handleNavigate} />;
    }

    const courseMatch = currentPath.match(/^\/courses\/(class-10|intermediate|diploma|btech)$/);
    if (courseMatch) {
      return (
        <CoursePage 
          levelId={courseMatch[1] as EducationLevelId} 
          onNavigate={handleNavigate} 
        />
      );
    }

    const chapterMatch = currentPath.match(/^\/courses\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
    if (chapterMatch) {
      return (
        <ChapterPage
          levelId={chapterMatch[1]}
          chapterSlug={chapterMatch[2]}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath.startsWith('/study-materials')) {
      const urlParams = new URLSearchParams(window.location.search);
      const initialType = urlParams.get('type') as ResourceType | null;
      return <StudyMaterialsPage initialType={initialType} onNavigate={handleNavigate} />;
    }

    if (currentPath.startsWith('/youtube-lessons')) {
      return <YouTubeLessonsPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/login' || currentPath === '/portal') {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/admin') {
      return <AdminPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/privacy') {
      return <LegalPage type="privacy" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={handleNavigate} />;
    }

    return (
      <div style={{ padding: '6rem 1.5rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '1rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--color-muted-silver)', marginBottom: '2rem' }}>
          The requested mathematics page or resource does not exist.
        </p>
        <button onClick={() => handleNavigate('/')} className="btn-gold-primary">
          Return to Academy Home
        </button>
      </div>
    );
  };

  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-midnight)', position: 'relative' }}>
        {/* Global floating math symbols — behind all content */}
        <MathBackground />
        <Header 
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <div style={{ flex: 1 }}>
          {renderCurrentView()}
        </div>

        <Footer onNavigate={handleNavigate} />

        <SearchModal 
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onNavigate={handleNavigate}
        />
      </div>
    </AuthProvider>
  );
}
export default App;
