import React, { useState } from 'react';
import { WakebarLogo } from './WakebarLogo';
import { Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#120A08] border-t border-[#2A1610] text-[#A89481] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-[#24130E]">
          
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-4">
            <WakebarLogo size="md" light={true} showTagline={true} />
            
            <p className="text-xs sm:text-sm text-[#C4B29E] leading-relaxed max-w-sm pt-2">
              For those who don’t like tea or coffee, but still want to stay active. Premium 72% dark chocolate infused with L-theanine, nuts & seeds, and vitamin B complex.
            </p>

            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-[#8C7665]">
              <span>72% Heirloom Cacao</span>
              <span>·</span>
              <span>100mg L-Theanine</span>
              <span>·</span>
              <span>0g Added Sugar</span>
              <span>·</span>
              <span>Dairy-Free & Vegan</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FAF5EE]">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#benefits" className="hover:text-[#FAF5EE] transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#whats-inside" className="hover:text-[#FAF5EE] transition-colors">
                  What's Inside
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-[#FAF5EE] transition-colors">
                  Why Wakebar
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#FAF5EE] transition-colors">
                  Routine Finder
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#FAF5EE] transition-colors">
                  Product Bundles
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Certifications */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FAF5EE]">Quality</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq" className="hover:text-[#FAF5EE] transition-colors">
                  Common Questions
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FAF5EE] transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <span className="text-[#8C7665]">30-Day Focus Guarantee</span>
              </li>
              <li>
                <span className="text-[#8C7665]">Direct Ethical Cocoa Trade</span>
              </li>
              <li>
                <span className="text-[#8C7665]">Small Batch Production</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FAF5EE]">Small-Batch Drops</h4>
            <p className="text-xs text-[#8C7665]">
              Join our dispatch list for early access to limited single-origin cacao harvests and seasonal bars.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#1F120E] border border-[#3E2319] text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You're on the priority harvest list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 rounded-lg bg-[#1A0E0B] border border-[#331C14] text-xs text-[#FAF5EE] placeholder-[#6E5948] focus:border-[#E58B24] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-[#E58B24] text-[#1A0F0C] hover:bg-[#F59E0B] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E5948]">
          <p>© {new Date().getFullYear()} Wakebar Co. All rights reserved. Fuel Your Focus.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#FAF5EE] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FAF5EE] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#FAF5EE] transition-colors">Nutrition Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
