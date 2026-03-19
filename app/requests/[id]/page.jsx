"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function RequestDetailPage() {
  const { id } = useParams(); // booking_requests.id
  const router = useRouter();

  const [request, setRequest] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "customer" | "provider"
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadRequest() {
      setLoading(true);
      setErrorMsg("");

      // 1️⃣ Get logged-in user
      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();

      if (userErr) {
        console.error("AUTH ERROR:", userErr);
      }

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      // 2️⃣ Fetch request
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("REQUEST LOAD ERROR:", error);
        setErrorMsg("Unable to load this request.");
        setLoading(false);
        return;
      }

      setRequest(data);

      // 3️⃣ Determine role
      if (data.client_id === user.id) {
        setRole("customer");
      } else if (data.provider_id === user.id) {
        setRole("provider");
      } else {
        setRole(null);
      }

      setLoading(false);
    }

    loadRequest();
  }, [id, router]);

  async function updateStatus(newStatus) {
    if (!request) return;

    setActing(true);
    setErrorMsg("");

    const { error } = await supabase
      .from("booking_requests")
      .update({ status: newStatus })
      .eq("id", request.id);

    if (error) {
      console.error("STATUS UPDATE ERROR:", error);
      setErrorMsg("Could not update request. Please try again.");
      setActing(false);
      return;
    }

    setRequest((prev) => ({ ...prev, status: newStatus }));
    setActing(false);
  }

  function StatusPill({ status }) {
    const s = (status || "pending").toLowerCase();
    const base =
      "px-3 py-1 rounded-full text-xs font-medium border inline-block";

    if (s === "accepted")
      return (
        <span className={`${base} border-green-600/30 text-green-700 bg-green-50`}>
          accepted
        </span>
      );

    if (s === "declined")
      return (
        <span className={`${base} border-red-600/30 text-red-700 bg-red-50`}>
          declined
        </span>
      );

    if (s === "confirmed")
      return (
        <span className={`${base} border-indigo-600/30 text-indigo-700 bg-indigo-50`}>
          confirmed
        </span>
      );

    return (
      <span className={`${base} border-slate-400/40 text-slate-700 bg-white`}>
        pending
      </span>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading request…
      </div>
    );
  }

  if (!request || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Request not found or access denied.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6">

        <button
          onClick={() => router.back()}
          className="text-sm underline opacity-70 hover:opacity-100"
        >
          ← Back
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">
              {request.service || "Service Request"}
            </h1>
            <p className="text-sm opacity-70">
              Sent{" "}
              {request.created_at
                ? new Date(request.created_at).toLocaleString()
                : ""}
            </p>
          </div>

          <StatusPill status={request.status} />
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
            {errorMsg}
          </div>
        )}

        {request.date_requested && (
          <p className="text-sm">
            <strong>Preferred date:</strong>{" "}
            {new Date(request.date_requested).toLocaleDateString()}
          </p>
        )}

        {request.details ? (
          <p className="opacity-80">{request.details}</p>
        ) : (
          <p className="opacity-60">No additional details provided.</p>
        )}

        {/* PROVIDER ACTIONS */}
        {role === "provider" && request.status === "pending" && (
          <div className="flex gap-4 pt-4">
            <button
              disabled={acting}
              onClick={() => updateStatus("accepted")}
              className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-500 transition disabled:opacity-60"
            >
              {acting ? "Updating..." : "Accept Request"}
            </button>

            <button
              disabled={acting}
              onClick={() => updateStatus("declined")}
              className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-60"
            >
              {acting ? "Updating..." : "Decline"}
            </button>
          </div>
        )}

        {/* CUSTOMER STATES */}
        {role === "customer" && request.status === "pending" && (
          <p className="text-sm opacity-70">
            The provider is reviewing your request.
          </p>
        )}

        {role === "customer" && request.status === "accepted" && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-2">
            <p className="font-medium text-indigo-900">
              Your request was accepted 🎉
            </p>
            <p className="text-sm text-indigo-800">
              Proceed to payment to confirm your booking and unlock contact
              details.
            </p>

            <button
              onClick={() => router.push(`/requests/${request.id}/payment`)}
              className="mt-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {role === "customer" && request.status === "declined" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">
              This request was declined. You may browse other helpers and submit
              a new request.
            </p>
          </div>
        )}

        {request.status === "confirmed" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-800">
              Booking confirmed. Contact details are now available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
