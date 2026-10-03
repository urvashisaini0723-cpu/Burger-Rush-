import React from 'react';
import { Volume2, VolumeX, Music, Minus, Plus } from 'lucide-react';

interface AudioBarProps {
  volume: number; // 0 to 100
  musicEnabled: boolean;
  soundEnabled: boolean;
  onVolumeChange: (val: number) => void;
  onVolumeDown: () => void;
  onVolumeUp: () => void;
  onToggleMusic: () => void;
  onToggleSound: () => void;
  compact?: boolean;
}

export const AudioBar: React.FC<AudioBarProps> = ({
  volume,
  musicEnabled,
  soundEnabled,
  onVolumeChange,
  onVolumeDown,
  onVolumeUp,
  onToggleMusic,
  onToggleSound,
  compact = false,
}) => {
  if (compact) {
    // Compact row designed for in-game HUD or header
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-950/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-amber-500/50 shadow-lg text-white">
        {/* Music Toggle */}
        <button
          id="hud-toggle-music-btn"
          onClick={onToggleMusic}
          className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-bold transition cursor-pointer ${
            musicEnabled
              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
              : 'bg-black/40 text-white/40 border border-white/10'
          }`}
          title={musicEnabled ? 'Turn Music Off' : 'Turn Music On'}
          aria-label="Toggle Background Music"
        >
          <Music size={14} className={musicEnabled ? 'animate-pulse text-amber-300' : ''} />
          <span className="hidden xs:inline text-[10px]">{musicEnabled ? 'BGM ON' : 'BGM OFF'}</span>
        </button>

        {/* SFX Toggle */}
        <button
          id="hud-toggle-sfx-btn"
          onClick={onToggleSound}
          className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-bold transition cursor-pointer ${
            soundEnabled
              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
              : 'bg-black/40 text-white/40 border border-white/10'
          }`}
          title={soundEnabled ? 'Turn Sound FX Off' : 'Turn Sound FX On'}
          aria-label="Toggle Sound Effects"
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} className="text-red-400" />}
          <span className="hidden xs:inline text-[10px]">{soundEnabled ? 'SFX' : 'MUTED'}</span>
        </button>

        {/* Volume Down (-) Button */}
        <button
          id="hud-volume-down-btn"
          onClick={onVolumeDown}
          disabled={volume <= 0}
          className="w-6 h-6 rounded-md bg-amber-900/80 hover:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-amber-200 border border-amber-600/40 text-xs font-bold active:scale-95 transition cursor-pointer"
          title="Decrease Volume (-10%)"
          aria-label="Decrease Volume"
        >
          <Minus size={12} strokeWidth={3} />
        </button>

        {/* Volume Slider & Percent Indicator */}
        <div className="flex items-center gap-1.5">
          <input
            id="hud-volume-slider"
            type="range"
            min="0"
            max="100"
            step="5"
            value={volume}
            onChange={(e) => onVolumeChange(parseInt(e.target.value, 10))}
            className="w-14 sm:w-20 accent-amber-400 h-1.5 bg-black/50 rounded-lg cursor-pointer"
            aria-label="Volume Slider"
          />
          <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 w-7 text-right">
            {volume}%
          </span>
        </div>

        {/* Volume Up (+) Button */}
        <button
          id="hud-volume-up-btn"
          onClick={onVolumeUp}
          disabled={volume >= 100}
          className="w-6 h-6 rounded-md bg-amber-900/80 hover:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-amber-200 border border-amber-600/40 text-xs font-bold active:scale-95 transition cursor-pointer"
          title="Increase Volume (+10%)"
          aria-label="Increase Volume"
        >
          <Plus size={12} strokeWidth={3} />
        </button>
      </div>
    );
  }

  // Full Rich Box for Home Screen & Settings
  return (
    <div className="w-full bg-amber-950/90 backdrop-blur-md rounded-2xl p-3.5 border-2 border-amber-500/40 shadow-xl text-white">
      {/* Top row: Title and Quick Toggles */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-amber-800/60">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-300 font-['Fredoka']">
          <Volume2 size={16} className="text-amber-400" />
          <span>MUSIC & SOUND CONTROLS</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Music Toggle */}
          <button
            id="home-music-toggle-btn"
            onClick={onToggleMusic}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
              musicEnabled
                ? 'bg-amber-400 text-amber-950 font-extrabold shadow'
                : 'bg-black/50 text-white/50 border border-white/10'
            }`}
            title="Music On / Off"
          >
            <Music size={13} />
            <span>{musicEnabled ? 'Music ON' : 'Music OFF'}</span>
          </button>

          {/* SFX Toggle */}
          <button
            id="home-sfx-toggle-btn"
            onClick={onToggleSound}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
              soundEnabled
                ? 'bg-amber-400 text-amber-950 font-extrabold shadow'
                : 'bg-black/50 text-white/50 border border-white/10'
            }`}
            title="Sound FX On / Off"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Volume Down / Up & Slider */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {/* Down Button */}
          <button
            id="home-volume-down-btn"
            onClick={onVolumeDown}
            disabled={volume <= 0}
            className="px-2.5 py-1.5 rounded-xl bg-amber-900/90 hover:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed text-amber-200 border border-amber-600/50 text-xs font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer"
            title="Decrease Volume (-10%)"
          >
            <Minus size={13} strokeWidth={3} />
            <span className="text-[11px]">Down</span>
          </button>

          {/* Up Button */}
          <button
            id="home-volume-up-btn"
            onClick={onVolumeUp}
            disabled={volume >= 100}
            className="px-2.5 py-1.5 rounded-xl bg-amber-900/90 hover:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed text-amber-200 border border-amber-600/50 text-xs font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer"
            title="Increase Volume (+10%)"
          >
            <Plus size={13} strokeWidth={3} />
            <span className="text-[11px]">Up</span>
          </button>
        </div>

        {/* Volume Slider with Live Value */}
        <div className="flex items-center gap-2 flex-1 max-w-[200px] ml-auto">
          <input
            id="home-volume-slider"
            type="range"
            min="0"
            max="100"
            step="5"
            value={volume}
            onChange={(e) => onVolumeChange(parseInt(e.target.value, 10))}
            className="w-full accent-amber-400 h-2 bg-black/50 rounded-lg cursor-pointer"
            aria-label="Home Screen Volume Slider"
          />
          <span className="text-xs font-mono font-black text-amber-300 min-w-[34px] text-right">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
};
