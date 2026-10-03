import React from 'react';
import { BURGER_RECIPE, WRONG_ITEMS, POWER_UPS } from '../types';
import { Check, Keyboard, Smartphone, Sparkles } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="relative max-w-lg w-full max-h-[92vh] overflow-y-auto bg-amber-950 rounded-3xl p-5 sm:p-7 border-4 border-amber-500/60 shadow-2xl text-white font-['Quicksand'] flex flex-col">
        {/* Header */}
        <div className="text-center pb-3 border-b border-amber-800/80">
          <h2 className="text-2xl sm:text-3xl font-black text-amber-300 font-['Fredoka'] tracking-wide">
            HOW TO PLAY 🍔
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 mt-0.5">
            Become the ultimate master burger chef!
          </p>
        </div>

        {/* Core Rules List */}
        <div className="space-y-2 py-4 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 bg-amber-900/40 p-2 rounded-xl border border-amber-800/60">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
            <span><strong>Move catcher left and right</strong> at the bottom of the kitchen.</span>
          </div>

          <div className="flex items-start gap-2.5 bg-amber-900/40 p-2 rounded-xl border border-amber-800/60">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div>
              <span><strong>Catch ingredients in the exact recipe order:</strong></span>
              <p className="text-[11px] text-amber-300 mt-0.5">
                Every level has a distinct burger & task! Follow the live recipe order bar at the top or tap the recipe ticket.
              </p>
            </div>
          </div>

          {/* Recipe Sequence Chips */}
          <div className="bg-black/30 p-2.5 rounded-xl border border-amber-600/30 flex items-center justify-between gap-1 overflow-x-auto text-[11px] sm:text-xs">
            {BURGER_RECIPE.map((ing, i) => (
              <div key={ing.id} className="flex items-center gap-1 shrink-0">
                <span className="font-bold text-amber-300">{i + 1}.</span>
                <span>{ing.emoji}</span>
                <span className="font-semibold text-amber-100">{ing.name}</span>
                {i < BURGER_RECIPE.length - 1 && <span className="text-amber-500/80 ml-1">→</span>}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2.5 bg-amber-900/40 p-2 rounded-xl border border-amber-800/60">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div>
              <span><strong>Avoid wrong foods:</strong></span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {WRONG_ITEMS.map((item) => (
                  <span key={item.id} className="px-2 py-0.5 bg-rose-950/70 border border-rose-500/40 text-rose-200 text-[11px] rounded-lg">
                    {item.emoji} {item.name} (-10 pts)
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-amber-900/40 p-2 rounded-xl border border-amber-800/60">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
            <span><strong>Complete the burger</strong> to trigger a celebration and earn <strong>+100 bonus</strong>!</span>
          </div>

          <div className="flex items-start gap-2.5 bg-amber-900/40 p-2 rounded-xl border border-amber-800/60">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">5</span>
            <span><strong>Don't let required ingredients fall!</strong> If the next required ingredient drops past the tray, you lose <strong>1 life ❤️</strong>.</span>
          </div>

          <div className="flex items-start gap-2.5 bg-amber-900/40 p-2 rounded-xl border border-amber-800/60">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">6</span>
            <div>
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Sparkles size={14} /> Collect Lucky Power-Ups:
              </span>
              <div className="grid grid-cols-3 gap-1.5 mt-1 text-[11px]">
                {POWER_UPS.map((pu) => (
                  <div key={pu.id} className="p-1.5 bg-amber-950/80 rounded-lg border border-amber-700/50 text-center">
                    <span className="text-base">{pu.emoji}</span>
                    <div className="font-bold text-amber-200">{pu.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-800/80 text-xs">
          <div className="bg-black/30 p-2.5 rounded-xl border border-amber-700/40">
            <div className="font-bold text-amber-300 flex items-center gap-1 mb-1">
              <Keyboard size={14} /> Desktop / Laptop
            </div>
            <p className="text-amber-100/90 text-[11px]">
              Use <kbd className="px-1 py-0.5 bg-amber-800 rounded font-mono">←</kbd> <kbd className="px-1 py-0.5 bg-amber-800 rounded font-mono">→</kbd> or <kbd className="px-1 py-0.5 bg-amber-800 rounded font-mono">A</kbd> <kbd className="px-1 py-0.5 bg-amber-800 rounded font-mono">D</kbd>, or move mouse across the arena.
            </p>
          </div>
          <div className="bg-black/30 p-2.5 rounded-xl border border-amber-700/40">
            <div className="font-bold text-amber-300 flex items-center gap-1 mb-1">
              <Smartphone size={14} /> Mobile / Tablet
            </div>
            <p className="text-amber-100/90 text-[11px]">
              Tap/Hold the large <strong>◀ LEFT</strong> and <strong>RIGHT ▶</strong> buttons or slide your finger across the game area.
            </p>
          </div>
        </div>

        {/* GOT IT Button */}
        <button
          id="got-it-btn"
          onClick={onClose}
          className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 text-amber-950 font-black font-['Fredoka'] text-lg shadow-lg border-b-4 border-amber-800 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check size={22} strokeWidth={3} />
          <span>GOT IT!</span>
        </button>
      </div>
    </div>
  );
};
