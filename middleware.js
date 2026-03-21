import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Always allow request to continue unless we modify it
  const response = NextResponse.next();

  // Get environment variables safely
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Prevent crash if env variables are missing (VERY important for Vercel)
  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase environment variables in middleware");
    return response;
  }

  // Create Supabase server client
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value || null;
      },
      set(name, value, options) {
        response.cookies.set(name, value, options);
      },
      remove(name, options) {
        response.cookies.set(name, "", options);
      },
    },
  });

  // Hydrate / refresh session (this keeps users logged in properly)
  await supabase.auth.getSession();

  // Continue to requested page
  return response;
}

/**
 * 🚨 IMPORTANT:
 * Only run middleware on protected routes
 * Do NOT include login/signup pages here
 */
export const config = {
  matcher: [
    "/providers/dashboard",
    "/providers/edit-profile",
    "/providers/documents",
    "/customers/dashboard",
  ],
};
