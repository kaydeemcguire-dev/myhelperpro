"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function ProviderRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/providers/login");
        return;
      }

      const { data, error } = await supabase
        .from("booking_requests")
        .select(`
          id,
          client_id,
          service,
          details,
          date_requested,
          status,
          created_at
        `)
        .eq("provider_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setRequests(data || []);
      } else {
        setRequests([]);
      }

      setLoading(false);
    }

    loadRequests();
  }, [router]);

  function statusBadge(status) {
    const base =
      "px-3 py-1 rounded-full text-xs font-medium capitalize";

    if (status === "accepted")
      return `${base} bg-green-100 text-green-700`;
    if (status === "declined")
      return `${base} bg-red-100 text-red-700`;

    return `${base} bg-gray-100 text-gray-600`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading requests…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => router.push("/providers/dashboard")}
          className="mb-6 px-4 py-2 rounded-full border hover:bg-black hover:text-white transition"
        >
          ← Back to Dashboard
        </button>

        {/* BETA NOTICE */}
        <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-900">
          <p className="font-medium">
            🌱 Beta preview
          </p>
          <p className="mt-1 opacity-90">
            Customer requests, messaging, and responses are not yet active.
            This page shows how requests will appear after launch.
          </p>
        </div>

        <h1 className="text-3xl font-semibold mb-6">
          Requests (Coming Soon)
        </h1>

        {requests.length === 0 ? (
          <p className="opacity-70">
            Requests will appear here after beta launch.
          </p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-6 shadow space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    {req.service || "Service request"}
                  </h2>

                  <span className={statusBadge(req.status)}>
                    {req.status || "preview"}
                  </span>
                </div>

                {req.details && (
                  <p className="opacity-80">{req.details}</p>
                )}

                {req.date_requested && (
                  <p className="text-sm opacity-70">
                    Requested date:{" "}
                    {new Date(req.date_requested).toLocaleDateString()}
                  </p>
                )}

                <p className="text-xs opacity-60 pt-2">
                  Requests will be actionable after launch.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
