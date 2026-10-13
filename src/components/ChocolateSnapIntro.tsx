import React, { useState, useEffect } from 'react';
import { playChocolateSnapSound } from '../utils/audioSnap';
import { SunGlyph } from './WakebarLogo';
import { Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';

interface ChocolateSnapIntroProps {
  onComplete: () => void;
  isReplay?: boolean;
}

export const ChocolateSnapIntro: React.FC<ChocolateSnapIntroProps> = ({
  onComplete,
  isReplay = false,
}) => {
  // Phases: 'enter' (0-600ms) -> 'tension' (600-1000ms) -> 'snap' (1000-2600ms) -> 'exit' (2600-3000ms)
  const [phase, setPhase] = useState<'enter' | 'tension' | 'snap' | 'exit'>('enter');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Phase 1: Enter -> Tension
    const t1 = setTimeout(() => {
      setPhase('tension');
    }, 600);

    // Phase 2: Snap!
    const t2 = setTimeout(() => {
      setPhase('snap');
      if (soundEnabled) {
        playChocolateSnapSound();
      }
    }, 1100);

    // Phase 3: Exit transition
    const t3 = setTimeout(() => {
      setPhase('exit');
    }, 2800);

    // Phase 4: Final unmount
    const t4 = setTimeout(() => {
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [soundEnabled, onComplete]);

  const handleSkip = () => {
    setPhase('exit');
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  const isSnapped = phase === 'snap' || phase === 'exit';
  const isTension = phase === 'tension';

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#100705] transition-all duration-500 cursor-pointer select-none overflow-hidden ${
        phase === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient spotlight & warmth */}
      <div className="absolute w-[600px] h-[600px] bg-[#E58B24]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#120806]/60 to-[#0A0403] pointer-events-none" />

      {/* Top Controls: Sound toggle & Skip */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs text-[#A89481] z-20"
      >
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24130D] border border-[#3E2218] hover:text-[#FAF5EE] transition-colors"
          title="Toggle Snap Sound"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#E58B24]" />
              <span className="font-mono text-[11px]">Audio On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#8C7665]" />
              <span className="font-mono text-[11px]">Muted</span>
            </>
          )}
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#24130D] border border-[#3E2218] text-[#FAF5EE] hover:bg-[#341B13] transition-colors font-medium text-xs"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Center Stage: The Chocolate Bar splitting in 2 */}
      <div className="relative flex flex-col items-center justify-center p-4">
        
        {/* Brand Kicker */}
        <div
          className={`flex items-center gap-2 mb-6 transition-all duration-700 ${
            phase === 'enter' ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          <SunGlyph className="w-6 h-3 text-[#E58B24]" />
          <span className="font-serif tracking-widest text-xs uppercase text-[#E58B24] font-semibold">
            Wakebar · Focus Chocolate
          </span>
        </div>

        {/* Chocolate Bar Wrapper / Container */}
        <div className="relative w-[340px] sm:w-[420px] h-[190px] sm:h-[220px] perspective-[1000px] flex items-center justify-center">
          
          {/* Tension subtle vibration filter */}
          <div
            className={`relative flex w-full h-full items-center justify-center transition-transform duration-100 ${
              isTension ? 'translate-x-[1px] -translate-y-[1px]' : ''
            }`}
          >

            {/* LEFT HALF OF CHOCOLATE BAR */}
            <div
              style={{
                transform: isSnapped
                  ? 'translate3d(-34px, 14px, 10px) rotate(-8deg) rotateY(-8deg)'
                  : 'translate3d(0, 0, 0) rotate(0deg)',
                transition: isSnapped
                  ? 'transform 550ms cubic-bezier(0.18, 0.89, 0.32, 1.25)'
                  : 'transform 300ms ease',
              }}
              className="relative w-[170px] sm:w-[210px] h-[190px] sm:h-[220px] origin-right z-10"
            >
              <div className="w-full h-full rounded-l-2xl bg-gradient-to-br from-[#381F17] via-[#24130D] to-[#170C08] p-3 shadow-2xl border-l border-y border-[#4A2A20] relative overflow-hidden">
                
                {/* Surface Sheen & Texture */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                {/* Left 3 Chocolate Squares */}
                <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
                  {/* Top Left Tablet */}
                  <div className="rounded-lg bg-[#2A1610] border border-[#3E2118] shadow-inner p-2 flex flex-col items-center justify-center relative overflow-hidden">
                    <SunGlyph className="w-5 h-2.5 text-[#E58B24]/40" />
                    <span className="text-[9px] font-serif font-bold text-[#FAF5EE]/40 uppercase mt-0.5 tracking-wider">
                      Wake
                    </span>
                    {/* Embedded Almond Half */}
                    <div className="absolute bottom-1 right-1 w-5 h-3 rounded-full bg-[#C28C58] border border-[#7A4B23] rotate-[-25deg] shadow-sm flex items-center justify-center">
                      <div className="w-3.5 h-1.5 rounded-full bg-[#E5B582]/80" />
                    </div>
                  </div>

                  {/* Top Mid Tablet */}
                  <div className="rounded-lg bg-[#2A1610] border border-[#3E2118] shadow-inner p-2 flex items-center justify-center relative overflow-hidden">
                    <span className="font-mono text-[10px] font-bold text-[#E58B24]/50">72%</span>
                    {/* Embedded Green Pumpkin Seed (Pepita) */}
                    <div className="absolute top-1.5 left-1.5 w-4 h-2 rounded-full bg-[#658B43] border border-[#3D5626] rotate-[45deg] shadow-sm" />
                    {/* Cacao nib spec */}
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#120705] rotate-45 border border-[#3B1C14]" />
                  </div>

                  {/* Bottom Left Tablet */}
                  <div className="rounded-lg bg-[#2A1610] border border-[#3E2118] shadow-inner p-2 flex items-center justify-center relative overflow-hidden">
                    <span className="text-[8px] font-mono uppercase text-[#A89481]/50 tracking-wider">
                      Cacao
                    </span>
                    {/* Embedded Whole Roasted Almond */}
                    <div className="absolute top-1 right-2 w-6 h-3 rounded-full bg-[#B87E47] border border-[#6B3F1B] rotate-12 shadow-sm flex items-center justify-center">
                      <div className="w-4 h-1.5 rounded-full bg-[#DFC19D]/90" />
                    </div>
                  </div>

                  {/* Bottom Mid Tablet */}
                  <div className="rounded-lg bg-[#2A1610] border border-[#3E2118] shadow-inner p-2 flex items-center justify-center relative overflow-hidden">
                    <span className="text-[8px] font-mono uppercase text-[#E58B24]/50">
                      Focus
                    </span>
                    {/* Green Pepita seed */}
                    <div className="absolute bottom-1.5 left-2 w-4 h-2 rounded-full bg-[#5E833D] border border-[#354D20] rotate-[-30deg]" />
                    {/* Crunchy chia specks */}
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#120705]" />
                  </div>
                </div>

                {/* FRACTURED INNER RIGHT EDGE (Reveals crunchy nuts & seeds inside) */}
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#1B0C08] border-l border-[#3D1E16] flex flex-col justify-around items-center py-2 overflow-hidden shadow-inner">
                  {/* Exposed Nut Cross-sections */}
                  <div className="w-2.5 h-2 rounded-full bg-[#DFC19D] border border-[#8C5228]" title="Almond heart" />
                  <div className="w-2 h-1.5 rounded-full bg-[#719846] border border-[#3E5C20]" title="Pumpkin seed" />
                  <div className="w-2.5 h-2.5 bg-[#120705] rotate-12" title="Cacao nib" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AE86]" title="Almond" />
                </div>

              </div>
            </div>

            {/* FRACTURE CRACK HAIRLINE (Visible before and during snap) */}
            <div
              className={`absolute top-0 bottom-0 w-1.5 z-20 pointer-events-none transition-all duration-300 ${
                isSnapped
                  ? 'opacity-0 scale-y-125'
                  : isTension
                  ? 'opacity-100 bg-[#E58B24] shadow-[0_0_12px_#E58B24]'
                  : 'opacity-40 bg-[#4A2A20]'
              }`}
            />

            {/* RIGHT HALF OF CHOCOLATE BAR */}
            <div
              style={{
                transform: isSnapped
                  ? 'translate3d(34px, -12px, 10px) rotate(7deg) rotateY(8deg)'
                  : 'translate3d(0, 0, 0) rotate(0deg)',
                transition: isSnapped
                  ? 'transform 550ms cubic-bezier(0.18, 0.89, 0.32, 1.25)'
                  : 'transform 300ms ease',
              }}
              className="relative w-[170px] sm:w-[210px] h-[190px] sm:h-[220px] origin-left z-10"
            >
              <div className="w-full h-full rounded-r-2xl bg-gradient-to-bl from-[#381F17] via-[#24130D] to-[#170C08] p-3 shadow-2xl border-r border-y border-[#4A2A20] relative overflow-hidden">
                
                {/* Surface Sheen & Texture */}
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent pointer-events-none" />

                {/* Right 3 Chocolate Squares */}
                <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
                  {/* Top Right-Mid Tablet */}
                  <div className="rounded-lg bg-[#2A1610] border border-[#3E2118] shadow-inner p-2 flex flex-col items-center justify-center relative overflow-hidden">
                    <span className="text-[9px] font-serif font-bold text-[#FAF5EE]/40 uppercase tracking-wider">
                      Bar
                    </span>
                    {/* Embedded Almond */}
                    <div className="absolute top-1.5 right-1 w-6 h-3 rounded-full bg-[#B87E47] border border-[#6B3F1B] rotate-[35deg] shadow-sm flex items-center justify-center">
                      <div className="w-4 h-1.5 rounded-full bg-[#DFC19D]/90" />
                    </div>
                  </div>

                  {/* Top Far-Right Tablet */}
                  <div className="rounded-lg bg-[#2A1610] border border-[#3E2118] shadow-inner p-2 flex items-center justify-center relative overflow-hidden">
                    <span className="font-mono text-[9px] text-[#A89481]/50">40g</span>
                    {/* Embedded pumpkin seed */}
                    <div className="absolute bottom-1.5 left-2 w-4 h-2 rounded-full bg-[#658B43] border border-[#3D5626] rotate-[-45deg]" />
                    <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-[#120705]" />
                  </div>

                  {/* Bottom Right-Mid Tablet */}
                  <div className="rounded-lg bg-[#2A1610] border border-[#3E2118] shadow-inner p-2 flex items-center justify-center relative overflow-hidden">
                    <span className="text-[8px] font-mono uppercase text-[#E58B24]/50">
                      Energy
                    </span>
                    {/* Roasted seed cluster */}
                    <div className="absolute bottom-1 right-1 w-5 h-2.5 rounded-full bg-[#5E833D] border border-[#354D20] rotate-12" />
                    <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-[#C28C58]" />
                  </div>

                  {/* Bottom Far-Right Tablet */}
                  <div className="rounded-lg bg-[#2A1610] border border-[#3E2118] shadow-inner p-2 flex items-center justify-center relative overflow-hidden">
                    <SunGlyph className="w-4 h-2 text-[#E58B24]/40" />
                    <span className="text-[8px] font-mono uppercase text-[#A89481]/50 mt-0.5">
                      Pure
                    </span>
                    {/* Almond half */}
                    <div className="absolute top-2 left-1 w-5 h-3 rounded-full bg-[#B87E47] border border-[#6B3F1B] rotate-[-20deg] flex items-center justify-center">
                      <div className="w-3.5 h-1.5 rounded-full bg-[#DFC19D]/90" />
                    </div>
                  </div>
                </div>

                {/* FRACTURED INNER LEFT EDGE (Reveals crunchy nuts & seeds inside) */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#1B0C08] border-r border-[#3D1E16] flex flex-col justify-around items-center py-2 overflow-hidden shadow-inner">
                  {/* Exposed Nut Cross-sections */}
                  <div className="w-2.5 h-2 rounded-full bg-[#DFC19D] border border-[#8C5228]" title="Almond heart" />
                  <div className="w-2 h-1.5 rounded-full bg-[#719846] border border-[#3E5C20]" title="Pumpkin seed" />
                  <div className="w-2 h-2 bg-[#120705] rotate-45" title="Cacao nib" />
                  <div className="w-2.5 h-2 rounded-full bg-[#D4AE86]" title="Almond" />
                </div>

              </div>
            </div>

          </div>

          {/* FLYING NUTS & CRACK PARTICLES (Triggered upon snap) */}
          {isSnapped && (
            <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
              
              {/* Central golden flash */}
              <div className="absolute w-24 h-24 rounded-full bg-[#E58B24]/40 blur-xl animate-ping" />

              {/* Shard 1: Almond slice flying top-left */}
              <div
                style={{
                  animation: 'flyingShard1 700ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                }}
                className="absolute w-5 h-2.5 rounded-full bg-[#D4A373] border border-[#7A4B23] shadow-md"
              />

              {/* Shard 2: Pumpkin seed flying bottom-left */}
              <div
                style={{
                  animation: 'flyingShard2 750ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                }}
                className="absolute w-4 h-2 rounded-full bg-[#658B43] border border-[#384F22] shadow-md"
              />

              {/* Shard 3: Cacao nib chunk flying top-right */}
              <div
                style={{
                  animation: 'flyingShard3 680ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                }}
                className="absolute w-3 h-3 bg-[#24120C] border border-[#48281D] shadow-md"
              />

              {/* Shard 4: Almond slice flying bottom-right */}
              <div
                style={{
                  animation: 'flyingShard4 720ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                }}
                className="absolute w-5 h-2.5 rounded-full bg-[#C28C58] border border-[#6B3F1B] shadow-md"
              />

              {/* Shard 5: Tiny seed flying straight up */}
              <div
                style={{
                  animation: 'flyingShard5 650ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                }}
                className="absolute w-2.5 h-2.5 rounded-full bg-[#5E833D]"
              />

              {/* Shard 6: Chocolate crumb flying down */}
              <div
                style={{
                  animation: 'flyingShard6 700ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                }}
                className="absolute w-3 h-2 rounded bg-[#170C08]"
              />

              {/* Shard 7: Golden sparkle burst */}
              <div
                style={{
                  animation: 'flyingShard7 800ms ease-out forwards',
                }}
                className="absolute text-[#E58B24]"
              >
                <Sparkles className="w-5 h-5" />
              </div>

            </div>
          )}

        </div>

        {/* Catchphrase Revelation upon Snap */}
        <div
          className={`mt-8 text-center transition-all duration-700 ${
            isSnapped ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-tight">
            Small Bar. <span className="italic text-[#E58B24]">Big Difference.</span>
          </p>
          <p className="text-xs sm:text-sm text-[#C4B29E] mt-1.5 font-light">
            Same you, just more focused.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-[#8C7665]">
            <span>Click anywhere to explore</span>
            <span>·</span>
            <span>72% Dark Chocolate + Seeds</span>
          </div>
        </div>

      </div>

      {/* Embedded keyframe styles for the outward particle burst */}
      <style>{`
        @keyframes flyingShard1 {
          0% { transform: translate(0, 0) rotate(0deg) scale(0.5); opacity: 1; }
          100% { transform: translate(-70px, -65px) rotate(-160deg) scale(1); opacity: 0.9; }
        }
        @keyframes flyingShard2 {
          0% { transform: translate(0, 0) rotate(0deg) scale(0.5); opacity: 1; }
          100% { transform: translate(-60px, 60px) rotate(140deg) scale(1); opacity: 0.9; }
        }
        @keyframes flyingShard3 {
          0% { transform: translate(0, 0) rotate(0deg) scale(0.5); opacity: 1; }
          100% { transform: translate(65px, -70px) rotate(200deg) scale(1); opacity: 0.9; }
        }
        @keyframes flyingShard4 {
          0% { transform: translate(0, 0) rotate(0deg) scale(0.5); opacity: 1; }
          100% { transform: translate(75px, 55px) rotate(-180deg) scale(1); opacity: 0.9; }
        }
        @keyframes flyingShard5 {
          0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
          100% { transform: translate(-10px, -85px) rotate(90deg) scale(1); opacity: 0.8; }
        }
        @keyframes flyingShard6 {
          0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
          100% { transform: translate(15px, 80px) rotate(-90deg) scale(1); opacity: 0.8; }
        }
        @keyframes flyingShard7 {
          0% { transform: translate(0, 0) scale(0.2); opacity: 1; }
          100% { transform: translate(0px, -40px) scale(1.4); opacity: 0; }
        }
      `}</style>

    </div>
  );
};
