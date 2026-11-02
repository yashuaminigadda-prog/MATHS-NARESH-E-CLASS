import React from 'react';
import { 
  GraduationCap, 
  Compass, 
  Cpu, 
  Binary, 
  ArrowRight, 
  BookOpen, 
  Video, 
  Layers 
} from 'lucide-react';
import { courseCategories } from '../../data/coursesData';
import { siteConfig } from '../../config/siteConfig';

interface CourseCategoriesSectionProps {
  onNavigate: (path: string) => void;
}

export const CourseCategoriesSection: React.FC<CourseCategoriesSectionProps> = ({ onNavigate }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap size={24} color="var(--color-champagne-gold)" />;
      case 'Compass': return <Compass size={24} color="var(--color-champagne-gold)" />;
      case 'Cpu': return <Cpu size={24} color="var(--color-champagne-gold)" />;
      case 'Binary': return <Binary size={24} color="var(--color-champagne-gold)" />;
      default: return <BookOpen size={24} color="var(--color-champagne-gold)" />;
    }
  };

  return (
    <section className="section-spacing math-grid-bg" style={{ position: 'relative' }}>
      <div className="container-luxury">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            Structured Curricula
          </div>
          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}
          >
            Academic Programs Designed for <br />
            <span className="text-gold-gradient">Mathematical Mastery</span>
          </h2>
          <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.02rem', lineHeight: 1.6 }}>
            Every level is organized from foundational intuitions to rigorous exam solutions. Select your learning tier to begin.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {courseCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => onNavigate(`/courses/${category.id}`)}
              className="gold-card"
              style={{
                padding: '2.2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Accent line */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent 0%, var(--color-champagne-gold) 50%, transparent 100%)',
                  opacity: 0.7
                }}
              />

              {/* Card Cover Banner featuring Sir's Portrait */}
              <div 
                style={{
                  position: 'relative',
                  height: '145px',
                  borderRadius: '12px 12px 0 0',
                  margin: '-2.2rem -1.8rem 1.6rem -1.8rem',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #0C1424 0%, #172746 55%, #0B111F 100%)',
                  borderBottom: '1px solid rgba(214, 184, 117, 0.25)'
                }}
              >
                {/* Math Formulas Watermark */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '1.2rem',
                    bottom: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'rgba(214, 184, 117, 0.35)',
                    letterSpacing: '0.03em',
                    pointerEvents: 'none'
                  }}
                >
                  {category.id === 'class-10' && 'ax² + bx + c = 0 • sin²θ+cos²θ=1'}
                  {category.id === 'intermediate' && '∫ e^x dx • d/dx[ln(x)] • lim x→0'}
                  {category.id === 'diploma' && '∇ • F = div(F) • Det[Matrix]'}
                  {category.id === 'btech' && '∂²u/∂x² + ∂²u/∂y² = 0 • ℒ{f(t)}'}
                </div>

                {/* Sir's Portrait image */}
                <img 
                  src={siteConfig.teacher.photoUrl}
                  alt={`${siteConfig.teacher.name} - ${category.title}`}
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '130px',
                    height: '150px',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, transparent 100%)',
                    filter: 'contrast(1.05)',
                    opacity: 0.95
                  }}
                />

                {/* Overlaid Badges Row — badge on LEFT, icon on LEFT, face photo on RIGHT */}
                <div style={{ position: 'relative', zIndex: 2, padding: '1rem 1.2rem', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(8, 13, 26, 0.8)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(214, 184, 117, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    flexShrink: 0
                  }}>
                    {getCategoryIcon(category.iconName)}
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.3rem 0.75rem',
                    background: 'rgba(8, 13, 26, 0.88)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '9999px',
                    border: '1px solid rgba(214, 184, 117, 0.4)',
                    fontSize: '0.74rem',
                    color: 'var(--color-champagne-gold)',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    marginTop: '0.25rem'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-champagne-gold)',
                      boxShadow: '0 0 6px var(--color-champagne-gold)'
                    }} />
                    <span>By {siteConfig.teacher.name}</span>
                  </div>
                </div>
              </div>

              <div>
                {/* Badge & Unit stats */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <span className="badge-royal" style={{ fontSize: '0.72rem' }}>
                    {category.badge}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--color-silver-subtle)', fontFamily: 'var(--font-mono)' }}>
                    {category.unitsCount} Units
                  </span>
                </div>

                {/* Course Title & Subtitle */}
                <h3 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem'
                  }}
                >
                  {category.title}
                </h3>

                <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                  {category.subtitle}
                </p>

                {/* Topics preview tag cluster */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.8rem' }}>
                  {category.featuredTopics.slice(0, 3).map((topic, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.74rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        background: 'rgba(8, 13, 26, 0.6)',
                        border: '1px solid rgba(214, 184, 117, 0.15)',
                        color: 'var(--color-warm-ivory)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Meta & Action Link */}
              <div>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid rgba(214, 184, 117, 0.15)',
                    fontSize: '0.82rem',
                    color: 'var(--color-muted-silver)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Layers size={14} color="var(--color-champagne-gold)" />
                      {category.unitsCount} Units
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Video size={14} color="#FF6B6B" />
                      {category.videoCount}+ Lessons
                    </span>
                  </div>

                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: 'var(--color-champagne-gold)',
                      fontWeight: 600,
                      fontSize: '0.88rem'
                    }}
                  >
                    <span>Explore Course</span>
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
