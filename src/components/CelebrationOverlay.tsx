import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BurgerLevelDef } from '../types';
import { BurgerPreviewImage } from './BurgerPreviewImage';
import { Play, RotateCcw, Home, Trophy, Sparkles, CheckCircle2, Zap } from 'lucide-react';

interface CelebrationOverlayProps {
  bonus: number;
  speedBonus: number;
  level: number;
  currentBurger: BurgerLevelDef;
  nextBurger?: BurgerLevelDef;
  onNextLevel: () => void;
  onPlayRandomLevel?: () => void;
  onRetryLevel: () => void;
  onHome: () => void;
  isFinalLevel?: boolean;
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  bonus,
  speedBonus,
  level,
  currentBurger,
  nextBurger,
  onNextLevel,
  onPlayRandomLevel,
  onRetryLevel,
  onHome,
  isFinalLevel = false,
}) => {
  useEffect(() => {
    // Launch festive confetti bursts
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899', '#FBBF24'],
      });

      const timer1 = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 300);

      const timer2 = setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: 0.4 },
        });
      }, 700);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } catch {
      // ignore
    }
  }, []);

  const totalBonus = bonus + speedBonus;
  const burgerName = currentBurger?.name || `Burger Level ${level}`;
  const ingredients = currentBurger?.ingredients || [];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in zoom-in duration-200 pointer-events-auto overflow-y-auto">
      <div className="relative max-w-sm sm:max-w-md w-full max-h-[95vh] overflow-y-auto bg-gradient-to-b from-amber-950 via-amber-900 to-stone-950 rounded-3xl p-4 sm:p-6 border-4 border-amber-400 shadow-2xl text-center flex flex-col items-center">
        {/* Glow ambient circle */}
        <div className="absolute top-10 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Level Complete Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-full shadow-lg mb-1.5">
          <Trophy size={15} className="fill-amber-950" />
          <span>LEVEL {level} CLEARED!</span>
        </div>

        {/* Burger Title */}
        <h2 className="text-xl sm:text-2xl font-black text-white font-['Fredoka'] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center gap-1.5 mt-0.5 mb-1">
          <span>{currentBurger?.badgeEmoji || '🍔'}</span>
          <span>{burgerName}</span>
        </h2>

        {/* Assembled Burger Preview Card */}
        <div className="my-1.5 py-1 px-4 bg-black/35 rounded-2xl border border-amber-500/30 flex flex-col items-center w-full">
          <div className="relative flex justify-center items-center py-1">
            <BurgerPreviewImage
              ingredients={ingredients}
              size={135}
              level={level}
              burgerName={burgerName}
              showPlate={true}
              showFlag={true}
            />
          </div>

          {/* Task Accomplished Tag */}
          <div className="w-full mt-1 pt-1.5 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-amber-200">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 size={13} /> Task Complete: {ingredients.length} Layers
            </span>
            <span className="font-extrabold text-amber-300">
              +{totalBonus} Pts
            </span>
          </div>
        </div>

        {/* Score & Speed Bonus Callouts */}
        <div className="w-full bg-amber-950/60 rounded-xl p-2 sm:p-2.5 border border-amber-600/40 my-1 text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-amber-200">
            <span>Level Clear Bonus</span>
            <span className="text-amber-400 font-black font-['Fredoka'] text-sm">+{bonus}</span>
          </div>
          {speedBonus > 0 && (
            <div className="flex items-center justify-between font-bold text-emerald-300">
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-yellow-400 fill-yellow-400" /> Speed Chef Bonus
              </span>
              <span className="font-black font-['Fredoka'] text-sm">+{speedBonus}</span>
            </div>
          )}
          {nextBurger && !isFinalLevel && (
            <div className="pt-1.5 mt-1 border-t border-amber-800/80 flex items-center justify-between text-[11px] text-amber-300/90">
              <span>Next Order (Level {level + 1}):</span>
              <span className="font-black text-amber-300 flex items-center gap-1">
                <span>{nextBurger.badgeEmoji}</span>
                <span className="truncate max-w-[130px]">{nextBurger.name}</span>
              </span>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS: Next Level, Retry Level, Home / Level Select */}
        <div className="w-full space-y-2 mt-2">
          {/* PRIMARY: NEXT LEVEL (or ALL COMPLETE) */}
          {!isFinalLevel ? (
            <button
              id="next-level-btn"
              onClick={onNextLevel}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:scale-95 text-stone-950 font-black font-['Fredoka'] text-base sm:text-lg shadow-xl border-b-4 border-emerald-800 flex items-center justify-center gap-2 transition-transform cursor-pointer"
            >
              <Play size={20} fill="currentColor" />
              <span>NEXT LEVEL {level + 1} ▶</span>
            </button>
          ) : (
            <button
              id="next-level-btn"
              onClick={onNextLevel}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:scale-95 text-stone-950 font-black font-['Fredoka'] text-base sm:text-lg shadow-xl border-b-4 border-emerald-800 flex items-center justify-center gap-2 transition-transform cursor-pointer"
            >
              <Play size={20} fill="currentColor" />
              <span>PLAY LEVEL 1 ▶</span>
            </button>
          )}

          {/* PLAY RANDOM LEVEL BUTTON */}
          {onPlayRandomLevel && (
            <button
              id="celebration-random-level-btn"
              onClick={onPlayRandomLevel}
              className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-amber-200 font-bold font-['Fredoka'] text-sm shadow border border-amber-500/50 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>🎲</span>
              <span>PLAY RANDOM LEVEL</span>
            </button>
          )}

          {/* SECONDARY ROW: RETRY LEVEL + HOME / LEVEL SELECT */}
          <div className="flex gap-2">
            <button
              id="retry-level-btn"
              onClick={onRetryLevel}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-amber-900/80 hover:bg-amber-800 active:scale-95 text-amber-200 font-bold font-['Fredoka'] text-xs sm:text-sm border border-amber-600/50 flex items-center justify-center gap-1.5 transition shadow cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>RETRY LEVEL</span>
            </button>

            <button
              id="home-select-btn"
              onClick={onHome}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-black/50 hover:bg-black/70 active:scale-95 text-amber-300 hover:text-white font-bold font-['Fredoka'] text-xs sm:text-sm border border-amber-500/30 flex items-center justify-center gap-1.5 transition shadow cursor-pointer"
            >
              <Home size={15} />
              <span>HOME / LEVELS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
