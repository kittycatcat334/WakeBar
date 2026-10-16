import { CartItem, ProductBundle } from '../types';

export const DEFAULT_WHATSAPP_NUMBER = '923145160556';
export const DEFAULT_WHATSAPP_DISPLAY = '+92 314-5160556';
export const DEFAULT_OWNER_EMAIL = 'wakebar.pakistan@gmail.com';

export interface OrderRecord {
  orderId: string;
  timestamp: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    province?: string;
    postalCode?: string;
    paymentMethod: string;
  };
  items: Array<{
    bundleId: string;
    bundleName: string;
    barCount: number;
    quantity: number;
    price: number;
    isSubscription: boolean;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  finalTotal: number;
  promoCode?: string;
  channel: 'website' | 'whatsapp';
}

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

export function getWhatsAppDisplayNumber(): string {
  return DEFAULT_WHATSAPP_DISPLAY;
}

export function getOwnerEmail(): string {
  try {
    return localStorage.getItem('wakebar_owner_email') || DEFAULT_OWNER_EMAIL;
  } catch {
    return DEFAULT_OWNER_EMAIL;
  }
}

export function setOwnerEmail(email: string) {
  try {
    localStorage.setItem('wakebar_owner_email', email.trim() || DEFAULT_OWNER_EMAIL);
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

export function createWebsiteOrderWhatsAppNotificationUrl(order: {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
  };
  items: Array<{
    bundleName: string;
    barCount: number;
    quantity: number;
    price: number;
    isSubscription?: boolean;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  finalTotal: number;
  promoCode?: string;
}): string {
  const number = getWhatsAppNumber();

  let itemsSummary = '';
  order.items.forEach((item, idx) => {
    itemsSummary += `${idx + 1}. ${item.bundleName} (${item.barCount} bars) x ${item.quantity} = ${formatPKR(item.price * item.quantity)}\n`;
  });

  const text = `🔔 *NEW WAKEBAR WEBSITE ORDER* 🍫\n` +
    `------------------------------------\n` +
    `*Order ID:* ${order.orderId}\n` +
    `*Customer:* ${order.customer.name}\n` +
    `*Phone:* ${order.customer.phone}\n` +
    `*Email:* ${order.customer.email}\n` +
    `*Address:* ${order.customer.address}, ${order.customer.city}\n` +
    `------------------------------------\n` +
    `*Items Ordered:*\n` +
    `${itemsSummary}` +
    `------------------------------------\n` +
    `*Subtotal:* ${formatPKR(order.subtotal)}\n` +
    (order.discount > 0 ? `*Discount (${order.promoCode || 'PROMO'}):* -${formatPKR(order.discount)}\n` : '') +
    `*Shipping:* ${order.shipping === 0 ? 'FREE Cold-Pouch' : formatPKR(order.shipping)}\n` +
    `*Total Due:* ${formatPKR(order.finalTotal)} (Cash on Delivery)\n` +
    `------------------------------------\n` +
    `⚡ Please dispatch fresh batch to customer address!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function createOrderEmailMailtoUrl(order: {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode?: string;
  };
  items: Array<{
    bundleName: string;
    barCount: number;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  finalTotal: number;
  promoCode?: string;
}): string {
  const ownerEmail = getOwnerEmail();
  const subject = `🛒 New Wakebar Order: #${order.orderId} - ${formatPKR(order.finalTotal)}`;

  let itemsList = '';
  order.items.forEach((item, idx) => {
    itemsList += `${idx + 1}. ${item.bundleName} (${item.barCount} bars) x ${item.quantity} = ${formatPKR(item.price * item.quantity)}\n`;
  });

  const body = `Dear Wakebar Operations,\n\n` +
    `A new order has been placed on the Wakebar official website!\n\n` +
    `ORDER SUMMARY:\n` +
    `----------------------------------------\n` +
    `Order Number: ${order.orderId}\n` +
    `Date & Time: ${new Date().toLocaleString('en-PK')}\n` +
    `Payment Method: Cash on Delivery (COD)\n` +
    `Total Amount: ${formatPKR(order.finalTotal)}\n\n` +
    `CUSTOMER DETAILS:\n` +
    `----------------------------------------\n` +
    `Name: ${order.customer.name}\n` +
    `Phone / WhatsApp: ${order.customer.phone}\n` +
    `Email: ${order.customer.email}\n` +
    `Delivery Address: ${order.customer.address}\n` +
    `City: ${order.customer.city} ${order.customer.postalCode ? `(${order.customer.postalCode})` : ''}\n\n` +
    `ITEMS IN ORDER:\n` +
    `----------------------------------------\n` +
    `${itemsList}\n` +
    `FINANCIAL BREAKDOWN:\n` +
    `----------------------------------------\n` +
    `Subtotal: ${formatPKR(order.subtotal)}\n` +
    (order.discount > 0 ? `Discount: -${formatPKR(order.discount)} (${order.promoCode || 'PROMO'})\n` : '') +
    `Shipping: ${order.shipping === 0 ? 'FREE Cold-Pouch' : formatPKR(order.shipping)}\n` +
    `Net Payable on Delivery: ${formatPKR(order.finalTotal)}\n\n` +
    `Please confirm the order and prepare thermal cold-pouch dispatch.\n\n` +
    `-- Wakebar Store Order System`;

  return `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function createWhatsAppInquiryUrl(subject: string = 'General Inquiry'): string {
  const number = getWhatsAppNumber();
  const text = `Hi Wakebar! 👋 I have a question regarding: *${subject}*.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function saveOrderRecord(record: OrderRecord) {
  try {
    const existing = getOrderRecords();
    existing.unshift(record);
    // Keep last 50 orders
    const trimmed = existing.slice(0, 50);
    localStorage.setItem('wakebar_orders', JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed to save order to localStorage:', err);
  }
}

export function getOrderRecords(): OrderRecord[] {
  try {
    const raw = localStorage.getItem('wakebar_orders');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function dispatchOrderToBackend(order: any): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Backend may not be running in static Cloudflare Pages build
  }
  return { success: true, message: 'Recorded locally & notifications generated' };
}
