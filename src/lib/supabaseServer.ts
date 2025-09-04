import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function requireEnv(primary: string, fallback?: string): string {
  const value = process.env[primary] || (fallback ? process.env[fallback] : undefined);
  if (!value) {
    const names = fallback ? `${primary} or ${fallback}` : primary;
    throw new Error(`Missing environment variable: ${names}`);
  }
  return value;
}

// Server-side Supabase client using anon key.
// Prefers server-only vars, falls back to NEXT_PUBLIC for convenience.
export function supabaseServer(): SupabaseClient {
  const url = requireEnv("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const anon = requireEnv("SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(url, anon, { auth: { persistSession: false } });
}

// Admin client for privileged server actions (never import in client code).
export function supabaseAdmin(): SupabaseClient {
  const url = requireEnv("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
