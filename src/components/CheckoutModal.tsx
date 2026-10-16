import React, { useState } from 'react';
import { X, CheckCircle, Package, ShieldCheck, ArrowRight, Mail, Phone, ExternalLink, Settings, Clock, Check } from 'lucide-react';
import { SunGlyph } from './WakebarLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CartItem } from '../types';
import {
  formatPKR,
  getWhatsAppNumber,
  getWhatsAppDisplayNumber,
  getOwnerEmail,
  setOwnerEmail,
  createWebsiteOrderWhatsAppNotificationUrl,
  createOrderEmailMailtoUrl,
  saveOrderRecord,
  dispatchOrderToBackend,
  OrderRecord,
} from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
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
  items,
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
    phone: '0314 5160556',
    email: 'zaid.focus@gmail.com',
    address: 'House 24-B, Street 12, Sector F-7/2',
    city: 'Islamabad',
    province: 'Federal',
    postalCode: '44000',
    paymentMethod: 'cod',
  });
  const [autoOpenWhatsApp, setAutoOpenWhatsApp] = useState(true);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOwnerConfig, setShowOwnerConfig] = useState(false);
  const [ownerEmailInput, setOwnerEmailInput] = useState(getOwnerEmail());
  const [emailSavedFeedback, setEmailSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const orderItemsFormatted = items.map((i) => ({
    bundleName: i.bundle.name,
    barCount: i.bundle.barCount,
    quantity: i.quantity,
    price: i.isSubscription ? Math.round(i.bundle.price * 0.85) : i.bundle.price,
    isSubscription: i.isSubscription,
  }));

  const orderPayload = {
    orderId: orderId || `WKB-${Math.floor(100000 + Math.random() * 900000)}`,
    customer: {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
    },
    items: orderItemsFormatted,
    subtotal,
    discount,
    shipping,
    finalTotal,
    promoCode,
  };

  const handleOwnerEmailSave = (e: React.FormEvent) => {
    e.preventDefault();
    setOwnerEmail(ownerEmailInput);
    setEmailSavedFeedback(true);
    setTimeout(() => setEmailSavedFeedback(false), 2000);
  };

  const executeOrderSubmission = (channel: 'website' | 'whatsapp') => {
    const generatedId = `WKB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    const record: OrderRecord = {
      orderId: generatedId,
      timestamp: new Date().toISOString(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        paymentMethod: 'cod',
      },
      items: items.map((i) => ({
        bundleId: i.bundle.id,
        bundleName: i.bundle.name,
        barCount: i.bundle.barCount,
        quantity: i.quantity,
        price: i.isSubscription ? Math.round(i.bundle.price * 0.85) : i.bundle.price,
        isSubscription: i.isSubscription,
      })),
      subtotal,
      discount,
      shipping,
      finalTotal,
      promoCode,
      channel,
    };

    // 1. Save in local database
    saveOrderRecord(record);

    // 2. Dispatch to backend if available
    dispatchOrderToBackend({
      ...record,
      ownerWhatsApp: getWhatsAppNumber(),
      ownerEmail: getOwnerEmail(),
    });

    const fullOrderDetails = {
      orderId: generatedId,
      customer: formData,
      items: orderItemsFormatted,
      subtotal,
      discount,
      shipping,
      finalTotal,
      promoCode,
    };

    // 3. If WhatsApp channel or autoOpen is true, open WhatsApp directly
    if (channel === 'whatsapp' || autoOpenWhatsApp) {
      const waUrl = createWebsiteOrderWhatsAppNotificationUrl(fullOrderDetails);
      window.open(waUrl, '_blank');
    }

    setIsSubmitting(false);
    setStep('confirmed');
    onOrderCompleted();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      executeOrderSubmission('website');
    }, 700);
  };

  const handleWhatsAppBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      executeOrderSubmission('whatsapp');
    }, 400);
  };

  const currentOrderDetails = {
    orderId: orderId || 'WKB-ORDER',
    customer: formData,
    items: orderItemsFormatted,
    subtotal,
    discount,
    shipping,
    finalTotal,
    promoCode,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={step === 'confirmed' ? onClose : undefined}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
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
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E58B24] uppercase tracking-wider">
                  <SunGlyph className="w-4 h-2 text-[#E58B24]" />
                  <span>Express Focus Checkout (Pakistan)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOwnerConfig(!showOwnerConfig)}
                  className="text-[11px] text-[#A89481] hover:text-[#FAF5EE] flex items-center gap-1 transition-colors"
                  title="Configure store notification details"
                >
                  <Settings className="w-3 h-3" />
                  <span>Store Alert Info</span>
                </button>
              </div>

              {/* Collapsible Owner Notification Config */}
              {showOwnerConfig && (
                <div className="mb-4 p-3.5 rounded-xl bg-[#24140F] border border-[#48281E] text-xs text-[#C4B29E] space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#FAF5EE]">Store Owner Notification Routing</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Active</span>
                  </div>
                  <div className="text-[11px] text-[#A89481] space-y-1">
                    <p>
                      📱 <strong>Owner WhatsApp:</strong> <span className="text-emerald-400 font-mono">{getWhatsAppDisplayNumber()}</span>
                    </p>
                    <p>
                      ✉️ <strong>Current Owner Email:</strong> <span className="text-[#FAF5EE] font-mono">{getOwnerEmail()}</span>
                    </p>
                  </div>
                  <form onSubmit={handleOwnerEmailSave} className="flex gap-2 pt-1">
                    <input
                      type="email"
                      value={ownerEmailInput}
                      onChange={(e) => setOwnerEmailInput(e.target.value)}
                      placeholder="Enter store owner email"
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#140B09] border border-[#3A1F17] text-xs text-[#FAF5EE] focus:border-[#E58B24] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#E58B24] hover:bg-[#F59E0B] text-[#1A0F0C] font-semibold rounded-lg text-xs transition-colors shrink-0"
                    >
                      {emailSavedFeedback ? 'Saved!' : 'Save Email'}
                    </button>
                  </form>
                </div>
              )}

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

                {/* Items preview */}
                {items.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#140B09] border border-[#2B1812] text-xs space-y-1.5">
                    <span className="text-[#8C7665] font-medium block text-[11px] uppercase tracking-wider">
                      Selected Bundles:
                    </span>
                    {items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[#D6C5B6]">
                        <span>
                          {item.bundle.name} ({item.bundle.barCount} bars) × {item.quantity}
                        </span>
                        <span className="font-mono text-[#FAF5EE]">
                          {formatPKR(
                            (item.isSubscription ? Math.round(item.bundle.price * 0.85) : item.bundle.price) *
                              item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

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

                {/* Auto notify store owner toggle */}
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#C4B29E] bg-[#140C0A] p-3 rounded-xl border border-[#2D1912] hover:border-[#3D251C] transition-colors">
                  <input
                    type="checkbox"
                    checked={autoOpenWhatsApp}
                    onChange={(e) => setAutoOpenWhatsApp(e.target.checked)}
                    className="mt-0.5 accent-[#25D366] rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-medium text-[#FAF5EE] block">
                      Send order notification to store WhatsApp ({getWhatsAppDisplayNumber()})
                    </span>
                    <span className="text-[11px] text-[#8C7665]">
                      Opens WhatsApp chat with pre-filled order receipt so the dispatch team gets it instantly.
                    </span>
                  </div>
                </label>

                {/* Dual Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Order Directly via WhatsApp ({getWhatsAppDisplayNumber()})</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#E58B24] hover:bg-[#F59E0B] text-[#1A0F0C] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Placing Website Order...</span>
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
            <div className="p-6 sm:p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#E58B24]">
                  Order Successfully Placed
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FAF5EE] mt-1">
                  Your Fresh Wakebars Are Reserved!
                </h3>
                <p className="text-xs text-[#A89481] mt-1">
                  Order Reference: <span className="font-mono text-[#FAF5EE] font-bold text-sm">{orderId}</span>
                </p>
              </div>

              {/* Order Status Cards */}
              <div className="space-y-3 text-left">
                {/* Store WhatsApp Notification Alert */}
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-600/40 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-emerald-400">
                      <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Notification to Store</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase">
                      {getWhatsAppDisplayNumber()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#B0D4BF]">
                    Order sheet pre-filled for <strong>{getWhatsAppDisplayNumber()}</strong>. Click below if WhatsApp did not open automatically:
                  </p>
                  <a
                    href={createWebsiteOrderWhatsAppNotificationUrl(currentOrderDetails)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white transition-all shadow-md"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Send Order Alert to WhatsApp ({getWhatsAppDisplayNumber()})</span>
                  </a>
                </div>

                {/* Store Owner Email Alert */}
                <div className="p-3.5 rounded-xl bg-[#20130F] border border-[#3E2319] text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-[#FAF5EE]">
                      <Mail className="w-4 h-4 text-[#E58B24]" />
                      <span>Owner Email Notification</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#A89481]">
                      {getOwnerEmail()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A89481]">
                    Dispatched to store records. You can also open the direct email client receipt to send to <strong>{getOwnerEmail()}</strong>:
                  </p>
                  <a
                    href={createOrderEmailMailtoUrl(currentOrderDetails)}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-[#2C1913] hover:bg-[#3B221A] text-[#FAF5EE] border border-[#4E2B20] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#E58B24]" />
                    <span>Open Email Receipt for Owner</span>
                  </a>
                </div>

                {/* Customer Receipt Details */}
                <div className="p-3.5 rounded-xl bg-[#140C0A] border border-[#2D1812] text-xs space-y-2 text-[#C4B29E]">
                  <div className="flex items-center gap-2 text-[#FAF5EE] font-semibold">
                    <Package className="w-4 h-4 text-[#E58B24]" />
                    <span>Cold-Pouch Dispatch Details</span>
                  </div>
                  <div className="text-[11px] space-y-1 text-[#8C7665]">
                    <p>
                      <strong>Recipient:</strong> <span className="text-[#FAF5EE]">{formData.name} ({formData.phone})</span>
                    </p>
                    <p>
                      <strong>Address:</strong> <span className="text-[#FAF5EE]">{formData.address}, {formData.city}</span>
                    </p>
                    <p>
                      <strong>Amount Due on Delivery:</strong> <span className="text-[#E58B24] font-bold font-mono">{formatPKR(finalTotal)}</span>
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#291610] text-[11px] text-[#E58B24] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Protected by the 30-Day Taste & Steady Focus Guarantee</span>
                  </div>
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
