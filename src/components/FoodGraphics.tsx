import React from 'react';

interface FoodGraphicProps {
  id: string;
  className?: string;
  size?: number;
}

export const BottomBunGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 100 55" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="bottomBunGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5B971" />
        <stop offset="60%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="bottomCrust" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    {/* Bread base */}
    <path
      d="M10 15 C10 8, 25 6, 50 6 C75 6, 90 8, 90 15 L88 38 C88 48, 75 52, 50 52 C25 52, 12 48, 12 38 Z"
      fill="url(#bottomBunGrad)"
      stroke="#78350F"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Inner crumb flat top */}
    <ellipse cx="50" cy="16" rx="38" ry="8" fill="url(#bottomCrust)" stroke="#B45309" strokeWidth="2" />
    {/* Soft highlight */}
    <path d="M22 36 C35 44, 65 44, 78 36" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

export const LettuceGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size * 0.45} viewBox="0 0 100 45" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="lettuceGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#86EFAC" />
        <stop offset="70%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
    </defs>
    {/* Wavy ruffly lettuce leaf */}
    <path
      d="M8 22 C 12 8, 22 10, 26 20 C 30 6, 44 8, 50 18 C 56 6, 70 8, 74 20 C 78 10, 88 12, 92 24 C 94 36, 80 40, 72 32 C 65 42, 52 38, 48 28 C 42 40, 28 38, 22 28 C 16 38, 6 32, 8 22 Z"
      fill="url(#lettuceGrad)"
      stroke="#14532D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Inner leafy veins */}
    <path d="M20 22 Q35 18 50 20 Q65 18 80 22" stroke="#DCFCE7" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
    <path d="M35 19 Q40 12 45 18" stroke="#DCFCE7" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M60 19 Q65 12 70 18" stroke="#DCFCE7" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const TomatoGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size * 0.45} viewBox="0 0 100 45" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="tomatoGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="60%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    {/* Thick juicy tomato slice */}
    <ellipse cx="50" cy="22" rx="44" ry="16" fill="url(#tomatoGrad)" stroke="#7F1D1D" strokeWidth="3.5" />
    {/* Seed cavities */}
    <ellipse cx="32" cy="22" rx="8" ry="6" fill="#7F1D1D" opacity="0.8" />
    <ellipse cx="68" cy="22" rx="8" ry="6" fill="#7F1D1D" opacity="0.8" />
    <ellipse cx="50" cy="23" rx="6" ry="5" fill="#7F1D1D" opacity="0.8" />
    {/* Golden yellow seeds */}
    <circle cx="30" cy="21" r="2" fill="#FEF08A" />
    <circle cx="34" cy="23" r="1.8" fill="#FEF08A" />
    <circle cx="66" cy="21" r="2" fill="#FEF08A" />
    <circle cx="70" cy="23" r="1.8" fill="#FEF08A" />
    {/* Glossy sheen */}
    <path d="M25 14 Q50 9 75 14" stroke="#FECACA" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
  </svg>
);

export const CheeseGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size * 0.45} viewBox="0 0 100 45" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="cheeseGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="70%" stopColor="#FACC15" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
    </defs>
    {/* Melting cheddar slice with droopy corners */}
    <path
      d="M10 12 L90 12 L84 28 Q80 38 74 34 L56 22 Q50 36 44 26 L26 36 Q20 40 18 28 Z"
      fill="url(#cheeseGrad)"
      stroke="#854D0E"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Cheese bubbles / shine */}
    <circle cx="35" cy="18" r="3" fill="#EAB308" opacity="0.5" />
    <circle cx="65" cy="18" r="4" fill="#EAB308" opacity="0.5" />
    <path d="M18 15 L82 15" stroke="#FEF9C3" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

export const PattyGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size * 0.45} viewBox="0 0 100 45" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="pattyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#92400E" />
        <stop offset="50%" stopColor="#78350F" />
        <stop offset="100%" stopColor="#451A03" />
      </linearGradient>
    </defs>
    {/* Savory grilled patty */}
    <rect x="8" y="10" width="84" height="25" rx="12.5" fill="url(#pattyGrad)" stroke="#290E02" strokeWidth="3.5" />
    {/* Grill marks */}
    <line x1="25" y1="12" x2="35" y2="33" stroke="#290E02" strokeWidth="4" strokeLinecap="round" />
    <line x1="45" y1="12" x2="55" y2="33" stroke="#290E02" strokeWidth="4" strokeLinecap="round" />
    <line x1="65" y1="12" x2="75" y2="33" stroke="#290E02" strokeWidth="4" strokeLinecap="round" />
    {/* Highlights */}
    <path d="M18 15 Q50 12 82 15" stroke="#B45309" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
  </svg>
);

export const TopBunGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 100 65" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="topBunGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="25%" stopColor="#F59E0B" />
        <stop offset="80%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
    </defs>
    {/* Plump shiny bun dome */}
    <path
      d="M8 48 C8 15, 25 8, 50 8 C75 8, 92 15, 92 48 C92 53, 80 56, 50 56 C20 56, 8 53, 8 48 Z"
      fill="url(#topBunGrad)"
      stroke="#78350F"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Top gloss highlight */}
    <path d="M22 22 C32 14, 60 13, 72 20" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
    {/* White / Golden sesame seeds */}
    <g fill="#FFFBEB" stroke="#B45309" strokeWidth="0.8">
      <ellipse cx="32" cy="24" rx="2.5" ry="4" transform="rotate(-25 32 24)" />
      <ellipse cx="48" cy="18" rx="2.5" ry="4" transform="rotate(10 48 18)" />
      <ellipse cx="64" cy="22" rx="2.5" ry="4" transform="rotate(30 64 22)" />
      <ellipse cx="25" cy="36" rx="2.5" ry="4" transform="rotate(-40 25 36)" />
      <ellipse cx="42" cy="32" rx="2.5" ry="4" transform="rotate(-5 42 32)" />
      <ellipse cx="58" cy="32" rx="2.5" ry="4" transform="rotate(15 58 32)" />
      <ellipse cx="76" cy="34" rx="2.5" ry="4" transform="rotate(45 76 34)" />
    </g>
  </svg>
);

// --- WRONG ITEMS GRAPHICS ---

export const PizzaGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="crustGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="cheeseSliceGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* Crust */}
    <path d="M12 24 Q50 10 88 24 C88 30, 80 34, 50 94 C20 34, 12 30, 12 24 Z" fill="url(#crustGrad)" stroke="#78350F" strokeWidth="3.5" strokeLinejoin="round" />
    {/* Cheesy surface */}
    <path d="M18 28 Q50 18 82 28 L50 86 Z" fill="url(#cheeseSliceGrad)" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
    {/* Pepperoni slices */}
    <circle cx="48" cy="38" r="8" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
    <circle cx="34" cy="52" r="7" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
    <circle cx="62" cy="54" r="7" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
    <circle cx="50" cy="68" r="5" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
  </svg>
);

export const FriesGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <linearGradient id="fryGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* Golden fries poking out */}
    <g fill="url(#fryGrad)" stroke="#B45309" strokeWidth="2.5">
      <rect x="24" y="10" width="10" height="42" rx="3" transform="rotate(-15 29 31)" />
      <rect x="36" y="8" width="11" height="45" rx="3" transform="rotate(-5 41 30)" />
      <rect x="49" y="6" width="11" height="48" rx="3" transform="rotate(4 54 30)" />
      <rect x="62" y="12" width="10" height="40" rx="3" transform="rotate(18 67 32)" />
    </g>
    {/* Red Fry Box */}
    <path d="M20 42 L32 90 L68 90 L80 42 Q50 50 20 42 Z" fill="url(#boxGrad)" stroke="#7F1D1D" strokeWidth="3.5" strokeLinejoin="round" />
    {/* Yellow emblem */}
    <ellipse cx="50" cy="66" rx="14" ry="12" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
    <text x="50" y="72" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7F1D1D">M</text>
  </svg>
);

export const AppleGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="appleGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="40%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    {/* Stem & Leaf */}
    <path d="M50 26 Q52 10 60 8" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M56 16 Q72 12 70 24 Q56 22 56 16 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
    {/* Apple Body */}
    <path
      d="M50 30 C30 22, 14 36, 16 62 C18 84, 38 92, 50 86 C62 92, 82 84, 84 62 C86 36, 70 22, 50 30 Z"
      fill="url(#appleGrad)"
      stroke="#7F1D1D"
      strokeWidth="3.5"
    />
    {/* Glossy highlight */}
    <ellipse cx="32" cy="46" rx="6" ry="14" transform="rotate(-30 32 46)" fill="#FECACA" opacity="0.6" />
  </svg>
);

export const SodaGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="cupGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    {/* Straw */}
    <path d="M56 8 L52 24" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
    <path d="M56 8 L68 12" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
    {/* Lid */}
    <ellipse cx="50" cy="25" rx="34" ry="7" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="3" />
    {/* Cup body */}
    <path d="M20 28 L28 88 Q50 94 72 88 L80 28 Z" fill="url(#cupGrad)" stroke="#0369A1" strokeWidth="3.5" strokeLinejoin="round" />
    {/* Cup stripe */}
    <path d="M24 50 Q50 56 76 50 L74 65 Q50 71 26 65 Z" fill="#F8FAFC" opacity="0.9" />
    {/* Ice / fizz bubbles */}
    <circle cx="40" cy="40" r="3" fill="#BAE6FD" />
    <circle cx="60" cy="45" r="2.5" fill="#BAE6FD" />
  </svg>
);

export const DonutGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="doughGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="glazeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>
    {/* Donut dough base */}
    <circle cx="50" cy="50" r="38" fill="url(#doughGrad)" stroke="#92400E" strokeWidth="3.5" />
    {/* Pink Frosting */}
    <path
      d="M50 14 C70 14, 86 30, 86 50 C86 65, 78 78, 68 84 C62 78, 54 84, 46 80 C38 86, 28 78, 22 76 C14 68, 14 58, 14 50 C14 30, 30 14, 50 14 Z"
      fill="url(#glazeGrad)"
      stroke="#9D174D"
      strokeWidth="2.5"
    />
    {/* Donut hole */}
    <circle cx="50" cy="50" r="14" fill="#FEF3C7" stroke="#92400E" strokeWidth="3.5" />
    {/* Sprinkles */}
    <line x1="32" y1="30" x2="38" y2="28" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    <line x1="62" y1="28" x2="68" y2="34" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
    <line x1="72" y1="52" x2="76" y2="46" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" />
    <line x1="28" y1="64" x2="34" y2="60" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
    <line x1="58" y1="72" x2="64" y2="68" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const ChilliGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
    <defs>
      <linearGradient id="chilliGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="50%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    {/* Green Stem */}
    <path d="M68 20 C64 12, 54 10, 48 14 C54 18, 56 24, 52 30 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
    {/* Curved Hot Chili */}
    <path
      d="M52 28 C64 36, 78 52, 72 72 C68 86, 52 92, 38 88 C24 84, 18 70, 22 56 C26 40, 40 32, 52 28 Z"
      fill="url(#chilliGrad)"
      stroke="#7F1D1D"
      strokeWidth="3.5"
    />
    {/* Shiny highlight */}
    <path d="M42 36 Q32 50 34 68" stroke="#FECACA" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
  </svg>
);

// --- POWER-UPS GRAPHICS ---

export const SlowMoGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-lg ${className}`}>
    <defs>
      <radialGradient id="slowMoGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#A5F3FC" />
        <stop offset="70%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0891B2" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="44" fill="url(#slowMoGlow)" stroke="#FFFFFF" strokeWidth="4" />
    {/* Clock / Lightning combo */}
    <circle cx="50" cy="50" r="32" fill="#0891B2" stroke="#CFFAFE" strokeWidth="2.5" />
    <path d="M52 24 L40 48 L52 48 L46 74 L66 46 L54 46 Z" fill="#FDE047" stroke="#854D0E" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const ExtraLifeGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-lg ${className}`}>
    <defs>
      <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDA4AF" />
        <stop offset="70%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#BE123C" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="44" fill="#FFE4E6" stroke="#FFFFFF" strokeWidth="4" />
    <path
      d="M50 32 C42 18, 22 20, 22 38 C22 56, 44 72, 50 78 C56 72, 78 56, 78 38 C78 20, 58 18, 50 32 Z"
      fill="url(#heartGlow)"
      stroke="#881337"
      strokeWidth="3"
    />
    {/* Sparkle */}
    <circle cx="34" cy="34" r="3.5" fill="#FFFFFF" />
  </svg>
);

export const DoubleScoreGraphic: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-lg ${className}`}>
    <defs>
      <linearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="44" fill="#FEF3C7" stroke="#FFFFFF" strokeWidth="4" />
    {/* Golden Star */}
    <path
      d="M50 12 L60 36 L86 38 L65 54 L72 80 L50 66 L28 80 L35 54 L14 38 L40 36 Z"
      fill="url(#starGrad)"
      stroke="#78350F"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FFFFFF" stroke="#78350F" strokeWidth="1.5">2X</text>
  </svg>
);

export const FoodGraphic: React.FC<FoodGraphicProps> = ({ id, className = '', size = 64 }) => {
  switch (id) {
    case 'bottom_bun':
      return <BottomBunGraphic className={className} size={size} />;
    case 'lettuce':
      return <LettuceGraphic className={className} size={size} />;
    case 'tomato':
      return <TomatoGraphic className={className} size={size} />;
    case 'cheese':
      return <CheeseGraphic className={className} size={size} />;
    case 'patty':
      return <PattyGraphic className={className} size={size} />;
    case 'top_bun':
      return <TopBunGraphic className={className} size={size} />;

    // Wrong items
    case 'pizza':
      return <PizzaGraphic className={className} size={size} />;
    case 'fries':
      return <FriesGraphic className={className} size={size} />;
    case 'apple':
      return <AppleGraphic className={className} size={size} />;
    case 'soda':
      return <SodaGraphic className={className} size={size} />;
    case 'donut':
      return <DonutGraphic className={className} size={size} />;
    case 'chilli':
      return <ChilliGraphic className={className} size={size} />;

    // Power-ups
    case 'slow_mo':
      return <SlowMoGraphic className={className} size={size} />;
    case 'extra_life':
      return <ExtraLifeGraphic className={className} size={size} />;
    case 'double_score':
      return <DoubleScoreGraphic className={className} size={size} />;

    default:
      return null;
  }
};
