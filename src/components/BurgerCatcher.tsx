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

interface BurgerCatcherProps {
  xPercent: number; // 0 to 100
  burgerProgress: number; // 0 to 6
  recipe?: IngredientId[];
  isBouncing: boolean;
  isWrong: boolean;
  catcherWidthPercent?: number;
}

const DEFAULT_RECIPE: IngredientId[] = [
  'bottom_bun',
  'lettuce',
  'tomato',
  'cheese',
  'patty',
  'top_bun',
];

export const BurgerCatcher: React.FC<BurgerCatcherProps> = ({
  xPercent,
  burgerProgress,
  recipe = DEFAULT_RECIPE,
  isBouncing,
  isWrong,
  catcherWidthPercent = 22,
}) => {
  // Caught items from the recipe:
  const caughtItems = recipe.slice(0, burgerProgress);
  // Reversed for correct stacking (top layer first in DOM, or layered with zIndex)
  const reversedCaught = [...caughtItems].reverse();

  const renderLayer = (id: IngredientId, index: number, total: number) => {
    // index 0 is top-most layer
    const isTopBun = id === 'top_bun';
    const isBottomBun = id === 'bottom_bun';

    return (
      <div
        key={`${id}_${total - 1 - index}`}
        className="w-full flex justify-center transition-all duration-200 animate-in fade-in zoom-in"
        style={{
          marginTop: index === 0 ? '0px' : '-11px',
          zIndex: 30 - index,
        }}
      >
        {isTopBun && (
          <div className="w-[88%] drop-shadow-md">
            <TopBunGraphic size={110} className="w-full h-auto" />
          </div>
        )}
        {id === 'patty' && (
          <div className="w-[92%] drop-shadow-md">
            <PattyGraphic size={110} className="w-full h-auto" />
          </div>
        )}
        {id === 'cheese' && (
          <div className="w-[94%] drop-shadow-md">
            <CheeseGraphic size={110} className="w-full h-auto" />
          </div>
        )}
        {id === 'tomato' && (
          <div className="w-[90%] drop-shadow-md">
            <TomatoGraphic size={110} className="w-full h-auto" />
          </div>
        )}
        {id === 'lettuce' && (
          <div className="w-[96%] drop-shadow-md">
            <LettuceGraphic size={110} className="w-full h-auto" />
          </div>
        )}
        {isBottomBun && (
          <div className="w-[90%] drop-shadow-md">
            <BottomBunGraphic size={110} className="w-full h-auto" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`absolute bottom-3 sm:bottom-6 pointer-events-none transition-transform will-change-transform ${
        isBouncing ? 'scale-110 -translate-y-3 duration-100' : 'duration-75'
      } ${isWrong ? 'animate-shake' : ''}`}
      style={{
        left: `${xPercent}%`,
        transform: `translateX(-50%) ${isBouncing ? 'scale(1.12) translateY(-10px)' : ''}`,
        width: `${catcherWidthPercent}%`,
        minWidth: '115px',
        maxWidth: '165px',
      }}
    >
      <div className="relative flex flex-col items-center justify-end">
        {/* Ingredients stacked in real-time on top of the plate */}
        <div className="relative w-full flex flex-col items-center justify-end -mb-3 z-20">
          {reversedCaught.map((ingId, idx) =>
            renderLayer(ingId, idx, reversedCaught.length)
          )}
        </div>

        {/* The Cute Diner Serving Tray / Plate */}
        <div className="w-full relative z-10">
          <svg viewBox="0 0 120 38" className="w-full h-auto drop-shadow-2xl">
            <defs>
              <linearGradient id="trayRim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>
              <linearGradient id="trayBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="woodHandle" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
            </defs>
            {/* Left Handle */}
            <rect x="2" y="14" width="12" height="7" rx="3.5" fill="url(#woodHandle)" stroke="#78350F" strokeWidth="1.5" />
            {/* Right Handle */}
            <rect x="106" y="14" width="12" height="7" rx="3.5" fill="url(#woodHandle)" stroke="#78350F" strokeWidth="1.5" />
            {/* Tray Outer Rim */}
            <path
              d="M10 14 C10 8, 25 4, 60 4 C95 4, 110 8, 110 14 L106 28 C106 34, 90 37, 60 37 C30 37, 14 34, 14 28 Z"
              fill="url(#trayRim)"
              stroke="#B45309"
              strokeWidth="2.5"
            />
            {/* Tray Plate Inner */}
            <ellipse cx="60" cy="16" rx="46" ry="9" fill="url(#trayBase)" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Red Checker Diner Napkin Lining */}
            <path
              d="M26 16 C35 14, 85 14, 94 16 C90 22, 75 25, 60 25 C45 25, 30 22, 26 16 Z"
              fill="#FEE2E2"
              stroke="#F87171"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>
        </div>

        {/* Real-time Collected Progress Tag on Tray */}
        <div className="mt-0.5 z-20">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-950/90 text-amber-300 font-extrabold font-['Fredoka'] text-[10px] sm:text-xs rounded-full border border-amber-400/60 shadow-lg backdrop-blur-sm tracking-wide">
            <span>🍔</span>
            <span>{burgerProgress}/{recipe.length} Collected</span>
          </span>
        </div>
      </div>
    </div>
  );
};
