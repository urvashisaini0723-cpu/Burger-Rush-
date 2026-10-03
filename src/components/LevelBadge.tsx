import React from 'react';
import { Lock, Play, Star } from 'lucide-react';
import { BURGER_LEVEL_RECIPES } from '../types';

export interface LevelInfo {
  level: number;
  name: string;
  speedLabel: string;
  layersCount: number;
  icon: string;
  taskGoal: string;
  description: string;
}

export const GAME_LEVELS: LevelInfo[] = BURGER_LEVEL_RECIPES.map((b) => ({
  level: b.level,
  name: b.name,
  speedLabel:
    b.level === 1
      ? 'Gentle Pace'
      : b.level <= 3
      ? 'Moderate Pace'
      : b.level <= 6
      ? 'Fast Flame'
      : b.level <= 8
      ? 'Lightning Speed'
      : 'Legendary Frenzy',
  layersCount: b.ingredients.length,
  icon: b.badgeEmoji,
  taskGoal: b.taskGoal,
  description: b.description,
}));

interface LevelGridProps {
  unlockedLevel?: number;
  selectedLevel: number;
  completedLevels?: number[];
  onSelectLevel: (lvl: number) => void;
}

export const LevelGrid: React.FC<LevelGridProps> = ({
  selectedLevel,
  onSelectLevel,
}) => {
  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider font-['Fredoka']">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span>ALL 10 LEVELS UNLOCKED</span>
        </div>
        <div className="text-[11px] text-amber-200/90 font-medium bg-amber-900/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
          Play Any Level Freely
        </div>
      </div>

      {/* Grid of 10 levels (all unlocked!) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {GAME_LEVELS.map((lvlInfo) => {
          const isSelected = selectedLevel === lvlInfo.level;

          return (
            <button
              key={lvlInfo.level}
              type="button"
              onClick={() => onSelectLevel(lvlInfo.level)}
              aria-label={`Level ${lvlInfo.level}: ${lvlInfo.name}`}
              className={`group relative rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-between transition-all duration-150 cursor-pointer min-h-[84px] sm:min-h-[96px] ${
                isSelected
                  ? 'ring-3 ring-yellow-300 bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 scale-105 shadow-xl font-black z-10'
                  : 'bg-gradient-to-b from-amber-900/85 to-stone-900/90 text-amber-100 border-2 border-amber-500/50 hover:border-amber-300 hover:scale-102 shadow'
              }`}
            >
              {/* Top row: Level tag + status badge */}
              <div className="w-full flex items-center justify-between text-[10px] leading-none mb-1">
                <span className="font-bold opacity-80">L{lvlInfo.level}</span>
                {isSelected ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-yellow-300 text-amber-950 font-black text-[9px]">
                    Selected
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 font-bold text-[9px]">
                    Open
                  </span>
                )}
              </div>

              {/* Center: Emoji/Icon + Level Number */}
              <div className="my-0.5 flex flex-col items-center">
                <span className="text-lg leading-none">{lvlInfo.icon}</span>
                <span className="text-xs sm:text-sm font-black font-['Fredoka'] mt-0.5 leading-tight">
                  Lvl {lvlInfo.level}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold line-clamp-1 truncate max-w-[80px] text-center opacity-90">
                  {lvlInfo.name}
                </span>
              </div>

              {/* Bottom pill status */}
              <div className="text-[9px] font-semibold tracking-tight mt-1">
                <span className="flex items-center gap-0.5 text-amber-200">
                  <Play size={8} fill="currentColor" /> Play
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Level Info Footer */}
      <div className="mt-2.5 px-3 py-2 rounded-xl bg-amber-950/80 border border-amber-500/50 text-xs text-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{GAME_LEVELS[selectedLevel - 1]?.icon || '🍔'}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-amber-300">Level {selectedLevel}: {GAME_LEVELS[selectedLevel - 1]?.name}</span>
              </div>
              <div className="text-amber-200/80 text-[11px] font-medium flex items-center gap-2">
                <span>{GAME_LEVELS[selectedLevel - 1]?.layersCount} Layers</span>
                <span>•</span>
                <span>{GAME_LEVELS[selectedLevel - 1]?.speedLabel}</span>
              </div>
            </div>
          </div>
          <div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[11px]">
              Ready to Play
            </span>
          </div>
        </div>

        {/* Task Goal Display */}
        {GAME_LEVELS[selectedLevel - 1]?.taskGoal && (
          <div className="mt-1 pt-1 border-t border-amber-700/50 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
            <span>🎯</span>
            <span>{GAME_LEVELS[selectedLevel - 1]?.taskGoal}</span>
          </div>
        )}
      </div>
    </div>
  );
};
