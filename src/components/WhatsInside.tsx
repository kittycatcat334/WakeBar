import React, { useState } from 'react';
import { INGREDIENTS, ASSETS } from '../data/wakebarData';
import { PillarIcon } from './BrandPillarIcons';
import { Info, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const WhatsInside: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>(INGREDIENTS[0].id);
  const [showNutritionPanel, setShowNutritionPanel] = useState<boolean>(false);

  const activeItem = INGREDIENTS.find((i) => i.id === selectedIngredient) || INGREDIENTS[0];

  return (
    <section id="whats-inside" className="py-20 lg:py-28 bg-[#180F0C] border-b border-[#2B1812] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with exact wording from image */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-[#E58B24]/40" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E58B24]">
              Clean Formulation
            </span>
            <span className="h-[1px] w-8 bg-[#E58B24]/40" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF5EE] tracking-tight">
            WHAT’S INSIDE?
          </h2>

          <p className="text-base sm:text-lg text-[#C4B29E] mt-3 font-light">
            Every bar is crafted with five functional keystones designed to fuel sustained cognitive output without nervous crashes.
          </p>

          <div className="mt-4 inline-block text-xs font-serif italic text-[#E58B24] tracking-wide">
            Wakebar — Fuel Your Focus
          </div>
        </div>

        {/* 5-Column Ingredient Showcase (Faithful to the 5 icons in the user's graphic) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-12">
          {INGREDIENTS.map((item) => {
            const isSelected = item.id === selectedIngredient;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIngredient(item.id)}
                className={`text-left p-5 rounded-xl transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2A1812] border-[#E58B24] shadow-lg shadow-[#E58B24]/5 translate-y-[-2px]'
                    : 'bg-[#1D110D] border-[#382017] hover:border-[#522E21] hover:bg-[#22140F]'
                }`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                      isSelected
                        ? 'bg-[#E58B24] text-[#1A0F0C]'
                        : 'bg-[#291610] text-[#E58B24] border border-[#3E2218]'
                    }`}
                  >
                    <PillarIcon type={item.iconName} className="w-5 h-5" />
                  </div>
                  
                  <h3 className="font-serif text-sm font-bold text-[#FAF5EE] leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-[#E58B24] mt-1.5 font-medium leading-snug">
                    {item.purpose}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#361E16] flex items-center justify-between text-[11px] text-[#A89481]">
                  <span>{item.amount}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-[#E58B24] font-semibold' : 'text-[#8C7665]'}`}>
                    {isSelected ? 'Viewing' : 'Details →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive & Culinary Flatlay Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#20120D] rounded-2xl border border-[#3A2118] p-6 sm:p-8 overflow-hidden">
          
          {/* Active Ingredient Explainer */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2E1911] border border-[#48281D] text-xs font-mono text-[#E58B24]">
              <span>Active Key #{INGREDIENTS.findIndex((i) => i.id === selectedIngredient) + 1} of 5</span>
              <span>·</span>
              <span>{activeItem.amount}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE]">
              {activeItem.title}
            </h3>

            <p className="text-base text-[#FAF5EE]/90 italic font-serif">
              “{activeItem.purpose}”
            </p>

            <p className="text-sm sm:text-base text-[#D4C3B2] leading-relaxed">
              {activeItem.detail}
            </p>

            <div className="p-4 rounded-xl bg-[#170E0B] border border-[#331B13] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#E58B24] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-[#FAF5EE] uppercase tracking-wider block">
                  Physiological Synergy
                </span>
                <p className="text-xs text-[#A89481] mt-0.5 leading-relaxed">
                  {activeItem.clinicalNote}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setShowNutritionPanel(!showNutritionPanel)}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#E58B24] hover:text-[#F59E0B] transition-colors"
              >
                <span>{showNutritionPanel ? 'Hide Nutrition Label' : 'View Full Nutrition Facts & Lab Sheet'}</span>
                {showNutritionPanel ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Culinary Flatlay Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-[#3E241A] bg-[#140C0A] aspect-[4/3] group">
              <SafeImage
                src={ASSETS.ingredients}
                fallbackSrc={ASSETS.ingredientsFallback}
                alt="Artisanal flatlay of raw cacao chunks, green tea leaves, pumpkin seeds, and almonds"
                captionTitle="Clean Functional Ingredients"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FAF5EE]">
                <span className="font-serif">Whole Food Botanical Transparency</span>
                <span className="text-[11px] text-[#A89481]">Non-GMO · Fair Trade</span>
              </div>
            </div>
          </div>

        </div>

        {/* Expandable Nutrition Facts Panel */}
        {showNutritionPanel && (
          <div className="mt-8 p-6 sm:p-8 bg-[#170D09] border border-[#3D2218] rounded-2xl max-w-3xl mx-auto animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="border-b-4 border-[#FAF5EE] pb-2 mb-4 flex justify-between items-baseline">
              <div>
                <h4 className="font-serif text-2xl font-black text-[#FAF5EE]">Nutrition Facts</h4>
                <p className="text-xs text-[#A89481]">1 serving per container (40g bar)</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#E58B24]">Serving Size: 1 bar (40g)</span>
              </div>
            </div>

            <div className="border-b-2 border-[#FAF5EE] py-2 flex justify-between items-baseline">
              <span className="font-bold text-lg text-[#FAF5EE]">Calories</span>
              <span className="font-mono text-2xl font-extrabold text-[#FAF5EE]">195</span>
            </div>

            <div className="divide-y divide-[#361E16] text-xs text-[#C4B29E]">
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-[#FAF5EE]">Total Fat 14g</span>
                <span className="font-mono">18% DV</span>
              </div>
              <div className="py-1.5 pl-4 flex justify-between text-[#A89481]">
                <span>Saturated Fat 6g (from Cacao Butter)</span>
                <span className="font-mono">30% DV</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-[#FAF5EE]">Total Carbohydrate 10g</span>
                <span className="font-mono">4% DV</span>
              </div>
              <div className="py-1.5 pl-4 flex justify-between text-[#A89481]">
                <span>Dietary Fiber 5g</span>
                <span className="font-mono">18% DV</span>
              </div>
              <div className="py-1.5 pl-4 flex justify-between text-[#A89481]">
                <span>Total Sugars 1.8g (Naturally Occurring)</span>
                <span className="font-mono">—</span>
              </div>
              <div className="py-1.5 pl-4 flex justify-between font-semibold text-[#E58B24]">
                <span>Includes 0g Added Sugars</span>
                <span className="font-mono">0% DV</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-[#FAF5EE]">Net Impact Carbs</span>
                <span className="font-mono font-bold text-[#E58B24]">5g</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-[#FAF5EE]">Protein 4.5g</span>
                <span className="font-mono">9% DV</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-[#FAF5EE]">Vitamin B6 (Pyridoxine)</span>
                <span className="font-mono font-bold text-[#E58B24]">100% DV</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-[#FAF5EE]">Vitamin B12 (Methylcobalamin)</span>
                <span className="font-mono font-bold text-[#E58B24]">100% DV</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-[#FAF5EE]">Botanical L-Theanine</span>
                <span className="font-mono font-bold text-[#E58B24]">100 mg</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-[#FAF5EE]">Natural Theobromine</span>
                <span className="font-mono font-bold text-[#E58B24]">210 mg</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8C7665] mt-4 leading-relaxed">
              Ingredients: Heirloom 72% Dark Cacao (Organic Cocoa Mass, Organic Cocoa Butter), Dry Roasted California Almonds, Sprouted Pumpkin Seeds, Cacao Nibs, Chia Seeds, L-Theanine (from Camellia sinensis), Vitamin B Complex (B6, B9, B12), Monk Fruit Extract.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
