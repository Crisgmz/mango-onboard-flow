// Plan configuration and types for the onboarding flow
export interface PlanInfo {
  id: string;
  name: string;
  billing: 'monthly' | 'yearly';
  trial: number;
  price: number;
  priceYearly?: number;
  features: string[];
}

export interface OnboardingParams {
  plan: string;
  billing: string;
  trial: number;
  source: string;
  campaign: string;
}

export const PLANS: Record<string, PlanInfo> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    billing: 'monthly',
    trial: 14,
    price: 29,
    priceYearly: 290,
    features: [
      '1 punto de venta',
      'Hasta 500 productos',
      'Reportes básicos',
      'Soporte por email',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    billing: 'monthly',
    trial: 14,
    price: 59,
    priceYearly: 590,
    features: [
      'Hasta 3 puntos de venta',
      'Productos ilimitados',
      'Reportes avanzados',
      'Soporte prioritario',
      'Integraciones',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    billing: 'monthly',
    trial: 14,
    price: 149,
    priceYearly: 1490,
    features: [
      'Puntos de venta ilimitados',
      'Productos ilimitados',
      'Reportes personalizados',
      'Soporte dedicado 24/7',
      'API completa',
      'Multi-sucursal',
    ],
  },
};

export function parseOnboardingParams(searchParams: URLSearchParams): OnboardingParams {
  return {
    plan: searchParams.get('plan') || '',
    billing: searchParams.get('billing') || 'monthly',
    trial: parseInt(searchParams.get('trial') || '14', 10),
    source: searchParams.get('source') || '',
    campaign: searchParams.get('campaign') || '',
  };
}

export function getPlanInfo(params: OnboardingParams): PlanInfo | null {
  const plan = PLANS[params.plan];
  if (!plan) return null;
  return {
    ...plan,
    billing: (params.billing as 'monthly' | 'yearly') || plan.billing,
    trial: params.trial || plan.trial,
  };
}

export const BUSINESS_TYPES = [
  'Restaurante',
  'Cafetería',
  'Bar',
  'Food Truck',
  'Panadería',
  'Pizzería',
  'Comida Rápida',
  'Catering',
  'Hotel / Resort',
  'Otro',
];

export const BUSINESS_SIZES = [
  '1-5 empleados',
  '6-15 empleados',
  '16-50 empleados',
  '51-100 empleados',
  'Más de 100 empleados',
];

export const COUNTRIES = [
  'República Dominicana',
  'México',
  'Colombia',
  'Panamá',
  'Costa Rica',
  'Puerto Rico',
  'España',
  'Estados Unidos',
  'Otro',
];

export const CURRENCIES = [
  { code: 'DOP', name: 'Peso Dominicano (DOP)' },
  { code: 'USD', name: 'Dólar Americano (USD)' },
  { code: 'MXN', name: 'Peso Mexicano (MXN)' },
  { code: 'COP', name: 'Peso Colombiano (COP)' },
  { code: 'EUR', name: 'Euro (EUR)' },
];

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30);
}
