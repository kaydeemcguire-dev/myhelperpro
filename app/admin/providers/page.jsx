"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

const ADMIN_ID = "a2e4c2d4-3829-4e4e-a0e6-c45da6beeb54";

export default function AdminProvidersPage() {
  const router = useRouter();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function requireAdmin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      router.push("/providers/login");
      return null;
    }

    if (session.user.id !== ADMIN_ID) {
      setError("Access denied. Admins only.");
      setLoading(false);
      return null;
    }

    return session.user;
  }

  async function loadProviders() {
    setError("");

    const admin = await requireAdmin();
    if (!admin) return;

    const { data, error } = await supabase
      .from("providers")
      .select(`
        id,
        full_name,
        email,
        city,
        status,
        insurance_verified,
        license_verified,
        background_check_verified,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ADMIN LOAD ERROR:", error);
      setError("Failed to load providers.");
    } else {
      setProviders(data || []);
    }

    setLoading(false);
  }

  async function updateProvider(id, updates) {
    const { error } = await supabase
      .from("providers")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("UPDATE BLOCKED:", error);
      alert("Update blocked by RLS.");
      return;
    }

    loadProviders();
  }

  function handleCheckboxChange(provider, field) {
    updateProvider(provider.id, {
      [field]: !provider[field],
    });
  }

  function approveProvider(provider) {
    updateProvider(provider.id, { status: "active" });
  }

  function suspendProvider(provider) {
    updateProvider(provider.id, { status: "suspended" });
  }

  useEffect(() => {
    loadProviders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading admin dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] p-8 text-[#3A302A]">
      <div className="max-w-6xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold">
          Provider Administration
        </h1>

        {providers.length === 0 && (
          <p className="opacity-70">
            No providers found.
          </p>
        )}

        {providers.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-6 shadow space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-medium">
                  {p.full_name}
                </p>
                <p className="text-sm opacity-70">
                  {p.email}
                </p>
                {p.city && (
                  <p className="text-sm opacity-60">
                    {p.city}
                  </p>
                )}
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  p.status === "active"
                    ? "bg-green-100 text-green-700"
                    : p.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {p.status}
              </span>
            </div>

            {/* Verification checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!p.insurance_verified}
                  onChange={() =>
                    handleCheckboxChange(p, "insurance_verified")
                  }
                />
                Insurance verified
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!p.license_verified}
                  onChange={() =>
                    handleCheckboxChange(p, "license_verified")
                  }
                />
                License verified
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!p.background_check_verified}
                  onChange={() =>
                    handleCheckboxChange(p, "background_check_verified")
                  }
                />
                Background check verified
              </label>

            </div>

            {/* Status actions */}
            <div className="flex gap-3 pt-4 border-t">

              {p.status !== "active" && (
                <button
                  onClick={() => approveProvider(p)}
                  className="px-4 py-2 rounded bg-green-600 text-white text-sm"
                >
                  Approve Provider
                </button>
              )}

              {p.status === "active" && (
                <button
                  onClick={() => suspendProvider(p)}
                  className="px-4 py-2 rounded bg-red-600 text-white text-sm"
                >
                  Suspend Provider
                </button>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
