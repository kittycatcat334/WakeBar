import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';
import { ASSETS, PILLARS } from '../data/wakebarData';
import { PillarIcon } from './BrandPillarIcons';
import { SunGlyph } from './WakebarLogo';

interface HeroProps {
  onShopClick: () => void;
  onExploreIngredients: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreIngredients }) => {
  const [activeCallout, setActiveCallout] = useState<number | null>(null);

  const callouts = [
    {
      x: '28%',
      y: '32%',
      label: '72% Cacao',
      detail: 'Gentle theobromine alertness with zero coffee acidity or crash.',
    },
    {
      x: '64%',
      y: '48%',
      label: 'L-Theanine & Seeds',
      detail: 'Whole almonds, pumpkin seeds & 100mg L-theanine for calm laser focus.',
    },
    {
      x: '38%',
      y: '78%',
      label: '40g Single Bar',
      detail: 'Small bar. Big difference. Portable pocket focus fuel.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#150F0D] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#2C1A14]">
      {/* Background ambient cocoa glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[#E58B24]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[350px] bg-[#3D251C]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Grid Desktop Baseline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Copy & Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Tagline / Subtitle */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E58B24]">
              <SunGlyph className="w-5 h-2.5 text-[#E58B24]" />
              <span>Focus · Energy · Chocolate</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF5EE] leading-[1.12] text-balance">
              Better Focus.{' '}
              <span className="italic font-normal text-[#E58B24]">Brighter Hours.</span>
            </h1>

            {/* Audience Mission directly from reference image */}
            <p className="text-lg sm:text-xl text-[#D9C8B5] font-light leading-relaxed max-w-xl">
              For those who don’t like tea or coffee, but still want to stay active.
            </p>

            {/* Catchphrase callout */}
            <div className="p-4 rounded-xl bg-[#20130E] border border-[#3E251E] flex items-center justify-between gap-4 max-w-lg">
              <div>
                <p className="text-sm font-medium text-[#FAF5EE]">
                  “Small Bar. Big Difference.”
                </p>
                <p className="text-xs text-[#A89481] mt-0.5">
                  Same you, just more focused.
                </p>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#2D1B14] text-[#E58B24] border border-[#44281E] shrink-0">
                40g · 72% Cacao
              </span>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#1A0F0C] bg-[#E58B24] hover:bg-[#F59E0B] rounded-xl transition-all shadow-lg hover:shadow-[#E58B24]/20 active:scale-[0.99]"
              >
                <span>Order Wakebars</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onExploreIngredients}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#E0CDBB] hover:text-white bg-[#221510] hover:bg-[#2C1B15] border border-[#3D251C] rounded-xl transition-colors"
              >
                <span>What's Inside?</span>
                <ChevronRight className="w-4 h-4 text-[#8C7665]" />
              </button>
            </div>

            {/* Trust markers */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs text-[#A89481]">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#E58B24]" />
                <span>Zero jitter formula</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#E58B24]" />
                <span>100% plant-based</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#E58B24]" />
                <span>Zero added refined sugar</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Res Interactive Product Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-[#3E251E] bg-[#1C110D] shadow-2xl group">
              
              {/* Product Visual */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A0E0B]">
                <img
                  src={ASSETS.heroBar}
                  alt="Wakebar premium functional dark chocolate bar with nuts and seeds"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim gradient overlay for luxury contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#150F0D] via-transparent to-black/20 pointer-events-none" />

                {/* Interactive Inspection Hotspots */}
                {callouts.map((c, i) => (
                  <div
                    key={i}
                    style={{ left: c.x, top: c.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => setActiveCallout(activeCallout === i ? null : i)}
                      onMouseEnter={() => setActiveCallout(i)}
                      className="group/btn relative flex items-center justify-center w-8 h-8 rounded-full bg-[#E58B24] text-[#1A0F0C] font-bold text-xs shadow-lg hover:scale-110 transition-transform"
                      aria-label={`View detail: ${c.label}`}
                    >
                      <span>+</span>
                      <span className="absolute -inset-1 rounded-full border border-[#E58B24]/60 animate-ping pointer-events-none opacity-40" />
                    </button>

                    {/* Popover Callout */}
                    {activeCallout === i && (
                      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-52 p-3 bg-[#1D110D]/95 backdrop-blur-md rounded-xl border border-[#4E2E23] text-left shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-150">
                        <p className="text-xs font-semibold text-[#FAF5EE]">{c.label}</p>
                        <p className="text-[11px] text-[#C4B29E] mt-1 leading-normal">{c.detail}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Image Label strip */}
              <div className="p-4 sm:p-5 bg-[#1F120D] border-t border-[#382017] flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A89481] block">
                    Product Specifications
                  </span>
                  <span className="text-sm font-semibold text-[#FAF5EE]">
                    Dark Chocolate + Natural Energy Blend
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#E58B24] block">40g Net Wt.</span>
                  <span className="text-[11px] text-[#A89481]">Single Serving</span>
                </div>
              </div>

            </div>

            {/* Quiet caption */}
            <p className="text-center text-xs text-[#8C7665] mt-3">
              Crafted in small batches with ethically sourced 72% heirloom cocoa.
            </p>
          </div>

        </div>

        {/* 4-Pillars Strip: Direct faithful rendering of top-right 4 icons from image */}
        <div id="benefits" className="mt-14 lg:mt-20 pt-10 border-t border-[#2B1913]">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E58B24]">
              Clean Stimulation Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] mt-1">
              Why Mindful Achievers Choose Wakebar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#1C110D] border border-[#331E17] hover:border-[#E58B24]/40 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#2A1812] border border-[#43261C] flex items-center justify-center text-[#E58B24] mb-4 group-hover:bg-[#E58B24] group-hover:text-[#1A0F0C] transition-colors">
                    <PillarIcon type={pillar.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#FAF5EE]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#BDB0A2] mt-2 leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#291711] text-[11px] text-[#8C7665] flex items-center gap-1">
                  <span>Verified Formula</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
