export type Locale = 'es' | 'en';

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  icon: string;
}

export interface ToolCard {
  badge: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  metrics: Stat[];
}

export interface TestimonialItem {
  quote: string;
  initials: string;
  author: string;
  role: string;
  location: string;
  type: 'restaurant' | 'client';
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  period: string;
  features: string[];
  notIncluded?: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
  priceNote?: string;
}

export interface PlanRecommendation {
  question: string;
  answer: string;
  badge?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

export interface SupportChannel {
  label: string;
  description: string;
  icon: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    city: string;
    links: NavLink[];
    ctaClient: string;
    ctaRestaurant: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    title: string;
    subtitle: string;
    pills: string[];
    ctaClient: string;
    ctaRestaurant: string;
    stats: Stat[];
    cityTitle: string;
    citySubtitle: string;
    highlights: HighlightItem[];
  };
  howItWorks: {
    label: string;
    title: string;
    subtitle: string;
    steps: Step[];
    ctaPrompt: string;
    ctaClient: string;
    ctaRestaurant: string;
  };
  forClients: {
    label: string;
    title: string;
    subtitle: string;
    features: FeatureItem[];
    appTitle: string;
    appRating: string;
    appPriceLabel: string;
    appCta: string;
    appStats: Stat[];
    benefitsTitle: string;
    benefits: { title: string; description: string }[];
    ctaTitle: string;
    ctaWeb: string;
    ctaExplore: string;
    footerNote: string;
  };
  forRestaurants: {
    label: string;
    title: string;
    subtitle: string;
    stats: Stat[];
    tools: ToolCard[];
    advantagesTitle: string;
    advantages: FeatureItem[];
    ctaTitle: string;
    ctaDemo: string;
    ctaExpert: string;
    footerNote: string;
  };
  demo: {
    label: string;
    title: string;
    subtitle: string;
    featuresTitle: string;
    features: string[];
    platformsTitle: string;
    webLabel: string;
    webDesc: string;
    ctaWeb: string;
    ctaVideo: string;
    stats: Stat[];
  };
  testimonials: {
    label: string;
    title: string;
    subtitle: string;
    stats: Stat[];
    filters: {
      all: string;
      restaurant: string;
      client: string;
    };
    items: TestimonialItem[];
    ctaTitle: string;
    ctaTrial: string;
    ctaAdvisor: string;
    footerNote: string;
  };
  pricing: {
    label: string;
    title: string;
    subtitle: string;
    launchOffer: string;
    plans: PricingPlan[];
    helpTitle: string;
    recommendations: PlanRecommendation[];
    faqTitle: string;
    faqItems: FAQItem[];
  };
  faq: {
    label: string;
    title: string;
    subtitle: string;
    categories: FAQCategory[];
    supportTitle: string;
    supportChannels: SupportChannel[];
    ctaSupport: string;
    ctaDemo: string;
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    restaurant: string;
    message: string;
    phonePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    restaurantPlaceholder: string;
    messagePlaceholder: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    ctaClient: string;
    ctaRestaurant: string;
    badges: string[];
  };
  footer: {
    tagline: string;
    address: string;
    phone: string;
    email: string;
    product: string;
    company: string;
    support: string;
    legal: string;
    productLinks: NavLink[];
    companyLinks: NavLink[];
    supportLinks: NavLink[];
    legalLinks: NavLink[];
    copyright: string;
  };
}
