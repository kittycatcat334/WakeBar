import { ProductBundle, IngredientItem, ReviewItem, FaqItem } from '../types';
import heroBarImg from '../assets/images/wakebar_hero_bar_1791919680790.jpg';
import ingredientsImg from '../assets/images/wakebar_ingredients_1791919681882.jpg';
import lifestyleImg from '../assets/images/wakebar_lifestyle_focus_1791919683360.jpg';
import boxBundleImg from '../assets/images/wakebar_box_bundle_1791919682458.jpg';

export const ASSETS = {
  heroBar: heroBarImg,
  ingredients: ingredientsImg,
  lifestyle: lifestyleImg,
  boxBundle: boxBundleImg,
  // Reliable public relative fallbacks for Cloudflare, GitHub Pages, or any CDN
  heroBarFallback: './images/wakebar_hero_bar.jpg',
  ingredientsFallback: './images/wakebar_ingredients.jpg',
  lifestyleFallback: './images/wakebar_lifestyle.jpg',
  boxBundleFallback: './images/wakebar_box_bundle.jpg',
};

export const BRAND_INFO = {
  name: 'Wakebar',
  tagline: 'FOCUS • ENERGY • CHOCOLATE',
  heroHeadline: 'Better Focus. Brighter Hours.',
  targetAudience: 'For those who don\'t like tea or coffee, but still want to stay active.',
  mantraA: 'Small Bar. Big Difference.',
  mantraB: 'Same you, just more focused.',
  mantraC: 'Wakebar — Fuel Your Focus',
  specification: 'DARK CHOCOLATE + NATURAL ENERGY BLEND',
  barSize: '40g',
  cacaoContent: '72% Single-Origin Cacao',
};

export const PILLARS = [
  {
    id: 'focus',
    title: 'Better Focus',
    subtitle: 'Alpha-wave mental clarity without racing thoughts or brain fog.',
    icon: 'brain',
  },
  {
    id: 'energy',
    title: 'Steady Energy',
    subtitle: 'Smooth 4-hour sustained vitality powered by complex theobromine & healthy fats.',
    icon: 'lightning',
  },
  {
    id: 'jitters',
    title: 'No Jitters',
    subtitle: 'Calm and collected. L-Theanine buffers stimulation so you never shake or crash.',
    icon: 'smile',
  },
  {
    id: 'ingredients',
    title: 'Real Ingredients',
    subtitle: 'Zero refined sugars, zero artificial fillers, and zero chemical aftertastes.',
    icon: 'leaf',
  },
];

export const INGREDIENTS: IngredientItem[] = [
  {
    id: 'dark-chocolate',
    title: 'PREMIUM DARK CHOCOLATE',
    purpose: 'for natural alertness and mood boost',
    detail: 'Fair-trade 72% heirloom cacao rich in polyphenols and natural theobromine for prolonged alertness without acidic coffee upset.',
    clinicalNote: 'Natural theobromine dilates blood vessels for effortless mental blood flow rather than heart palpitations.',
    amount: '72% Cacao',
    iconName: 'cocoa',
  },
  {
    id: 'l-theanine',
    title: 'L-THEANINE',
    purpose: 'for calm focus (not jitters)',
    detail: 'Pure amino acid extracted from ceremonial green tea leaves that stimulates calming alpha brainwaves, converting raw stimulation into focused flow state.',
    clinicalNote: 'Clinically proven 1:1 synergistic pairing with cacao xanthines to completely eliminate nervousness and anxiety.',
    amount: '100mg per bar',
    iconName: 'leaf',
  },
  {
    id: 'nuts-seeds',
    title: 'NUTS & SEEDS',
    purpose: 'for long-lasting energy',
    detail: 'Lightly roasted California almonds, sprouted pumpkin seeds, and chia crispies deliver satisfying crunch, plant protein, and healthy omega fatty acids.',
    clinicalNote: 'Healthy fats slow gastric absorption to maintain a flat, unwavering glucose curve across 4 hours.',
    amount: 'Crunchy nut cluster blend',
    iconName: 'seed',
  },
  {
    id: 'vitamin-b',
    title: 'VITAMIN B COMPLEX',
    purpose: 'for mental performance',
    detail: 'Bioactive forms of B6, B9 (folate), and B12 essential for neurotransmitter synthesis (dopamine & serotonin) and cellular ATP mitochondrial production.',
    clinicalNote: 'Supports rapid cognitive processing speed during high-intensity deep work sessions.',
    amount: '100% Daily Value B6/B12',
    iconName: 'brain',
  },
  {
    id: 'no-sugar',
    title: 'NO ADDED SUGAR',
    purpose: 'just real ingredients',
    detail: 'Zero refined white cane sugar, zero high-fructose syrups, and zero maltitol. Sweetened naturally by whole cacao and a whisper of monk fruit.',
    clinicalNote: 'Prevents insulin surges and the dreaded 3:00 PM sugar crash.',
    amount: '0g Added Sugar (< 2g total sugar)',
    iconName: 'sparkle',
  },
];

export const BUNDLES: ProductBundle[] = [
  {
    id: 'starter-6',
    name: 'Starter 6-Pack',
    subtitle: 'The Weekday Focus Routine',
    barCount: 6,
    weight: '240g (6 × 40g)',
    price: 2150,
    image: ASSETS.heroBar,
    fallbackImage: ASSETS.heroBarFallback,
    description: 'Perfect introduction for those wanting steady daily clarity Monday through Saturday without morning coffee.',
    features: [
      '6 individually sealed 40g bars',
      'Ideal for morning desk sprints or 2PM slumps',
      'Freshness-locked thermal packaging',
      'Cash on Delivery (COD) across Pakistan',
    ],
  },
  {
    id: 'flow-12',
    name: 'Focus 12-Pack',
    subtitle: 'Most Popular · Save Rs. 550',
    barCount: 12,
    weight: '480g (12 × 40g)',
    price: 3950,
    originalPrice: 4500,
    popular: true,
    badge: 'BESTSELLER',
    image: ASSETS.boxBundle,
    fallbackImage: ASSETS.boxBundleFallback,
    description: 'Our signature boxed edition. Two full weeks of clean mental performance for deep work and active afternoons.',
    features: [
      '12 premium 40g bars in collector display box',
      'Save Rs. 550 over individual pricing',
      'Free thermal delivery across Pakistan',
      'Instant WhatsApp order confirmation',
    ],
  },
  {
    id: 'monthly-24',
    name: 'Monthly Deep Work 24-Pack',
    subtitle: 'Full Month Supply · Save Rs. 1,550',
    barCount: 24,
    weight: '960g (24 × 40g)',
    price: 7450,
    originalPrice: 9000,
    badge: 'MAX VALUE',
    image: ASSETS.boxBundle,
    fallbackImage: ASSETS.boxBundleFallback,
    description: 'Designed for high performers, developers, creatives, and non-caffeine drinkers who demand unwavering focus every workday.',
    features: [
      '24 bars in twin storage dispenser cartons',
      'Lowest price per bar (Rs. 310/bar)',
      'Free priority thermal-insulated shipping',
      'Priority dispatch via Courier & WhatsApp updates',
    ],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Elena R.',
    role: 'Product Designer & Non-Coffee Drinker',
    category: 'Non-Coffee Drinker',
    rating: 5,
    date: '2 weeks ago',
    title: 'Finally an answer for non-coffee people!',
    comment: 'I get severe stomach burns and trembling hands from coffee, and tea never felt like enough for afternoon design sprints. Wakebar is literally a godsend. It snaps like gourmet dark chocolate with incredible crunchy seeds, and within 20 minutes I feel crisp, calm, and laser-focused.',
    verified: true,
  },
  {
    id: 'r2',
    author: 'Marcus K.',
    role: 'Staff Software Engineer',
    category: 'Developer / Creative',
    rating: 5,
    date: '1 month ago',
    title: 'Zero 3PM crash. Replaced my afternoon energy drinks.',
    comment: 'The L-Theanine + dark chocolate synergy is real. Usually by 2:30 PM my brain turns to soup. Now I snap half a Wakebar with a glass of water and fly through complex PR reviews without jittery palpitations.',
    verified: true,
  },
  {
    id: 'r3',
    author: 'Dr. Priya V.',
    role: 'Resident Physician & Runner',
    category: 'Fitness / Active',
    rating: 5,
    date: '3 weeks ago',
    title: 'Clean ingredients you can actually feel good about.',
    comment: 'As someone in medicine, I check labels meticulously. 72% cacao, zero added sugar, real seeds, B vitamins, and therapeutic L-Theanine. No artificial sweetness aftertaste. It stays in my locker every shift.',
    verified: true,
  },
  {
    id: 'r4',
    author: 'Julian T.',
    role: 'Architecture Master Student',
    category: 'Student / Academic',
    rating: 5,
    date: '1 week ago',
    title: 'Steady hours without the heart racing.',
    comment: 'During studio reviews and late drafting, caffeine used to make my sketches shaky. Wakebar gives that calm, quiet focus where time just melts away. Plus the crunchy almond-seed texture is so satisfying.',
    verified: true,
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'How does Wakebar provide energy without coffee or tea?',
    answer: 'Wakebar is powered by 72% dark chocolate, which is naturally rich in theobromine — a gentle, long-lasting alkaloid that provides sustained mental alertness without the spikes, rapid heart rate, or steep crashes of concentrated caffeine. We pair this with 100mg of botanical L-Theanine to keep brainwaves in a calm, hyper-focused state, alongside roasted nuts, seeds, and B-complex vitamins for cellular ATP energy.',
    category: 'Science & Energy',
  },
  {
    question: 'How much caffeine is in a 40g Wakebar?',
    answer: 'A single 40g Wakebar contains only ~24-28mg of naturally occurring caffeine from the pure dark cacao (roughly 1/4 the caffeine of a single standard mug of drip coffee). Because it is balanced 1:1 with 100mg of L-Theanine and cacao theobromine, it delivers clean alertness without restlessness, jitters, or anxiety.',
    category: 'Ingredients',
  },
  {
    question: 'What is the texture and taste profile?',
    answer: 'Wakebar has the luxurious snap and velvety melt of European single-origin dark chocolate, balanced with the nutty, toasted crunch of sliced California almonds, sprouted pumpkin seeds, and cacao nibs. It is deeply chocolatey, rich, and naturally flavorful with zero bitter or medicinal chalkiness.',
    category: 'Taste & Texture',
  },
  {
    question: 'Is Wakebar vegan, gluten-free, and keto-friendly?',
    answer: 'Yes! Wakebar is 100% plant-based, dairy-free, certified gluten-free, non-GMO, and contains zero added cane sugar. With only 4g of net carbs per bar, it seamlessly fits keto, paleo, and clean whole-food lifestyles.',
    category: 'Dietary',
  },
  {
    question: 'When is the best time to eat a Wakebar?',
    answer: 'Our customers love it most at two key moments: 1) First thing in the morning as an effortless breakfast focus ritual (especially if you skip tea/coffee), and 2) At 1:30 PM–3:00 PM to power through the afternoon slump without disrupting evening sleep.',
    category: 'Usage',
  },
  {
    question: 'What is your 30-Day Taste & Focus Guarantee?',
    answer: 'We stand by every bar. If you try Wakebar and don\'t feel a noticeable boost in clean, steady focus, or simply prefer a different chocolate, email us within 30 days and we will refund 100% of your order. No return hassle required.',
    category: 'Guarantee & Orders',
  },
];
