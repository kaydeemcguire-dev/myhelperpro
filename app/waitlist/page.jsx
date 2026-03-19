"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

const OWNER_EMAIL = "kaydeemcguire@gmail.com";

export default function AdminWaitlistPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [waitlist, setWaitlist] = useState([]);

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
        .from("waitlist_customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setWaitlist(data || []);

      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
        Loading waitlist…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        <button
          onClick={() => router.push("/admin")}
          className="px-4 py-2 border rounded-full hover:bg-black hover:text-white transition"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-semibold">Customer Waitlist</h1>
        <p className="opacity-70">Early access waitlist entries</p>

        {waitlist.length === 0 ? (
          <p className="opacity-70">No one has joined the waitlist yet.</p>
        ) : (
          <div className="space-y-3">
            {waitlist.map((person) => (
              <div
                key={person.id}
                className="bg-white border border-black/10 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{person.email}</div>
                  <div className="text-xs opacity-60">
                    {new Date(person.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
