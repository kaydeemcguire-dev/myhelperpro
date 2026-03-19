"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function CustomerSignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (!email || !password || !fullName) {
      setError("All fields are required.");
      return;
    }

    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const user = data.user;

const { error: profileError } = await supabase.from("profiles").insert({
  id: user.id,
  email: email,
  full_name: fullName,
  agreed_to_terms: true,
  agreement_timestamp: new Date().toISOString(),
});

    if (profileError) {
      setError("Profile creation failed. Please contact support.");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/customers/login");
  }

  return (
    <div style={{ width: "100%" }}>

      {/* ================= TOP BAR ================= */}
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

      {/* ================= HERO ================= */}
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
              maxWidth: "780px",
              color: "rgba(255,255,255,0.94)",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "44px", lineHeight: "50px", fontWeight: 800 }}>
              Create your account
            </h1>
            <p style={{ margin: "14px 0 0", fontSize: "15px", lineHeight: "22px", maxWidth: "650px" }}>
              During beta, messaging and booking are not yet enabled. Create your profile now and be ready when we launch.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section style={{ maxWidth: "1120px", margin: "36px auto 0", padding: "0 24px" }}>
        <div
          style={{
            maxWidth: "520px",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #E6DED3",
            borderRadius: "22px",
            padding: "18px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900 }}>
            Join MyHelperPro
          </h2>

          <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={inputStyle}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />

            <label style={{ fontSize: "13px", lineHeight: "18px", display: "flex", gap: "8px" }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                required
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" style={linkStyle}>Terms</Link>{" "}
                and{" "}
                <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>.
              </span>
            </label>

            {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

            <button type="submit" onClick={handleSignup} style={buttonStyle}>
              {loading ? "Creating…" : "Create Account"}
            </button>

            <div style={{ fontSize: "13px" }}>
              Already have an account?{" "}
              <Link href="/customers/login" style={linkStyle}>
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: "44px",
  borderRadius: "999px",
  border: "1px solid #E2D8CC",
  background: "#fff",
  padding: "0 16px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  height: "44px",
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
  fontSize: "13px",
  fontWeight: 800,
  textDecoration: "none",
};
