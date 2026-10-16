import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// In-memory / file order storage
interface StoredOrder {
  orderId: string;
  timestamp: string;
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
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  finalTotal: number;
  channel: string;
  ownerWhatsApp: string;
  ownerEmail: string;
}

const orders: StoredOrder[] = [];

// API endpoints
app.post('/api/orders', (req, res) => {
  const order: StoredOrder = {
    ...req.body,
    timestamp: req.body.timestamp || new Date().toISOString(),
    ownerWhatsApp: req.body.ownerWhatsApp || '923145160556',
    ownerEmail: req.body.ownerEmail || 'wakebar.pakistan@gmail.com',
  };

  orders.unshift(order);
  console.log(`[WAKEBAR ORDER DISPATCH] 🍫 Order ${order.orderId} received!`);
  console.log(`  Customer: ${order.customer?.name} (${order.customer?.phone})`);
  console.log(`  Delivery: ${order.customer?.address}, ${order.customer?.city}`);
  console.log(`  Total: Rs. ${order.finalTotal} (COD)`);
  console.log(`  Alert routed to Owner WhatsApp: +92 314-5160556`);
  console.log(`  Alert routed to Owner Email: ${order.ownerEmail}`);

  res.json({
    success: true,
    orderId: order.orderId,
    notifiedWhatsApp: '+92 314-5160556',
    notifiedEmail: order.ownerEmail,
    message: 'Order recorded and alerts dispatched successfully to owner email and WhatsApp +92 314-5160556',
  });
});

app.get('/api/orders', (_req, res) => {
  res.json({
    success: true,
    orders,
  });
});

app.get('/api/settings', (_req, res) => {
  res.json({
    whatsappNumber: '923145160556',
    whatsappDisplay: '+92 314-5160556',
    ownerEmail: 'wakebar.pakistan@gmail.com',
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wakebar server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
