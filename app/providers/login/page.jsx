"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function ProviderLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Login succeeded, but session could not be verified.");
      setLoading(false);
      return;
    }

    router.push("/providers/dashboard");
  }

  return (
    <div style={{ width: "100%", background: "#FAF6F1", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <section style={{ padding: "0 24px", marginTop: "24px" }}>
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
              padding: "0 16px",
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

      {/* HERO */}
      <section style={{ padding: "0 24px", marginTop: "24px" }}>
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
              top: "92px",
              maxWidth: "760px",
              color: "rgba(255,255,255,0.94)",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "44px", lineHeight: "50px", fontWeight: 800 }}>
              Provider Login
            </h1>
            <p style={{ margin: "14px 0 0", fontSize: "15px", lineHeight: "22px", maxWidth: "640px" }}>
              Access your provider dashboard and manage your profile.
              Messaging, booking, and payments are not yet enabled during beta.
            </p>
          </div>
        </div>
      </section>

      {/* FORM CARD */}
      <section style={{ maxWidth: "1120px", margin: "36px auto 0", padding: "0 24px" }}>
        <div
          style={{
            maxWidth: "520px",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #E6DED3",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
            Welcome back
          </h2>

          {/* BETA NOTICE */}
          <div
            style={{
              marginTop: "14px",
              padding: "14px",
              borderRadius: "18px",
              background: "#F7F2EA",
              border: "1px solid #E6DED3",
              fontSize: "13px",
              lineHeight: "18px",
              color: "#5C544E",
            }}
          >
            During beta, provider profiles can be created and refined.
            Messaging and booking features will open at launch.
          </div>

          <form
            onSubmit={handleLogin}
            style={{ marginTop: "18px", display: "grid", gap: "12px" }}
          >
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

          {/* SECONDARY ACTION */}
          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "#6B6258" }}>
              Not a provider yet?{" "}
            </span>
            <Link
              href="/providers/signup"
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#2B4A2F",
                textDecoration: "none",
              }}
            >
              Create your profile
            </Link>
          </div>
        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: "48px",
  borderRadius: "999px",
  border: "1px solid #E2D8CC",
  padding: "0 18px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
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
