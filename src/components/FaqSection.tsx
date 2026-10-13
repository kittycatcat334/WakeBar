import React, { useState } from 'react';
import { FAQS } from '../data/wakebarData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#180F0C] border-b border-[#2C1A14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E58B24]">
            Frequently Asked
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] mt-2 tracking-tight">
            Common Questions
          </h2>
          <p className="text-sm sm:text-base text-[#C4B29E] mt-3 font-light">
            Everything you need to know about our functional cacao formulation and clean energy science.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#1D110D] border border-[#382017] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#FAF5EE]">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-md transition-transform duration-200 text-[#E58B24] ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-[#291710] text-xs sm:text-sm text-[#C4B29E] leading-relaxed">
                    <p>{faq.answer}</p>
                    <div className="mt-3 text-[11px] font-mono text-[#8C7665]">
                      Category: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
