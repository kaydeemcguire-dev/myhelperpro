"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

const OWNER_EMAIL = "kaydeemcguire@gmail.com";

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    customers: 0,
    providers: 0,
    totalUsers: 0,
    requests: 0,
    accepted: 0,
  });

  /* --------------------------- AUTH CHECK --------------------------- */
  useEffect(() => {
    async function loadAdminData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      if (user.email !== OWNER_EMAIL) {
        router.push("/");
        return;
      }

      const [
        customersRes,
        providersRes,
        requestsRes,
        acceptedRes,
      ] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("providers").select("id", { count: "exact", head: true }),
        supabase.from("booking_requests").select("id", { count: "exact", head: true }),
        supabase
          .from("booking_requests")
          .select("id", { count: "exact", head: true })
          .eq("status", "accepted"),
      ]);

      setStats({
        customers: customersRes.count || 0,
        providers: providersRes.count || 0,
        totalUsers: (customersRes.count || 0) + (providersRes.count || 0),
        requests: requestsRes.count || 0,
        accepted: acceptedRes.count || 0,
      });

      setLoading(false);
    }

    loadAdminData();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF6F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading admin dashboard…
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#FAF6F1", position: "relative" }}>

      {/* Top Bar */}
      <div style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "34px 24px 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Link href="/">
          <img src="/logos/myhelperpro-logo-light-v2.svg" alt="MyHelperPro" style={{ height: "36px" }} />
        </Link>

        <button
          onClick={handleLogout}
          style={{
            height: "40px",
            padding: "0 16px",
            borderRadius: "999px",
            background: "#2B4A2F",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px 90px" }}>
        <div style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(14px)",
          borderRadius: "44px",
          padding: "36px",
          border: "1px solid rgba(230,222,211,0.85)",
          boxShadow: "0 30px 90px rgba(0,0,0,0.06)"
        }}>

          <h1 style={{ fontSize: "42px", fontWeight: 900, margin: 0 }}>
            Welcome, Kaydee.
          </h1>

          <p style={{ marginTop: "12px", color: "rgba(58,48,42,0.70)", fontSize: "14px" }}>
            Platform overview and operational controls.
          </p>

          {/* Stats Grid */}
          <div style={{
            marginTop: "28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px"
          }}>
            <StatCard label="Total Users" value={stats.totalUsers} />
            <StatCard label="Customers" value={stats.customers} />
            <StatCard label="Providers" value={stats.providers} />
            <StatCard label="Requests Created" value={stats.requests} />
            <StatCard label="Accepted Requests" value={stats.accepted} />
            <StatCard label="Platform Status" value="Healthy" highlight />
          </div>

          {/* Management Actions */}
          <div style={{
            marginTop: "36px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px"
          }}>
            <AdminActionCard
              title="Manage Providers"
              description="Approve, pause, suspend, and review providers"
              onClick={() => router.push("/admin/providers")}
            />
            <AdminActionCard
              title="Manage Customers"
              description="View and manage customer accounts"
              onClick={() => router.push("/admin/customers")}
            />
            <AdminActionCard
              title="Manage Requests"
              description="Monitor and review booking activity"
              onClick={() => router.push("/admin/requests")}
            />
          </div>

        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div style={{
      background: "#fff",
      border: highlight ? "1px solid #2B4A2F" : "1px solid #E6DED3",
      borderRadius: "22px",
      padding: "22px",
      boxShadow: "0 18px 50px rgba(0,0,0,0.05)"
    }}>
      <div style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(58,48,42,0.55)" }}>
        {label}
      </div>
      <div style={{ fontSize: "28px", fontWeight: 900, marginTop: "6px" }}>
        {value}
      </div>
    </div>
  );
}

function AdminActionCard({ title, description, onClick }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E6DED3",
      borderRadius: "22px",
      padding: "22px",
      boxShadow: "0 18px 50px rgba(0,0,0,0.05)"
    }}>
      <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 900 }}>
        {title}
      </h3>
      <p style={{ marginTop: "8px", fontSize: "14px", color: "rgba(58,48,42,0.70)" }}>
        {description}
      </p>
      <button
        onClick={onClick}
        style={{
          marginTop: "18px",
          height: "38px",
          padding: "0 14px",
          borderRadius: "999px",
          background: "#F7F2EA",
          border: "1px solid #E6DED3",
          fontSize: "13px",
          fontWeight: 800,
          cursor: "pointer"
        }}
      >
        Open →
      </button>
    </div>
  );
}
