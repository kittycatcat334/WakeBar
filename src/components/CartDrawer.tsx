import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SafeImage } from './SafeImage';
import { createWhatsAppCartOrderUrl, formatPKR } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (subtotal: number, discount: number, shipping: number, finalTotal: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => {
    const unitPrice = item.isSubscription
      ? Math.round(item.bundle.price * 0.85)
      : item.bundle.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountAmount = appliedPromo === 'FOCUS15' ? Math.round(rawSubtotal * 0.15) : 0;
  const freeShippingThreshold = 3500; // Rs. 3,500 free thermal shipping threshold
  const shippingFee = rawSubtotal >= freeShippingThreshold || items.length === 0 ? 0 : 250;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'FOCUS15') {
      setAppliedPromo('FOCUS15');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "FOCUS15" for 15% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#180F0C] border-l border-[#3D2319] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#2C1912] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-bold text-[#FAF5EE]">Your Focus Bag</h2>
              <span className="text-xs font-mono bg-[#2C1912] text-[#E58B24] px-2 py-0.5 rounded">
                {items.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A89481] hover:text-[#FAF5EE] hover:bg-[#281610]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="p-4 bg-[#20120D] border-b border-[#2D1A14]">
            {amountToFreeShipping > 0 ? (
              <div>
                <p className="text-xs text-[#C4B29E]">
                  Add <span className="font-bold text-[#E58B24]">{formatPKR(amountToFreeShipping)}</span> more for Free Cold-Pouch Thermal Delivery!
                </p>
                <div className="w-full bg-[#140C0A] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#E58B24] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <span>✓ You unlocked Free Priority Thermal Delivery across Pakistan!</span>
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="font-serif text-lg text-[#C4B29E]">Your bag is currently empty.</p>
                <p className="text-xs text-[#8C7665]">
                  Start your steady focus journey with a 6-pack or 12-pack bundle.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#1A0F0C] bg-[#E58B24] rounded-lg"
                >
                  Explore Bundles
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const itemPrice = item.isSubscription
                  ? Math.round(item.bundle.price * 0.85)
                  : item.bundle.price;

                return (
                  <div
                    key={`${item.bundle.id}-${item.isSubscription}-${index}`}
                    className="p-3.5 rounded-xl bg-[#1E110D] border border-[#361E16] flex gap-3.5"
                  >
                    <SafeImage
                      src={item.bundle.image}
                      fallbackSrc={item.bundle.fallbackImage}
                      alt={item.bundle.name}
                      captionTitle={item.bundle.name}
                      className="w-16 h-16 rounded-lg object-cover bg-[#140C0A] border border-[#2E1912] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-[#FAF5EE] truncate">
                          {item.bundle.name}
                        </h4>
                        <span className="font-mono text-xs font-bold text-[#FAF5EE]">
                          {formatPKR(itemPrice * item.quantity)}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#A89481] mt-0.5">
                        {item.isSubscription ? (
                          <span className="text-[#E58B24] font-medium">Monthly Auto-Delivery (-15%)</span>
                        ) : (
                          <span>One-time purchase · {item.bundle.barCount} bars</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#381F17] rounded-md bg-[#160D0A]">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:text-[#FAF5EE] text-[#A89481]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono text-[#FAF5EE]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:text-[#FAF5EE] text-[#A89481]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-[#8C7665] hover:text-rose-400 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#2D1912] bg-[#1C100C] space-y-3.5">
              
              {/* Promo input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7665]" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. FOCUS15)"
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#140C0A] border border-[#361E16] text-xs text-[#FAF5EE] placeholder-[#6E5948] focus:border-[#E58B24] focus:outline-none uppercase"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#2B1812] hover:bg-[#382018] text-[#FAF5EE] border border-[#48281D]"
                >
                  Apply
                </button>
              </div>

              {promoError && (
                <p className="text-[11px] text-rose-400">{promoError}</p>
              )}

              {appliedPromo && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  ✓ Code {appliedPromo} applied (15% discount)
                </p>
              )}

              {/* Subtotal calculation */}
              <div className="space-y-1.5 text-xs text-[#A89481]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#FAF5EE]">{formatPKR(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (FOCUS15)</span>
                    <span className="font-mono">-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Thermal Shipping</span>
                  <span className="font-mono text-[#FAF5EE]">
                    {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#FAF5EE] pt-2 border-t border-[#311C15]">
                  <span>Total Payable</span>
                  <span className="font-mono text-base text-[#E58B24]">{formatPKR(finalTotal)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={createWhatsAppCartOrderUrl(items, rawSubtotal, discountAmount, shippingFee, finalTotal, appliedPromo || '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg"
                  title="Send cart order to WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Order via WhatsApp (+92 314-5160556)</span>
                </a>

                <button
                  onClick={() => onCheckout(rawSubtotal, discountAmount, shippingFee, finalTotal, appliedPromo || '')}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#E58B24] hover:bg-[#F59E0B] text-[#1A0F0C] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Checkout on Website</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center flex items-center justify-center gap-1.5 text-[11px] text-[#8C7665]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E58B24]" />
                <span>30-Day Taste & Focus Guarantee · Encrypted 256-bit checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
