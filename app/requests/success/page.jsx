"use client";

import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow text-center space-y-6">

        <h1 className="text-3xl font-semibold">
          Request Sent Successfully
        </h1>

        <p className="text-base opacity-90">
          Your request has been sent to the provider.
        </p>

        <p className="text-sm opacity-80">
          They’ll review your request and respond soon.  
          You’ll be able to book and pay directly through MyHelperPro once those
          features launch.
        </p>

        {/* 🌱 BETA NOTICE */}
        <div className="rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-900 text-left">
          <p className="font-medium">
            🌱 MyHelperPro is currently in beta
          </p>
          <p className="mt-1 opacity-90">
            Payments and in-platform booking are coming soon.
            For now, this request lets providers know you’re interested.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#2B4A2F] text-white font-medium hover:bg-[#3d5f43] transition"
          >
            Back to Home
          </Link>

          <Link
            href="/providers"
            className="px-6 py-3 rounded-full border border-[#2B4A2F] text-[#2B4A2F] font-medium hover:bg-[#EAF4EB] transition"
          >
            Browse More Providers
          </Link>
        </div>

      </div>
    </div>
  );
}
