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
        .from("booking_requests")
        .select(`
          id,
          service,
          status,
          date_requested,
          created_at,
          client_id,
          provider_id
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("REQUESTS FETCH ERROR:", error);
      } else {
        setRequests(data || []);
      }

      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading booking requests…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold">Manage Requests</h1>
        <p className="opacity-70">
          View all requests across the platform
        </p>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow border border-black/10">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F4EFE9] text-left">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Provider</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t border-black/10">
                  <td className="p-4 font-medium">{r.service || "—"}</td>
                  <td className="p-4 capitalize">{r.status}</td>
                  <td className="p-4">
                    {r.date_requested
                      ? new Date(r.date_requested).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="p-4 text-xs opacity-70">{r.client_id}</td>
                  <td className="p-4 text-xs opacity-70">{r.provider_id}</td>

                  <td className="p-4">
                    <button
                      onClick={() => router.push(`/admin/requests/${r.id}`)}
                      className="px-3 py-1 rounded-full border hover:bg-black hover:text-white transition"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center opacity-70">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
