import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Video, FileText, Sparkles, ChevronRight, Calculator } from 'lucide-react';
import { searchAll } from '../../utils/searchIndex';
import type { SearchResultItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchAll(query));
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    onNavigate(url);
    onClose();
    setQuery('');
  };

  const getIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'course': return <BookOpen size={16} color="var(--color-champagne-gold)" />;
      case 'chapter': return <FileText size={16} color="#8EB3F5" />;
      case 'formula': return <Calculator size={16} color="#F2E3BC" />;
      case 'video': return <Video size={16} color="#FF6B6B" />;
      case 'resource': return <FileText size={16} color="var(--color-champagne-gold)" />;
      default: return <Sparkles size={16} color="var(--color-champagne-gold)" />;
    }
  };

  const quickPicks = [
    { label: 'Quadratic Formula', query: 'quadratic' },
    { label: 'Eigenvalues & Cayley-Hamilton', query: 'eigenvalues' },
    { label: 'Trigonometric Identities', query: 'trigonometry' },
    { label: 'Definite Integrals', query: 'integrals' },
    { label: 'Gauss Divergence Theorem', query: 'gauss' },
    { label: 'Class 10 Real Numbers', query: 'real numbers' },
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(4, 7, 15, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '10vh 1rem 2rem 1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'linear-gradient(180deg, #121A2D 0%, #0A0F1E 100%)',
          border: '1px solid rgba(214, 184, 117, 0.3)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(214, 184, 117, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div 
          style={{
            padding: '1.2rem 1.4rem',
            borderBottom: '1px solid rgba(214, 184, 117, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            background: 'rgba(16, 24, 42, 0.95)'
          }}
        >
          <Search size={20} color="var(--color-champagne-gold)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, formulas, theorems, videos, notes..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '1.05rem',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--color-muted-silver)', cursor: 'pointer', padding: '0.2rem' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '0.25rem 0.6rem',
              background: 'rgba(214, 184, 117, 0.1)',
              border: '1px solid rgba(214, 184, 117, 0.2)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-champagne-gold)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div style={{ overflowY: 'auto', padding: '1rem', flex: 1 }}>
          {query.trim() === '' ? (
            <div>
              <div style={{ 
                fontSize: '0.78rem', 
                color: 'var(--color-champagne-gold)', 
                fontFamily: 'var(--font-mono)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.08em',
                marginBottom: '0.8rem',
                paddingLeft: '0.5rem'
              }}>
                Suggested Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
                {quickPicks.map((pick) => (
                  <button
                    key={pick.label}
                    onClick={() => setQuery(pick.query)}
                    style={{
                      background: 'rgba(16, 24, 42, 0.8)',
                      border: '1px solid rgba(214, 184, 117, 0.2)',
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--color-warm-ivory)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(214, 184, 117, 0.2)';
                      e.currentTarget.style.color = 'var(--color-warm-ivory)';
                    }}
                  >
                    {pick.label}
                  </button>
                ))}
              </div>

              <div style={{ 
                padding: '1.2rem', 
                background: 'rgba(8, 13, 26, 0.5)', 
                borderRadius: 'var(--radius-md)',
                border: '1px dashed rgba(214, 184, 117, 0.15)',
                textAlign: 'center'
              }}>
                <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.86rem' }}>
                  Search through all 4 academic categories: Class 10, Intermediate (+2), Diploma, and B.Tech. You can type equation names, formula titles, or chapter names.
                </p>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'var(--color-muted-silver)', 
                fontFamily: 'var(--font-mono)', 
                marginBottom: '0.4rem',
                paddingLeft: '0.5rem' 
              }}>
                Found {results.length} relevant academic items
              </div>

              {results.map((item, index) => (
                <div
                  key={`${item.url}-${index}`}
                  onClick={() => handleSelect(item.url)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    background: 'rgba(16, 24, 42, 0.6)',
                    border: '1px solid rgba(214, 184, 117, 0.12)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(214, 184, 117, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(214, 184, 117, 0.4)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 24, 42, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(214, 184, 117, 0.12)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'rgba(8, 13, 26, 0.8)',
                      border: '1px solid rgba(214, 184, 117, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {getIcon(item.type)}
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.15rem' }}>
                        <span style={{ 
                          fontSize: '0.95rem', 
                          fontWeight: 600, 
                          color: '#FFFFFF', 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis' 
                        }}>
                          {item.title}
                        </span>
                        <span style={{
                          fontSize: '0.68rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: 'rgba(35, 61, 112, 0.4)',
                          color: 'var(--color-champagne-gold)',
                          fontFamily: 'var(--font-mono)',
                          flexShrink: 0
                        }}>
                          {item.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-silver)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.subtitle}
                      </div>
                      {item.matchSnippet && (
                        <div style={{ fontSize: '0.72rem', color: '#8A95A8', marginTop: '0.2rem', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          "{item.matchSnippet}"
                        </div>
                      )}
                    </div>
                  </div>

                  <ChevronRight size={18} color="var(--color-champagne-gold)" style={{ opacity: 0.7, flexShrink: 0, marginLeft: '0.5rem' }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(16, 24, 42, 0.8)',
                border: '1px solid rgba(214, 184, 117, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.2rem auto',
                color: 'var(--color-muted-silver)'
              }}>
                <Search size={24} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
                No direct matches found
              </h4>
              <p style={{ color: 'var(--color-muted-silver)', fontSize: '0.88rem', maxWidth: '380px', margin: '0 auto 1.5rem auto' }}>
                We couldn't find items matching "{query}". Try searching for broader terms like "Calculus", "Matrix", or "Formula".
              </p>
              <button
                onClick={() => setQuery('')}
                className="btn-gold-secondary"
                style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem' }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div style={{
          padding: '0.8rem 1.4rem',
          background: 'rgba(8, 13, 26, 0.8)',
          borderTop: '1px solid rgba(214, 184, 117, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--color-silver-subtle)',
          fontFamily: 'var(--font-mono)'
        }}>
          <span>Press ESC to dismiss</span>
          <span>Maths Naresh eClass Search</span>
        </div>
      </div>
    </div>
  );
};
