import React from 'react';
import { Play, HelpCircle, Settings, Trophy, Star } from 'lucide-react';
import { GAME_LEVELS } from './LevelBadge';
import {
  BottomBunGraphic,
  LettuceGraphic,
  TomatoGraphic,
  CheeseGraphic,
  PattyGraphic,
  TopBunGraphic,
} from './FoodGraphics';

interface StartScreenProps {
  highScore: number;
  unlockedLevel: number;
  completedLevels?: number[];
  selectedLevel: number;
  onSelectLevel: (lvl: number) => void;
  onOpenLevels: () => void;
  onPlay: (startAtLevel?: number) => void;
  onHowToPlay: () => void;
  onSettings: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  highScore,
  unlockedLevel,
  selectedLevel,
  onOpenLevels,
  onPlay,
  onHowToPlay,
  onSettings,
}) => {
  const selectedInfo = GAME_LEVELS.find((l) => l.level === selectedLevel) || GAME_LEVELS[0];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 select-none overflow-y-auto">
      <div className="relative z-10 max-w-lg w-full max-h-[96vh] overflow-y-auto bg-amber-950/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-4 border-amber-500/50 shadow-2xl text-center flex flex-col items-center">
        {/* Badge / Tagline */}
        <div className="px-3.5 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-widest rounded-full border border-amber-500/30 mb-2">
          Catch • Build • Serve!
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-amber-300 font-['Fredoka'] tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex items-center gap-2">
          <span>🍔</span> BURGER RUSH
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 font-medium mt-1 mb-2">
          Catch It. Stack It. Master Every Recipe!
        </p>

        {/* Top Badges (High Score & Total Levels) */}
        <div className="flex flex-wrap items-center justify-center gap-2 my-1">
          {highScore > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-900/60 rounded-full border border-amber-500/40 text-amber-300 font-bold text-xs">
              <Trophy size={14} className="text-yellow-400 fill-yellow-400" />
              <span>High Score: <strong className="text-white font-black">{highScore}</strong></span>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/70 rounded-full border border-emerald-500/40 text-emerald-300 font-bold text-xs">
            <span>All 10 Levels Unlocked</span>
            <span className="text-[10px] text-emerald-400 font-normal">• Play Any Level</span>
          </div>
        </div>

        {/* Animated Burger Mascot */}
        <div className="my-4 relative flex flex-col items-center justify-center w-32 sm:w-40 animate-bounce duration-1000">
          <div className="w-full -mb-4">
            <TopBunGraphic size={120} className="w-full h-auto" />
          </div>
          <div className="w-[95%] -mb-3">
            <PattyGraphic size={120} className="w-full h-auto" />
          </div>
          <div className="w-[98%] -mb-3">
            <CheeseGraphic size={120} className="w-full h-auto" />
          </div>
          <div className="w-full -mb-3">
            <LettuceGraphic size={120} className="w-full h-auto" />
          </div>
          <div className="w-[92%]">
            <BottomBunGraphic size={120} className="w-full h-auto" />
          </div>
        </div>

        {/* Currently Chosen Level Info Preview */}
        <div className="w-full bg-black/40 px-3.5 py-2.5 rounded-2xl border border-amber-500/30 flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2 text-left">
            <span className="text-2xl">{selectedInfo.icon}</span>
            <div>
              <div className="font-extrabold text-amber-300 text-sm font-['Fredoka']">
                Level {selectedLevel}: {selectedInfo.name}
              </div>
              <div className="text-[11px] text-amber-200/80 font-medium">
                {selectedInfo.layersCount} Layers • {selectedInfo.speedLabel}
              </div>
            </div>
          </div>
          <div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[11px]">
              Ready to Play
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5">
          {/* PLAY SELECTED LEVEL BUTTON */}
          <button
            id="play-game-btn"
            onClick={() => onPlay(selectedLevel)}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 text-amber-950 font-black font-['Fredoka'] text-lg sm:text-xl shadow-xl border-b-4 border-amber-800 flex items-center justify-center gap-2.5 transition-transform cursor-pointer"
          >
            <Play size={22} fill="currentColor" />
            <span>START LEVEL {selectedLevel}</span>
          </button>

          {/* YELLOW BUTTON TO OPEN LEVELS MODAL */}
          <button
            id="open-levels-btn"
            onClick={onOpenLevels}
            className="w-full py-3 px-4 sm:px-5 rounded-2xl bg-gradient-to-b from-yellow-300 via-yellow-400 to-amber-400 hover:from-yellow-200 hover:to-yellow-300 active:scale-95 text-amber-950 font-black font-['Fredoka'] text-base sm:text-lg shadow-lg border-2 border-yellow-100 border-b-4 border-b-amber-700 flex items-center justify-between transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Star size={20} className="text-amber-950 fill-amber-950" />
              <span>SELECT LEVEL</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/15 text-amber-950 font-extrabold text-xs">
              <span>Level {selectedLevel} Selected</span>
              <span>•</span>
              <span>10 Levels</span>
            </div>
          </button>

          {/* Secondary Buttons Row */}
          <div className="flex gap-2 pt-1">
            <button
              id="how-to-play-btn"
              onClick={onHowToPlay}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-amber-900/80 hover:bg-amber-800 active:scale-95 text-amber-200 font-bold font-['Fredoka'] text-sm border border-amber-600/50 flex items-center justify-center gap-1.5 transition shadow cursor-pointer"
            >
              <HelpCircle size={16} />
              <span>HOW TO PLAY</span>
            </button>

            <button
              id="settings-btn"
              onClick={onSettings}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-black/40 hover:bg-black/60 active:scale-95 text-amber-300/80 hover:text-amber-200 font-semibold text-sm border border-white/10 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Settings size={16} />
              <span>SETTINGS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
