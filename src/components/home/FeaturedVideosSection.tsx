import React, { useState } from 'react';
import { Play, Clock, ExternalLink, ArrowRight, X } from 'lucide-react';
import { YoutubeIcon } from '../common/YoutubeIcon';
import { featuredVideos } from '../../data/featuredVideosData';
import { siteConfig } from '../../config/siteConfig';
import type { VideoLesson } from '../../types';

interface FeaturedVideosSectionProps {
  onNavigate: (path: string) => void;
}

export const FeaturedVideosSection: React.FC<FeaturedVideosSectionProps> = ({ onNavigate }) => {
  const [activeModalVideo, setActiveModalVideo] = useState<VideoLesson | null>(null);

  return (
    <section 
      className="section-spacing"
      style={{
        backgroundColor: '#070C18',
        borderTop: '1px solid rgba(214, 184, 117, 0.15)',
        borderBottom: '1px solid rgba(214, 184, 117, 0.15)',
        position: 'relative'
      }}
    >
      <div className="container-luxury">
        
        {/* Section Heading Row */}
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
              High-Definition Video Lectures
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
              Learn with Video Lessons
            </h2>
            <p style={{ color: 'var(--color-muted-silver)', fontSize: '1rem', marginTop: '0.5rem', maxWidth: '580px' }}>
              Concept-first derivations, step-by-step whiteboard walkthroughs, and exam-oriented problem sets.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href={siteConfig.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-youtube"
              id="featured-visit-channel-btn"
            >
              <YoutubeIcon size={18} color="#FFFFFF" />
              <span>Visit YouTube Channel</span>
              <ExternalLink size={14} />
            </a>

            <button
              onClick={() => onNavigate('/youtube-lessons')}
              className="btn-gold-secondary"
              style={{ padding: '0.7rem 1.3rem', fontSize: '0.9rem' }}
            >
              <span>View All Lessons</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {featuredVideos.slice(0, 4).map((video) => (
            <div
              key={video.id}
              className="gold-card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Thumbnail Container */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '190px',
                  backgroundColor: '#0B1120',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveModalVideo(video)}
              >
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(8,13,26,0.1) 0%, rgba(8,13,26,0.85) 100%)'
                  }}
                />

                <div 
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.25rem 0.55rem',
                    background: 'rgba(8, 13, 26, 0.9)',
                    borderRadius: '4px',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <Clock size={12} color="var(--color-champagne-gold)" />
                  <span>{video.duration}</span>
                </div>

                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'rgba(204, 0, 0, 0.9)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(204, 0, 0, 0.5)'
                  }}
                >
                  <Play size={20} color="#FFFFFF" style={{ marginLeft: '3px' }} />
                </div>
              </div>

              {/* Video Info Content */}
              <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span 
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-champagne-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {video.subject}
                    </span>
                    <span style={{ color: 'var(--color-silver-subtle)', fontSize: '0.7rem' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-muted-silver)' }}>
                      {video.unitName}
                    </span>
                  </div>

                  <h4 
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.35,
                      marginBottom: '0.75rem'
                    }}
                  >
                    {video.title}
                  </h4>

                  <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    {video.description}
                  </p>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(214, 184, 117, 0.12)'
                  }}
                >
                  <button
                    onClick={() => setActiveModalVideo(video)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-champagne-gold)',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Play size={14} />
                    <span>Watch Lesson</span>
                  </button>

                  <a
                    href={`${siteConfig.youtube.directVideoBaseUrl}${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: 'var(--color-muted-silver)',
                      fontSize: '0.78rem',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted-silver)')}
                  >
                    <span>On YouTube</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {activeModalVideo && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            backgroundColor: 'rgba(3, 6, 12, 0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease-out'
          }}
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '850px',
              background: '#0D1527',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(214, 184, 117, 0.3)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              style={{
                padding: '1rem 1.4rem',
                borderBottom: '1px solid rgba(214, 184, 117, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#FFFFFF' }}>
                  {activeModalVideo.title}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)' }}>
                  {activeModalVideo.subject} • {activeModalVideo.duration}
                </div>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-muted-silver)',
                  cursor: 'pointer',
                  padding: '0.3rem'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeModalVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            </div>

            <div 
              style={{
                padding: '1rem 1.4rem',
                background: '#090E1B',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div style={{ fontSize: '0.84rem', color: 'var(--color-muted-silver)' }}>
                Watch on YouTube to like, comment with your doubts, and subscribe.
              </div>

              <a
                href={siteConfig.youtube.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-youtube"
                style={{ padding: '0.55rem 1.1rem', fontSize: '0.84rem' }}
              >
                <YoutubeIcon size={16} color="#FFFFFF" />
                <span>Subscribe to Channel</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
