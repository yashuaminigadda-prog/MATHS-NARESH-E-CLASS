import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  ExternalLink, 
  Share2, 
  Check, 
  BookOpen, 
  X
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';
import { featuredVideos as defaultVideos } from '../data/featuredVideosData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import type { EducationLevelId, VideoLesson } from '../types';
import { siteConfig } from '../config/siteConfig';
import { SupabaseService } from '../services/supabaseService';

interface YouTubeLessonsPageProps {
  onNavigate: (path: string) => void;
}

export const YouTubeLessonsPage: React.FC<YouTubeLessonsPageProps> = ({ onNavigate }) => {
  const [videos, setVideos] = useState<VideoLesson[]>(defaultVideos);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevelId | 'all'>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoLesson | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    SupabaseService.getVideoLessons().then((data) => {
      if (isMounted && data && data.length > 0) {
        setVideos(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredVideos = selectedLevel === 'all' 
    ? videos 
    : videos.filter((v) => v.levelId === selectedLevel);

  const handleShare = (video: VideoLesson) => {
    const shareUrl = `${window.location.origin}/youtube-lessons?v=${video.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(video.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
              { label: 'YouTube Video Classroom' }
            ]} 
            onNavigate={onNavigate} 
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.9rem',
                  background: 'rgba(204, 0, 0, 0.12)',
                  border: '1px solid rgba(204, 0, 0, 0.35)',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '1rem',
                  color: '#FF6B6B',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <YoutubeIcon size={15} color="#FF6B6B" />
                <span>Official Channel Classroom</span>
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
                Mathematics Video Lessons
              </h1>

              <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '1.8rem' }}>
                Structured derivations, solved blueprints, and high-yield problem solving taught step-by-step by {siteConfig.teacher.name}.
              </p>

              <a
                href={siteConfig.youtube.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-youtube"
                style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
              >
                <YoutubeIcon size={18} color="#FFFFFF" />
                <span>Subscribe on YouTube</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Quick Channel Card */}
            <div 
              className="gold-card-static" 
              style={{ 
                padding: '1.8rem',
                background: 'linear-gradient(135deg, rgba(22, 34, 59, 0.8) 0%, rgba(12, 19, 34, 0.95) 100%)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#CC0000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(204, 0, 0, 0.4)'
                }}>
                  <YoutubeIcon size={24} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {siteConfig.youtube.channelName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)' }}>
                    {siteConfig.youtube.channelHandle}
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                Free educational access for all students. Join thousands of learners mastering mathematics from Class 10 to B.Tech.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <a
                  href={siteConfig.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.84rem', padding: '0.55rem' }}
                >
                  <span>Channel Home</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Filter and Video Cards */}
      <div className="container-luxury" style={{ marginTop: '3.5rem' }}>
        
        {/* Tier Filter Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {[
            { id: 'all', label: 'All Lessons' },
            { id: 'class-10', label: 'Class 10 Mathematics' },
            { id: 'intermediate', label: 'Intermediate (+2)' },
            { id: 'diploma', label: 'Diploma (Polytechnic)' },
            { id: 'btech', label: 'B.Tech Engineering (M1-M4)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLevel(tab.id as any)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                background: selectedLevel === tab.id ? 'var(--gradient-gold)' : 'rgba(16, 24, 42, 0.8)',
                color: selectedLevel === tab.id ? '#080D1A' : 'var(--color-warm-ivory)',
                border: '1px solid',
                borderColor: selectedLevel === tab.id ? 'var(--color-champagne-gold)' : 'rgba(214, 184, 117, 0.2)',
                fontSize: '0.88rem',
                fontWeight: selectedLevel === tab.id ? 600 : 400,
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredVideos.map((video) => (
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
                  height: '200px',
                  backgroundColor: '#0A1020',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveVideoModal(video)}
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

                {/* Duration Badge */}
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

                {/* Play Button */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(204, 0, 0, 0.92)',
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(204, 0, 0, 0.6)'
                  }}
                >
                  <Play size={22} color="#FFFFFF" style={{ marginLeft: '3px' }} />
                </div>
              </div>

              {/* Video Info */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <span 
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-champagne-gold)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {video.subject}
                    </span>
                    <span style={{ color: 'var(--color-silver-subtle)', fontSize: '0.7rem' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-muted-silver)' }}>
                      {video.unitName}
                    </span>
                  </div>

                  <h3 
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.35,
                      marginBottom: '0.75rem'
                    }}
                  >
                    {video.title}
                  </h3>

                  <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    {video.description}
                  </p>

                  {/* Topic Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                    {video.topicTags.map((tag, idx) => (
                      <span 
                        key={idx}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: 'rgba(35, 61, 112, 0.3)',
                          border: '1px solid rgba(142, 179, 245, 0.2)',
                          color: '#8EB3F5',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.1rem',
                    borderTop: '1px solid rgba(214, 184, 117, 0.12)'
                  }}
                >
                  <button
                    onClick={() => setActiveVideoModal(video)}
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
                    <span>Watch Preview</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <button
                      onClick={() => handleShare(video)}
                      title="Share lesson with classmates"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: copiedId === video.id ? '#4ADE80' : 'var(--color-muted-silver)',
                        cursor: 'pointer',
                        padding: '0.3rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem'
                      }}
                    >
                      {copiedId === video.id ? <Check size={14} /> : <Share2 size={14} />}
                      <span>{copiedId === video.id ? 'Copied' : 'Share'}</span>
                    </button>

                    <a
                      href={video.playlistUrl || `${siteConfig.youtube.directVideoBaseUrl}${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-youtube"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                    >
                      <YoutubeIcon size={14} color="#FFFFFF" />
                      <span>{video.playlistUrl ? 'Playlist' : 'YouTube'}</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {activeVideoModal && (
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
          onClick={() => setActiveVideoModal(null)}
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
                  {activeVideoModal.title}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)' }}>
                  {activeVideoModal.subject} • {activeVideoModal.playlistId ? 'Official Playlist Series' : activeVideoModal.duration}
                </div>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
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
                src={activeVideoModal.playlistId ? `https://www.youtube.com/embed/${activeVideoModal.youtubeId}?list=${activeVideoModal.playlistId}&autoplay=1&rel=0` : `https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
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
              <button
                onClick={() => {
                  setActiveVideoModal(null);
                  onNavigate(`/courses/${activeVideoModal.levelId}/${activeVideoModal.chapterSlug}`);
                }}
                className="btn-gold-secondary"
                style={{ fontSize: '0.84rem', padding: '0.55rem 1.1rem' }}
              >
                <BookOpen size={15} />
                <span>Open Related Chapter Notes & Formulas</span>
              </button>

              <a
                href={activeVideoModal.playlistUrl || `${siteConfig.youtube.directVideoBaseUrl}${activeVideoModal.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-youtube"
                style={{ padding: '0.55rem 1.1rem', fontSize: '0.84rem' }}
              >
                <YoutubeIcon size={16} color="#FFFFFF" />
                <span>{activeVideoModal.playlistUrl ? 'Open Complete Playlist on YouTube' : 'Watch on YouTube App/Web'}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
