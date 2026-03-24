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
    price: 49.99,
    priceYearly: 499.99,
    features: [
      '1 punto de venta',
      'Hasta 500 productos',
      'Reportes básicos',
      'Soporte por WhatsApp y email',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    billing: 'monthly',
    trial: 14,
    price: 79.99,
    priceYearly: 799.99,
    features: [
      'Hasta 3 puntos de venta',
      'Productos ilimitados',
      'Reportes avanzados',
      'Soporte prioritario',
      'Inventario y operación más completa',
    ],
  },
};

export function parseOnboardingParams(searchParams: URLSearchParams): OnboardingParams {
  return {
    plan: searchParams.get('plan') || 'starter',
    billing: searchParams.get('billing') || 'monthly',
    trial: parseInt(searchParams.get('trial') || '14', 10),
    source: searchParams.get('source') || '',
    campaign: searchParams.get('campaign') || '',
  };
}

export function getPlanInfo(params: OnboardingParams): PlanInfo | null {
  const normalizedPlan = params.plan?.trim().toLowerCase() || 'starter';
  const plan = PLANS[normalizedPlan] || PLANS.starter;
  return {
    ...plan,
    billing: (params.billing as 'monthly' | 'yearly') || plan.billing,
    trial: params.trial || plan.trial,
  };
}

export function getVisiblePlans(billing: 'monthly' | 'yearly', trial: number): PlanInfo[] {
  return ['starter', 'pro'].map((id) => ({
    ...PLANS[id],
    billing,
    trial,
  }));
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
