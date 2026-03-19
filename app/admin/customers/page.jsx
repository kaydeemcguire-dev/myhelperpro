"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

const OWNER_EMAIL = "kaydeemcguire@gmail.com"; // change ONLY if owner changes

export default function AdminCustomersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // 1️⃣ Check login + owner
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return router.push("/customers/login");
      if (user.email !== OWNER_EMAIL) return router.push("/");

      // 2️⃣ Fetch customers from profiles table
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, status, created_at");

      if (error) {
        console.error("LOAD CUSTOMERS ERROR:", error);
        setCustomers([]);
      } else {
        setCustomers(data || []);
      }

      setLoading(false);
    }

    load();
  }, [router]);

  // 3️⃣ Update user status
  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from("profiles")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("STATUS UPDATE ERROR:", error);
      alert("Could not update user status. (Check RLS policy)");
      return;
    }

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading customers…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <button
          onClick={() => router.push("/admin")}
          className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-semibold">Manage Customers</h1>
        <p className="opacity-70 mb-6">Pause, activate, or suspend accounts.</p>

        {/* LIST */}
        <div className="space-y-4">
          {customers.map((c) => {
            const status = (c.status || "active").toLowerCase();
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-6 shadow border border-black/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="text-sm">
                  <div className="font-semibold text-base">{c.full_name || "Unnamed"}</div>
                  <div className="opacity-70">{c.email}</div>
                  <div className="opacity-50 text-xs mt-1">
                    Status: <span className="capitalize">{status}</span>
                  </div>
                  <div className="opacity-40 text-xs">
                    ID: {c.id}
                  </div>
                </div>

                <div className="flex gap-2">
                  {status !== "paused" ? (
                    <button
                      onClick={() => updateStatus(c.id, "paused")}
                      className="px-4 py-2 text-sm rounded-full border hover:bg-yellow-100 transition"
                    >
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(c.id, "active")}
                      className="px-4 py-2 text-sm rounded-full border hover:bg-green-100 transition"
                    >
                      Activate
                    </button>
                  )}

                  <button
                    onClick={() => updateStatus(c.id, "suspended")}
                    className="px-4 py-2 text-sm rounded-full border hover:bg-red-200 transition"
                  >
                    Suspend
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {customers.length === 0 && (
          <div className="bg-white border border-black/10 p-8 rounded-xl text-center opacity-70">
            No customer accounts found.
          </div>
        )}

      </div>
    </div>
  );
}
