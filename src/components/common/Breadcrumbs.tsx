import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (url: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav 
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: '0.82rem',
        color: 'var(--color-muted-silver)',
        marginBottom: '1.5rem',
        padding: '0.6rem 1rem',
        background: 'rgba(16, 24, 42, 0.5)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid rgba(214, 184, 117, 0.1)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <button
        onClick={() => onNavigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'none',
          border: 'none',
          color: 'var(--color-muted-silver)',
          cursor: 'pointer',
          padding: 0,
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne-gold)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted-silver)')}
      >
        <Home size={14} />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={13} style={{ opacity: 0.5 }} />
            {item.url && !isLast ? (
              <button
                onClick={() => onNavigate(item.url!)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-muted-silver)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted-silver)')}
              >
                {item.label}
              </button>
            ) : (
              <span style={{ color: 'var(--color-champagne-gold)', fontWeight: 500 }}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
