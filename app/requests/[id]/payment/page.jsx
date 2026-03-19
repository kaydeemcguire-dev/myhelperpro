"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function RequestPaymentPage() {
  const { id } = useParams(); // booking_requests.id
  const router = useRouter();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequest() {
      setLoading(true);

      // 1️⃣ Ensure user is logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // 2️⃣ Load the booking request
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("PAYMENT PAGE LOAD ERROR:", error);
        setLoading(false);
        return;
      }

      // 3️⃣ Only allow payment if request is accepted
      if (data.status !== "accepted") {
        router.push(`/requests/${id}`);
        return;
      }

      // 4️⃣ Only the customer can pay
      if (data.client_id !== user.id) {
        router.push("/");
        return;
      }

      setRequest(data);
      setLoading(false);
    }

    loadRequest();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] flex items-center justify-center p-6">
        Loading payment…
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] flex items-center justify-center p-6">
        Unable to load booking.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl p-8 shadow space-y-6">

        <h1 className="text-3xl font-semibold">
          Confirm Your Booking
        </h1>

        <p className="opacity-80">
          Your helper has accepted your request.  
          To confirm your booking and move forward, please complete payment.
        </p>

        <ul className="list-disc list-inside space-y-2 opacity-80">
          <li>Payment confirms your booking</li>
          <li>Contact details unlock after payment</li>
          <li>Your payment is processed securely</li>
        </ul>

        <div className="pt-4 space-y-3">
          {/* STRIPE PLACEHOLDER */}
          <button
            onClick={() => {
              alert(
                "Stripe checkout will be added next. This will redirect to secure payment."
              );
            }}
            className="w-full px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          >
            Continue to Secure Payment
          </button>

          <button
            onClick={() => router.push(`/requests/${id}`)}
            className="w-full px-6 py-3 rounded-full border hover:bg-black hover:text-white transition"
          >
            Back to Request Details
          </button>
        </div>

        <p className="text-xs opacity-60 pt-4">
          For everyone’s safety, contact details are shared only after payment
          is completed.
        </p>
      </div>
    </div>
  );
}
