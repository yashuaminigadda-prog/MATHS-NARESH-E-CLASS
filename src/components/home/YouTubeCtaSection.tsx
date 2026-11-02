import React from 'react';
import { ExternalLink } from 'lucide-react';
import { YoutubeIcon } from '../common/YoutubeIcon';
import { siteConfig } from '../../config/siteConfig';

export const YouTubeCtaSection: React.FC = () => {
  return (
    <section 
      style={{
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0A1020 0%, #060914 100%)',
        borderTop: '1px solid rgba(214, 184, 117, 0.2)'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '650px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(204, 0, 0, 0.12) 0%, rgba(214, 184, 117, 0.08) 50%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-luxury" style={{ position: 'relative', zIndex: 2 }}>
        <div 
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '3.5rem 2rem',
            background: 'linear-gradient(135deg, rgba(22, 34, 59, 0.6) 0%, rgba(12, 19, 34, 0.9) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(214, 184, 117, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(214, 184, 117, 0.08)'
          }}
        >
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              background: 'rgba(204, 0, 0, 0.12)',
              border: '1px solid rgba(204, 0, 0, 0.3)',
              borderRadius: 'var(--radius-full)',
              marginBottom: '1.6rem'
            }}
          >
            <YoutubeIcon size={17} color="#FF4D4D" />
            <span style={{ 
              fontSize: '0.78rem', 
              color: '#FF6B6B', 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em' 
            }}>
              Official YouTube Classroom
            </span>
          </div>

          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1.2rem'
            }}
          >
            Your Next Maths Concept <br />
            <span className="text-gold-gradient">Starts Here.</span>
          </h2>

          <p 
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'var(--color-muted-silver)',
              lineHeight: 1.65,
              maxWidth: '640px',
              margin: '0 auto 2.5rem auto'
            }}
          >
            Explore the lessons, strengthen your fundamentals, and keep learning one concept at a time.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={siteConfig.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-primary"
              id="cta-continue-learning-btn"
            >
              <span className="btn-icon-bubble-gold">
                <YoutubeIcon size={17} color="#060A14" />
              </span>
              <span>Continue Learning on YouTube</span>
              <ExternalLink size={16} />
            </a>
          </div>

          <div style={{ marginTop: '1.8rem', fontSize: '0.8rem', color: 'var(--color-silver-subtle)' }}>
            Subscribe to receive notifications when new chapter walkthroughs and revision marathons go live.
          </div>
        </div>
      </div>
    </section>
  );
};
