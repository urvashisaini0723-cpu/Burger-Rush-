import React, { useState } from 'react';
import { Volume2, VolumeX, Check, Trash2, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SettingsModalProps {
  soundEnabled: boolean;
  highScore: number;
  selectedLevel: number;
  onToggleSound: () => void;
  onResetHighScore: () => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  soundEnabled,
  highScore,
  selectedLevel,
  onToggleSound,
  onResetHighScore,
  onResetProgress,
  onClose,
}) => {
  const [progressResetFeedback, setProgressResetFeedback] = useState(false);
  const [highScoreResetFeedback, setHighScoreResetFeedback] = useState(false);

  const handleResetProgress = () => {
    sounds.playButtonClick();
    onResetProgress();
    setProgressResetFeedback(true);
    setTimeout(() => {
      setProgressResetFeedback(false);
    }, 2200);
  };

  const handleResetHighScore = () => {
    sounds.playButtonClick();
    onResetHighScore();
    setHighScoreResetFeedback(true);
    setTimeout(() => {
      setHighScoreResetFeedback(false);
    }, 2200);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150 select-none">
      <div className="relative max-w-sm w-full bg-amber-950 rounded-3xl p-6 border-4 border-amber-500/60 shadow-2xl text-white font-['Quicksand'] flex flex-col">
        {/* Title */}
        <div className="text-center pb-3 border-b border-amber-800/80 mb-4">
          <h2 className="text-2xl font-black text-amber-300 font-['Fredoka'] tracking-wide">
            SETTINGS ⚙️
          </h2>
          <p className="text-xs text-amber-200/80 mt-0.5">Kitchen controls & data reset</p>
        </div>

        {/* Options */}
        <div className="space-y-3 my-1">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 bg-amber-900/50 rounded-2xl border border-amber-700/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-800 text-amber-300">
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </div>
              <div>
                <div className="font-bold text-sm text-white">Sound Effects</div>
                <div className="text-[11px] text-amber-300/70">Audio chimes & food pops</div>
              </div>
            </div>
            <button
              id="settings-sound-toggle-btn"
              onClick={onToggleSound}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition cursor-pointer ${
                soundEnabled
                  ? 'bg-amber-400 text-amber-950 shadow'
                  : 'bg-black/50 text-white/60 border border-white/10'
              }`}
            >
              {soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Reset Level Progress / Selected Level */}
          <div className="flex items-center justify-between p-3 bg-amber-900/40 rounded-2xl border border-amber-800/50">
            <div className="pr-2">
              <div className="font-bold text-sm text-white">Reset Level Selection</div>
              <div className="text-[11px] text-amber-300/80">
                {progressResetFeedback ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                    <Check size={12} strokeWidth={3} /> Reset to Level 1!
                  </span>
                ) : (
                  <span>Selected: <strong className="text-amber-200">Level {selectedLevel}</strong> (reset to Level 1)</span>
                )}
              </div>
            </div>
            <button
              id="reset-progress-btn"
              onClick={handleResetProgress}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shrink-0 cursor-pointer ${
                progressResetFeedback
                  ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-400'
                  : 'bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-600/50'
              }`}
              title="Reset level progress"
            >
              {progressResetFeedback ? <Check size={14} strokeWidth={3} /> : <RotateCcw size={14} />}
              <span>{progressResetFeedback ? 'Reset!' : 'Reset'}</span>
            </button>
          </div>

          {/* Clear High Score */}
          <div className="flex items-center justify-between p-3 bg-amber-900/40 rounded-2xl border border-amber-800/50">
            <div className="pr-2">
              <div className="font-bold text-sm text-white">Clear High Score</div>
              <div className="text-[11px] text-amber-300/80">
                {highScoreResetFeedback ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                    <Check size={12} strokeWidth={3} /> Record Cleared to 0!
                  </span>
                ) : (
                  <span>High Score: <strong className="text-amber-200">{highScore} pts</strong></span>
                )}
              </div>
            </div>
            <button
              id="reset-highscore-btn"
              onClick={handleResetHighScore}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shrink-0 cursor-pointer ${
                highScoreResetFeedback
                  ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-400'
                  : 'bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-600/50'
              }`}
              title="Clear high score"
            >
              {highScoreResetFeedback ? <Check size={14} strokeWidth={3} /> : <Trash2 size={14} />}
              <span>{highScoreResetFeedback ? 'Cleared!' : 'Clear'}</span>
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          id="close-settings-btn"
          onClick={onClose}
          className="mt-4 w-full py-3 px-4 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 text-amber-950 font-black font-['Fredoka'] text-base shadow-lg border-b-4 border-amber-800 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check size={20} strokeWidth={3} />
          <span>DONE</span>
        </button>
      </div>
    </div>
  );
};
