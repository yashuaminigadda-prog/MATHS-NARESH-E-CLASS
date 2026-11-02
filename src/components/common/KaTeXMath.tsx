import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KaTeXMathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KaTeXMath: React.FC<KaTeXMathProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch (err) {
      console.warn('KaTeX rendering error:', err);
      return `<code class="math-fallback">${math}</code>`;
    }
  }, [math, block]);

  return (
    <span
      className={`katex-math-wrapper ${block ? 'katex-block' : 'katex-inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
