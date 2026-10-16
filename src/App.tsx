import React, { useState } from 'react';
import { ProductBundle, CartItem } from './types';
import { BUNDLES } from './data/wakebarData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatsInside } from './components/WhatsInside';
import { ComparisonTable } from './components/ComparisonTable';
import { FocusCalculator } from './components/FocusCalculator';
import { ShopSection } from './components/ShopSection';
import { LifestyleSection } from './components/LifestyleSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { ChocolateSnapIntro } from './components/ChocolateSnapIntro';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { createWhatsAppInquiryUrl } from './utils/whatsapp';

export default function App() {
  const [showSnapIntro, setShowSnapIntro] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      bundle: BUNDLES[1], // Focus 12-pack
      quantity: 1,
      isSubscription: false,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    subtotal: 3950,
    discount: 0,
    shipping: 0,
    finalTotal: 3950,
    promoCode: '',
  });

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (bundle: ProductBundle, isSubscription: boolean) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.bundle.id === bundle.id && item.isSubscription === isSubscription
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { bundle, quantity: 1, isSubscription }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartCheckout = (
    subtotal: number,
    discount: number,
    shipping: number,
    finalTotal: number,
    promoCode: string
  ) => {
    setCheckoutData({ subtotal, discount, shipping, finalTotal, promoCode });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWhatsInside = () => {
    const el = document.getElementById('whats-inside');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#150F0D] text-[#FAF5EE] flex flex-col selection:bg-[#E58B24]/30 selection:text-white font-sans">
      {/* Opening Chocolate Bar Snap in 2 Animation */}
      {showSnapIntro && (
        <ChocolateSnapIntro
          onComplete={() => setShowSnapIntro(false)}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToShop={scrollToShop}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onShopClick={scrollToShop}
          onExploreIngredients={scrollToWhatsInside}
          onReplaySnap={() => setShowSnapIntro(true)}
        />

        {/* What's Inside? (Dedicated 5-ingredient breakdown from image) */}
        <WhatsInside />

        {/* Why Wakebar (Coffee & Tea comparison + energy curve) */}
        <ComparisonTable />

        {/* Focus Routine Calculator */}
        <FocusCalculator onAddToCart={handleAddToCart} />

        {/* Direct Shop & Bundle Selector */}
        <ShopSection onAddToCart={handleAddToCart} />

        {/* Lifestyle & Work Rituals */}
        <LifestyleSection />

        {/* Verified Reviews */}
        <ReviewsSection />

        {/* Common FAQs */}
        <FaqSection />
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleStartCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={checkoutData.subtotal}
        discount={checkoutData.discount}
        shipping={checkoutData.shipping}
        finalTotal={checkoutData.finalTotal}
        promoCode={checkoutData.promoCode}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Floating WhatsApp Quick Order Button */}
      <a
        href={createWhatsAppInquiryUrl('Direct WhatsApp Order')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 border border-white/20 active:scale-95 group"
        title="Chat & Order via WhatsApp: +92 314-5160556"
      >
        <WhatsAppIcon className="w-5 h-5 text-white" />
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold leading-tight tracking-wide">
            Order on WhatsApp
          </span>
          <span className="hidden sm:inline text-[10px] text-emerald-100 font-mono">
            +92 314-5160556
          </span>
        </div>
      </a>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
