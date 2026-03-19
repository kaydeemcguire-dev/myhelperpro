"use client";

import { useRouter } from "next/navigation";

export default function ProviderActionButton({ providerId }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/providers/${providerId}?request=true`)}
      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-lg transition"
    >
      Send Request (Beta)
    </button>
  );
}
