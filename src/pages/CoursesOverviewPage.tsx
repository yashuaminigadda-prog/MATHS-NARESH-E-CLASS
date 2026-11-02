import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  Video, 
  CheckCircle2 
} from 'lucide-react';
import { courseCategories } from '../data/coursesData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';

interface CoursesOverviewPageProps {
  onNavigate: (path: string) => void;
}

export const CoursesOverviewPage: React.FC<CoursesOverviewPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ paddingBottom: '6rem', minHeight: '80vh' }}>
      
      {/* Banner */}
      <section 
        style={{
          padding: '3rem 0 3.5rem 0',
          background: 'radial-gradient(ellipse at 50% 0%, #162442 0%, #0D1629 55%, #080D1A 100%)',
          borderBottom: '1px solid rgba(214, 184, 117, 0.18)'
        }}
      >
        <div className="container-luxury">
          <Breadcrumbs 
            items={[
              { label: 'All Mathematics Courses' }
            ]} 
            onNavigate={onNavigate} 
          />

          <div style={{ maxWidth: '820px' }}>
            <div className="badge-gold" style={{ marginBottom: '1rem' }}>
              Academic Pathways
            </div>
            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '1rem'
              }}
            >
              Curriculum Programs
            </h1>
            <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Four dedicated learning streams engineered for students from high school board foundations to advanced undergraduate engineering mathematics.
            </p>
          </div>
        </div>
      </section>

      {/* Course Tiers List */}
      <div className="container-luxury" style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {courseCategories.map((cat) => (
            <div
              key={cat.id}
              className="gold-card"
              style={{
                padding: '2.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.2rem' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    position: 'relative',
                    padding: '2px',
                    background: 'linear-gradient(135deg, var(--color-champagne-gold) 0%, rgba(214, 184, 117, 0.2) 100%)',
                    boxShadow: '0 0 16px rgba(214, 184, 117, 0.25)',
                    flexShrink: 0
                  }}>
                    <img 
                      src={siteConfig.teacher.photoUrl}
                      alt={siteConfig.teacher.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'top'
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <span className="badge-royal" style={{ fontSize: '0.72rem' }}>
                        {cat.badge}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)' }}>
                        By {siteConfig.teacher.name}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {cat.title}
                    </h2>
                  </div>
                </div>

                <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {cat.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Layers size={16} />
                    {cat.unitsCount} Primary Units
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Video size={16} color="#FF6B6B" />
                    {cat.videoCount}+ Video Derivations
                  </span>
                </div>
              </div>

              {/* Right column: syllabus & action */}
              <div style={{
                padding: '1.8rem',
                background: 'rgba(8, 13, 26, 0.6)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(214, 184, 117, 0.15)'
              }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                  Key Topics & Modules:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.8rem' }}>
                  {cat.featuredTopics.map((topic, tIdx) => (
                    <div key={tIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--color-warm-ivory)' }}>
                      <CheckCircle2 size={14} color="var(--color-champagne-gold)" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate(`/courses/${cat.id}`)}
                  className="btn-gold-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Open {cat.shortTitle} Curriculum</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
