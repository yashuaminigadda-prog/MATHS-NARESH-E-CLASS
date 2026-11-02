import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';
import { allChapters, courseCategories } from '../data/coursesData';
import { featuredVideos } from '../data/featuredVideosData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { KaTeXMath } from '../components/common/KaTeXMath';
import { siteConfig } from '../config/siteConfig';

interface ChapterPageProps {
  levelId: string;
  chapterSlug: string;
  onNavigate: (path: string) => void;
}

export const ChapterPage: React.FC<ChapterPageProps> = ({ levelId, chapterSlug, onNavigate }) => {
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const category = courseCategories.find((c) => c.id === levelId) || courseCategories[0];
  const levelChapters = allChapters.filter((ch) => ch.levelId === levelId);
  const currentIndex = levelChapters.findIndex((ch) => ch.slug === chapterSlug);
  const chapter = levelChapters[currentIndex] || levelChapters[0];

  const prevChapter = currentIndex > 0 ? levelChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < levelChapters.length - 1 ? levelChapters[currentIndex + 1] : null;

  const relatedVideos = featuredVideos.filter((v) => 
    chapter.relatedVideoIds.includes(v.id) || v.chapterSlug === chapter.slug
  );

  const handleCopyLatex = (id: string, latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ paddingBottom: '6rem', minHeight: '80vh' }}>
      
      {/* Chapter Header Banner */}
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
              { label: category.title, url: `/courses/${category.id}` },
              { label: chapter.title }
            ]} 
            onNavigate={onNavigate} 
          />

          <div style={{ maxWidth: '880px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <span className="badge-gold">
                Chapter {chapter.chapterNumber}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-silver-subtle)', fontFamily: 'var(--font-mono)' }}>
                {chapter.subject} • Unit {chapter.unitNumber}
              </span>
              {chapter.boardWeightage && (
                <span className="badge-royal" style={{ fontSize: '0.72rem' }}>
                  {chapter.boardWeightage}
                </span>
              )}
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
              {chapter.title}
            </h1>

            <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {chapter.description}
            </p>

            {/* Quick jump anchor bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href="#concepts"
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 24, 42, 0.8)',
                  border: '1px solid rgba(214, 184, 117, 0.25)',
                  color: 'var(--color-champagne-gold)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <BookOpen size={14} />
                <span>Core Concepts</span>
              </a>

              <a
                href="#formulas"
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 24, 42, 0.8)',
                  border: '1px solid rgba(214, 184, 117, 0.25)',
                  color: 'var(--color-champagne-gold)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Sparkles size={14} />
                <span>Formula Bank</span>
              </a>

              <a
                href="#questions"
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 24, 42, 0.8)',
                  border: '1px solid rgba(214, 184, 117, 0.25)',
                  color: 'var(--color-champagne-gold)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <HelpCircle size={14} />
                <span>High-Yield Questions</span>
              </a>

              {chapter.hasNotesPdf && (
                <a
                  href="#notes"
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(35, 61, 112, 0.4)',
                    border: '1px solid rgba(142, 179, 245, 0.3)',
                    color: '#8EB3F5',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Clock size={14} />
                  <span>Notes: Coming Soon</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Chapter Content Body */}
      <div className="container-luxury" style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          
          {/* Main Content Column */}
          <div style={{ gridColumn: 'span 2' }}>

            {/* Section 1: Key Concepts */}
            <section id="concepts" style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <BookOpen size={22} color="var(--color-champagne-gold)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 700 }}>
                  Key Concepts & Analytical Proofs
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                {chapter.keyConcepts.map((concept, idx) => (
                  <div 
                    key={idx}
                    className="gold-card-static"
                    style={{ padding: '2rem 1.8rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.15rem 0.5rem',
                        background: 'rgba(214, 184, 117, 0.1)',
                        border: '1px solid rgba(214, 184, 117, 0.2)',
                        borderRadius: '4px',
                        color: 'var(--color-champagne-gold)'
                      }}>
                        Concept {idx + 1}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.28rem', fontWeight: 600, color: '#FFFFFF' }}>
                        {concept.title}
                      </h3>
                    </div>

                    <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: concept.latexFormula ? '1.2rem' : '0' }}>
                      {concept.description}
                    </p>

                    {concept.latexFormula && (
                      <div>
                        <KaTeXMath math={concept.latexFormula} block />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Formula Reference Bank */}
            <section id="formulas" style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <Sparkles size={22} color="var(--color-champagne-gold)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 700 }}>
                  Formula Bank (LaTeX Formats)
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {chapter.formulas.map((f) => (
                  <div
                    key={f.id}
                    className="gold-card"
                    style={{ padding: '1.6rem 1.8rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 600 }}>
                        {f.name}
                      </h3>
                      
                      <button
                        onClick={() => handleCopyLatex(f.id, f.latex)}
                        title="Copy LaTeX formula code"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.3rem 0.6rem',
                          background: 'rgba(8, 13, 26, 0.8)',
                          border: '1px solid rgba(214, 184, 117, 0.2)',
                          borderRadius: '4px',
                          color: copiedFormulaId === f.id ? '#4ADE80' : 'var(--color-champagne-gold)',
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {copiedFormulaId === f.id ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedFormulaId === f.id ? 'Copied' : 'Copy LaTeX'}</span>
                      </button>
                    </div>

                    <KaTeXMath math={f.latex} block />

                    <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.6rem', fontStyle: 'italic' }}>
                      Note: {f.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: High-Yield Exam Questions */}
            <section id="questions" style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <HelpCircle size={22} color="var(--color-champagne-gold)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 700 }}>
                  High-Yield Exam Questions
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {chapter.importantQuestions.map((q, idx) => {
                  const isRevealed = revealedSolutions[q.id];
                  return (
                    <div
                      key={q.id}
                      className="gold-card-static"
                      style={{ padding: '1.8rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-champagne-gold)', textTransform: 'uppercase' }}>
                          Question {idx + 1}
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            background: 'rgba(35, 61, 112, 0.4)',
                            color: '#8EB3F5'
                          }}>
                            {q.difficulty}
                          </span>
                          <span className="badge-royal" style={{ fontSize: '0.7rem' }}>
                            {q.frequency}
                          </span>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.5, marginBottom: '1.2rem' }}>
                        {q.question}
                      </h4>

                      {q.questionLatex && (
                        <div style={{ marginBottom: '1rem' }}>
                          <KaTeXMath math={q.questionLatex} block />
                        </div>
                      )}

                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="btn-gold-secondary"
                        style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                      >
                        <span>{isRevealed ? 'Hide Solution Steps' : 'Reveal Step-by-Step Hints'}</span>
                      </button>

                      {isRevealed && (
                        <div 
                          style={{
                            marginTop: '1.2rem',
                            padding: '1.2rem',
                            background: 'rgba(8, 13, 26, 0.7)',
                            borderRadius: 'var(--radius-sm)',
                            borderLeft: '3px solid var(--color-champagne-gold)',
                            animation: 'fadeIn 0.25s ease-out'
                          }}
                        >
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-champagne-gold)', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                            Teacher's Solution Walkthrough:
                          </div>
                          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.88rem', color: 'var(--color-warm-ivory)' }}>
                            {q.solutionHints.map((hint, hIdx) => (
                              <li key={hIdx}>{hint}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Previous and Next Chapter Nav Bar */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(214, 184, 117, 0.2)'
              }}
            >
              {prevChapter ? (
                <button
                  onClick={() => onNavigate(`/courses/${prevChapter.levelId}/${prevChapter.slug}`)}
                  className="btn-gold-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  <ArrowLeft size={16} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-muted-silver)' }}>Previous Chapter</div>
                    <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>{prevChapter.title}</div>
                  </div>
                </button>
              ) : <div />}

              {nextChapter ? (
                <button
                  onClick={() => onNavigate(`/courses/${nextChapter.levelId}/${nextChapter.slug}`)}
                  className="btn-gold-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#080D1A', opacity: 0.8 }}>Next Chapter</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{nextChapter.title}</div>
                  </div>
                  <ArrowRight size={16} />
                </button>
              ) : <div />}
            </div>

          </div>

          {/* Right Column: Teacher Video & Notes Download */}
          <div>
            {/* Download Notes Card */}
            <div 
              id="notes"
              className="gold-card-static" 
              style={{ 
                padding: '1.8rem', 
                marginBottom: '2rem',
                background: 'linear-gradient(180deg, #121A2D 0%, #0A0F1E 100%)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <FileText size={20} color="var(--color-champagne-gold)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', color: '#FFFFFF', fontWeight: 600 }}>
                  Teacher Notes & Handouts
                </h3>
              </div>

              {chapter.hasNotesPdf && chapter.notesPdfUrl ? (
                <div>
                  <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    Authentic handwritten lecture summary notes prepared by {siteConfig.teacher.name} covering all derivations and proofs for this chapter.
                  </p>
                  
                  <div style={{ 
                    padding: '0.8rem', 
                    background: 'rgba(8, 13, 26, 0.7)', 
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(214, 184, 117, 0.15)',
                    marginBottom: '1.2rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-champagne-gold)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    PDF Document • {chapter.notesPageCount || 15} Pages Verified
                  </div>

                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(214, 184, 117, 0.1)',
                      border: '1px solid rgba(214, 184, 117, 0.25)',
                      color: 'var(--color-champagne-gold)',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  >
                    <Clock size={16} />
                    <span>Handwritten Notes: Coming Soon</span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <AlertCircle size={28} color="var(--color-silver-subtle)" style={{ margin: '0 auto 0.6rem auto' }} />
                  <div style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Handouts Under Final Review
                  </div>
                  <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                    The notes for this chapter are currently being formatted. You can join the Telegram community to get alerted the instant the PDF is published.
                  </p>
                  <a
                    href={siteConfig.social.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
                  >
                    <span>Get Notified on Telegram</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>

            {/* Related Video Card */}
            <div className="gold-card-static" style={{ padding: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <YoutubeIcon size={20} color="#FF4D4D" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', color: '#FFFFFF', fontWeight: 600 }}>
                  Related YouTube Derivations
                </h3>
              </div>

              {relatedVideos.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedVideos.map((vid) => (
                    <div key={vid.id}>
                      <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.6rem' }}>
                        <img 
                          src={vid.thumbnailUrl} 
                          alt={vid.title} 
                          style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '6px',
                          right: '6px',
                          background: 'rgba(0,0,0,0.85)',
                          color: '#fff',
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          {vid.duration}
                        </div>
                      </div>

                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                        {vid.title}
                      </div>

                      <a
                        href={vid.playlistUrl || `${siteConfig.youtube.directVideoBaseUrl}${vid.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-youtube"
                        style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '0.5rem 1rem' }}
                      >
                        <YoutubeIcon size={15} color="#FFFFFF" />
                        <span>{vid.playlistUrl ? 'Open Complete Playlist' : 'Watch on YouTube'}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    Video lesson for this chapter will be streamed on the official channel.
                  </p>
                  <a
                    href={siteConfig.youtube.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-youtube"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
                  >
                    <YoutubeIcon size={15} color="#FFFFFF" />
                    <span>Visit YouTube Channel</span>
                  </a>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
