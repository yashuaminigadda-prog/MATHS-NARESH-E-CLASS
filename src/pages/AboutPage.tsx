import React from 'react';
import { 
  ExternalLink, 
  Sparkles,
  Award,
  Video,
  Heart,
  Users,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';
import { siteConfig } from '../config/siteConfig';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
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
              { label: 'Home', url: '/' },
              { label: 'About Naresh Sir & Academy', url: '/about' }
            ]} 
            onNavigate={onNavigate} 
          />

          <div style={{ maxWidth: '850px' }}>
            <div className="badge-gold" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              <Award size={15} />
              <span>Academic Direction & 12+ Years Heritage</span>
            </div>

            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '1rem'
              }}
            >
              About <span style={{ color: 'var(--color-champagne-gold)' }}>{siteConfig.teacher.name}</span>
            </h1>

            <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.08rem', lineHeight: 1.7 }}>
              {siteConfig.teacher.formalTitle} &bull; <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{siteConfig.teacher.qualifications}</span> &bull; <strong style={{ color: 'var(--color-champagne-gold)' }}>12+ Years Experience</strong>
            </p>
          </div>

          {/* 4-Stat Highlight Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginTop: '2.5rem'
          }}>
            {/* Stat 1 */}
            <div style={{
              background: 'rgba(16, 24, 42, 0.85)',
              border: '1px solid rgba(214, 184, 117, 0.28)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.4rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-champagne-gold)', marginBottom: '0.35rem' }}>
                <Award size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Experience</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF' }}>12+ Years</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-silver)', marginTop: '0.2rem' }}>
                Relentless Classroom Dedication
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{
              background: 'rgba(16, 24, 42, 0.85)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.4rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', marginBottom: '0.35rem' }}>
                <Video size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>YouTube Library</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF' }}>3,000+</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-silver)', marginTop: '0.2rem' }}>
                Video Lessons on YouTube
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{
              background: 'rgba(16, 24, 42, 0.85)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.4rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', marginBottom: '0.35rem' }}>
                <Heart size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Access Policy</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10B981' }}>100% Free</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-silver)', marginTop: '0.2rem' }}>
                To Every Single Student
              </div>
            </div>

            {/* Stat 4 */}
            <div style={{
              background: 'rgba(16, 24, 42, 0.85)',
              border: '1px solid rgba(142, 179, 245, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.4rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8EB3F5', marginBottom: '0.35rem' }}>
                <Users size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Impact</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF' }}>50,000+</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-silver)', marginTop: '0.2rem' }}>
                Students Guided to Success
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile & Philosophy */}
      <div className="container-luxury" style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Portrait & Teacher Credential Card */}
          <div>
            <div 
              className="gold-card-static"
              style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(145deg, #121A2D 0%, #0B1020 100%)',
                position: 'relative'
              }}
            >
              <div 
                className="animate-portrait"
                style={{
                  width: '190px',
                  height: '190px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid var(--color-champagne-gold)',
                  boxShadow: '0 8px 35px rgba(214, 184, 117, 0.4), 0 0 30px rgba(42, 168, 255, 0.3)',
                  margin: '0 auto 1.5rem auto',
                  background: '#0B1120'
                }}
              >
                <img 
                  src={siteConfig.teacher.photoUrl} 
                  alt={siteConfig.teacher.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.3rem' }}>
                {siteConfig.teacher.name}
              </h2>

              <div style={{ color: 'var(--color-champagne-gold)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem' }}>
                {siteConfig.teacher.qualifications}
              </div>

              {/* Badges pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: 'rgba(214, 184, 117, 0.15)',
                  border: '1px solid rgba(214, 184, 117, 0.35)',
                  color: 'var(--color-champagne-gold)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  12+ Years Experience
                </span>
                <span style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#F87171',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  3,000+ Videos
                </span>
                <span style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34D399',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  100% Free
                </span>
              </div>

              <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.8rem' }}>
                Over <strong>12+ years of relentless classroom dedication</strong> and a massive collection of <strong>3,000+ free video lessons</strong> on YouTube, empowering students from Class 10 to B.Tech Engineering Mathematics.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a
                  href={siteConfig.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-youtube"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <YoutubeIcon size={18} color="#FFFFFF" />
                  <span>Watch 3000+ Videos on YouTube</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  onClick={() => onNavigate('/contact')}
                  className="btn-gold-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}
                >
                  <span>Student Doubt Desk</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Teaching Philosophy, Free Access Mission & Principles */}
          <div>
            {/* The 100% Free Access Mission Callout Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(204, 0, 0, 0.15) 0%, rgba(13, 22, 41, 0.95) 100%)',
              border: '1.5px solid rgba(239, 68, 68, 0.45)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.8rem 2rem',
              marginBottom: '2.5rem',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#EF4444', marginBottom: '0.6rem' }}>
                <YoutubeIcon size={22} color="#EF4444" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Democratized Education Mission
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                3,000+ Free YouTube Video Lessons For Every Student
              </h3>
              <p style={{ color: '#E2E8F0', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Naresh Sir firmly believes that financial constraints should never prevent a student from understanding mathematical concepts. That is why all <strong>3,000+ video lessons</strong> covering Class 10, Intermediate (+2), Polytechnic Diploma, and Engineering Mathematics (M1 to M4) are published with <strong>100% free access for everyone on YouTube</strong>.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Zero Paywalls</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Zero Subscription Fees</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Telugu + English Bilingual Clarification</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <div className="badge-royal" style={{ marginBottom: '0.8rem' }}>
                Guiding Principle
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '1rem' }}>
                12+ Years of Teaching Philosophy
              </h3>
              
              <blockquote 
                style={{
                  padding: '1.5rem 1.8rem',
                  background: 'rgba(16, 24, 42, 0.8)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '4px solid var(--color-champagne-gold)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.18rem',
                  fontStyle: 'italic',
                  color: 'var(--color-gold-light)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem'
                }}
              >
                "{siteConfig.teacher.teachingPhilosophy}"
              </blockquote>

              <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                {siteConfig.teacher.bio}
              </p>

              <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.98rem', lineHeight: 1.75 }}>
                Whether it is helping a Class 10 student conquer fear of trigonometric identities or enabling a B.Tech undergraduate to calculate surface integrals via Gauss Divergence Theorem with ease, Naresh Sir's 12+ years of pedagogical methodology focuses on first principles, visual derivations, and error-prevention habits.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginTop: '2.5rem' }}>
              <div className="gold-card-static" style={{ padding: '1.4rem' }}>
                <div style={{ color: 'var(--color-champagne-gold)', marginBottom: '0.5rem' }}>
                  <Sparkles size={20} />
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  First-Principles Rigor
                </h4>
                <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                  Every formula is derived from scratch before being applied to complex university exam questions.
                </p>
              </div>

              <div className="gold-card-static" style={{ padding: '1.4rem' }}>
                <div style={{ color: 'var(--color-champagne-gold)', marginBottom: '0.5rem' }}>
                  <GraduationCap size={20} />
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  12+ Years Exam Expertise
                </h4>
                <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                  Proven track record guiding students through JNTU, OU, IPE, and CBSE Board examinations.
                </p>
              </div>

              <div className="gold-card-static" style={{ padding: '1.4rem' }}>
                <div style={{ color: '#FF6B6B', marginBottom: '0.5rem' }}>
                  <YoutubeIcon size={20} color="#FF6B6B" />
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  3000+ Free YouTube Lessons
                </h4>
                <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                  Completely free, accessible anytime anywhere to every single learner across India.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
