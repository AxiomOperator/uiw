import { createClient } from "@supabase/supabase-js";

// New Supabase API key style (sb_publishable_... format).
// Find this in: Supabase Dashboard → Settings → API Keys → Publishable key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  // In development, warn clearly rather than crashing at module load
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
        "Data fetching will fail. Copy .env.example to .env.local and fill in your values. " +
        "Get your publishable key (sb_publishable_...) from: " +
        "Supabase Dashboard → Settings → API Keys → Publishable key"
    );
  }
}

/**
 * Supabase client using the new publishable key format (sb_publishable_...).
 * Safe to use in Server Components, Route Handlers, and Client Components.
 * Respects Row Level Security — use a secret key only for privileged server ops.
 */
export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabasePublishableKey ?? "placeholder"
);
