import React from 'react';
import { IngredientId } from '../types';
import {
  BottomBunGraphic,
  LettuceGraphic,
  TomatoGraphic,
  CheeseGraphic,
  PattyGraphic,
  TopBunGraphic,
} from './FoodGraphics';

interface BurgerPreviewImageProps {
  ingredients: IngredientId[];
  size?: number; // width in px
  level?: number;
  burgerName?: string;
  showPlate?: boolean;
  showFlag?: boolean;
  isCompleted?: boolean;
  className?: string;
}

export const BurgerPreviewImage: React.FC<BurgerPreviewImageProps> = ({
  ingredients,
  size = 150,
  level = 1,
  showPlate = true,
  showFlag = true,
  className = '',
}) => {
  // Render ingredients from top to bottom visually for proper SVG/z-index layering
  // The recipe is ordered [bottom_bun, ..., top_bun]
  // In DOM layout: top element comes first, bottom element comes last so top overlaps bottom correctly
  const reversedLayers = [...ingredients].reverse();

  const renderLayerGraphic = (id: IngredientId, index: number) => {
    // Determine negative margin to tightly interlock burger layers
    const isTopBun = id === 'top_bun';
    const isBottomBun = id === 'bottom_bun';

    return (
      <div
        key={`${id}_${index}`}
        className="relative flex justify-center w-full transition-transform duration-200"
        style={{
          marginTop: index === 0 ? '0px' : '-18px',
          zIndex: 20 - index,
        }}
      >
        {isTopBun && (
          <div className="w-[90%] drop-shadow-md">
            <TopBunGraphic size={size} className="w-full h-auto" />
          </div>
        )}
        {id === 'patty' && (
          <div className="w-[92%] drop-shadow-md">
            <PattyGraphic size={size} className="w-full h-auto" />
          </div>
        )}
        {id === 'cheese' && (
          <div className="w-[95%] drop-shadow-md">
            <CheeseGraphic size={size} className="w-full h-auto" />
          </div>
        )}
        {id === 'tomato' && (
          <div className="w-[92%] drop-shadow-md">
            <TomatoGraphic size={size} className="w-full h-auto" />
          </div>
        )}
        {id === 'lettuce' && (
          <div className="w-[98%] drop-shadow-md">
            <LettuceGraphic size={size} className="w-full h-auto" />
          </div>
        )}
        {isBottomBun && (
          <div className="w-[88%] drop-shadow-md">
            <BottomBunGraphic size={size} className="w-full h-auto" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: `${size}px` }}
    >
      {/* Decorative Chef Flag Toothpick */}
      {showFlag && (
        <div className="relative -mb-3 z-30 flex flex-col items-center">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-red-600 text-white font-black text-[10px] sm:text-xs rounded-sm shadow-md border border-red-400 rotate-3">
            <span>ORDER #{level}</span>
          </div>
          {/* Toothpick Stick */}
          <div className="w-1 h-5 bg-amber-200 border-x border-amber-400/80 -mt-0.5 rounded-full" />
        </div>
      )}

      {/* Steam Wisps (Cartoon heat waves) */}
      <div className="absolute top-2 w-full flex justify-around pointer-events-none opacity-60 z-20">
        <svg viewBox="0 0 40 30" className="w-5 h-5 text-amber-100/60 animate-pulse">
          <path
            d="M10 25 Q15 15 10 5"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <svg viewBox="0 0 40 30" className="w-6 h-6 text-amber-100/70 animate-pulse delay-300">
          <path
            d="M20 28 Q25 14 18 4"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <svg viewBox="0 0 40 30" className="w-5 h-5 text-amber-100/60 animate-pulse delay-150">
          <path
            d="M30 25 Q25 15 30 5"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* The Burger Layer Stack */}
      <div className="relative w-full flex flex-col items-center z-10">
        {reversedLayers.map((ingId, idx) => renderLayerGraphic(ingId, idx))}
      </div>

      {/* Wooden / Ceramic Diner Serving Platter */}
      {showPlate && (
        <div className="relative w-[110%] -mt-3 z-0">
          <svg viewBox="0 0 140 28" className="w-full h-auto drop-shadow-lg">
            <defs>
              <linearGradient id="plateWood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="50%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="plateRim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            {/* Platter Base */}
            <ellipse cx="70" cy="14" rx="66" ry="12" fill="url(#plateWood)" stroke="#451A03" strokeWidth="2.5" />
            {/* Inner Platter Inset */}
            <ellipse cx="70" cy="12" rx="56" ry="8.5" fill="#92400E" opacity="0.4" />
            <ellipse cx="70" cy="11" rx="50" ry="7" fill="url(#plateRim)" opacity="0.9" stroke="#D97706" strokeWidth="1" />
            {/* Red Gingham Napkin Corner */}
            <polygon points="40,8 100,8 92,15 48,15" fill="#FEE2E2" stroke="#EF4444" strokeWidth="0.8" strokeDasharray="2 2" />
          </svg>
        </div>
      )}
    </div>
  );
};
