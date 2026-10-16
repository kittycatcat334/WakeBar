import { CartItem, ProductBundle } from '../types';

export const DEFAULT_WHATSAPP_NUMBER = '923001234567';

export function getWhatsAppNumber(): string {
  try {
    return localStorage.getItem('wakebar_whatsapp_number') || DEFAULT_WHATSAPP_NUMBER;
  } catch {
    return DEFAULT_WHATSAPP_NUMBER;
  }
}

export function setWhatsAppNumber(num: string) {
  try {
    const cleaned = num.replace(/[^0-9]/g, '');
    localStorage.setItem('wakebar_whatsapp_number', cleaned || DEFAULT_WHATSAPP_NUMBER);
  } catch {
    // Ignore storage errors
  }
}

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function createWhatsAppSingleOrderUrl(
  bundle: ProductBundle,
  isSubscription: boolean = false,
  quantity: number = 1
): string {
  const number = getWhatsAppNumber();
  const unitPrice = isSubscription ? Math.round(bundle.price * 0.85) : bundle.price;
  const totalPrice = unitPrice * quantity;

  const text = `*Wakebar Order Request* 🍫\n` +
    `--------------------------\n` +
    `*Item:* ${bundle.name} (${bundle.barCount} Bars · ${bundle.weight})\n` +
    `*Quantity:* ${quantity}\n` +
    `*Order Type:* ${isSubscription ? 'Monthly Subscription (15% OFF)' : 'One-Time Order'}\n` +
    `*Total Price:* ${formatPKR(totalPrice)}\n` +
    `*Payment:* Cash on Delivery (COD) / Bank Transfer\n` +
    `--------------------------\n` +
    `Please share your Name, Delivery Address, and City to confirm dispatch!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppCartOrderUrl(
  items: CartItem[],
  subtotal: number,
  discount: number,
  shipping: number,
  finalTotal: number,
  promoCode?: string,
  customerDetails?: {
    name?: string;
    city?: string;
    address?: string;
    phone?: string;
  }
): string {
  const number = getWhatsAppNumber();

  let text = `*New Wakebar Order via Website* 🍫\n` +
    `--------------------------\n`;

  items.forEach((item, idx) => {
    const itemPrice = item.isSubscription
      ? Math.round(item.bundle.price * 0.85)
      : item.bundle.price;
    text += `${idx + 1}. *${item.bundle.name}* x ${item.quantity} = ${formatPKR(itemPrice * item.quantity)}\n` +
      `   (${item.bundle.barCount} bars · ${item.isSubscription ? 'Monthly Sub' : 'One-Time'})\n`;
  });

  text += `--------------------------\n` +
    `*Subtotal:* ${formatPKR(subtotal)}\n`;

  if (discount > 0) {
    text += `*Discount (${promoCode || 'PROMO'}):* -${formatPKR(discount)}\n`;
  }

  text += `*Thermal Shipping:* ${shipping === 0 ? 'FREE' : formatPKR(shipping)}\n` +
    `*Total Payable:* ${formatPKR(finalTotal)}\n` +
    `*Payment Mode:* Cash on Delivery (COD)\n` +
    `--------------------------\n`;

  if (customerDetails?.name) {
    text += `*Customer:* ${customerDetails.name}\n` +
      `*Address:* ${customerDetails.address || ''}, ${customerDetails.city || ''}\n`;
    if (customerDetails.phone) {
      text += `*Contact:* ${customerDetails.phone}\n`;
    }
  } else {
    text += `Please confirm availability and dispatch schedule.`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppInquiryUrl(subject: string = 'General Inquiry'): string {
  const number = getWhatsAppNumber();
  const text = `Hi Wakebar! 👋 I have a question regarding: *${subject}*.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
