export interface ProductBundle {
  id: string;
  name: string;
  subtitle: string;
  barCount: number;
  weight: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  popular?: boolean;
  image: string;
  fallbackImage?: string;
  description: string;
  features: string[];
}

export interface CartItem {
  bundle: ProductBundle;
  quantity: number;
  isSubscription: boolean;
  subscriptionInterval?: '2_weeks' | '4_weeks' | '6_weeks';
}

export interface IngredientItem {
  id: string;
  title: string;
  purpose: string;
  detail: string;
  clinicalNote: string;
  amount: string;
  iconName: 'cocoa' | 'leaf' | 'seed' | 'brain' | 'sparkle';
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  category: 'Non-Coffee Drinker' | 'Developer / Creative' | 'Student / Academic' | 'Fitness / Active';
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
