"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function CustomerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/customers/dashboard");
  }

  return (
    <div style={{ background: "#FAF6F1", minHeight: "100vh" }}>

      {/* ================= TOP BAR ================= */}
      <section style={{ padding: "24px" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src="/logos/myhelperpro-logo-light-v2.svg"
              alt="MyHelperPro"
              style={{ height: "44px", width: "auto", display: "block" }}
            />
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              padding: "0 18px",
              borderRadius: "999px",
              background: "#2B4A2F",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
            }}
          >
            Home
          </Link>
        </div>
      </section>

      {/* ================= HERO ================= */}
      <section style={{ padding: "0 24px" }}>
        <div
          style={{
            position: "relative",
            maxWidth: "1120px",
            margin: "0 auto",
            height: "420px",
            borderRadius: "28px",
            overflow: "hidden",
            backgroundImage: "url('/images/section-lifestyle-warmth.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid #E6DED3",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.18) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "56px",
              right: "56px",
              top: "100px",
              maxWidth: "780px",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "44px",
                lineHeight: "50px",
                fontWeight: 900,
              }}
            >
              Log in or create your account
            </h1>

            <p
              style={{
                margin: "16px 0 0",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "650px",
              }}
            >
              MyHelperPro is currently in beta. Explore providers and join our
              priority list while we complete platform features.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FORM CARD ================= */}
      <section style={{ maxWidth: "1120px", margin: "40px auto 0", padding: "0 24px" }}>
        <div
          style={{
            maxWidth: "520px",
            margin: "0 auto",
            background: "#ffffff",
            border: "1px solid #E6DED3",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
            Welcome back
          </h2>

          {/* BETA NOTICE */}
          <div
            style={{
              marginTop: "18px",
              padding: "16px",
              borderRadius: "18px",
              background: "#F3F7F3",
              border: "1px solid #DCE8DC",
              fontSize: "13px",
              lineHeight: "18px",
              color: "#2B4A2F",
            }}
          >
            During beta, messaging and booking are not yet enabled. You can
            explore providers and join our priority access list.
          </div>

          <form onSubmit={handleLogin} style={{ marginTop: "20px", display: "grid", gap: "14px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />

            {error && (
              <p style={{ color: "#B91C1C", fontSize: "13px" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Signing in…" : "Log In"}
            </button>
          </form>

          {/* Secondary Links */}
          <div style={{ marginTop: "18px", fontSize: "13px" }}>
            <Link href="/customers/signup" style={linkStyle}>
              Create an account
            </Link>
            <br />
            <Link href="/newsletter" style={linkStyle}>
              Join the priority access list
            </Link>
          </div>
        </div>
      </section>

      <div style={{ height: "100px" }} />
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const inputStyle = {
  width: "100%",
  height: "48px",
  borderRadius: "999px",
  border: "1px solid #E2D8CC",
  padding: "0 18px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};

const buttonStyle = {
  height: "48px",
  borderRadius: "999px",
  background: "#2B4A2F",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
};

const linkStyle = {
  color: "#2B4A2F",
  fontWeight: 800,
  textDecoration: "none",
};