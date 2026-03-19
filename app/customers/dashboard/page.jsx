"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function CustomerDashboard() {
const [userName, setUserName] = useState("");
const [userLastName, setUserLastName] = useState("");

useEffect(() => {
  async function loadProfile() {

    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    const uid = session.user.id;

    const { data } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", uid)
      .single();

    if (data?.full_name) {
      const parts = data.full_name.split(" ");
      setUserName(parts[0]);
      setUserLastName(parts.slice(1).join(" "));
    }

  }

  loadProfile();
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

  const softLink = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#2B4A2F",
    fontSize: "13px",
    fontWeight: 800,
    textDecoration: "none",
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
      {/* Background accents (kept subtle + behind surfaces) */}
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
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/logos/myhelperpro-logo-light-v2.svg"
            alt="MyHelperPro"
            style={{ height: "36px", width: "auto", display: "block" }}
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

      {/* Layout container */}
      <div style={{ position: "relative", zIndex: 5, maxWidth: "1120px", margin: "0 auto", padding: "0 24px 90px" }}>
        {/* Big soft surface so text is readable over background */}
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
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "34px" }}>
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
              {/* Profile block */}
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
                    boxShadow: "0 14px 30px rgba(0,0,0,0.06)",
                  }}
                >
                  {userName ? userName[0].toUpperCase() : "U"}
                </div>

                <div style={{ fontSize: "15px", fontWeight: 900, letterSpacing: "0.01em" }}>
                  {userName} {userLastName}
                </div>

                <div style={{ marginTop: "10px" }}>
                  <Link href="/providers" style={softLink}>
                    Browse pros <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {/* Nav */}
              <div style={{ marginTop: "10px" }}>
                <Link href="#" style={navLinkMuted}>
                  My Pros
                </Link>

                <div style={{ height: "8px" }} />

                <Link href="#" style={navLinkActive}>
                  My Projects
                </Link>

                <div style={{ height: "8px" }} />

                <Link href="#" style={navLinkMuted}>
                  Messaging
                </Link>

                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(230,222,211,0.95)" }}>
                  <Link href="/customers/profile" style={navLinkMuted}>
  Profile
</Link>

                  <div style={{ height: "8px" }} />

                  <Link href="#" style={navLinkMuted}>
                    Account
                  </Link>

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
    cursor: "pointer",
  }}
>
  Log out
</button>
                </div>
              </div>
            </aside>

            {/* Main */}
            <section style={{ minWidth: 0 }}>
              {/* Welcome */}
              <div style={{ padding: "8px 8px 18px" }}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "42px",
                    lineHeight: "46px",
                    fontWeight: 900,
                    letterSpacing: "-0.4px",
                  }}
                >
                  Welcome{userName ? `, ${userName}` : ""}.
                </h1>

                <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "22px", color: "rgba(58,48,42,0.70)" }}>
                  Manage your connections, projects, and messages with local professionals — as we carefully roll out new features.
                </p>
              </div>

              {/* Priority card */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #E6DED3",
                  borderRadius: "28px",
                  padding: "26px 26px",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.06)",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "22px", lineHeight: "28px", fontWeight: 900 }}>
                  Get priority access to messaging and bookings.
                </h2>

                <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "22px", color: "rgba(58,48,42,0.72)" }}>
                  During beta, payments and booking systems are not enabled. Join our priority list to be first notified when features launch.
                </p>

                <div style={{ marginTop: "14px" }}>
                  <Link href="/newsletter" style={pillButton}>
                    Join Priority Waitlist
                  </Link>
                </div>
              </div>

              {/* Cards */}
              <div style={{ marginTop: "16px", display: "grid", gap: "14px" }}>
                {/* My Projects */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid #E6DED3",
                    borderRadius: "28px",
                    padding: "22px 22px",
                    boxShadow: "0 18px 50px rgba(0,0,0,0.05)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "28px",
                      background: "linear-gradient(180deg, rgba(250,246,241,0.35), rgba(250,246,241,0.75))",
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    <div style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(58,48,42,0.55)" }}>
                      Beta
                    </div>
                    <h3 style={{ margin: "10px 0 0", fontSize: "20px", fontWeight: 900 }}>My Projects</h3>
                    <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "22px", color: "rgba(58,48,42,0.70)" }}>
                      View current and past projects and see which providers you’ve worked with.
                    </p>

                    <div
                      style={{
                        marginTop: "14px",
                        padding: "12px 14px",
                        borderRadius: "18px",
                        border: "1px dashed rgba(58,48,42,0.22)",
                        background: "rgba(250,246,241,0.70)",
                        color: "rgba(58,48,42,0.55)",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      Coming soon
                    </div>
                  </div>
                </div>

                {/* Messaging Center */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid #E6DED3",
                    borderRadius: "28px",
                    padding: "22px 22px",
                    boxShadow: "0 18px 50px rgba(0,0,0,0.05)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "28px",
                      background: "linear-gradient(180deg, rgba(250,246,241,0.35), rgba(250,246,241,0.75))",
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    <div style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(58,48,42,0.55)" }}>
                      Beta
                    </div>
                    <h3 style={{ margin: "10px 0 0", fontSize: "20px", fontWeight: 900 }}>Messaging Center</h3>
                    <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "22px", color: "rgba(58,48,42,0.70)" }}>
                      Contact and manage conversations with your selected professionals.
                    </p>

                    <div
                      style={{
                        marginTop: "14px",
                        padding: "12px 14px",
                        borderRadius: "18px",
                        border: "1px dashed rgba(58,48,42,0.22)",
                        background: "rgba(250,246,241,0.70)",
                        color: "rgba(58,48,42,0.55)",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      Coming soon
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust note */}
              <div style={{ marginTop: "18px", padding: "0 6px", fontSize: "12.5px", color: "rgba(58,48,42,0.60)", lineHeight: "18px" }}>
                MyHelperPro connects customers with independent local providers. Providers are not employees of MyHelperPro and manage their own services,
                pricing, and availability.
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
