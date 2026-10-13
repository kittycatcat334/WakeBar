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

export default function App() {
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
    subtotal: 39,
    discount: 0,
    shipping: 0,
    finalTotal: 39,
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
        subtotal={checkoutData.subtotal}
        discount={checkoutData.discount}
        shipping={checkoutData.shipping}
        finalTotal={checkoutData.finalTotal}
        promoCode={checkoutData.promoCode}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
