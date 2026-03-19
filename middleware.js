import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // hydrate session ONLY
  await supabase.auth.getSession();

  return response;
}

/**
 * 🚨 IMPORTANT:
 * - Login and signup must remain PUBLIC
 * - Only protect pages that REQUIRE auth
 */
export const config = {
  matcher: [
    "/providers/dashboard",
    "/providers/edit-profile",
    "/providers/documents",
    "/customers/dashboard",
  ],
};
