import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  GraduationCap, 
  Compass, 
  Cpu, 
  Binary, 
  BookOpen, 
  User, 
  Mail,
  ExternalLink
} from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { siteConfig } from '../../config/siteConfig';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const { profile, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const courseLinks = [
    { id: 'class-10', title: 'Class 10 Mathematics', icon: GraduationCap, sub: 'Foundation & Boards' },
    { id: 'intermediate', title: 'Intermediate (+2) Maths', icon: Compass, sub: 'Class 11 & 12 / JEE' },
    { id: 'diploma', title: 'Diploma Polytechnic Maths', icon: Cpu, sub: 'Applied Engineering' },
    { id: 'btech', title: 'B.Tech Engineering Maths', icon: Binary, sub: 'M-1, M-2, M-3 & M-4' },
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: isScrolled 
          ? 'rgba(8, 13, 26, 0.92)' 
          : 'rgba(8, 13, 26, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled 
          ? '1px solid rgba(214, 184, 117, 0.22)' 
          : '1px solid rgba(214, 184, 117, 0.1)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none'
      }}
    >
      <div className="container-luxury" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('/')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.8rem', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1.5px solid var(--color-champagne-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(214, 184, 117, 0.25)',
            background: '#0B1120'
          }}>
            <img 
              src={siteConfig.teacher.photoUrl} 
              alt={siteConfig.teacher.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.2rem', 
              fontWeight: 700, 
              letterSpacing: '0.01em',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <span>Maths Naresh</span>
              <span className="text-gold-gradient">eClass</span>
            </div>
            <div style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.68rem', 
              color: 'var(--color-champagne-gold)', 
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              By {siteConfig.teacher.name}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          <button 
            onClick={() => handleNavClick('/')}
            style={{
              background: 'none',
              border: 'none',
              color: currentPath === '/' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
              fontSize: '0.88rem',
              fontWeight: currentPath === '/' ? 600 : 400,
              cursor: 'pointer',
              padding: '0.4rem 0',
              borderBottom: currentPath === '/' ? '2px solid var(--color-champagne-gold)' : '2px solid transparent',
              transition: 'var(--transition-smooth)',
              whiteSpace: 'nowrap'
            }}
          >
            Home
          </button>

          {/* Courses Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setCoursesDropdownOpen(true)}
            onMouseLeave={() => setCoursesDropdownOpen(false)}
          >
            <button 
              onClick={() => handleNavClick('/courses')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'none',
                border: 'none',
                color: currentPath.startsWith('/courses') ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
                fontSize: '0.88rem',
                fontWeight: currentPath.startsWith('/courses') ? 600 : 400,
                cursor: 'pointer',
                padding: '0.4rem 0',
                borderBottom: currentPath.startsWith('/courses') ? '2px solid var(--color-champagne-gold)' : '2px solid transparent',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap'
              }}
            >
              <span>Courses</span>
              <ChevronDown size={14} style={{ transform: coursesDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {coursesDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-20px',
                  width: '290px',
                  padding: '0.75rem',
                  background: 'rgba(12, 19, 34, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(214, 184, 117, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  animation: 'fadeIn 0.2s ease-out'
                }}
              >
                {courseLinks.map((course) => {
                  const Icon = course.icon;
                  return (
                    <div
                      key={course.id}
                      onClick={() => handleNavClick(`/courses/${course.id}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.65rem 0.8rem',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        background: currentPath === `/courses/${course.id}` ? 'rgba(214, 184, 117, 0.12)' : 'transparent',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(214, 184, 117, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = currentPath === `/courses/${course.id}` ? 'rgba(214, 184, 117, 0.12)' : 'transparent')}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: 'rgba(35, 61, 112, 0.4)',
                        border: '1px solid rgba(214, 184, 117, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-champagne-gold)'
                      }}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF' }}>{course.title}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-silver)' }}>{course.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button 
            onClick={() => handleNavClick('/study-materials')}
            style={{
              background: 'none',
              border: 'none',
              color: currentPath === '/study-materials' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
              fontSize: '0.88rem',
              fontWeight: currentPath === '/study-materials' ? 600 : 400,
              cursor: 'pointer',
              padding: '0.4rem 0',
              borderBottom: currentPath === '/study-materials' ? '2px solid var(--color-champagne-gold)' : '2px solid transparent',
              transition: 'var(--transition-smooth)',
              whiteSpace: 'nowrap'
            }}
          >
            Materials
          </button>

          <button 
            onClick={() => handleNavClick('/youtube-lessons')}
            style={{
              background: 'none',
              border: 'none',
              color: currentPath === '/youtube-lessons' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
              fontSize: '0.88rem',
              fontWeight: currentPath === '/youtube-lessons' ? 600 : 400,
              cursor: 'pointer',
              padding: '0.4rem 0',
              borderBottom: currentPath === '/youtube-lessons' ? '2px solid var(--color-champagne-gold)' : '2px solid transparent',
              transition: 'var(--transition-smooth)',
              whiteSpace: 'nowrap'
            }}
          >
            Lessons
          </button>

          <button 
            onClick={() => handleNavClick('/about')}
            style={{
              background: 'none',
              border: 'none',
              color: currentPath === '/about' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
              fontSize: '0.88rem',
              fontWeight: currentPath === '/about' ? 600 : 400,
              cursor: 'pointer',
              padding: '0.4rem 0',
              borderBottom: currentPath === '/about' ? '2px solid var(--color-champagne-gold)' : '2px solid transparent',
              transition: 'var(--transition-smooth)',
              whiteSpace: 'nowrap'
            }}
          >
            About
          </button>

          <button 
            onClick={() => handleNavClick('/contact')}
            style={{
              background: 'none',
              border: 'none',
              color: currentPath === '/contact' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
              fontSize: '0.88rem',
              fontWeight: currentPath === '/contact' ? 600 : 400,
              cursor: 'pointer',
              padding: '0.4rem 0',
              borderBottom: currentPath === '/contact' ? '2px solid var(--color-champagne-gold)' : '2px solid transparent',
              transition: 'var(--transition-smooth)',
              whiteSpace: 'nowrap'
            }}
          >
            Contact
          </button>
        </nav>

        {/* Right Actions: Search Icon + YouTube CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

          {/* Search — clean icon-only circle button */}
          <button
            onClick={onOpenSearch}
            title="Search (Ctrl+K)"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              background: 'rgba(16, 24, 42, 0.8)',
              border: '1px solid rgba(214, 184, 117, 0.25)',
              borderRadius: '50%',
              color: 'var(--color-champagne-gold)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
              e.currentTarget.style.background = 'rgba(214, 184, 117, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(214, 184, 117, 0.25)';
              e.currentTarget.style.background = 'rgba(16, 24, 42, 0.8)';
            }}
          >
            <Search size={17} />
          </button>

          {/* Small WhatsApp Quick Help on top */}
          <a
            href={`https://wa.me/${siteConfig.social.whatsappNumber}?text=${encodeURIComponent('Hello Naresh Sir / Maths Naresh eClass, I have an inquiry regarding courses and study materials.')}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp (+91 90590 57424)"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              background: 'rgba(37, 211, 102, 0.12)',
              border: '1px solid rgba(37, 211, 102, 0.35)',
              borderRadius: '50%',
              color: '#25D366',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#25D366';
              e.currentTarget.style.background = 'rgba(37, 211, 102, 0.25)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 0 14px rgba(37, 211, 102, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.35)';
              e.currentTarget.style.background = 'rgba(37, 211, 102, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            id="header-whatsapp-cta"
            aria-label="Contact on WhatsApp (+91 90590 57424)"
          >
            <WhatsAppIcon size={19} color="#25D366" />
          </a>

          {/* Thin divider — desktop only */}
          <div style={{
            width: '1px',
            height: '24px',
            background: 'rgba(214, 184, 117, 0.2)',
            flexShrink: 0
          }} className="desktop-nav" />

          {/* YouTube CTA — compact pill, desktop only */}
          <a
            href={siteConfig.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-nav"
            style={{ 
              display: 'none',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.48rem 1rem',
              background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
              border: '1px solid rgba(255,80,80,0.35)',
              borderRadius: '9999px',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 14px rgba(180,0,0,0.35)'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(180,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 14px rgba(180,0,0,0.35)';
            }}
            id="header-youtube-cta"
          >
            <YoutubeIcon size={15} color="#FFFFFF" />
            <span>YouTube</span>
          </a>

          {/* Student Login / Portal / Admin Button */}
          <button
            onClick={() => handleNavClick(isAdmin ? '/admin' : '/login')}
            className="desktop-nav"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.46rem 0.95rem',
              background: isAdmin 
                ? 'linear-gradient(135deg, rgba(214, 184, 117, 0.25) 0%, rgba(13, 22, 41, 0.9) 100%)' 
                : profile 
                  ? 'rgba(214, 184, 117, 0.15)' 
                  : 'rgba(16, 24, 42, 0.8)',
              border: (currentPath === '/login' || currentPath === '/admin')
                ? '1.5px solid var(--color-champagne-gold)' 
                : '1px solid rgba(214, 184, 117, 0.35)',
              borderRadius: '9999px',
              color: profile ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
              e.currentTarget.style.background = 'rgba(214, 184, 117, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = (currentPath === '/login' || currentPath === '/admin') ? 'var(--color-champagne-gold)' : 'rgba(214, 184, 117, 0.35)';
              e.currentTarget.style.background = isAdmin ? 'linear-gradient(135deg, rgba(214, 184, 117, 0.25) 0%, rgba(13, 22, 41, 0.9) 100%)' : (profile ? 'rgba(214, 184, 117, 0.15)' : 'rgba(16, 24, 42, 0.8)');
            }}
            id="header-student-login-cta"
          >
            <User size={14} color="var(--color-champagne-gold)" />
            <span>{isAdmin ? '👑 Admin Desk' : (profile ? profile.name.split(' ')[0] : 'Portal Login')}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              background: 'rgba(16, 24, 42, 0.8)',
              border: '1px solid rgba(214, 184, 117, 0.2)',
              borderRadius: '50%',
              color: 'var(--color-champagne-gold)',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            aria-label="Toggle mobile menu"
            className="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(8, 13, 26, 0.98)',
            borderBottom: '1px solid var(--border-gold-medium)',
            padding: '1.25rem 1.5rem 2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => handleNavClick('/')}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: currentPath === '/' ? 'rgba(214, 184, 117, 0.15)' : 'transparent',
                color: currentPath === '/' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Home
            </button>

            <div style={{ padding: '0.5rem 0' }}>
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'var(--color-champagne-gold)', 
                fontFamily: 'var(--font-mono)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.08em',
                padding: '0 1rem 0.4rem 1rem' 
              }}>
                Course Levels
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {courseLinks.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => handleNavClick(`/courses/${course.id}`)}
                    style={{
                      textAlign: 'left',
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      background: currentPath === `/courses/${course.id}` ? 'rgba(214, 184, 117, 0.15)' : 'transparent',
                      color: currentPath === `/courses/${course.id}` ? 'var(--color-champagne-gold)' : 'var(--color-muted-silver)',
                      border: 'none',
                      fontSize: '0.92rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ color: 'var(--color-champagne-gold)' }}>•</span>
                    {course.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('/study-materials')}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: currentPath === '/study-materials' ? 'rgba(214, 184, 117, 0.15)' : 'transparent',
                color: currentPath === '/study-materials' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <BookOpen size={18} color="var(--color-champagne-gold)" />
              Study Materials
            </button>

            <button
              onClick={() => handleNavClick('/youtube-lessons')}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: currentPath === '/youtube-lessons' ? 'rgba(214, 184, 117, 0.15)' : 'transparent',
                color: currentPath === '/youtube-lessons' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <YoutubeIcon size={18} color="#CC0000" />
              YouTube Lessons
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: currentPath === '/about' ? 'rgba(214, 184, 117, 0.15)' : 'transparent',
                color: currentPath === '/about' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <User size={18} color="var(--color-champagne-gold)" />
              About Sir
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: currentPath === '/contact' ? 'rgba(214, 184, 117, 0.15)' : 'transparent',
                color: currentPath === '/contact' ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <Mail size={18} color="var(--color-champagne-gold)" />
              Contact
            </button>

            {/* Mobile Student Portal Button */}
            <button
              onClick={() => handleNavClick('/login')}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: currentPath === '/login' ? 'rgba(214, 184, 117, 0.22)' : 'rgba(214, 184, 117, 0.1)',
                color: 'var(--color-champagne-gold)',
                border: '1px solid rgba(214, 184, 117, 0.35)',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                marginTop: '0.25rem'
              }}
            >
              <User size={18} color="var(--color-champagne-gold)" />
              <span>{profile ? `Student Portal (${profile.name.split(' ')[0]})` : 'Student Login / Portal'}</span>
            </button>
          </div>

          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(214, 184, 117, 0.15)', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <a
              href={`https://wa.me/${siteConfig.social.whatsappNumber}?text=${encodeURIComponent('Hello Naresh Sir / Maths Naresh eClass, I have an inquiry.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                color: '#25D366',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none'
              }}
            >
              <WhatsAppIcon size={18} color="#25D366" />
              <span>Chat on WhatsApp (+91 90590 57424)</span>
            </a>

            <a
              href={siteConfig.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-youtube"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <YoutubeIcon size={18} color="#FFFFFF" />
              <span>Watch on YouTube Channel</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          #header-youtube-cta {
            display: inline-flex !important;
          }
          #header-student-login-cta {
            display: inline-flex !important;
          }
          .desktop-search-label {
            display: inline !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
