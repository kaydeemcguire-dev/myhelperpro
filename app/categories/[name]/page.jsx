"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function CategoryProvidersPage() {
  const params = useParams();
  const categoryName = params?.name?.toString().toLowerCase().trim();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryName) return;

    async function loadProviders() {
      const { data, error } = await supabase
        .from("providers")
        .select(
          "auth_id, full_name, city, services, experience, status, category"
        )
        .eq("status", "active");

      if (!error && data) {
        const filtered = data.filter((p) => {
          // Primary match: category column
          if (p.category) {
            return p.category.toLowerCase() === categoryName;
          }

          // Fallback: services text
          if (typeof p.services === "string") {
            return p.services.toLowerCase().includes(categoryName);
          }

          // Fallback: services array
          if (Array.isArray(p.services)) {
            return p.services
              .map((s) => s.toLowerCase())
              .includes(categoryName);
          }

          return false;
        });

        setProviders(filtered);
      }

      setLoading(false);
    }

    loadProviders();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading helpers…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Top nav */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold hover:underline">
            MyHelperPro
          </Link>

          <Link href="/providers" className="text-sm hover:underline">
            ← All Providers
          </Link>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-semibold mb-2 capitalize">
            {categoryName}
          </h1>
          <p className="opacity-70">
            Browse available helpers offering this service.
          </p>
        </div>

        {/* Empty state */}
        {providers.length === 0 && (
          <p className="opacity-70">
            No active providers found for this category.
          </p>
        )}

        {/* Provider cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {providers.map((p) => (
            <div
              key={p.auth_id}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">
                {p.full_name}
              </h2>

              {p.city && (
                <p className="text-sm opacity-70">
                  {p.city}
                </p>
              )}

              {p.services && (
                <p className="mt-2 text-sm">
                  <strong>Services:</strong> {p.services}
                </p>
              )}

              {p.experience && (
                <p className="text-sm">
                  <strong>Experience:</strong> {p.experience} years
                </p>
              )}

              <Link
                href={`/providers/${p.auth_id}`}
                className="inline-block mt-4 text-sm underline hover:opacity-80"
              >
                View Profile →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
