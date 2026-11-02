import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { YoutubeIcon } from '../common/YoutubeIcon';
import { KaTeXMath } from '../common/KaTeXMath';
import { siteConfig } from '../../config/siteConfig';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section 
      style={{
        position: 'relative',
        paddingTop: '4.5rem',
        paddingBottom: '5.5rem',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 10%, #162442 0%, #0D1527 50%, #080D1A 100%)'
      }}
    >
      {/* Background Ambient Blend: Subtle watermark of Naresh Sir's mathematical backdrop */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: '-5%',
          width: '700px',
          height: '100%',
          backgroundImage: `radial-gradient(circle at 60% 40%, rgba(8, 13, 26, 0.2) 0%, rgba(8, 13, 26, 0.95) 80%), url('/images/naresh_sir.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          opacity: 0.18,
          filter: 'blur(30px) saturate(1.4)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Decorative ambient gold and cyan aura glows */}
      <div 
        className="animate-aura"
        style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(42, 168, 255, 0.22) 0%, rgba(214, 184, 117, 0.18) 45%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Floating subtle mathematical glyphs */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', opacity: 0.14, fontSize: '3.5rem', fontFamily: 'serif', color: 'var(--color-champagne-gold)', pointerEvents: 'none', userSelect: 'none', zIndex: 1 }}>
        ∫
      </div>
      <div style={{ position: 'absolute', top: '45%', right: '7%', opacity: 0.12, fontSize: '3rem', fontFamily: 'serif', color: '#8EB3F5', pointerEvents: 'none', userSelect: 'none', zIndex: 1 }}>
        ∇
      </div>
      <div style={{ position: 'absolute', bottom: '20%', left: '12%', opacity: 0.12, fontSize: '2.8rem', fontFamily: 'serif', color: 'var(--color-champagne-gold)', pointerEvents: 'none', userSelect: 'none', zIndex: 1 }}>
        ∑
      </div>
      <div style={{ position: 'absolute', top: '25%', right: '18%', opacity: 0.12, fontSize: '2.4rem', fontFamily: 'serif', color: 'var(--color-champagne-gold)', pointerEvents: 'none', userSelect: 'none', zIndex: 1 }}>
        {"e^(iπ) + 1 = 0"}
      </div>

      <div className="container-luxury" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Column: Headlines & Actions */}
          <div style={{ maxWidth: '600px' }}>
            
            {/* Academic Badge */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 1.1rem',
                background: 'rgba(214, 184, 117, 0.08)',
                border: '1px solid var(--border-gold-medium)',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1.8rem',
                boxShadow: '0 2px 14px rgba(214, 184, 117, 0.15)'
              }}
            >
              <Sparkles size={14} color="var(--color-champagne-gold)" />
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.8rem', 
                color: 'var(--color-champagne-gold)', 
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}>
                {siteConfig.brand.name}
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.7rem, 5.5vw, 4.3rem)',
                fontWeight: 700,
                lineHeight: 1.12,
                color: '#FFFFFF',
                letterSpacing: '-0.015em',
                marginBottom: '1.4rem'
              }}
            >
              Mathematics, <br />
              <span className="text-gold-gradient">Made Clear.</span>
            </h1>

            {/* Supporting Headline */}
            <p 
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.65,
                color: 'var(--color-muted-silver)',
                marginBottom: '2.2rem',
                fontWeight: 400
              }}
            >
              From Class 10 foundations to Engineering Mathematics — learn every concept with clarity and confidence guided by <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>{siteConfig.teacher.name}</strong>.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              {/* PRIMARY: Explore Courses */}
              <button 
                onClick={() => onNavigate('/courses')}
                className="btn-gold-primary"
                id="hero-explore-courses-btn"
              >
                <span className="btn-icon-bubble-gold">
                  <ArrowRight size={16} strokeWidth={2.4} />
                </span>
                <span>Explore Courses</span>
              </button>

              {/* SECONDARY: Watch Free Lessons */}
              <a 
                href={siteConfig.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-secondary"
                id="hero-watch-lessons-btn"
              >
                <span className="btn-icon-bubble-youtube">
                  <YoutubeIcon size={16} color="#FF4D4D" />
                </span>
                <span>Watch Free Lessons</span>
              </a>
            </div>

            {/* Trust Pillars */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.4rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(214, 184, 117, 0.15)',
                fontSize: '0.86rem',
                color: 'var(--color-warm-ivory)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="var(--color-champagne-gold)" />
                <span>12+ Years Experience</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="var(--color-champagne-gold)" />
                <span>3,000+ Free YouTube Videos</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span style={{ color: '#6EE7B7' }}>100% Free Access For Everyone</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Educator Portrait & Mathematics Showcase */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', position: 'relative', paddingLeft: '1rem' }}>
            <div 
              style={{
                width: '100%',
                maxWidth: '440px',
                position: 'relative',
                marginRight: 'auto'
              }}
            >

              {/* Main Animated Portrait Card */}
              <div 
                className="animate-portrait"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '2px solid rgba(214, 184, 117, 0.45)',
                  background: 'linear-gradient(180deg, #10182A 0%, #080D1A 100%)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(42, 168, 255, 0.3)'
                }}
              >
                {/* Photo of Naresh Sir */}
                <div style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden' }}>
                  <img 
                    src={siteConfig.teacher.photoUrl} 
                    alt={siteConfig.teacher.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'left top',
                      transition: 'transform 0.5s ease',
                      display: 'block'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient vignettes on photo edges for luxury blending */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(8, 13, 26, 0.1) 0%, rgba(8, 13, 26, 0.3) 60%, rgba(8, 13, 26, 0.95) 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Top Floating Badge on Image */}
                  <div 
                    className="animate-badge-float"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.4rem 0.85rem',
                      background: 'rgba(8, 13, 26, 0.88)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(214, 184, 117, 0.35)',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--color-champagne-gold)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }} />
                    <span>Live Instructor</span>
                  </div>

                  {/* Top Right YouTube Badge */}
                  <a
                    href={siteConfig.youtube.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.4rem 0.8rem',
                      background: 'rgba(204, 0, 0, 0.92)',
                      borderRadius: 'var(--radius-full)',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(204, 0, 0, 0.5)'
                    }}
                  >
                    <YoutubeIcon size={13} color="#FFFFFF" />
                    <span>eClass Channel</span>
                  </a>
                </div>

                {/* Bottom Card Information */}
                <div 
                  style={{
                    padding: '1.4rem 1.6rem 1.6rem 1.6rem',
                    background: 'linear-gradient(180deg, rgba(16, 24, 42, 0.95) 0%, rgba(8, 13, 26, 0.98) 100%)',
                    borderTop: '1px solid rgba(214, 184, 117, 0.25)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#FFFFFF', fontWeight: 700 }}>
                      {siteConfig.teacher.name}
                    </h3>
                    <span style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-champagne-gold)',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(214, 184, 117, 0.1)',
                      border: '1px solid rgba(214, 184, 117, 0.25)',
                      borderRadius: '4px'
                    }}>
                      {siteConfig.teacher.qualifications}
                    </span>
                  </div>

                  <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {siteConfig.teacher.formalTitle} • {siteConfig.teacher.experienceYears}
                  </p>

                  {/* Micro Equation Preview */}
                  <div 
                    style={{
                      padding: '0.65rem 0.9rem',
                      background: 'rgba(8, 13, 26, 0.8)',
                      borderRadius: '10px',
                      border: '1px solid rgba(214, 184, 117, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)' }}>
                      Core Specialty:
                    </div>
                    <KaTeXMath math="\det(A - \lambda I) = 0" />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
