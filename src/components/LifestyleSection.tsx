import React from 'react';
import { ASSETS } from '../data/wakebarData';
import { Sparkles, Sun, Clock3, Focus } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const LifestyleSection: React.FC = () => {
  const rituals = [
    {
      icon: Sun,
      time: '08:30 AM',
      title: 'The Coffee-Free Morning Ritual',
      description: 'Start your morning with pure antioxidant-rich 72% dark cocoa. No brewing, no bitter acidity, and no shaky breakfast jitters.',
    },
    {
      icon: Clock3,
      time: '02:15 PM',
      title: 'The Midday Slump Slayer',
      description: 'When afternoon lethargy hits your desk, snap half a bar. Wholesome pumpkin seeds and almonds sustain your energy straight through the finish line.',
    },
    {
      icon: Focus,
      time: '04:00 PM',
      title: 'The Deep Flow Sprint',
      description: 'L-Theanine stimulates alpha-wave brain frequencies, keeping you calm and absorbed in complex problem solving without racing anxiety.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#180F0C] border-b border-[#2C1A14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with user's catchphrase */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E58B24]">
            Mindful Integration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF5EE] mt-2 tracking-tight">
            Same you, <span className="italic font-normal text-[#E58B24]">just more focused.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#C4B29E] mt-3 font-light">
            You don't need artificial energy shots or jittery caffeine overload to perform at your peak.
          </p>
        </div>

        {/* Cinematic Lifestyle Image & Rituals Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* High Resolution Lifestyle Photography */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#3E241A] shadow-2xl group aspect-[16/9] lg:aspect-[16/10] bg-[#140C0A]">
              <SafeImage
                src={ASSETS.lifestyle}
                fallbackSrc={ASSETS.lifestyleFallback}
                alt="Mindful creator enjoying Wakebar focus chocolate at a sunlit wooden workspace"
                captionTitle="Mindful Focus Rituals"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-[#E58B24] uppercase tracking-wider block mb-1">
                  Daily Habit · Flow State
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#FAF5EE]">
                  “Small Bar. Big Difference.”
                </p>
                <p className="text-xs text-[#C4B29E] mt-1 max-w-md">
                  Clean nutrition engineered for modern creators, coders, students, and thinkers who demand steady mental stamina.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Everyday Rituals List */}
          <div className="lg:col-span-5 space-y-4">
            {rituals.map((r, idx) => {
              const Icon = r.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#1F120D] border border-[#382017] hover:border-[#522E21] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#2D1A13] border border-[#44271D] flex items-center justify-center text-[#E58B24]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#FAF5EE]">
                        {r.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#E58B24] bg-[#2E1810] px-2 py-0.5 rounded border border-[#432418]">
                      {r.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#BDB0A2] pl-10 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
