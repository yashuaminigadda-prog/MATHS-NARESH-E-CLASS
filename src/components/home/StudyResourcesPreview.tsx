import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { studyResources } from '../../data/studyResourcesData';

interface StudyResourcesPreviewProps {
  onNavigate: (path: string) => void;
}

export const StudyResourcesPreview: React.FC<StudyResourcesPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="section-spacing math-grid-bg" style={{ position: 'relative' }}>
      <div className="container-luxury">
        
        {/* Header Row */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <div>
            <div className="badge-gold" style={{ marginBottom: '0.8rem' }}>
              Academic Repository
            </div>
            <h2 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.2
              }}
            >
              Curated Study Resources
            </h2>
            <p style={{ color: 'var(--color-muted-silver)', fontSize: '1rem', marginTop: '0.5rem', maxWidth: '560px' }}>
              Handwritten formula booklets, key derivations, and exam blueprints verified against modern syllabi.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/study-materials')}
            className="btn-gold-secondary"
            style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem' }}
          >
            <span>Explore All Materials</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Resources Grid Preview */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.6rem'
          }}
        >
          {studyResources.slice(0, 4).map((resource) => (
            <div
              key={resource.id}
              className="gold-card"
              style={{
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Type & Status Badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <span 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--color-champagne-gold)',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      background: 'rgba(214, 184, 117, 0.1)',
                      borderRadius: '4px',
                      border: '1px solid rgba(214, 184, 117, 0.2)'
                    }}
                  >
                    {resource.resourceType.replace('_', ' ')}
                  </span>

                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#FBBF24' }}>
                    <Clock size={12} />
                    <span>Coming Soon</span>
                  </span>
                </div>

                {/* Title */}
                <h4 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.35,
                    marginBottom: '0.75rem'
                  }}
                >
                  {resource.title}
                </h4>

                <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                  {resource.description}
                </p>
              </div>

              {/* Action Area */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.1rem',
                  borderTop: '1px solid rgba(214, 184, 117, 0.12)',
                  fontSize: '0.82rem'
                }}
              >
                <div style={{ color: 'var(--color-silver-subtle)', fontFamily: 'var(--font-mono)' }}>
                  {resource.fileSize ? `${resource.fileSize} • ${resource.pages} Pgs` : `${resource.pages} Pgs`}
                </div>

                <span 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--color-champagne-gold)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    padding: '0.35rem 0.85rem',
                    background: 'rgba(214, 184, 117, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(214, 184, 117, 0.2)'
                  }}
                >
                  <Clock size={13} />
                  <span>Coming Soon</span>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
