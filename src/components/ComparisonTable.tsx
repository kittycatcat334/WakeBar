import React, { useState } from 'react';
import { Check, X, Sparkles, AlertCircle } from 'lucide-react';
import { SunGlyph } from './WakebarLogo';

export const ComparisonTable: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'table' | 'curve'>('table');

  const criteria = [
    {
      title: 'Target User Friendly',
      subtitle: 'Great for non-coffee / tea drinkers',
      wakebar: 'Yes · Pure gourmet dark chocolate',
      coffee: 'No · Heavy coffee taste required',
      energyDrink: 'No · Heavy artificial flavorings',
      highlight: true,
    },
    {
      title: 'Energy Release Speed',
      subtitle: 'How energy distributes in blood',
      wakebar: 'Steady 4-Hour Plateau (Theobromine + Fats)',
      coffee: 'Spikes in 25m, drops abruptly',
      energyDrink: 'Extreme spike, catastrophic drop',
      highlight: true,
    },
    {
      title: 'Jitters & Heart Rate',
      subtitle: 'Restlessness, anxiety, tremors',
      wakebar: 'Zero (100mg L-Theanine buffer)',
      coffee: 'Frequent palpitations & shaky hands',
      energyDrink: 'High risk of nervous tension',
      highlight: true,
    },
    {
      title: 'Stomach & Gut Impact',
      subtitle: 'Acidity, heartburn & GI upset',
      wakebar: 'Gentle on gut (neutral pH whole food)',
      coffee: 'High acid pH 4.8 (irritates stomach)',
      energyDrink: 'High acid & synthetic carbonation',
      highlight: false,
    },
    {
      title: 'Added Sugars',
      subtitle: 'Spike in insulin & 3PM crash',
      wakebar: '0g Added Sugar (pure monk fruit)',
      coffee: '0g–24g (syrups & creamers)',
      energyDrink: '25g–42g refined sugars',
      highlight: false,
    },
    {
      title: 'Portable Snack Format',
      subtitle: 'No spills, liquid cups or prep',
      wakebar: 'Pocket 40g snap bar ready anywhere',
      coffee: 'Requires brewing or hot mug',
      energyDrink: 'Bulky aluminum can',
      highlight: false,
    },
  ];

  return (
    <section id="comparison" className="py-20 lg:py-28 bg-[#150F0D] border-b border-[#2C1A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E58B24]">
            <SunGlyph className="w-4 h-2 text-[#E58B24]" />
            <span>The Coffee & Tea Alternative</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF5EE] tracking-tight">
            Designed For The Non-Coffee Thinker
          </h2>

          <p className="text-base sm:text-lg text-[#C4B29E] mt-3 font-light">
            Why drink something you dislike or suffer through jittery spikes? Wakebar gives you steady, dialed-in focus wrapped in delicious, single-origin chocolate.
          </p>

          {/* Toggle View */}
          <div className="inline-flex items-center p-1 bg-[#22140F] border border-[#3A2218] rounded-xl mt-6">
            <button
              onClick={() => setSelectedView('table')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedView === 'table'
                  ? 'bg-[#E58B24] text-[#1A0F0C] font-semibold'
                  : 'text-[#C4B29E] hover:text-[#FAF5EE]'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setSelectedView('curve')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedView === 'curve'
                  ? 'bg-[#E58B24] text-[#1A0F0C] font-semibold'
                  : 'text-[#C4B29E] hover:text-[#FAF5EE]'
              }`}
            >
              4-Hour Energy Curve Simulation
            </button>
          </div>
        </div>

        {selectedView === 'table' ? (
          /* Comparison Table */
          <div className="overflow-x-auto rounded-2xl border border-[#382017] bg-[#1C110D] shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#361D15] bg-[#22130E]">
                  <th className="py-5 px-6 text-sm font-serif font-bold text-[#FAF5EE] w-1/3">
                    Performance Metric
                  </th>
                  <th className="py-5 px-6 text-sm font-serif font-bold text-[#E58B24] bg-[#2C1912] border-x border-[#48281C] w-1/4">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Wakebar (40g)</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-serif font-semibold text-[#A89481] w-1/5">
                    Coffee / Espresso
                  </th>
                  <th className="py-5 px-6 text-sm font-serif font-semibold text-[#A89481] w-1/5">
                    Energy Drinks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B1812] text-xs sm:text-sm">
                {criteria.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-[#241510] transition-colors ${
                      item.highlight ? 'bg-[#1F120D]/60' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-[#FAF5EE]">{item.title}</div>
                      <div className="text-xs text-[#8C7665] mt-0.5">{item.subtitle}</div>
                    </td>
                    <td className="py-4 px-6 bg-[#26150F]/70 border-x border-[#3D2218] text-[#FAF5EE] font-medium">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#E58B24] shrink-0" />
                        <span>{item.wakebar}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#A89481]">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C7665] shrink-0" />
                        <span>{item.coffee}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#8C7665]">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-400/80 shrink-0" />
                        <span>{item.energyDrink}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Energy Curve Visualizer */
          <div className="p-6 sm:p-10 bg-[#1D110D] border border-[#3A2218] rounded-2xl max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF5EE]">
                Cognitive Alertness Over 5 Hours
              </h3>
              <p className="text-xs sm:text-sm text-[#A89481] mt-1">
                Notice how the combination of 72% cocoa theobromine + 100mg L-Theanine + healthy nut fats produces a smooth, prolonged focus plateau instead of the steep spike-and-crash of liquid caffeine.
              </p>
            </div>

            {/* SVG Visual Graph */}
            <div className="relative w-full aspect-[2/1] sm:aspect-[2.4/1] bg-[#140C0A] rounded-xl p-4 border border-[#331D16]">
              <svg viewBox="0 0 600 240" className="w-full h-full" fill="none">
                {/* Horizontal reference grid lines */}
                <line x1="50" y1="40" x2="570" y2="40" stroke="#291812" strokeDasharray="3 3" />
                <line x1="50" y1="100" x2="570" y2="100" stroke="#291812" strokeDasharray="3 3" />
                <line x1="50" y1="160" x2="570" y2="160" stroke="#291812" strokeDasharray="3 3" />
                <line x1="50" y1="200" x2="570" y2="200" stroke="#3D251C" />

                {/* Y Axis Labels */}
                <text x="15" y="45" fill="#8C7665" fontSize="10" fontFamily="sans-serif">Peak</text>
                <text x="15" y="105" fill="#8C7665" fontSize="10" fontFamily="sans-serif">Focus</text>
                <text x="15" y="165" fill="#8C7665" fontSize="10" fontFamily="sans-serif">Baseline</text>
                <text x="15" y="205" fill="#8C7665" fontSize="10" fontFamily="sans-serif">Crash</text>

                {/* X Axis Hours */}
                <text x="60" y="222" fill="#8C7665" fontSize="10" fontFamily="sans-serif">0h (Intake)</text>
                <text x="175" y="222" fill="#8C7665" fontSize="10" fontFamily="sans-serif">1h</text>
                <text x="295" y="222" fill="#8C7665" fontSize="10" fontFamily="sans-serif">2h</text>
                <text x="415" y="222" fill="#8C7665" fontSize="10" fontFamily="sans-serif">3h</text>
                <text x="535" y="222" fill="#8C7665" fontSize="10" fontFamily="sans-serif">4h+</text>

                {/* Energy Drink curve: steep spike, then crash below baseline */}
                <path
                  d="M 60 160 C 90 50, 130 30, 170 80 C 210 140, 240 210, 310 215 C 380 215, 480 200, 560 180"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  opacity="0.8"
                />

                {/* Coffee curve: sharp spike, tremors, crash at 2.5h */}
                <path
                  d="M 60 160 C 100 60, 140 45, 190 75 C 240 110, 280 195, 360 205 C 440 205, 500 180, 560 170"
                  stroke="#94A3B8"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />

                {/* Wakebar curve: gradual rise, steady high focus plateau for 4 hours, gentle taper */}
                <path
                  d="M 60 160 C 110 100, 150 80, 220 78 C 300 78, 380 82, 450 95 C 500 110, 540 140, 560 155"
                  stroke="#E58B24"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Focus zone highlighted */}
                <rect x="180" y="65" width="260" height="40" rx="6" fill="#E58B24" fillOpacity="0.1" stroke="#E58B24" strokeWidth="1" strokeDasharray="2 2" />
                <text x="235" y="90" fill="#E58B24" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  Wakebar "Flow State" Plateau
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1 bg-[#E58B24] rounded-full" />
                <span className="font-semibold text-[#FAF5EE]">Wakebar (Steady 4-hr Flow)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1 border-t-2 border-dashed border-[#94A3B8]" />
                <span className="text-[#A89481]">Standard Drip Coffee (Spike & Afternoon Slump)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1 border-t-2 border-dashed border-[#F43F5E]" />
                <span className="text-[#A89481]">Energy Drink (Jitter Surge & Deep Sugar Crash)</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
