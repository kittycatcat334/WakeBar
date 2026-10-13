import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { WakebarLogo } from './WakebarLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToShop: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onScrollToShop }) => {
  const [showPromo, setShowPromo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#180F0C]/90 backdrop-blur-md border-b border-[#3D251C]">
      {/* Promotional Strip */}
      {showPromo && (
        <div className="relative bg-[#26150F] text-[#E0CDBB] border-b border-[#3D251C] text-xs py-1.5 px-4 text-center">
          <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
            <span className="font-medium text-[#FAF5EE]">Fuel Your Focus:</span>
            <span>Free thermal shipping on orders $35+ · Code</span>
            <span className="font-mono bg-[#381F16] px-1.5 py-0.5 rounded text-[#E58B24] font-semibold text-[11px]">
              FOCUS15
            </span>
            <span className="hidden sm:inline">for 15% off</span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7665] hover:text-[#FAF5EE] p-1"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single element brand wordmark */}
        <a href="#" className="flex items-center gap-2 whitespace-nowrap shrink-0 group">
          <WakebarLogo size="sm" light={true} />
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#C4B29E]">
          <a
            href="#benefits"
            className="hover:text-[#FAF5EE] transition-colors whitespace-nowrap shrink-0"
          >
            Benefits
          </a>
          <a
            href="#whats-inside"
            className="hover:text-[#FAF5EE] transition-colors whitespace-nowrap shrink-0"
          >
            What's Inside
          </a>
          <a
            href="#comparison"
            className="hover:text-[#FAF5EE] transition-colors whitespace-nowrap shrink-0"
          >
            Why Wakebar
          </a>
          <a
            href="#calculator"
            className="hover:text-[#FAF5EE] transition-colors whitespace-nowrap shrink-0"
          >
            Routine Finder
          </a>
          <a
            href="#shop"
            className="hover:text-[#FAF5EE] transition-colors whitespace-nowrap shrink-0"
          >
            Bundles
          </a>
          <a
            href="#reviews"
            className="hover:text-[#FAF5EE] transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onScrollToShop}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1A0F0C] bg-[#E58B24] hover:bg-[#F59E0B] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-[#E0CDBB] hover:text-[#FAF5EE] bg-[#2A1813] hover:bg-[#382019] rounded-lg border border-[#44281E] transition-colors flex items-center gap-2 shrink-0"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#E58B24]" />
            <span className="text-xs font-mono font-medium text-[#FAF5EE] tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#C4B29E] hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1D110D] border-b border-[#3D251C] px-6 py-5 space-y-4">
          <nav className="flex flex-col gap-3.5 text-sm font-medium text-[#C4B29E]">
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              Benefits
            </a>
            <a
              href="#whats-inside"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              What's Inside
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              Why Wakebar vs Coffee
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              Daily Routine Finder
            </a>
            <a
              href="#shop"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              Shop Bundles
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              Customer Reviews
            </a>
          </nav>
          <div className="pt-3 border-t border-[#331C14]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToShop();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#1A0F0C] bg-[#E58B24] rounded-lg"
            >
              Explore Bundles
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
