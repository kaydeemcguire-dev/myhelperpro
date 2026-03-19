"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function CustomerWaitlistPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
      email,
      full_name: fullName || null,
      source: "beta_site",
      role: "customer",
      notified: false,
    });

    if (error) {
      if (error.code === "23505") {
        setError("This email is already on the waitlist.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] p-6">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold">You're on the list 🌱</h1>
          <p className="opacity-80">
            Thanks for joining the MyHelperPro waitlist.  
            We’ll notify you as soon as early access opens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-8 max-w-md w-full space-y-5 border border-black/10"
      >
        <h1 className="text-2xl font-semibold text-center">
          Join the MyHelperPro Waitlist
        </h1>

        <p className="text-sm opacity-70 text-center">
          We’re in early access. Join our waitlist for updates and priority access.
        </p>

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

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 rounded-full bg-[#2B4A2F] text-white font-medium hover:bg-[#3d5f43] transition disabled:opacity-50"
        >
          {loading ? "Joining…" : "Join Waitlist"}
        </button>
      </form>
    </div>
  );
}
