import React from 'react';
import { RotateCcw, Home, Trophy, Award, Flame, Utensils } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  burgersCompleted: number;
  highestLevel: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  highScore,
  isNewHighScore,
  burgersCompleted,
  highestLevel,
  onPlayAgain,
  onMainMenu,
}) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
      <div className="relative max-w-sm w-full bg-gradient-to-b from-amber-950 to-stone-950 rounded-3xl p-6 sm:p-7 border-4 border-red-500/60 shadow-2xl text-center flex flex-col items-center">
        {/* Animated Crying / Broken Burger Header */}
        <div className="text-4xl sm:text-5xl mb-1 animate-pulse">
          🍔💔
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-black text-rose-400 font-['Fredoka'] tracking-wide drop-shadow-md">
          GAME OVER!
        </h2>
        <p className="text-xs sm:text-sm text-stone-300/80 mb-4">
          All lives were lost in the kitchen rush!
        </p>

        {/* High Score Celebration Banner if New High Score */}
        {isNewHighScore && (
          <div className="w-full py-2 px-3 mb-4 rounded-2xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-amber-950 font-black font-['Fredoka'] text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg animate-bounce">
            <Trophy size={20} className="fill-amber-950" />
            <span>🏆 NEW HIGH SCORE!</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="w-full bg-black/40 rounded-2xl p-4 border border-amber-500/20 space-y-3 mb-5 font-['Fredoka']">
          {/* Main Score */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 text-amber-300/90 text-sm">
              <Award size={18} />
              <span>Your Score</span>
            </div>
            <div className="text-2xl font-black text-white drop-shadow">
              {score}
            </div>
          </div>

          {/* Burgers Served */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 text-amber-300/90 text-sm">
              <Utensils size={18} />
              <span>Burgers Served</span>
            </div>
            <div className="text-xl font-bold text-amber-300">
              {burgersCompleted}
            </div>
          </div>

          {/* Highest Level */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 text-amber-300/90 text-sm">
              <Flame size={18} />
              <span>Highest Level</span>
            </div>
            <div className="text-xl font-bold text-amber-400">
              Level {highestLevel}
            </div>
          </div>

          {/* All-time High Score */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2 text-amber-300/90 text-sm">
              <Trophy size={18} />
              <span>Best Record</span>
            </div>
            <div className="text-lg font-bold text-yellow-400">
              {highScore}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5 font-['Fredoka']">
          {/* RETRY CURRENT LEVEL */}
          <button
            id="game-over-play-again-btn"
            onClick={onPlayAgain}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 text-amber-950 font-black text-lg sm:text-xl shadow-xl border-b-4 border-amber-800 flex items-center justify-center gap-2.5 transition cursor-pointer"
          >
            <RotateCcw size={22} strokeWidth={3} />
            <span>RETRY LEVEL {highestLevel}</span>
          </button>

          {/* MAIN MENU / LEVEL SELECT */}
          <button
            id="game-over-main-menu-btn"
            onClick={onMainMenu}
            className="w-full py-3 px-6 rounded-2xl bg-amber-950/80 hover:bg-amber-900 active:scale-95 text-amber-200 font-bold text-base border border-amber-700/50 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Home size={18} />
            <span>HOME & LEVEL SELECT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
