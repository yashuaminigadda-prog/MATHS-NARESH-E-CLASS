import React from 'react';
import { 
  GitBranch, 
  Lightbulb, 
  FileCheck2, 
  FolderArchive, 
  PlayCircle 
} from 'lucide-react';

export const WhyLearnHereSection: React.FC = () => {
  const pillars = [
    {
      icon: GitBranch,
      title: 'Structured Chapter-Wise Learning',
      description: 'Syllabus mapped systematically from fundamentals to advanced theorems without skipping prerequisites.',
    },
    {
      icon: Lightbulb,
      title: 'Clear First-Principles Explanations',
      description: 'Understand the mathematical "why" behind every step rather than relying on rote memorization.',
    },
    {
      icon: FileCheck2,
      title: 'Important Exam Questions',
      description: 'Curated question banks covering frequent board, polytechnic, and university examination patterns.',
    },
    {
      icon: FolderArchive,
      title: 'Organized Study Materials',
      description: 'Clean handwritten notes, formula cheat sheets, and blueprints with transparent file availability.',
    },
    {
      icon: PlayCircle,
      title: '3,000+ Free Video Lessons',
      description: 'Over 12+ years of classroom expertise distilled into 3,000+ free YouTube lessons accessible to everyone without paywalls.',
    },
  ];

  return (
    <section className="section-spacing" style={{ position: 'relative' }}>
      <div className="container-luxury">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '0.8rem' }}>
            Pedagogical Philosophy
          </div>
          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.25,
              marginBottom: '1rem'
            }}
          >
            Why Learn with <span className="text-gold-gradient">Maths Naresh eClass?</span>
          </h2>
          <p style={{ color: 'var(--color-muted-silver)', fontSize: '1rem', lineHeight: 1.65 }}>
            A disciplined, concept-driven architecture designed to transform abstract mathematical equations into intuitive understanding.
          </p>
        </div>

        {/* Pillars Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="gold-card"
                style={{
                  padding: '2rem 1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(35, 61, 112, 0.4) 0%, rgba(16, 24, 42, 0.8) 100%)',
                  border: '1px solid rgba(214, 184, 117, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-champagne-gold)',
                  boxShadow: '0 4px 12px rgba(214, 184, 117, 0.1)'
                }}>
                  <Icon size={22} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1.3
                }}>
                  {pillar.title}
                </h3>

                <p style={{
                  color: 'var(--color-muted-silver)',
                  fontSize: '0.88rem',
                  lineHeight: 1.65
                }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
