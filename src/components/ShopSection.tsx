import React, { useState } from 'react';
import { ProductBundle } from '../types';
import { BUNDLES } from '../data/wakebarData';
import { Check, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SafeImage } from './SafeImage';
import { createWhatsAppSingleOrderUrl, formatPKR } from '../utils/whatsapp';

interface ShopSectionProps {
  onAddToCart: (bundle: ProductBundle, isSubscription: boolean) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ onAddToCart }) => {
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscription'>('onetime');
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (bundle: ProductBundle) => {
    onAddToCart(bundle, purchaseType === 'subscription');
    setAddedId(bundle.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <section id="shop" className="py-20 lg:py-28 bg-[#150F0D] border-b border-[#2C1A14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E58B24]">
            Direct From The Chocolaterie
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF5EE] mt-2 tracking-tight">
            Choose Your Focus Bundle
          </h2>
          <p className="text-base sm:text-lg text-[#C4B29E] mt-3 font-light">
            Individually packaged 40g bars sealed for peak roasted crunch and cacao aroma. Dispatched cold across Pakistan.
          </p>

          {/* One-time vs Subscribe Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-[#22130E] border border-[#3C2218] rounded-xl">
            <button
              onClick={() => setPurchaseType('onetime')}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                purchaseType === 'onetime'
                  ? 'bg-[#FAF5EE] text-[#1A0F0C] shadow'
                  : 'text-[#C4B29E] hover:text-[#FAF5EE]'
              }`}
            >
              One-Time Order
            </button>
            <button
              onClick={() => setPurchaseType('subscription')}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                purchaseType === 'subscription'
                  ? 'bg-[#E58B24] text-[#1A0F0C] shadow'
                  : 'text-[#C4B29E] hover:text-[#FAF5EE]'
              }`}
            >
              <span>Subscribe & Save</span>
              <span className="font-mono text-[10px] bg-[#1A0F0C] text-[#E58B24] px-1.5 py-0.2 rounded font-bold">
                -15%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {BUNDLES.map((bundle) => {
            const rawPrice = bundle.price;
            const finalPrice = purchaseType === 'subscription' ? Math.round(rawPrice * 0.85) : rawPrice;
            const pricePerBar = Math.round(finalPrice / bundle.barCount);
            const isAdded = addedId === bundle.id;

            return (
              <div
                key={bundle.id}
                className={`relative rounded-2xl bg-[#1C110D] border flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] ${
                  bundle.popular
                    ? 'border-[#E58B24] shadow-xl shadow-[#E58B24]/10 ring-1 ring-[#E58B24]/30'
                    : 'border-[#382017] hover:border-[#4F2D20]'
                }`}
              >
                {/* Popular / Best value badge */}
                {bundle.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#E58B24] text-[#1A0F0C]">
                      {bundle.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Product Card Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-[#170E0B]">
                    <SafeImage
                      src={bundle.image}
                      fallbackSrc={bundle.fallbackImage}
                      alt={bundle.name}
                      captionTitle={bundle.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C110D] via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs uppercase tracking-wider text-[#A89481]">
                        {bundle.weight}
                      </span>
                      <span className="text-xs font-mono text-[#E58B24]">
                        Rs. {pricePerBar.toLocaleString('en-PK')} / bar
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#FAF5EE]">
                      {bundle.name}
                    </h3>

                    <p className="text-xs text-[#C4B29E] mt-1 font-medium">
                      {bundle.subtitle}
                    </p>

                    <p className="text-xs text-[#A89481] mt-3 leading-relaxed">
                      {bundle.description}
                    </p>

                    {/* Features bullet list */}
                    <ul className="mt-5 space-y-2 border-t border-[#2D1A14] pt-4">
                      {bundle.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#D4C3B2]">
                          <Check className="w-3.5 h-3.5 text-[#E58B24] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Purchase Bar */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-[#8C7665] block">
                        {purchaseType === 'subscription' ? 'Auto-delivered monthly' : 'Total Price (COD Available)'}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FAF5EE] tabular-nums">
                          {formatPKR(finalPrice)}
                        </span>
                        {bundle.originalPrice && purchaseType === 'onetime' && (
                          <span className="text-xs text-[#8C7665] line-through font-mono">
                            {formatPKR(bundle.originalPrice)}
                          </span>
                        )}
                        {purchaseType === 'subscription' && (
                          <span className="text-xs text-[#8C7665] line-through font-mono">
                            {formatPKR(rawPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleAdd(bundle)}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : bundle.popular
                          ? 'bg-[#E58B24] hover:bg-[#F59E0B] text-[#1A0F0C]'
                          : 'bg-[#2B1812] hover:bg-[#382018] text-[#FAF5EE] border border-[#48281D]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>
                            {purchaseType === 'subscription' ? 'Subscribe Now' : 'Add to Cart'}
                          </span>
                        </>
                      )}
                    </button>

                    <a
                      href={createWhatsAppSingleOrderUrl(bundle, purchaseType === 'subscription')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/50 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      title="Quick Order on WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Trust & Guarantee Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#1B100C] border border-[#331C15] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#C4B29E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A1711] border border-[#43251B] flex items-center justify-center text-[#E58B24] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-[#FAF5EE] block">30-Day Taste & Focus Guarantee</span>
              <span className="text-[#8C7665]">Feel the clarity or 100% of your money back.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A1711] border border-[#43251B] flex items-center justify-center text-[#E58B24] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-[#FAF5EE] block">Insulated Thermal Shipping</span>
              <span className="text-[#8C7665]">Never arrives melted. Guaranteed crisp snap.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A1711] border border-[#43251B] flex items-center justify-center text-[#E58B24] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-[#FAF5EE] block">Zero-Lockin Subscriptions</span>
              <span className="text-[#8C7665]">Skip, pause, or cancel anytime with 1 click.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
