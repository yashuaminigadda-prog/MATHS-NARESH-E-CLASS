import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Heart, 
  Users, 
  Video 
} from 'lucide-react';
import { YoutubeIcon } from '../common/YoutubeIcon';
import { siteConfig } from '../../config/siteConfig';

interface AboutTeacherSectionProps {
  onNavigate: (path: string) => void;
}

export const AboutTeacherSection: React.FC<AboutTeacherSectionProps> = ({ onNavigate }) => {
  return (
    <section 
      id="about-section"
      className="section-spacing"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #090E1C 0%, #0D1629 50%, #080D1A 100%)',
        borderTop: '1px solid rgba(214, 184, 117, 0.18)',
        borderBottom: '1px solid rgba(214, 184, 117, 0.18)',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 184, 117, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <Award size={15} />
            <span>Academic Direction & 12+ Years Heritage</span>
          </div>

          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}
          >
            Meet <span className="text-gold-gradient">{siteConfig.teacher.name}</span>
          </h2>

          <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.05rem', lineHeight: 1.65 }}>
            {siteConfig.teacher.formalTitle} &bull; {siteConfig.teacher.qualifications} &bull; <strong style={{ color: 'var(--color-champagne-gold)' }}>12+ Years Experience</strong>
          </p>
        </div>

        {/* Two-Column Grid: Educator Card & Story */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Portrait Card with Badges */}
          <div>
            <div 
              className="gold-card-static"
              style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(145deg, #121A2D 0%, #0B1020 100%)',
                position: 'relative'
              }}
            >
              <div 
                className="animate-portrait"
                style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid var(--color-champagne-gold)',
                  boxShadow: '0 8px 30px rgba(214, 184, 117, 0.35), 0 0 25px rgba(42, 168, 255, 0.25)',
                  margin: '0 auto 1.4rem auto',
                  background: '#0B1120'
                }}
              >
                <img 
                  src={siteConfig.teacher.photoUrl} 
                  alt={siteConfig.teacher.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.25rem' }}>
                {siteConfig.teacher.name}
              </h3>

              <div style={{ color: 'var(--color-champagne-gold)', fontSize: '0.88rem', fontFamily: 'var(--font-mono)', marginBottom: '1.2rem' }}>
                {siteConfig.teacher.qualifications}
              </div>

              {/* 3 Prominent Stat Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.6rem' }}>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'rgba(214, 184, 117, 0.15)',
                  border: '1px solid rgba(214, 184, 117, 0.35)',
                  color: 'var(--color-champagne-gold)',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}>
                  12+ Years Experience
                </span>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#F87171',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}>
                  3,000+ Free Videos
                </span>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34D399',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}>
                  100% Free Access
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={siteConfig.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-youtube"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <YoutubeIcon size={17} color="#FFFFFF" />
                  <span>Access 3,000+ Free YouTube Videos</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  onClick={() => onNavigate('/about')}
                  className="btn-gold-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  <span>Read Full Academic Profile &amp; Bio</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Callout & 4 Key Impact Stats */}
          <div>
            {/* Democratized Education Callout */}
            <div 
              style={{
                background: 'linear-gradient(135deg, rgba(204, 0, 0, 0.14) 0%, rgba(13, 22, 41, 0.95) 100%)',
                border: '1.5px solid rgba(239, 68, 68, 0.45)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.8rem 2rem',
                marginBottom: '2rem',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#EF4444', marginBottom: '0.6rem' }}>
                <YoutubeIcon size={22} color="#EF4444" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Democratized Education Mission
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                3,000+ Free YouTube Videos — 100% Free Access For Everyone
              </h3>

              <p style={{ color: '#E2E8F0', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                With over <strong>12+ years of classroom experience</strong>, Naresh Sir is dedicated to ensuring that quality mathematical education is never restricted by finances. Every single one of his <strong>3,000+ video lessons</strong> across Class 10, Intermediate (+2), Polytechnic Diplomas, and Engineering Mathematics (M1, M2, M3, M4) is completely free on YouTube for all students.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>100% Free For Everyone</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>No Subscriptions or Paywalls</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Telugu + English Bilingual Clarity</span>
                </div>
              </div>
            </div>

            {/* 4 Impact Stat Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                background: 'rgba(16, 24, 42, 0.75)',
                border: '1px solid rgba(214, 184, 117, 0.28)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1.2rem'
              }}>
                <div style={{ color: 'var(--color-champagne-gold)', marginBottom: '0.25rem' }}>
                  <Award size={18} />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF' }}>12+ Years</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-silver)' }}>Teaching Experience</div>
              </div>

              <div style={{
                background: 'rgba(16, 24, 42, 0.75)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1.2rem'
              }}>
                <div style={{ color: '#EF4444', marginBottom: '0.25rem' }}>
                  <Video size={18} />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF' }}>3,000+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-silver)' }}>Free YouTube Videos</div>
              </div>

              <div style={{
                background: 'rgba(16, 24, 42, 0.75)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1.2rem'
              }}>
                <div style={{ color: '#10B981', marginBottom: '0.25rem' }}>
                  <Heart size={18} />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#10B981' }}>100% Free</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-silver)' }}>To Every Student</div>
              </div>

              <div style={{
                background: 'rgba(16, 24, 42, 0.75)',
                border: '1px solid rgba(142, 179, 245, 0.35)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1.2rem'
              }}>
                <div style={{ color: '#8EB3F5', marginBottom: '0.25rem' }}>
                  <Users size={18} />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF' }}>50,000+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-silver)' }}>Students Guided</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
