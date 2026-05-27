import { supabase } from "@/integrations/supabase/client";

const TOKEN_KEY = "aulas_token";
const EMAIL_KEY = "aulas_email";

export function getAulasToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAulasSession(token: string, email: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function clearAulasSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function getAulasEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}

const FN_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

async function callFn(name: string, body?: any, withToken = false) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: ANON,
    Authorization: `Bearer ${ANON}`,
  };
  if (withToken) {
    const t = getAulasToken();
    if (t) headers["x-aulas-token"] = t;
  }
  const res = await fetch(`${FN_BASE}/${name}`, {
    method: "POST",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || data?.message || "Erro");
  return data;
}

export const aulasAuth = {
  requestOtp: (email: string) => callFn("aulas-auth-request-otp", { email }),
  verifyOtp: async (email: string, code: string) => {
    const r = await callFn("aulas-auth-verify-otp", { email, code });
    setAulasSession(r.token, r.email);
    return r;
  },
  me: () => callFn("aulas-auth-me", undefined, true),
  adminCall: (action: string, payload: Record<string, any> = {}) =>
    callFn("aulas-admin", { action, ...payload }, true),
};

export const SUPPORT_WHATSAPP_URL =
  "https://wa.me/5584999488698?text=" +
  encodeURIComponent("Olá! Preciso de suporte sobre a Área de Membros.");
