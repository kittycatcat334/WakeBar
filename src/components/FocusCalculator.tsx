import React, { useState } from 'react';
import { ProductBundle } from '../types';
import { BUNDLES } from '../data/wakebarData';
import { Sparkles, Clock, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppSingleOrderUrl, formatPKR } from '../utils/whatsapp';

interface FocusCalculatorProps {
  onAddToCart: (bundle: ProductBundle, isSub: boolean) => void;
}

export const FocusCalculator: React.FC<FocusCalculatorProps> = ({ onAddToCart }) => {
  const [role, setRole] = useState<'creative' | 'code' | 'student' | 'executive'>('creative');
  const [caffeinePain, setCaffeinePain] = useState<'no_coffee' | 'jitters' | 'slump' | 'stomach'>('no_coffee');
  const [hoursNeeded, setHoursNeeded] = useState<number>(6);

  const getRecommendation = () => {
    let protocol = '1 bar split across your peak hours';
    let timing = '1/2 bar at 9:30 AM with water, 1/2 bar at 1:45 PM for afternoon flow.';
    let bundle = BUNDLES[1]; // default 12-pack

    if (hoursNeeded >= 8) {
      protocol = '1.5 bars (60g total)';
      timing = 'Morning half-bar starter, followed by a full bar pre-afternoon sprint.';
      bundle = BUNDLES[2]; // 24-pack
    } else if (hoursNeeded <= 4) {
      protocol = '1 single bar (40g)';
      timing = 'Enjoy 20 minutes before your main deep work session.';
      bundle = BUNDLES[0]; // 6-pack
    }

    const painRelief = {
      no_coffee: 'Gives you the clean motivation of a premium morning drink without touching coffee beans or bitter teas.',
      jitters: 'The 100mg L-theanine and cacao theobromine eliminate physical tremors and calm heart palpitations.',
      slump: 'The healthy almond and pumpkin seed fats flatten your glucose response, extinguishing the 3 PM brain fog.',
      stomach: 'Gentle whole-food cocoa butter replaces caustic high-acid coffee with zero gut distress.',
    }[caffeinePain];

    return { protocol, timing, bundle, painRelief };
  };

  const recommendation = getRecommendation();

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#180F0C] border-b border-[#2C1A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E58B24]">
            Personalized Focus Protocol
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF5EE] mt-2 tracking-tight">
            Find Your Daily Cadence
          </h2>
          <p className="text-base sm:text-lg text-[#C4B29E] mt-3 font-light">
            Tell us about your work style and energy sensitivity to calculate your optimal Wakebar routine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#1F120D] border border-[#3A2218] rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Work Routine */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#FAF5EE] block mb-3">
                1. What is your daily focus focus style?
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'creative', label: 'Design & Creative Writing' },
                  { id: 'code', label: 'Software & Engineering' },
                  { id: 'student', label: 'Exams & Academics' },
                  { id: 'executive', label: 'Business & Leadership' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRole(item.id as any)}
                    className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      role === item.id
                        ? 'bg-[#E58B24] text-[#1A0F0C] border-[#E58B24] font-semibold shadow-md'
                        : 'bg-[#180D09] text-[#C4B29E] border-[#361E16] hover:border-[#522E21] hover:text-[#FAF5EE]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: What frustrates you most? */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#FAF5EE] block mb-3">
                2. What is your primary energy challenge?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'no_coffee', label: 'Don\'t like tea or coffee taste' },
                  { id: 'jitters', label: 'Coffee triggers jitters / anxiety' },
                  { id: 'slump', label: 'Brutal 2:30 PM afternoon slump' },
                  { id: 'stomach', label: 'Coffee causes acid stomach burn' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCaffeinePain(item.id as any)}
                    className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      caffeinePain === item.id
                        ? 'bg-[#E58B24] text-[#1A0F0C] border-[#E58B24] font-semibold shadow-md'
                        : 'bg-[#180D09] text-[#C4B29E] border-[#361E16] hover:border-[#522E21] hover:text-[#FAF5EE]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Hours of focus */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#FAF5EE]">
                  3. Hours of deep focus required per day
                </label>
                <span className="font-mono text-sm font-bold text-[#E58B24]">
                  {hoursNeeded} hours
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={hoursNeeded}
                onChange={(e) => setHoursNeeded(Number(e.target.value))}
                className="w-full h-2 bg-[#2E1810] rounded-lg appearance-none cursor-pointer accent-[#E58B24]"
              />
              <div className="flex justify-between text-[11px] text-[#8C7665] mt-1 font-mono">
                <span>3h (Sprint)</span>
                <span>6h (Standard)</span>
                <span>10h (Intensive)</span>
              </div>
            </div>

          </div>

          {/* Outcome Recommendation Box */}
          <div className="lg:col-span-5 bg-[#251510] border border-[#E58B24]/40 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E58B24]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#381F16] border border-[#542F22] text-xs font-semibold text-[#E58B24]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Protocol</span>
            </div>

            <div>
              <span className="text-xs text-[#A89481] uppercase tracking-wider block">Recommended Daily Dose</span>
              <h3 className="font-serif text-2xl font-bold text-[#FAF5EE] mt-0.5">
                {recommendation.protocol}
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1A0E0B] border border-[#3A2218] text-xs space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E58B24] shrink-0 mt-0.5" />
                <span className="text-[#D4C3B2]">{recommendation.timing}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-[#291711]">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[#A89481]">{recommendation.painRelief}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#3B2218] space-y-2">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#A89481]">Suggested Focus Pack:</span>
                <span className="font-serif font-bold text-[#FAF5EE]">{recommendation.bundle.name}</span>
              </div>

              <button
                onClick={() => onAddToCart(recommendation.bundle, false)}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#E58B24] hover:bg-[#F59E0B] text-[#1A0F0C] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Add to Cart ({formatPKR(recommendation.bundle.price)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={createWhatsAppSingleOrderUrl(recommendation.bundle, false)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/50 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Order via WhatsApp (+92 314-5160556)</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
