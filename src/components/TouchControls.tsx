import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TouchControlsProps {
  onMoveLeftStart: () => void;
  onMoveLeftEnd: () => void;
  onMoveRightStart: () => void;
  onMoveRightEnd: () => void;
}

export const TouchControls: React.FC<TouchControlsProps> = ({
  onMoveLeftStart,
  onMoveLeftEnd,
  onMoveRightStart,
  onMoveRightEnd,
}) => {
  return (
    <div
      id="mobile-touch-controls"
      className="w-full max-w-lg mx-auto px-4 py-2 flex items-center justify-between gap-4 select-none touch-none pointer-events-auto"
    >
      {/* LEFT BUTTON */}
      <button
        id="btn-move-left"
        type="button"
        onPointerDown={(e) => {
          e.preventDefault();
          onMoveLeftStart();
        }}
        onPointerUp={(e) => {
          e.preventDefault();
          onMoveLeftEnd();
        }}
        onPointerCancel={(e) => {
          e.preventDefault();
          onMoveLeftEnd();
        }}
        onPointerLeave={() => {
          onMoveLeftEnd();
        }}
        className="flex-1 h-14 sm:h-16 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:from-amber-600 active:to-amber-700 text-amber-950 font-black font-['Fredoka'] text-lg sm:text-xl border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 shadow-lg transition-transform cursor-pointer"
      >
        <ArrowLeft size={24} strokeWidth={3} />
        <span>LEFT</span>
      </button>

      {/* RIGHT BUTTON */}
      <button
        id="btn-move-right"
        type="button"
        onPointerDown={(e) => {
          e.preventDefault();
          onMoveRightStart();
        }}
        onPointerUp={(e) => {
          e.preventDefault();
          onMoveRightEnd();
        }}
        onPointerCancel={(e) => {
          e.preventDefault();
          onMoveRightEnd();
        }}
        onPointerLeave={() => {
          onMoveRightEnd();
        }}
        className="flex-1 h-14 sm:h-16 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:from-amber-600 active:to-amber-700 text-amber-950 font-black font-['Fredoka'] text-lg sm:text-xl border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 shadow-lg transition-transform cursor-pointer"
      >
        <span>RIGHT</span>
        <ArrowRight size={24} strokeWidth={3} />
      </button>
    </div>
  );
};
