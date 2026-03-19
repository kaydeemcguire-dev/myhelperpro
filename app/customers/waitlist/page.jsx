"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("waitlist").insert({
      email: email.toLowerCase().trim(),
      full_name: fullName || null,
      source: "beta_banner",
      role: "customer",
      notified: false,
    });

    setLoading(false);

    if (error) {
      // Handle duplicate email gracefully
      if (error.code === "23505") {
        setSuccess(true);
        return;
      }

      setError("Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-6 border border-black/10">

        <h1 className="text-2xl font-semibold text-center">
          Join the MyHelperPro Waitlist
        </h1>

        <p className="text-sm opacity-70 text-center">
          We’re currently in early access. Join the waitlist to receive updates
          and early access when bookings open.
        </p>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="font-medium text-green-900">
              You’re on the list 🌱
            </p>
            <p className="text-sm text-green-800 mt-1">
              We’ll be in touch as soon as access opens.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Full name (optional)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-[#2B4A2F] text-white font-medium hover:bg-[#3d5f43] transition disabled:opacity-50"
            >
              {loading ? "Joining…" : "Join Waitlist"}
            </button>
          </form>
        )}

        <p className="text-xs opacity-60 text-center pt-2">
          We respect your privacy. No spam. Unsubscribe anytime.
        </p>

      </div>
    </div>
  );
}
