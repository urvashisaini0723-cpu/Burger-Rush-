import React from 'react';
import { X, Play, Trophy, Star, Check } from 'lucide-react';
import { LevelGrid, GAME_LEVELS } from './LevelBadge';

interface LevelsModalProps {
  unlockedLevel: number;
  selectedLevel: number;
  completedLevels?: number[];
  onSelectLevel: (lvl: number) => void;
  onPlayLevel: (lvl: number) => void;
  onClose: () => void;
}

export const LevelsModal: React.FC<LevelsModalProps> = ({
  unlockedLevel,
  selectedLevel,
  onSelectLevel,
  onPlayLevel,
  onClose,
}) => {
  const selectedInfo = GAME_LEVELS.find((l) => l.level === selectedLevel) || GAME_LEVELS[0];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="relative max-w-xl w-full max-h-[94vh] overflow-y-auto bg-amber-950/95 rounded-3xl p-4 sm:p-6 border-4 border-yellow-500/70 shadow-2xl text-white font-['Quicksand'] flex flex-col">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-800/80">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">⭐</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-['Fredoka'] tracking-wide">
                ALL LEVELS
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-200/80 mt-0.5 font-medium">
                Choose any unlocked level to play & master custom burger recipes!
              </p>
            </div>
          </div>
          <button
            id="close-levels-modal-btn"
            onClick={onClose}
            aria-label="Close levels modal"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-amber-900/80 hover:bg-amber-800 text-amber-300 hover:text-white border border-amber-600/40 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Level Stats Bar */}
        <div className="flex items-center justify-between bg-black/40 px-3.5 py-2 rounded-2xl border border-amber-500/30 my-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Trophy size={15} className="text-yellow-400 fill-yellow-400" />
            <span>All 10 Levels Unlocked & Ready</span>
          </div>
          <div className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]">
            Choose Any Level
          </div>
        </div>

        {/* Level Grid Component */}
        <div className="w-full bg-black/30 rounded-2xl p-2.5 sm:p-3 border border-amber-500/30">
          <LevelGrid
            selectedLevel={selectedLevel}
            onSelectLevel={onSelectLevel}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-amber-800/80 space-y-2">
          {/* Main Play Selected Level Button */}
          <button
            id="play-selected-level-modal-btn"
            onClick={() => onPlayLevel(selectedLevel)}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-b from-yellow-300 via-yellow-400 to-amber-500 hover:from-yellow-200 hover:to-yellow-400 active:scale-95 text-amber-950 font-black font-['Fredoka'] text-base sm:text-lg shadow-xl border-b-4 border-amber-700 flex items-center justify-center gap-2 transition-transform cursor-pointer"
          >
            <Play size={20} fill="currentColor" />
            <span>
              START LEVEL {selectedLevel}: {selectedInfo.name} ({selectedInfo.icon})
            </span>
          </button>

          {/* Play Random Level Button */}
          <button
            id="play-random-level-modal-btn"
            onClick={() => {
              const randomLvl = Math.floor(Math.random() * GAME_LEVELS.length) + 1;
              onPlayLevel(randomLvl);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-700/80 to-amber-900/90 hover:from-amber-600 hover:to-amber-800 active:scale-95 text-amber-200 font-bold font-['Fredoka'] text-xs sm:text-sm border border-amber-500/50 shadow flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>🎲</span>
            <span>PLAY RANDOM LEVEL</span>
          </button>

          {/* Close / Return Button */}
          <button
            id="back-home-from-levels-btn"
            onClick={onClose}
            className="w-full py-2 px-4 rounded-xl bg-black/40 hover:bg-black/60 active:scale-95 text-amber-300/80 hover:text-white font-semibold text-xs border border-white/10 transition cursor-pointer"
          >
            BACK TO HOME SCREEN
          </button>
        </div>
      </div>
    </div>
  );
};
