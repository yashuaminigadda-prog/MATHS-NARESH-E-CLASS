import React from 'react';
import { Send, Mail, ExternalLink, Shield, FileText } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { siteConfig } from '../../config/siteConfig';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        backgroundColor: '#050811',
        borderTop: '1px solid rgba(214, 184, 117, 0.2)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(35, 61, 112, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 2 }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1.5px solid var(--color-champagne-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(214, 184, 117, 0.25)',
                background: '#0B1120'
              }}>
                <img 
                  src={siteConfig.teacher.photoUrl} 
                  alt={siteConfig.teacher.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Maths Naresh <span className="text-gold-gradient">eClass</span>
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.4rem' }}>
              A sanctuary of mathematical clarity. Empowering students across Secondary Boards, Intermediate, Polytechnic Diplomas, and Engineering Universities.
            </p>

            <div style={{ 
              padding: '0.75rem 1rem', 
              background: 'rgba(16, 24, 42, 0.8)', 
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(214, 184, 117, 0.15)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Academic Direction
              </div>
              <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>
                {siteConfig.teacher.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-silver)' }}>
                {siteConfig.teacher.qualifications}
              </div>
            </div>
          </div>

          {/* Academic Courses */}
          <div>
            <h4 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.1rem', 
              color: 'var(--color-champagne-gold)', 
              marginBottom: '1.25rem',
              letterSpacing: '0.02em'
            }}>
              Curriculum Programs
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button 
                  onClick={() => handleNav('/courses/class-10')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                >
                  Class 10 Mathematics (Board)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/courses/intermediate')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                >
                  Intermediate Mathematics (+2 / JEE)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/courses/diploma')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                >
                  Diploma Polytechnic Mathematics
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/courses/btech')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}
                >
                  B.Tech Engineering Mathematics (M1-M4)
                </button>
              </li>
            </ul>
          </div>

          {/* Study Resources */}
          <div>
            <h4 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.1rem', 
              color: 'var(--color-champagne-gold)', 
              marginBottom: '1.25rem',
              letterSpacing: '0.02em'
            }}>
              Study Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button 
                  onClick={() => handleNav('/study-materials?type=formula_sheet')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left' }}
                >
                  Formula Handbooks & Sheets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/study-materials?type=notes')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left' }}
                >
                  Handwritten Chapter Notes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/study-materials?type=important_questions')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left' }}
                >
                  High-Yield Question Banks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/study-materials?type=model_paper')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left' }}
                >
                  Blueprint Model Papers
                </button>
              </li>
            </ul>
          </div>

          {/* YouTube Hub & Connect */}
          <div>
            <h4 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.1rem', 
              color: 'var(--color-champagne-gold)', 
              marginBottom: '1.25rem',
              letterSpacing: '0.02em'
            }}>
              YouTube Learning Hub
            </h4>
            <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Free video derivations, worked numericals, and comprehensive marathon revision sessions uploaded weekly.
            </p>

            <a
              href={siteConfig.youtube.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-youtube"
              style={{ width: '100%', marginBottom: '1rem', boxSizing: 'border-box' }}
            >
              <YoutubeIcon size={17} color="#FFFFFF" />
              <span>Subscribe on YouTube</span>
              <ExternalLink size={13} />
            </a>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--color-muted-silver)' }}>
              {siteConfig.social.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} color="var(--color-champagne-gold)" />
                  <span>{siteConfig.social.email}</span>
                </div>
              )}
              {siteConfig.social.whatsappNumber && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <WhatsAppIcon size={14} color="#25D366" />
                  <a
                    href={`https://wa.me/${siteConfig.social.whatsappNumber}?text=${encodeURIComponent('Hello Naresh Sir / Maths Naresh eClass, I have an inquiry.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#E2E8F0', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#25D366')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#E2E8F0')}
                  >
                    WhatsApp: +91 90590 57424
                  </a>
                </div>
              )}
              {siteConfig.social.telegramUrl && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Send size={14} color="#8EB3F5" />
                  <a href={siteConfig.social.telegramUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#8EB3F5', textDecoration: 'none' }}>
                    Telegram Doubt Community
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div 
          style={{
            borderTop: '1px solid rgba(214, 184, 117, 0.12)',
            paddingTop: '1.8rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--color-silver-subtle)'
          }}
        >
          <div>
            © {currentYear} {siteConfig.brand.name}. All educational materials reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={() => handleNav('/privacy')}
              style={{ background: 'none', border: 'none', color: 'var(--color-silver-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}
            >
              <Shield size={13} />
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav('/terms')}
              style={{ background: 'none', border: 'none', color: 'var(--color-silver-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}
            >
              <FileText size={13} />
              Terms of Use
            </button>
            <button
              onClick={() => handleNav('/about')}
              style={{ background: 'none', border: 'none', color: 'var(--color-silver-subtle)', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              About Sir
            </button>
            <button
              onClick={() => handleNav('/admin')}
              style={{ background: 'none', border: 'none', color: 'rgba(214, 184, 117, 0.75)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
            >
              👑 Admin Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
