import React, { useState } from 'react';
import { 
  Video, 
  FileText, 
  Clock, 
  ChevronRight, 
  SlidersHorizontal
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';
import { courseCategories, allChapters } from '../data/coursesData';
import { featuredVideos } from '../data/featuredVideosData';
import { studyResources } from '../data/studyResourcesData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import type { EducationLevelId } from '../types';
import { siteConfig } from '../config/siteConfig';

interface CoursePageProps {
  levelId: EducationLevelId;
  onNavigate: (path: string) => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({ levelId, onNavigate }) => {
  const category = courseCategories.find((c) => c.id === levelId) || courseCategories[0];
  const [selectedCurriculum, setSelectedCurriculum] = useState(category.defaultCurriculum);

  const chapters = allChapters.filter((ch) => ch.levelId === category.id);
  const relatedVideos = featuredVideos.filter((v) => v.levelId === category.id);
  const relatedResources = studyResources.filter((r) => r.levelId === category.id);

  return (
    <div style={{ paddingBottom: '5rem', minHeight: '80vh' }}>
      
      {/* Course Hero Banner */}
      <section 
        style={{
          position: 'relative',
          padding: '3rem 0 3.5rem 0',
          background: 'radial-gradient(ellipse at 50% 0%, #162442 0%, #0D1629 55%, #080D1A 100%)',
          borderBottom: '1px solid rgba(214, 184, 117, 0.18)'
        }}
      >
        <div className="container-luxury">
          <Breadcrumbs 
            items={[
              { label: 'Courses', url: '/courses' },
              { label: category.title }
            ]} 
            onNavigate={onNavigate} 
          />

          <div style={{ maxWidth: '840px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge-gold">
                {category.badge}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-silver-subtle)', fontFamily: 'var(--font-mono)' }}>
                {category.unitsCount} Units • {chapters.length} Chapters Active
              </span>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.25rem 0.75rem',
                background: 'rgba(16, 24, 42, 0.85)',
                borderRadius: '9999px',
                border: '1px solid rgba(214, 184, 117, 0.3)'
              }}>
                <img 
                  src={siteConfig.teacher.photoUrl}
                  alt={siteConfig.teacher.name}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    border: '1px solid var(--color-champagne-gold)'
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-champagne-gold)', fontWeight: 600 }}>
                  Taught by {siteConfig.teacher.name}
                </span>
              </div>
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
              {category.title}
            </h1>

            <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.08rem', lineHeight: 1.65, marginBottom: '2rem' }}>
              {category.description}
            </p>

            {/* Curriculum / Board Selector */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
                padding: '0.8rem 1.2rem',
                background: 'rgba(16, 24, 42, 0.9)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(214, 184, 117, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-champagne-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
                <SlidersHorizontal size={15} />
                <span>Curriculum Scheme:</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {category.curriculumOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedCurriculum(opt)}
                    style={{
                      background: selectedCurriculum === opt ? 'var(--color-champagne-gold)' : 'rgba(8, 13, 26, 0.6)',
                      color: selectedCurriculum === opt ? '#080D1A' : 'var(--color-warm-ivory)',
                      border: '1px solid',
                      borderColor: selectedCurriculum === opt ? 'var(--color-champagne-gold)' : 'rgba(214, 184, 117, 0.2)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: selectedCurriculum === opt ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Course Content */}
      <div className="container-luxury" style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {/* Left Main: Chapters List */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 700 }}>
                  Chapter Syllabus Navigation
                </h2>
                <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.9rem' }}>
                  Aligned with {selectedCurriculum}. Click any chapter to view formulas, notes, and video derivations.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {chapters.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => onNavigate(`/courses/${ch.levelId}/${ch.slug}`)}
                  className="gold-card"
                  style={{
                    padding: '1.6rem 1.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', minWidth: 0, flex: 1 }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(35, 61, 112, 0.4)',
                      border: '1px solid rgba(214, 184, 117, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                        CH
                      </span>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                        {ch.chapterNumber}
                      </span>
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF' }}>
                          {ch.title}
                        </h3>
                        {ch.boardWeightage && (
                          <span style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            background: 'rgba(214, 184, 117, 0.1)',
                            border: '1px solid rgba(214, 184, 117, 0.2)',
                            color: 'var(--color-champagne-gold)'
                          }}>
                            {ch.boardWeightage}
                          </span>
                        )}
                      </div>

                      <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                        {ch.description}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: 'var(--color-silver-subtle)' }}>
                        <span>{ch.keyConcepts.length} Core Concepts</span>
                        <span>•</span>
                        <span>{ch.formulas.length} Formulas</span>
                        <span>•</span>
                        <span>{ch.importantQuestions.length} High-Yield Questions</span>
                        <span>•</span>
                        {ch.hasNotesPdf ? (
                          <span style={{ color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={12} /> Notes: Coming Soon
                          </span>
                        ) : (
                          <span style={{ color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={12} /> Notes in Review
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-champagne-gold)', fontWeight: 600 }} className="desktop-search-label">
                      Open Chapter
                    </span>
                    <ChevronRight size={18} color="var(--color-champagne-gold)" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Related Videos & Resources */}
          <div>
            <div 
              className="gold-card-static" 
              style={{ 
                padding: '1.8rem', 
                marginBottom: '2rem',
                background: 'linear-gradient(180deg, #121A2D 0%, #0A0F1E 100%)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
                <YoutubeIcon size={20} color="#FF4D4D" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', color: '#FFFFFF', fontWeight: 600 }}>
                  Recommended Video Lessons
                </h3>
              </div>

              {relatedVideos.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedVideos.map((vid) => (
                    <div 
                      key={vid.id}
                      style={{
                        padding: '0.9rem',
                        background: 'rgba(8, 13, 26, 0.7)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(214, 184, 117, 0.15)',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-champagne-gold)', fontFamily: 'var(--font-mono)' }}>
                        {vid.chapterTitle} • {vid.duration}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', margin: '0.3rem 0 0.6rem 0' }}>
                        {vid.title}
                      </div>
                      <a
                        href={vid.playlistUrl || `${siteConfig.youtube.directVideoBaseUrl}${vid.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold-secondary"
                        style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem', width: '100%', justifyContent: 'center' }}
                      >
                        <Video size={13} />
                        <span>{vid.playlistUrl ? 'Open Complete Playlist' : 'Watch on YouTube'}</span>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: 'var(--color-muted-silver)', fontSize: '0.85rem' }}>
                  Weekly lessons being uploaded to YouTube.
                </div>
              )}

              <a
                href={siteConfig.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-youtube"
                style={{ width: '100%', marginTop: '1.2rem', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <YoutubeIcon size={16} color="#FFFFFF" />
                <span>Visit {siteConfig.brand.name} Channel</span>
              </a>
            </div>

            <div className="gold-card-static" style={{ padding: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
                <FileText size={20} color="var(--color-champagne-gold)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', color: '#FFFFFF', fontWeight: 600 }}>
                  Course Materials & Notes
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {relatedResources.map((res) => (
                  <div
                    key={res.id}
                    style={{
                      padding: '0.8rem',
                      background: 'rgba(8, 13, 26, 0.5)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(214, 184, 117, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#FFFFFF' }}>
                        {res.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-silver-subtle)' }}>
                        {res.resourceType.replace('_', ' ')}
                      </div>
                    </div>

                    <span 
                      style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--color-champagne-gold)', 
                        background: 'rgba(214, 184, 117, 0.1)', 
                        border: '1px solid rgba(214, 184, 117, 0.2)', 
                        padding: '0.25rem 0.65rem', 
                        borderRadius: '4px', 
                        fontWeight: 500,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Coming Soon
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
