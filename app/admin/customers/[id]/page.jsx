"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

const OWNER_EMAIL = "kaydeemcguire@gmail.com";

export default function AdminCustomerDetailPage() {
  const router = useRouter();
  const { id } = useParams(); // profiles.id (uuid)

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/customers/login");
        return;
      }
      if (user.email !== OWNER_EMAIL) {
        router.push("/");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, phone, status, created_at")
        .eq("id", id)
        .single();

      if (error) {
        console.error("CUSTOMER FETCH ERROR:", error);
        setCustomer(null);
      } else {
        setCustomer(data);
      }

      setLoading(false);
    }

    load();
  }, [id, router]);


  /* 🔧 Update account status */
  async function setStatus(newStatus) {
    const { error } = await supabase
      .from("profiles")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Could not update account. (Check RLS)");
      console.error(error);
      return;
    }

    setCustomer((prev) => ({ ...prev, status: newStatus }));
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading customer…
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] p-6">
        <div className="bg-white rounded-2xl p-8 shadow border space-y-4 text-center">
          <h2 className="text-xl font-semibold">Customer not found</h2>
          <button
            onClick={() => router.push("/admin/customers")}
            className="px-5 py-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }


  const status = String(customer.status || "active").toLowerCase();

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-8">
      <div className="max-w-3xl mx-auto space-y-6">

        <button
          onClick={() => router.push("/admin/customers")}
          className="px-5 py-2 rounded-full border hover:bg-black hover:text-white transition"
        >
          ← Back to Customers
        </button>

        <div className="bg-white rounded-2xl p-8 shadow border space-y-6">

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">
                {customer.full_name || "Unnamed Customer"}
              </h1>
              <p className="opacity-70 capitalize">Status: {status}</p>
            </div>

            <div className="flex flex-col gap-2">
              {status !== "paused" ? (
                <button
                  onClick={() => setStatus("paused")}
                  className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition text-sm"
                >
                  Pause
                </button>
              ) : (
                <button
                  onClick={() => setStatus("active")}
                  className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition text-sm"
                >
                  Activate
                </button>
              )}

              <button
                onClick={() => setStatus("suspended")}
                className="px-4 py-2 rounded-full border hover:bg-red-600 hover:text-white text-sm"
              >
                Suspend
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Info label="Email" value={customer.email} />
            <Info label="Phone" value={customer.phone} />
            <Info label="User ID" value={customer.id} mono />
            <Info
              label="Created"
              value={customer.created_at ? new Date(customer.created_at).toLocaleString() : "—"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, mono }) {
  return (
    <div className="bg-[#FAF6F1] border rounded-xl p-4">
      <div className="text-xs opacity-70">{label}</div>
      <div className={mono ? "font-mono text-xs break-all" : ""}>
        {value || "—"}
      </div>
    </div>
  );
}
