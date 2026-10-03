import React, { useState } from 'react';
import { Volume2, VolumeX, Pause, Sparkles, Zap, Music, Minus, Plus, SlidersHorizontal } from 'lucide-react';
import { BURGER_RECIPE, BurgerLevelDef, INGREDIENTS_MAP } from '../types';

interface HUDProps {
  score: number;
  level: number;
  lives: number;
  burgerProgress: number;
  highScore: number;
  volume?: number;
  musicEnabled?: boolean;
  soundEnabled: boolean;
  slowMoRemaining: number; // in seconds
  doubleScoreRemaining: number; // in seconds
  currentBurger?: BurgerLevelDef;
  onVolumeChange?: (val: number) => void;
  onVolumeDown?: () => void;
  onVolumeUp?: () => void;
  onToggleMusic?: () => void;
  onToggleSound: () => void;
  onPause: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  score,
  level,
  lives,
  burgerProgress,
  volume = 0.7,
  musicEnabled = true,
  soundEnabled,
  slowMoRemaining,
  doubleScoreRemaining,
  currentBurger,
  onVolumeChange,
  onVolumeDown,
  onVolumeUp,
  onToggleMusic,
  onToggleSound,
  onPause,
}) => {
  const [showAudioPopover, setShowAudioPopover] = useState<boolean>(false);

  const totalLayers = currentBurger ? currentBurger.ingredients.length : BURGER_RECIPE.length;
  const burgerName = currentBurger ? currentBurger.name : 'Burger';
  const burgerEmoji = currentBurger ? currentBurger.badgeEmoji : '🍔';

  return (
    <header className="w-full max-w-4xl mx-auto px-2 sm:px-4 pt-2 pb-1 select-none pointer-events-auto">
      {/* Top Bar: Title, Stats, and Action Buttons */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 bg-amber-950/85 backdrop-blur-md rounded-2xl px-2.5 sm:px-4 py-2 border-2 border-amber-500/40 shadow-xl text-white">
        {/* Title / Logo */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xl sm:text-2xl animate-bounce">{burgerEmoji}</span>
          <div>
            <h1 className="text-xs sm:text-base font-extrabold tracking-wide text-amber-300 font-['Fredoka'] drop-shadow leading-none">
              BURGER RUSH
            </h1>
            <div className="text-[10px] sm:text-xs text-amber-200/80 font-medium">
              Level <span className="font-bold text-amber-400">{level}</span>: <span className="text-amber-200 font-semibold">{burgerName}</span>
            </div>
          </div>
        </div>

        {/* Center: Score & Progress */}
        <div className="flex items-center gap-2 sm:gap-5">
          {/* Score */}
          <div className="text-center">
            <div className="text-[9px] sm:text-xs uppercase tracking-wider text-amber-300/85 font-bold">
              Score
            </div>
            <div className="text-sm sm:text-xl font-black font-['Fredoka'] text-white drop-shadow-md">
              {score}
            </div>
          </div>

          {/* Progress */}
          <div className="text-center">
            <div className="text-[9px] sm:text-xs uppercase tracking-wider text-amber-300/85 font-bold">
              Progress
            </div>
            <div className="text-xs sm:text-lg font-black font-['Fredoka'] text-amber-300">
              {burgerProgress}/{totalLayers}
            </div>
          </div>

          {/* Lives ❤️ */}
          <div className="text-center">
            <div className="text-[9px] sm:text-xs uppercase tracking-wider text-amber-300/85 font-bold">
              Lives
            </div>
            <div className="flex items-center justify-center gap-0.5 text-xs sm:text-base">
              {[1, 2, 3].map((heartIndex) => (
                <span
                  key={heartIndex}
                  className={`transition-all duration-300 ${
                    heartIndex <= lives
                      ? 'scale-100 opacity-100'
                      : 'scale-75 opacity-25 grayscale'
                  }`}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls: Music / Volume (Kam / Jada) & Pause */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 relative">
          {/* Inline Volume & Music Controls for Medium+ Screens */}
          <div className="hidden md:flex items-center gap-1 bg-amber-900/60 rounded-xl px-2 py-1 border border-amber-600/30">
            {/* Music On / Off */}
            <button
              id="hud-music-toggle-btn"
              onClick={onToggleMusic}
              className={`p-1 rounded-lg text-xs transition cursor-pointer ${
                musicEnabled ? 'text-amber-300' : 'text-white/30'
              }`}
              title={musicEnabled ? 'Turn Music Off' : 'Turn Music On'}
              aria-label="Toggle Music"
            >
              <Music size={15} className={musicEnabled ? 'animate-pulse' : ''} />
            </button>

            {/* SFX On / Off */}
            <button
              id="hud-sfx-toggle-btn"
              onClick={onToggleSound}
              className={`p-1 rounded-lg text-xs transition cursor-pointer ${
                soundEnabled ? 'text-amber-300' : 'text-red-400'
              }`}
              title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Volume Kam (-) */}
            <button
              id="hud-inline-kam-btn"
              onClick={onVolumeDown}
              disabled={volume <= 0}
              className="w-5 h-5 rounded bg-amber-950/80 hover:bg-black/50 text-amber-300 disabled:opacity-30 flex items-center justify-center text-[10px] cursor-pointer"
              title="Volume Kam (-10%)"
              aria-label="Volume Down"
            >
              <Minus size={11} strokeWidth={3} />
            </button>

            {/* Slider */}
            <input
              id="hud-inline-volume-slider"
              type="range"
              min="0"
              max="100"
              step="5"
              value={volume}
              onChange={(e) => onVolumeChange?.(parseInt(e.target.value, 10))}
              className="w-12 lg:w-16 accent-amber-400 h-1.5 bg-black/50 rounded-lg cursor-pointer"
              title={`Volume: ${volume}%`}
              aria-label="Volume Slider"
            />

            {/* Volume Jada (+) */}
            <button
              id="hud-inline-jada-btn"
              onClick={onVolumeUp}
              disabled={volume >= 100}
              className="w-5 h-5 rounded bg-amber-950/80 hover:bg-black/50 text-amber-300 disabled:opacity-30 flex items-center justify-center text-[10px] cursor-pointer"
              title="Volume Jada (+10%)"
              aria-label="Volume Up"
            >
              <Plus size={11} strokeWidth={3} />
            </button>

            <span className="text-[10px] font-mono text-amber-300 font-bold min-w-[24px] text-right">
              {volume}%
            </span>
          </div>

          {/* Quick Sound/Volume Popover Trigger for Mobile/Compact screens */}
          <div className="relative md:hidden">
            <button
              id="hud-mobile-audio-btn"
              onClick={() => setShowAudioPopover(!showAudioPopover)}
              aria-label="Music and Volume Options"
              className={`w-8 h-8 flex items-center justify-center rounded-xl border transition cursor-pointer ${
                showAudioPopover
                  ? 'bg-amber-400 text-amber-950 border-amber-300 font-bold'
                  : 'bg-amber-800/70 hover:bg-amber-700/80 text-amber-200 border-amber-600/40'
              }`}
            >
              {soundEnabled || musicEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-red-300" />}
            </button>

            {/* Popover Menu on Mobile */}
            {showAudioPopover && (
              <div className="absolute right-0 top-10 z-50 w-60 bg-amber-950/95 backdrop-blur-md rounded-2xl p-3 border-2 border-amber-500/70 shadow-2xl animate-in fade-in duration-100">
                <div className="text-[11px] font-bold text-amber-300 pb-1.5 mb-2 border-b border-amber-800 flex items-center justify-between">
                  <span>AUDIO CONTROLS</span>
                  <span className="font-mono text-white">{volume}%</span>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  <button
                    onClick={onToggleMusic}
                    className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition ${
                      musicEnabled
                        ? 'bg-amber-400 text-amber-950'
                        : 'bg-black/40 text-white/50 border border-white/10'
                    }`}
                  >
                    <Music size={12} />
                    <span>{musicEnabled ? 'BGM ON' : 'BGM OFF'}</span>
                  </button>

                  <button
                    onClick={onToggleSound}
                    className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition ${
                      soundEnabled
                        ? 'bg-amber-400 text-amber-950'
                        : 'bg-black/40 text-white/50 border border-white/10'
                    }`}
                  >
                    {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
                    <span>{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
                  </button>
                </div>

                {/* Kam / Slider / Jada */}
                <div className="flex items-center justify-between gap-1.5 bg-black/40 p-2 rounded-xl border border-white/10">
                  <button
                    onClick={onVolumeDown}
                    disabled={volume <= 0}
                    className="px-2 py-1 rounded bg-amber-800/80 text-amber-200 text-xs font-bold disabled:opacity-30"
                  >
                    Down (-)
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={volume}
                    onChange={(e) => onVolumeChange?.(parseInt(e.target.value, 10))}
                    className="w-20 accent-amber-400 h-1.5"
                  />
                  <button
                    onClick={onVolumeUp}
                    disabled={volume >= 100}
                    className="px-2 py-1 rounded bg-amber-800/80 text-amber-200 text-xs font-bold disabled:opacity-30"
                  >
                    Up (+)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pause Button */}
          <button
            id="pause-game-btn"
            onClick={onPause}
            aria-label="Pause game"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-amber-950 font-bold border border-amber-300 transition shadow cursor-pointer"
          >
            <Pause size={17} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Active Power-Ups Banners */}
      {(slowMoRemaining > 0 || doubleScoreRemaining > 0) && (
        <div className="flex items-center justify-center gap-2 mt-1.5 animate-in fade-in slide-in-from-top-2">
          {slowMoRemaining > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-0.5 bg-cyan-600/90 text-white text-xs font-bold rounded-full border border-cyan-300 shadow-md">
              <Zap size={13} className="text-yellow-300 fill-yellow-300 animate-pulse" />
              <span>Slow-Mo: {slowMoRemaining.toFixed(1)}s</span>
            </div>
          )}
          {doubleScoreRemaining > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-500/90 text-amber-950 text-xs font-bold rounded-full border border-yellow-200 shadow-md">
              <Sparkles size={13} className="text-amber-950 animate-spin" />
              <span>2X Score: {doubleScoreRemaining.toFixed(1)}s</span>
            </div>
          )}
        </div>
      )}

      {/* Required Ingredient Assembly Guide Bar */}
      <div className="mt-1.5 flex items-center justify-center gap-1 sm:gap-2 px-2 py-1 bg-amber-950/70 backdrop-blur-sm rounded-xl border border-amber-500/30 text-white text-xs">
        <span className="text-[10px] sm:text-xs text-amber-300 font-black uppercase tracking-wider flex items-center gap-1 shrink-0">
          <span>{burgerEmoji}</span>
          <span>Recipe:</span>
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-[85vw] pb-0.5">
          {currentBurger ? (
            currentBurger.ingredients.map((ingId, idx) => {
              const ing = INGREDIENTS_MAP[ingId] || { name: ingId, emoji: '🍔' };
              const isCompleted = idx < burgerProgress;
              const isCurrent = idx === burgerProgress;

              return (
                <div
                  key={`${ingId}_${idx}`}
                  className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-emerald-900/60 text-emerald-300 line-through opacity-60 border border-emerald-600/30'
                      : isCurrent
                      ? 'bg-amber-400 text-amber-950 font-black scale-105 shadow-lg ring-2 ring-amber-300 animate-pulse'
                      : 'bg-black/30 text-amber-200/50'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{ing.emoji}</span>
                  <span className={isCurrent ? 'inline font-extrabold' : 'hidden sm:inline'}>{ing.name}</span>
                </div>
              );
            })
          ) : (
            BURGER_RECIPE.map((ing, idx) => {
              const isCompleted = idx < burgerProgress;
              const isCurrent = idx === burgerProgress;

              return (
                <div
                  key={ing.id}
                  className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-emerald-900/60 text-emerald-300 line-through opacity-60 border border-emerald-600/30'
                      : isCurrent
                      ? 'bg-amber-400 text-amber-950 font-black scale-105 shadow-lg ring-2 ring-amber-300 animate-pulse'
                      : 'bg-black/30 text-amber-200/50'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{ing.emoji}</span>
                  <span className={isCurrent ? 'inline font-extrabold' : 'hidden sm:inline'}>{ing.name}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </header>
  );
};
