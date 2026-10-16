import React, { useState } from 'react';
import { X, CheckCircle, Package, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { SunGlyph } from './WakebarLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { formatPKR, getWhatsAppNumber } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  finalTotal: number;
  promoCode: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  subtotal,
  discount,
  shipping,
  finalTotal,
  promoCode,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    name: 'Zaid Khan',
    phone: '0300 1234567',
    email: 'zaid.focus@gmail.com',
    address: 'House 24-B, Street 12, Sector F-7/2',
    city: 'Islamabad',
    province: 'Federal',
    postalCode: '44000',
    paymentMethod: 'cod',
  });
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generated = `WKB-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generated);
      setIsSubmitting(false);
      setStep('confirmed');
      onOrderCompleted();
    }, 800);
  };

  const handleWhatsAppBooking = () => {
    const waNumber = getWhatsAppNumber();
    const text = `*New Wakebar Order (Checkout)* 🍫\n` +
      `--------------------------\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*City:* ${formData.city}\n` +
      `*Address:* ${formData.address}\n` +
      `*Subtotal:* ${formatPKR(subtotal)}\n` +
      (discount > 0 ? `*Discount (${promoCode || 'FOCUS15'}):* -${formatPKR(discount)}\n` : '') +
      `*Shipping:* ${shipping === 0 ? 'FREE' : formatPKR(shipping)}\n` +
      `*Total Due:* ${formatPKR(finalTotal)}\n` +
      `*Payment:* Cash on Delivery (COD)\n` +
      `--------------------------\n` +
      `Please confirm my order dispatch!`;

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
    handleSubmit({ preventDefault: () => {} } as any);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={step === 'confirmed' ? onClose : undefined}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div className="inline-block w-full max-w-lg my-8 text-left align-middle transition-all transform bg-[#180F0C] border border-[#3E2319] rounded-2xl shadow-2xl relative overflow-hidden z-10">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-[#8C7665] hover:text-[#FAF5EE] p-1.5 rounded-lg z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'form' ? (
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#E58B24] uppercase tracking-wider">
                <SunGlyph className="w-4 h-2 text-[#E58B24]" />
                <span>Express Focus Checkout (Pakistan)</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#FAF5EE]">
                Delivery & Payment Details
              </h2>
              <p className="text-xs text-[#A89481] mt-1">
                Cash on Delivery (COD) available nationwide with temperature-controlled ice packaging.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[#C4B29E] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#130B09] border border-[#361E16] text-xs text-[#FAF5EE] focus:border-[#E58B24] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#C4B29E] block mb-1">
                      WhatsApp / Mobile No.
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#130B09] border border-[#361E16] text-xs text-[#FAF5EE] focus:border-[#E58B24] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[#C4B29E] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#130B09] border border-[#361E16] text-xs text-[#FAF5EE] focus:border-[#E58B24] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#C4B29E] block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#130B09] border border-[#361E16] text-xs text-[#FAF5EE] focus:border-[#E58B24] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#C4B29E] block mb-1">
                    Complete Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130B09] border border-[#361E16] text-xs text-[#FAF5EE] focus:border-[#E58B24] focus:outline-none"
                  />
                </div>

                {/* Summary Box in PKR */}
                <div className="p-4 rounded-xl bg-[#130B09] border border-[#2D1912] space-y-1.5 text-xs text-[#A89481]">
                  <div className="flex justify-between">
                    <span>Order Subtotal:</span>
                    <span className="font-mono text-[#FAF5EE]">{formatPKR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({promoCode}):</span>
                      <span className="font-mono">-{formatPKR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Cold-Pouch Shipping:</span>
                    <span className="font-mono text-[#FAF5EE]">
                      {shipping === 0 ? 'FREE (Over Rs. 3,500)' : formatPKR(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#FAF5EE] pt-2 border-t border-[#291710]">
                    <span>Total Due (Pay on Delivery):</span>
                    <span className="font-mono text-base text-[#E58B24]">{formatPKR(finalTotal)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Confirm & Book via WhatsApp</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#E58B24] hover:bg-[#F59E0B] text-[#1A0F0C] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Fresh Batch...</span>
                    ) : (
                      <>
                        <span>Place Order (Cash on Delivery) · {formatPKR(finalTotal)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Confirmed Order State */
            <div className="p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#E58B24]">
                  Order Confirmed
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FAF5EE] mt-1">
                  Your Focus Bars Are On The Way!
                </h3>
                <p className="text-xs text-[#A89481] mt-1">
                  Order <span className="font-mono text-[#FAF5EE] font-bold">{orderId}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#140C0A] border border-[#2D1812] text-left text-xs space-y-2 text-[#C4B29E]">
                <div className="flex items-center gap-2 text-[#FAF5EE] font-semibold">
                  <Package className="w-4 h-4 text-[#E58B24]" />
                  <span>Preparing Cold-Pouch Dispatch</span>
                </div>
                <p className="text-[11px] text-[#8C7665]">
                  We sent receipt & courier tracking details to <strong className="text-[#FAF5EE]">{formData.email}</strong>. Estimated doorstep arrival in 2–3 business days.
                </p>
                <div className="pt-2 border-t border-[#291610] text-[11px] text-[#E58B24] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Protected by the 30-Day Taste & Steady Focus Guarantee</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#2B1812] hover:bg-[#382018] text-[#FAF5EE] border border-[#48281D] transition-colors"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
