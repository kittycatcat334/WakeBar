import React, { useState } from 'react';
import { REVIEWS } from '../data/wakebarData';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'Non-Coffee Drinker', label: 'Non-Coffee Drinkers' },
    { id: 'Developer / Creative', label: 'Developers & Creatives' },
    { id: 'Fitness / Active', label: 'Active & Fitness' },
    { id: 'Student / Academic', label: 'Students' },
  ];

  const filteredReviews = filter === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.category === filter);

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#150F0D] border-b border-[#2C1A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Social Proof */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E58B24]">
            Real Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF5EE] mt-2 tracking-tight">
            Proof In Every Snap
          </h2>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex text-[#E58B24]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-serif font-bold text-sm text-[#FAF5EE]">4.9 out of 5</span>
            <span className="text-xs text-[#8C7665]">·</span>
            <span className="text-xs text-[#A89481]">Based on 1,240+ verified customer reviews</span>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-7 p-1 bg-[#1F110D] rounded-xl max-w-2xl mx-auto border border-[#382017]">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filter === c.id
                    ? 'bg-[#E58B24] text-[#1A0F0C] font-semibold shadow-sm'
                    : 'text-[#C4B29E] hover:text-[#FAF5EE]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#1C110D] border border-[#331D15] flex flex-col justify-between hover:border-[#4B291D] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#E58B24]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Purchase</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#FAF5EE] mb-2">
                  “{rev.title}”
                </h3>

                <p className="text-xs sm:text-sm text-[#C4B29E] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-[#291710] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-[#FAF5EE] block">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-[#8C7665]">
                    {rev.role}
                  </span>
                </div>
                <span className="text-[11px] text-[#6E5948]">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
