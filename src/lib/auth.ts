import { supabase } from '@/lib/supabase';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterBusinessOnboardingPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  businessName: string;
  businessType: string;
  country: string;
  businessPhone: string;
  domain: string;
  planCode: string;
  billingCycle: 'monthly' | 'yearly';
  trialDays: number;
  source?: string;
  campaign?: string;
}

export interface RegisterBusinessOnboardingResult {
  requiresEmailConfirmation: boolean;
  message: string;
  domain: string;
  businessId: string;
  userId: string;
}

export interface UserBusiness {
  business_id: string;
  role: string;
  businesses: {
    id: string;
    domain: string;
    business_name: string | null;
    branch_name: string | null;
    status: string | null;
  } | null;
}

const RESERVED_SUBDOMAINS = new Set(['www', 'api', 'admin', 'app', 'mail', 'static']);
const ROLE_PRIORITY: Record<string, number> = {
  owner: 100,
  admin: 90,
  manager: 80,
  cashier: 70,
  waiter: 60,
  cook: 50,
  chef: 50,
  kitchen: 50,
  delivery: 40,
};

function normalizeSubdomain(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\.mangopos\.do$/i, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildDomain(raw: string) {
  const subdomain = normalizeSubdomain(raw);
  if (!subdomain) throw new Error('Subdominio inválido');
  if (subdomain.length < 3) throw new Error('Usa al menos 3 caracteres para el subdominio');
  if (RESERVED_SUBDOMAINS.has(subdomain)) throw new Error('Ese subdominio está reservado');
  return `${subdomain}.mangopos.do`;
}

function rolePriority(role: string) {
  return ROLE_PRIORITY[role?.toLowerCase?.() ?? ''] ?? 0;
}

export function normalizeUserBusinesses(rows: UserBusiness[]): UserBusiness[] {
  const unique = new Map<string, UserBusiness>();

  for (const row of rows) {
    const domain = row.businesses?.domain?.trim().toLowerCase();
    const key = row.business_id || domain;
    if (!key || !domain) continue;

    const current = unique.get(key);
    if (!current) {
      unique.set(key, row);
      continue;
    }

    if (rolePriority(row.role) > rolePriority(current.role)) {
      unique.set(key, row);
    }
  }

  return Array.from(unique.values()).sort((a, b) => {
    const roleDiff = rolePriority(b.role) - rolePriority(a.role);
    if (roleDiff !== 0) return roleDiff;
    const nameA = a.businesses?.branch_name || a.businesses?.business_name || a.business_id;
    const nameB = b.businesses?.branch_name || b.businesses?.business_name || b.business_id;
    return nameA.localeCompare(nameB, 'es');
  });
}

export async function isDomainAvailable(raw: string) {
  const domain = buildDomain(raw);
  const { data, error } = await supabase
    .from('businesses')
    .select('id')
    .eq('domain', domain)
    .maybeSingle();

  if (error) throw error;

  return {
    subdomain: domain.replace(/\.mangopos\.do$/i, ''),
    domain,
    available: !data,
  };
}

export async function registerBusinessOnboarding(
  payload: RegisterBusinessOnboardingPayload,
): Promise<RegisterBusinessOnboardingResult> {
  const domain = buildDomain(payload.domain);

  const { data: exists, error: existsError } = await supabase
    .from('businesses')
    .select('id')
    .eq('domain', domain)
    .maybeSingle();

  if (existsError) throw existsError;
  if (exists) throw new Error(`El dominio "${domain}" ya está en uso.`);

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
  });

  if (signUpError) {
    const message = signUpError.message.toLowerCase();
    if (
      message.includes('security purposes') ||
      (message.includes('after') && message.includes('seconds'))
    ) {
      throw new Error(
        'Supabase limitó temporalmente la creación de la cuenta. Espera unos segundos y vuelve a intentarlo una sola vez.',
      );
    }
    throw signUpError;
  }

  const session = authData.session ?? (await supabase.auth.getSession()).data.session;
  const user = authData.user ?? session?.user;

  if (!user) {
    throw new Error('No se pudo crear el usuario o la sesión.');
  }

  const now = new Date().toISOString();

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: user.id,
    email: payload.email,
    full_name: payload.fullName,
    created_at: now,
    updated_at: now,
  });

  if (profileError) throw profileError;

  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .insert({
      owner_id: user.id,
      business_name: payload.businessName,
      branch_name: 'Sucursal Principal',
      business_type: payload.businessType,
      country: payload.country,
      phone: payload.businessPhone.trim() || null,
      domain,
      status: 'active',
      created_at: now,
      updated_at: now,
    })
    .select('id')
    .single();

  if (businessError) throw businessError;

  const planMap: Record<string, string> = {
    base: 'starter',
    starter: 'starter',
    pro: 'pro',
    enterprise: 'enterprise',
    trial: 'trial',
  };
  const normalizedPlan = planMap[payload.planCode?.trim().toLowerCase() || 'starter'] || 'starter';

  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + payload.trialDays * 24 * 60 * 60 * 1000);

  const { error: membershipError } = await supabase.from('memberships').insert({
    user_id: user.id,
    business_id: business.id,
    plan_type: normalizedPlan,
    status: 'active',
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    created_at: startDate.toISOString(),
  });

  if (membershipError) throw membershipError;

  return {
    requiresEmailConfirmation: !session,
    message: session
      ? 'Todo quedó creado correctamente. En unos segundos entrarás al sistema.'
      : 'Cuenta creada correctamente. Revisa tu correo para confirmar tu cuenta y luego inicia sesión.',
    domain,
    businessId: business.id,
    userId: user.id,
  };
}

export async function login(payload: LoginPayload) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function forgotPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://app.mangopos.do/reset-password',
  });
  if (error) throw error;
}

export async function resendVerificationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  if (error) throw error;
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getUserBusinesses(): Promise<UserBusiness[]> {
  const session = await getCurrentSession();
  const userId = session?.user?.id;
  if (!userId) return [];

  const { data, error } = await supabase
    .from('user_businesses')
    .select('business_id, role, businesses(id, domain, business_name, branch_name, status)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return normalizeUserBusinesses((data ?? []) as unknown as UserBusiness[]);
}
