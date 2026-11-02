import React from 'react';

const MATH_SYMBOLS = [
  // Core calculus
  '∫', '∂', '∇', '∑', '∏', '∞',
  // Greek letters
  'α', 'β', 'γ', 'π', 'θ', 'λ', 'μ', 'σ', 'φ', 'Δ', 'Ω', 'Σ',
  // Operators
  '√', '±', '≈', '≠', '≤', '≥',
  // Short expressions
  'f(x)', 'x²', 'xⁿ', 'eˣ', 'lim',
  'sin θ', 'cos θ', 'log x',
  // Logic
  '∈', '∀', '∃', '⊥', '∠',
];

interface SymbolItem {
  symbol: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  animDelay: number;
  animDuration: number;
  drift: number;
  color: string;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const COLORS = [
  '#D4AF37', // champagne gold (dominant)
  '#D4AF37',
  '#D4AF37',
  '#8EB3F5', // occasional soft blue
];

function generateSymbols(count: number): SymbolItem[] {
  const items: SymbolItem[] = [];
  for (let i = 0; i < count; i++) {
    const r = (n: number) => seededRandom(i * 19 + n);
    items.push({
      symbol: MATH_SYMBOLS[Math.floor(r(0) * MATH_SYMBOLS.length)],
      x: r(1) * 86 + 2,              // 2% – 88% (safe horizontal bounds)
      y: r(2) * 93 + 2,              // 2% – 95% (safe vertical bounds)
      size: r(3) * 1.3 + 0.8,        // 0.8rem – 2.1rem (smaller, cleaner)
      opacity: r(4) * 0.04 + 0.03,   // 0.03 – 0.07 (very subtle)
      rotation: r(5) * 40 - 20,
      animDelay: r(6) * -50,
      animDuration: r(7) * 30 + 40,
      drift: r(8) * 20 - 10,
      color: COLORS[Math.floor(r(9) * COLORS.length)],
    });
  }
  return items;
}

const SYMBOLS = generateSymbols(40);

export const MathBackground: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes mathFloat {
          0%   { transform: translateY(0px)   translateX(0px)   rotate(var(--math-rot)); }
          20%  { transform: translateY(-20px) translateX(calc(var(--math-drift) * 0.5)) rotate(calc(var(--math-rot) + 5deg)); }
          50%  { transform: translateY(-10px) translateX(var(--math-drift)) rotate(calc(var(--math-rot) - 4deg)); }
          80%  { transform: translateY(-25px) translateX(calc(var(--math-drift) * 0.3)) rotate(calc(var(--math-rot) + 3deg)); }
          100% { transform: translateY(0px)   translateX(0px)   rotate(var(--math-rot)); }
        }
        @keyframes mathPulse {
          0%, 100% { opacity: var(--math-op); }
          45%       { opacity: calc(var(--math-op) * 1.8); }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
          contain: 'strict',
        }}
      >
        {SYMBOLS.map((s, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}vh`,
              fontSize: `${s.size}rem`,
              fontFamily: '"Georgia", "Times New Roman", serif',
              color: s.color,
              userSelect: 'none',
              lineHeight: 1,
              ['--math-rot' as string]: `${s.rotation}deg`,
              ['--math-drift' as string]: `${s.drift}px`,
              ['--math-op' as string]: `${s.opacity}`,
              opacity: s.opacity,
              transform: `rotate(${s.rotation}deg)`,
              animation: [
                `mathFloat ${s.animDuration}s ${s.animDelay}s ease-in-out infinite`,
                `mathPulse ${s.animDuration * 0.65}s ${s.animDelay * 1.2}s ease-in-out infinite`,
              ].join(', '),
              willChange: 'transform, opacity',
              fontWeight: 400,
              filter: `blur(${s.size > 2.5 ? '0.3px' : '0px'})`,
              textShadow: s.color === '#D4AF37' || s.color === '#C9A227'
                ? `0 0 ${Math.round(s.size * 12)}px rgba(212,175,55,0.3)`
                : `0 0 ${Math.round(s.size * 10)}px rgba(142,179,245,0.25)`,
            }}
          >
            {s.symbol}
          </span>
        ))}
      </div>
    </>
  );
};
