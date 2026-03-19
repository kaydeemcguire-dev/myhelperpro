"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function ProviderDashboard() {

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function loadProvider() {

      const {
  data: { user },
  error: userError
} = await supabase.auth.getUser();

      if (userError || !user) {
  window.location.href = "/providers/login";
  return;
}

      const uid = user.id;
      setUserId(uid);

      const { data, error } = await supabase
  .from("providers")
  .select("full_name")
  .eq("auth_user_id", uid)
  .maybeSingle();

if (error) {
  console.error("Provider lookup error:", error);
  return;
}

if (!data) {
  console.warn("Provider record not found yet.");
  return;
}

      if (data?.full_name) {
        const parts = data.full_name.split(" ");
        setUserName(parts[0]);
        setUserLastName(parts.slice(1).join(" "));
      }

    }

    loadProvider();
  }, []);

  const pillButton = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    padding: "0 16px",
    borderRadius: "999px",
    background: "#2B4A2F",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 800,
    textDecoration: "none",
    boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
    whiteSpace: "nowrap",
  };

  const navLinkBase = {
    display: "flex",
    alignItems: "center",
    height: "38px",
    padding: "0 12px",
    borderRadius: "12px",
    color: "#3A302A",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "0.01em",
  };

  const navLinkMuted = {
    ...navLinkBase,
    opacity: 0.78,
  };

  const navLinkActive = {
    ...navLinkBase,
    background: "#F7F2EA",
    border: "1px solid #E6DED3",
    opacity: 1,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FAF6F1",
        color: "#3A302A",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Background accents */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: "-220px",
          right: "-220px",
          width: "640px",
          height: "640px",
          background: "rgba(43, 74, 47, 0.05)",
          borderRadius: "9999px",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: "28%",
          left: "-220px",
          width: "620px",
          height: "620px",
          background: "rgba(230, 222, 211, 0.60)",
          borderRadius: "9999px",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />

      {/* Top Brand Bar */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "34px 24px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <img
            src="/logos/myhelperpro-logo-light-v2.svg"
            alt="MyHelperPro"
            style={{ height: "36px" }}
          />
        </Link>

        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(58,48,42,0.55)",
          }}
        >
          Beta dashboard
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px 90px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(14px)",
            borderRadius: "44px",
            padding: "36px",
            border: "1px solid rgba(230,222,211,0.85)",
            boxShadow: "0 30px 90px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "300px 1fr",
              gap: "34px",
            }}
          >
            {/* Sidebar */}
            <aside
              style={{
                background: "rgba(247,242,234,0.85)",
                border: "1px solid #E6DED3",
                borderRadius: "28px",
                padding: "18px 16px",
                boxShadow: "0 18px 50px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ textAlign: "center", padding: "10px 10px 14px" }}>
                <div
                  style={{
                    width: "88px",
                    height: "88px",
                    borderRadius: "999px",
                    background: "#E6DED3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    fontSize: "22px",
                    fontWeight: 900,
                    color: "#2B4A2F",
                  }}
                >
                  {userName ? userName[0].toUpperCase() : "P"}
                </div>

                <div style={{ fontSize: "15px", fontWeight: 900 }}>
                  {userName} {userLastName}
                </div>
              </div>

              <Link href="#" style={navLinkActive}>My Projects</Link>
              <div style={{ height: "8px" }} />
              <Link href="#" style={navLinkMuted}>My Bookings</Link>
              <div style={{ height: "8px" }} />
              <Link href="#" style={navLinkMuted}>Message Center</Link>
              <div style={{ height: "8px" }} />
              <Link href="#" style={navLinkMuted}>Premium Leads</Link>

              <Link href="/providers/edit-profile" style={navLinkMuted}>Profile</Link>
              <div style={{ height: "8px" }} />
              <Link href="/providers/photos" style={navLinkMuted}>Portfolio</Link>
              <div style={{ height: "8px" }} />
              <Link href="#" style={navLinkMuted}>Ratings (Coming Soon)</Link>
              <div style={{ height: "8px" }} />
              <Link href="#" style={navLinkMuted}>Reviews (Coming Soon)</Link>

              <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(230,222,211,0.95)" }}>
                <Link href="/providers/documents" style={navLinkMuted}>Document</Link>
                <div style={{ height: "8px" }} />
                <Link href="#" style={navLinkMuted}>Account</Link>
                <div style={{ height: "8px" }} />
                <button
  onClick={async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  }}
  style={{
    ...navLinkMuted,
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer"
  }}
>
  Log out
</button>
              </div>
            </aside>

            {/* Main */}
            <section>
              <h1 style={{ margin: 0, fontSize: "42px", fontWeight: 900 }}>
              Welcome{userName ? `, ${userName}` : ""}.
              </h1>

              <p style={{ margin: "12px 0 24px", fontSize: "14px", lineHeight: "22px", color: "rgba(58,48,42,0.70)" }}>
                Manage your public profile, portfolio, bookings, and visibility.
              </p>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #E6DED3",
                  borderRadius: "28px",
                  padding: "26px",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.06)",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
                  Complete your profile for launch visibility.
                </h2>

                <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "22px", color: "rgba(58,48,42,0.72)" }}>
                  Profiles with full details, portfolio images, ratings, and verification documents will be prioritized when search goes live.
                </p>

                <div
  style={{
    marginTop: "16px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  }}
>
  <Link href="/providers/edit-profile" style={pillButton}>
    Edit Profile
  </Link>

  <Link href="/providers/avatar" style={pillButton}>
    Upload Profile Photo
  </Link>

  {userId && (
    <Link
      href={`/providers/${userId}`}
      target="_blank"
      style={pillButton}
    >
      View Public Profile
    </Link>
  )}
</div>
              </div>

              {/* Beta Disclaimer */}
              <div
                style={{
                  marginTop: "18px",
                  padding: "0 6px",
                  fontSize: "12.5px",
                  color: "rgba(58,48,42,0.60)",
                  lineHeight: "18px",
                }}
              >
                This dashboard is currently in beta. Features such as messaging,
                premium lead delivery, and booking management are actively being
                developed and will roll out gradually.
                <br /><br />
                <strong>Founding provider beta.</strong>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
