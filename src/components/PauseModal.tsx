import React from 'react';
import { Play, RotateCcw, Home } from 'lucide-react';
import { AudioBar } from './AudioBar';

interface PauseModalProps {
  volume?: number;
  musicEnabled?: boolean;
  soundEnabled?: boolean;
  onVolumeChange?: (val: number) => void;
  onVolumeDown?: () => void;
  onVolumeUp?: () => void;
  onToggleMusic?: () => void;
  onToggleSound?: () => void;
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  volume = 0.7,
  musicEnabled = true,
  soundEnabled = true,
  onVolumeChange = () => {},
  onVolumeDown = () => {},
  onVolumeUp = () => {},
  onToggleMusic = () => {},
  onToggleSound = () => {},
  onResume,
  onRestart,
  onMainMenu,
}) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative max-w-sm w-full bg-amber-950 rounded-3xl p-5 sm:p-6 border-4 border-amber-500/60 shadow-2xl text-center flex flex-col items-center">
        {/* Pause Icon & Title */}
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl mb-2">
          ⏸️
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-300 font-['Fredoka'] mb-3 tracking-wide">
          GAME PAUSED
        </h2>

        {/* Buttons */}
        <div className="w-full space-y-2.5 font-['Fredoka'] mb-3">
          {/* Resume */}
          <button
            id="resume-btn"
            onClick={onResume}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 text-amber-950 font-black text-lg border-b-4 border-amber-800 flex items-center justify-center gap-2.5 shadow-lg transition cursor-pointer"
          >
            <Play size={20} fill="currentColor" />
            <span>RESUME</span>
          </button>

          {/* Restart */}
          <button
            id="restart-btn"
            onClick={onRestart}
            className="w-full py-2.5 px-4 rounded-2xl bg-amber-900/80 hover:bg-amber-800 active:scale-95 text-amber-200 font-bold text-base border border-amber-600/50 flex items-center justify-center gap-2.5 transition cursor-pointer"
          >
            <RotateCcw size={18} />
            <span>RESTART</span>
          </button>

          {/* Main Menu */}
          <button
            id="main-menu-btn"
            onClick={onMainMenu}
            className="w-full py-2 px-4 rounded-2xl bg-black/40 hover:bg-black/60 active:scale-95 text-amber-300/80 font-semibold text-sm border border-white/10 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Home size={16} />
            <span>MAIN MENU</span>
          </button>
        </div>

        {/* Audio Bar in Pause Menu */}
        <div className="w-full mt-1">
          <AudioBar
            volume={volume}
            musicEnabled={musicEnabled}
            soundEnabled={soundEnabled}
            onVolumeChange={onVolumeChange}
            onVolumeDown={onVolumeDown}
            onVolumeUp={onVolumeUp}
            onToggleMusic={onToggleMusic}
            onToggleSound={onToggleSound}
            compact={true}
          />
        </div>
      </div>
    </div>
  );
};
