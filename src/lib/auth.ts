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

export async function registerBusinessOnboarding(payload: RegisterBusinessOnboardingPayload) {
  const { data, error } = await supabase.rpc('register_business_onboarding', {
    p_full_name: payload.fullName,
    p_email: payload.email,
    p_phone: payload.phone,
    p_password: payload.password,
    p_business_name: payload.businessName,
    p_business_type: payload.businessType,
    p_country: payload.country,
    p_business_phone: payload.businessPhone,
    p_domain: payload.domain,
    p_plan_code: payload.planCode,
    p_billing_cycle: payload.billingCycle,
    p_trial_days: payload.trialDays,
    p_source: payload.source ?? null,
    p_campaign: payload.campaign ?? null,
  });

  if (error) throw error;
  return data;
}

// Login con Supabase Auth
export async function login(payload: LoginPayload) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) throw error;
  return data;
}

// Logout
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Forgot password
export async function forgotPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://app.mangopos.do/reset-password',
  });
  if (error) throw error;
}

// Obtener sesión actual
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Obtener user businesses después del login
export async function getUserBusinesses() {
  const { data, error } = await supabase
    .from('user_businesses')
    .select('business_id, role, businesses(domain)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
