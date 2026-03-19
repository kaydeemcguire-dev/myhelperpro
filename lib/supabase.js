import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "❌ ERROR: NEXT_PUBLIC_SUPABASE_URL is missing. Check your .env.local."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "❌ ERROR: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Check your .env.local."
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
