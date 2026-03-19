"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

const OWNER_EMAIL = "kaydeemcguire@gmail.com";

export default function AdminRequestsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // 1️⃣ Auth check
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("AUTH ERROR:", authError);
      }

      if (!user) {
        router.push("/customers/login");
        return;
      }

      if (user.email !== OWNER_EMAIL) {
        router.push("/");
        return;
      }

      // 2️⃣ Fetch ALL booking requests
      const { data, error } = await supabase
        .from("booking_requests")
        .select(`
          id,
          created_at,
          client_id,
          provider_id,
          service,
          status,
          date_requested
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("ADMIN REQUEST FETCH ERROR:", error);
        setRequests([]);
      } else {
        setRequests(data || []);
      }

      setLoading(false);
    }

    load();
  }, [router]);

  async function cancelRequest(id) {
    const confirm = window.confirm(
      "Cancel this request? This cannot be undone."
    );

    if (!confirm) return;

    const { error } = await supabase
      .from("booking_requests")
      .update({ status: "cancelled" })
      .eq("id", id);

    if (error) {
      console.error("REQUEST CANCEL ERROR:", error);
      alert("Could not cancel request.");
      return;
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "cancelled" } : r
      )
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading requests…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-6">

        <button
          onClick={() => router.push("/admin")}
          className="px-5 py-2 rounded-full border hover:bg-black hover:text-white transition"
        >
          ← Back to Admin Dashboard
        </button>

        <h1 className="text-3xl font-semibold">Requests Management</h1>
        <p className="opacity-70">
          View and manage all booking requests on the platform.
        </p>

        {requests.length === 0 ? (
          <p className="opacity-70">No requests found.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-6 shadow border border-black/10 space-y-3"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="font-semibold text-lg">
                      {req.service || "Service request"}
                    </div>
                    <div className="text-sm opacity-70">
                      Created{" "}
                      {req.created_at
                        ? new Date(req.created_at).toLocaleString()
                        : "—"}
                    </div>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full border capitalize">
                    {req.status || "pending"}
                  </span>
                </div>

                {req.date_requested && (
                  <div className="text-sm opacity-80">
                    Preferred date:{" "}
                    {new Date(req.date_requested).toLocaleDateString()}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="font-mono break-all">
                    client_id: {req.client_id}
                  </div>
                  <div className="font-mono break-all">
                    provider_id: {req.provider_id}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() =>
                      router.push(`/requests/${req.id}`)
                    }
                    className="text-sm underline opacity-80 hover:opacity-100"
                  >
                    View details
                  </button>

                  {req.status !== "cancelled" && (
                    <button
                      onClick={() => cancelRequest(req.id)}
                      className="text-sm underline text-red-600 hover:text-red-800"
                    >
                      Cancel request
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
