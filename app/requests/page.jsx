"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function ClientRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      setLoading(true);

      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();

      if (userErr) {
        console.error("AUTH GET USER ERROR:", userErr);
      }

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("booking_requests")
        .select(`
          id,
          created_at,
          provider_id,
          service,
          details,
          date_requested,
          status
        `)
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("REQUESTS FETCH ERROR:", error);
        setRequests([]);
        setLoading(false);
        return;
      }

      setRequests(data || []);
      setLoading(false);
    }

    loadRequests();
  }, [router]);

  function statusPill(status) {
    const s = (status || "pending").toLowerCase();
    const base =
      "px-3 py-1 rounded-full text-xs font-medium border inline-block";

    if (s === "accepted")
      return `${base} border-green-600/30 text-green-700 bg-green-50`;
    if (s === "declined")
      return `${base} border-red-600/30 text-red-700 bg-red-50`;
    if (s === "confirmed")
      return `${base} border-indigo-600/30 text-indigo-700 bg-indigo-50`;

    return `${base} border-slate-400/40 text-slate-700 bg-white`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] flex items-center justify-center p-6">
        Loading your requests…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            ← Back
          </button>

          <button
            onClick={() => router.push("/providers")}
            className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            Browse Helpers
          </button>
        </div>

        <h1 className="text-3xl font-semibold mb-2">My Requests</h1>
        <p className="opacity-70 mb-6">
          Track requests you’ve sent and continue once a helper responds.
        </p>

        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow">
            <p className="opacity-70">You don’t have any requests yet.</p>
            <button
              onClick={() => router.push("/providers")}
              className="mt-4 px-6 py-3 rounded-full border hover:bg-black hover:text-white transition"
            >
              Find a Helper
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-6 shadow space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {req.service || "Service request"}
                    </h2>
                    <p className="text-sm opacity-70">
                      Sent{" "}
                      {req.created_at
                        ? new Date(req.created_at).toLocaleString()
                        : ""}
                    </p>
                  </div>

                  <span className={statusPill(req.status)}>
                    {(req.status || "pending").toLowerCase()}
                  </span>
                </div>

                {req.date_requested && (
                  <p className="text-sm opacity-80">
                    <strong>Preferred date:</strong>{" "}
                    {new Date(req.date_requested).toLocaleDateString()}
                  </p>
                )}

                {req.details ? (
                  <p className="opacity-80">{req.details}</p>
                ) : (
                  <p className="opacity-60">No details provided.</p>
                )}

                {/* View request details */}
                <div className="pt-2">
                  <button
                    onClick={() => router.push(`/requests/${req.id}`)}
                    className="text-sm underline opacity-80 hover:opacity-100"
                  >
                    View request details →
                  </button>
                </div>

                {/* ACCEPTED → PAYMENT */}
                {req.status === "accepted" && (
                  <div className="mt-4 p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-3">
                    <p className="text-sm text-indigo-900">
                      Your request was accepted. Proceed to payment to confirm
                      your booking and unlock contact details.
                    </p>

                    <button
                      onClick={() =>
                        router.push(`/requests/${req.id}/payment`)
                      }
                      className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                )}

                {/* CONFIRMED */}
                {req.status === "confirmed" && (
                  <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
                    <p className="text-sm text-green-800">
                      Booking confirmed. Contact details are now available.
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() =>
                      router.push(`/providers/${req.provider_id}`)
                    }
                    className="text-sm underline opacity-80 hover:opacity-100"
                  >
                    View provider profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
