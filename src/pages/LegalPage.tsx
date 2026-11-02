import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Shield, FileText } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

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
              { label: isPrivacy ? 'Privacy Policy' : 'Terms of Service' }
            ]} 
            onNavigate={onNavigate} 
          />

          <div style={{ maxWidth: '800px' }}>
            <div className="badge-gold" style={{ marginBottom: '1rem' }}>
              Legal & Academic Disclaimers
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
              {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
            </h1>
            <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Effective Date: Academic Session 2024-2025 • {siteConfig.brand.name}
            </p>
          </div>
        </div>
      </section>

      {/* Main Legal Content */}
      <div className="container-luxury" style={{ marginTop: '3.5rem' }}>
        <div 
          className="gold-card-static"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '3rem',
            background: 'linear-gradient(180deg, #121A2D 0%, #0A0F1E 100%)',
            lineHeight: 1.8,
            color: 'var(--color-muted-silver)',
            fontSize: '0.96rem'
          }}
        >
          {isPrivacy ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                <Shield size={24} color="var(--color-champagne-gold)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Our Commitment to Student Privacy</h2>
              </div>

              <p>
                At {siteConfig.brand.name}, accessible from our learning portal, one of our main priorities is the privacy of our visitors and students. This Privacy Policy document outlines the types of information that is collected and recorded by {siteConfig.brand.name} and how we use it.
              </p>

              <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>1. Information We Do Not Collect</h3>
              <p>
                We do not collect unnecessary personal data. We do not require student account registrations, passwords, or credit card numbers to view mathematics study materials, formulas, or YouTube lesson redirections.
              </p>

              <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>2. YouTube API and Third-Party Links</h3>
              <p>
                Our platform embeds and links directly to educational lessons hosted on YouTube (a Google service). When watching videos or visiting our official channel, your interactions are governed by YouTube's Terms of Service and Google's Privacy Policy.
              </p>

              <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>3. Contact Inquiries</h3>
              <p>
                If you contact us via email or our academic doubt desk, your name and email are solely utilized to provide academic answers and are never sold or shared with commercial third parties.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                <FileText size={24} color="var(--color-champagne-gold)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Terms of Educational Use</h2>
              </div>

              <p>
                Welcome to {siteConfig.brand.name}. By accessing this website and utilizing our curriculum formulas, lecture notes, and YouTube video links, you agree to comply with and be bound by the following terms.
              </p>

              <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>1. Educational Purpose & Fair Use</h3>
              <p>
                All study materials, handwritten summaries, and video derivations created by {siteConfig.teacher.name} are provided free of charge for personal educational enrichment. Redistribution or commercial resale of downloadable PDF notes without written consent is strictly prohibited.
              </p>

              <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>2. Academic Accuracy Disclaimer</h3>
              <p>
                While every care has been taken to verify all mathematical formulas, theorems, and solutions against contemporary curricula (CBSE, State Technical Boards, AICTE Model Schemes), students are advised to consult their respective university or board syllabus for exact marking blueprints and periodic syllabus amendments.
              </p>

              <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>3. YouTube Subscription Notice</h3>
              <p>
                Subscribing to our YouTube channel is voluntary. Clicking subscription action links directs you to YouTube's platform where you may confirm your subscription choice according to your preferences.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
