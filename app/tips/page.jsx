// app/tips/page.jsx
"use client";

import Link from "next/link";

export default function TipsPage() {
  return (
    <div className="min-h-screen p-6 space-y-10">

      <h1 className="text-3xl font-bold">Tips & Tricks</h1>
      <p className="text-slate-300 max-w-xl">
        Guides, advice, and helpful information for families and providers.
        This section is being prepared for the public beta launch.
      </p>

      {/* COMING SOON NOTICE */}
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
        <h2 className="text-xl font-semibold mb-2">✨ Articles Coming Soon</h2>
        <p className="text-slate-400 text-sm">
          We are currently preparing content. Please check back after the beta!
        </p>
      </div>

      {/* EXAMPLE ARTICLES (DISABLED) */}
      <div className="space-y-4">
        {[
          "How to choose a trustworthy caregiver",
          "Questions to ask during a home helper interview",
          "How to safely hire for cleaning services",
          "How to compare provider experience levels",
          "What documents should a provider have in California?",
        ].map((title) => (
          <div
            key={title}
            className="p-4 rounded-lg border border-slate-800 bg-slate-900/30 text-slate-500 cursor-not-allowed"
          >
            <h3 className="text-lg font-semibold">{title} — Coming Soon</h3>
            <p className="text-xs">
              This article will be available after content finalization.
            </p>
          </div>
        ))}
      </div>

      <div className="pt-10">
        <Link
          href="/"
          className="text-indigo-400 hover:text-indigo-300 underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
