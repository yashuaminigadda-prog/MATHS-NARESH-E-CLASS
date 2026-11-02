import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Clock, 
  BookOpen,
  Sparkles,
  HelpCircle,
  FolderArchive
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';
import { studyResources as defaultResources } from '../data/studyResourcesData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import type { ResourceType, EducationLevelId, StudyResource } from '../types';
import { siteConfig } from '../config/siteConfig';
import { SupabaseService } from '../services/supabaseService';

interface StudyMaterialsPageProps {
  initialType?: ResourceType | null;
  onNavigate: (path: string) => void;
}

export const StudyMaterialsPage: React.FC<StudyMaterialsPageProps> = ({ initialType = null, onNavigate }) => {
  const [resources, setResources] = useState<StudyResource[]>(defaultResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<EducationLevelId | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>(initialType || 'all');

  useEffect(() => {
    let isMounted = true;
    SupabaseService.getStudyResources().then((data) => {
      if (isMounted && data && data.length > 0) {
        setResources(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const resourceTypeOptions: { id: ResourceType | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Resources', icon: FolderArchive },
    { id: 'formula_sheet', label: 'Formula Sheets', icon: Sparkles },
    { id: 'notes', label: 'Handwritten Notes', icon: FileText },
    { id: 'important_questions', label: 'Important Questions', icon: HelpCircle },
    { id: 'model_paper', label: 'Model Papers', icon: BookOpen },
    { id: 'pyq', label: 'Previous Papers (PYQ)', icon: CheckCircle },
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesLevel = selectedLevel === 'all' || res.levelId === selectedLevel;
      const matchesType = selectedType === 'all' || res.resourceType === selectedType;
      const matchesQuery = 
        !searchQuery.trim() ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.subject.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesLevel && matchesType && matchesQuery;
    });
  }, [selectedLevel, selectedType, searchQuery, resources]);

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
              { label: 'Study Resources Library' }
            ]} 
            onNavigate={onNavigate} 
          />

          <div style={{ maxWidth: '800px' }}>
            <div className="badge-gold" style={{ marginBottom: '1rem' }}>
              Academic Repository
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
              Study Materials & Formula Library
            </h1>
            <p style={{ color: 'var(--color-muted-silver)', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Handwritten chapter notes, comprehensive formula handbooks, and verified exam question banks with transparent file availability.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Container */}
      <div className="container-luxury" style={{ marginTop: '3rem' }}>
        <div 
          className="gold-card-static"
          style={{
            padding: '1.5rem',
            marginBottom: '2.5rem',
            background: 'linear-gradient(180deg, #121A2D 0%, #0A0F1E 100%)'
          }}
        >
          {/* Top Row: Search Input & Level Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="var(--color-champagne-gold)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Search resources, topics, formulas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  background: 'rgba(8, 13, 26, 0.7)',
                  border: '1px solid rgba(214, 184, 117, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Level Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--color-muted-silver)', whiteSpace: 'nowrap' }}>Education Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as any)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  background: 'rgba(8, 13, 26, 0.7)',
                  border: '1px solid rgba(214, 184, 117, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-champagne-gold)',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Education Levels</option>
                <option value="class-10">Class 10 Mathematics</option>
                <option value="intermediate">Intermediate (+2 / 11th & 12th)</option>
                <option value="diploma">Diploma (Polytechnic)</option>
                <option value="btech">B.Tech Engineering Mathematics</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Resource Type Pill Filter */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            {resourceTypeOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = selectedType === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedType(opt.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: 'var(--radius-full)',
                    background: isActive ? 'var(--gradient-gold)' : 'rgba(8, 13, 26, 0.5)',
                    color: isActive ? '#080D1A' : 'var(--color-muted-silver)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-champagne-gold)' : 'rgba(214, 184, 117, 0.2)',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <Icon size={14} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Grid */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-silver)', fontFamily: 'var(--font-mono)' }}>
            Showing {filteredResources.length} verified academic resources
          </span>
        </div>

        {filteredResources.length > 0 ? (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.8rem'
            }}
          >
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="gold-card"
                style={{
                  padding: '1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span 
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-champagne-gold)',
                        textTransform: 'uppercase',
                        padding: '0.2rem 0.6rem',
                        background: 'rgba(214, 184, 117, 0.1)',
                        border: '1px solid rgba(214, 184, 117, 0.2)',
                        borderRadius: '4px'
                      }}
                    >
                      {res.resourceType.replace('_', ' ')}
                    </span>

                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#FBBF24' }}>
                      <Clock size={12} />
                      <span>Coming Soon</span>
                    </span>
                  </div>

                  {/* Level & Subject */}
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-silver-subtle)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
                    {res.subject} • {res.chapterName}
                  </div>

                  {/* Title */}
                  <h3 
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.22rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.35,
                      marginBottom: '0.75rem'
                    }}
                  >
                    {res.title}
                  </h3>

                  <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                    {res.description}
                  </p>
                </div>

                {/* Bottom Details & Download Action */}
                <div>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1.2rem',
                      borderTop: '1px solid rgba(214, 184, 117, 0.12)'
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-silver-subtle)', fontFamily: 'var(--font-mono)' }}>
                      {res.fileFormat} • {res.pages} Pages {res.fileSize ? `(${res.fileSize})` : ''}
                    </div>

                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.8rem',
                        color: 'var(--color-champagne-gold)',
                        padding: '0.45rem 1rem',
                        background: 'rgba(214, 184, 117, 0.1)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(214, 184, 117, 0.25)',
                        fontWeight: 600
                      }}
                    >
                      <Clock size={13} />
                      <span>Coming Soon</span>
                    </span>
                  </div>

                  {res.relatedVideoId && (
                    <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
                      <a
                        href={siteConfig.youtube.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#FF6B6B',
                          fontSize: '0.75rem',
                          textDecoration: 'none'
                        }}
                      >
                        <YoutubeIcon size={13} color="#FF6B6B" />
                        <span>Watch Accompanying Lecture</span>
                      </a>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div 
            style={{
              padding: '4rem 1.5rem',
              textAlign: 'center',
              background: 'rgba(16, 24, 42, 0.5)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed rgba(214, 184, 117, 0.2)'
            }}
          >
            <FolderArchive size={36} color="var(--color-silver-subtle)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              No Resources Match Your Filter
            </h3>
            <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Try adjusting your education level, resource category, or clear your search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel('all');
                setSelectedType('all');
              }}
              className="btn-gold-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
