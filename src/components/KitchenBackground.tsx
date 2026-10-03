import React from 'react';

export const KitchenBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Wall: Cozy Warm Diner Tiles */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100">
        {/* Subtle retro tile grid pattern */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D97706 1px, transparent 1px),
              linear-gradient(to bottom, #D97706 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Retro Wall Clock & Kitchen Shelf */}
      <div className="absolute top-16 left-0 right-0 h-10 border-b-4 border-amber-900/40 bg-amber-700/20 flex items-center justify-between px-8">
        {/* Shelf items left */}
        <div className="flex items-center gap-4 opacity-60">
          {/* Salt & Pepper */}
          <div className="w-4 h-7 bg-white/80 rounded-t-md border border-stone-400" />
          <div className="w-4 h-7 bg-stone-800 rounded-t-md border border-stone-600" />
          {/* Mustard bottle */}
          <div className="w-5 h-8 bg-yellow-400 rounded-t-lg border border-yellow-600 flex flex-col items-center">
            <div className="w-1.5 h-3 bg-red-500 rounded-t" />
          </div>
          {/* Ketchup bottle */}
          <div className="w-5 h-8 bg-red-600 rounded-t-lg border border-red-800 flex flex-col items-center">
            <div className="w-1.5 h-3 bg-yellow-400 rounded-t" />
          </div>
        </div>

        {/* Shelf items right */}
        <div className="flex items-center gap-3 opacity-60">
          {/* Chef toque icon or coffee mugs */}
          <div className="w-6 h-6 rounded-md bg-amber-900/50 border border-amber-800 flex items-center justify-center text-xs">
            ☕
          </div>
          <div className="w-6 h-6 rounded-md bg-amber-900/50 border border-amber-800 flex items-center justify-center text-xs">
            🍳
          </div>
        </div>
      </div>

      {/* Warm Ambient Overhead Light Cone */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-xl h-96 bg-gradient-to-b from-yellow-200/40 via-yellow-100/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Diner Counter Top (Floor/Counter Area where catcher moves) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-t from-amber-950 via-amber-900 to-amber-800 border-t-8 border-amber-600/80 shadow-2xl">
        {/* Retro Red & White Checkerboard Trim */}
        <div
          className="w-full h-3 opacity-85"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #EF4444 0, #EF4444 12px, #FFFFFF 12px, #FFFFFF 24px)`,
          }}
        />

        {/* Wood grain highlight lines */}
        <div className="w-full h-full px-6 py-2 flex flex-col justify-around opacity-20">
          <div className="w-full h-0.5 bg-amber-400 rounded" />
          <div className="w-4/5 h-0.5 bg-amber-400 rounded" />
          <div className="w-full h-0.5 bg-amber-400 rounded" />
        </div>
      </div>
    </div>
  );
};
