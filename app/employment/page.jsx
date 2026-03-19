"use client";

import Link from "next/link";

export default function EmploymentPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6 bg-white rounded-2xl shadow border border-black/10">
      <h1 className="text-3xl font-semibold">Employment & Opportunities</h1>

      <p className="opacity-80">
        Thank you for your interest in joining MyHelperPro. We are currently in our private beta.
        Employment roles are not open yet, but providers may apply to join the marketplace and
        customers may join the waitlist.
      </p>

      <div className="space-y-4 text-sm">
        <div className="p-4 bg-[#FAF6F1] border border-black/10 rounded-xl">
          <h2 className="font-semibold">Provider Opportunities</h2>
          <p className="opacity-80 text-sm mt-1">
            We are not hiring. Providers are **independent contractors** who operate their own
            businesses. Join as a provider here:
          </p>
          <Link
            href="/providers/signup"
            className="inline-block mt-3 px-5 py-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            Provider Sign Up →
          </Link>
        </div>

        <div className="p-4 bg-[#FAF6F1] border border-black/10 rounded-xl">
          <h2 className="font-semibold">Employee Positions</h2>
          <p className="opacity-80 text-sm mt-1">
            Employee roles (admin, support, compliance, growth) will be posted here once we open
            hiring.
          </p>
          <button className="mt-3 px-5 py-2 rounded-full border opacity-50 cursor-not-allowed">
            Check Back Soon
          </button>
        </div>
      </div>

      <div className="pt-6 border-t flex flex-col gap-2 text-sm">
        <p className="opacity-60 text-xs">Already work here?</p>
        <Link
          href="/admin/login"
          className="underline text-sm opacity-80 hover:opacity-100"
        >
          Staff / Admin Login →
        </Link>
      </div>
    </div>
  );
}
