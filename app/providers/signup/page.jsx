"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function ProviderSignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptsTerms, setAcceptsTerms] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    // -------- validation --------
    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!acceptsTerms) {
      setError("You must accept the terms to continue.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // -------- 1 Create auth user --------
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const user = authData?.user;

    if (!user) {
      setError("Account created, but session not available.");
      setLoading(false);
      return;
    }

    // -------- 2 Create provider profile --------
    const { error: providerError } = await supabase.from("providers").insert({
      auth_user_id: user.id,
      email,
      full_name: fullName,
      phone,
      location,
      has_read_safety: true,
      accepts_terms: true,
      status: "pending",
    });

    if (providerError) {
      setError(
        "Account created, but provider profile could not be created. Please contact support."
      );
      setLoading(false);
      return;
    }

    // -------- 3 Success --------
    router.push("/providers/dashboard");
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#FAF6F1" }}>
      {/* TOP BAR */}
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "18px 24px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
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
              whiteSpace: "nowrap",
            }}
          >
            Home
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: "0 24px", marginTop: "18px" }}>
        <div
          style={{
            position: "relative",
            maxWidth: "1120px",
            margin: "0 auto",
            height: "340px",
            borderRadius: "28px",
            overflow: "hidden",
            // ✅ FIX 1: Real hero image (was grey)
            backgroundImage: "url('/images/hero-gardener.jpg')",
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
                "linear-gradient(90deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.16) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "56px",
              right: "56px",
              top: "78px",
              maxWidth: "760px",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "44px",
                lineHeight: "50px",
                fontWeight: 900,
                letterSpacing: "-0.4px",
                textShadow: "0 2px 12px rgba(0,0,0,0.45)",
              }}
            >
              Join as a provider
            </h1>

            <p
              style={{
                margin: "12px 0 0",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "640px",
                opacity: 0.96,
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              }}
            >
              MyHelperPro is open for early registration and exploration. Additional features will be added
              after official launch. Join our mailing list for updates and early access.
            </p>

            <div style={{ marginTop: "18px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/newsletter"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "44px",
                  padding: "0 18px",
                  borderRadius: "999px",
                  background: "#2B4A2F",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.20)",
                }}
              >
                Get updates
              </Link>

              <Link
                href="/providers"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "44px",
                  padding: "0 18px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.92)",
                  color: "#2B4A2F",
                  fontSize: "14px",
                  fontWeight: 900,
                  textDecoration: "none",
                }}
              >
                Back to providers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: "1120px", margin: "28px auto 0", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "18px",
          }}
        >
          {/* BALANCED GRID */}
          <div
            style={{
              display: "grid",
              gap: "18px",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              alignItems: "start",
            }}
          >
            {/* FORM CARD */}
            <div
              style={{
                // ✅ FIX 2: prevent overflow/slipping
                boxSizing: "border-box",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",

                // ✅ FIX 3: subtle premium tint & depth
                background: "linear-gradient(180deg, #FFFFFF 0%, #FFF8EF 100%)",
                border: "1px solid #E6DED3",
                borderRadius: "28px",
                padding: "22px",
                boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: 900, color: "#3A302A" }}>
                Provider signup
              </div>
              <div style={{ marginTop: "6px", fontSize: "13px", color: "#6B615A", lineHeight: "18px" }}>
                Create your account now. Your profile will remain pending until launch.
              </div>

              {error && (
                <div style={{ marginTop: "10px", color: "#B91C1C", fontSize: "13px", fontWeight: 700 }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} style={{ marginTop: "14px", display: "grid", gap: "12px" }}>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  required
                  style={inputStyle}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  style={inputStyle}
                />

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  required
                  style={inputStyle}
                />

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or location"
                  required
                  style={inputStyle}
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={inputStyle}
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  style={inputStyle}
                />

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "13px",
                    color: "#5C544E",
                    lineHeight: "18px",
                    padding: "4px 2px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={acceptsTerms}
                    onChange={(e) => setAcceptsTerms(e.target.checked)}
                    style={{ marginTop: "2px" }}
                  />
                  I agree to the terms and safety guidelines.
                </label>

                <button disabled={loading} style={buttonStyle}>
                  {loading ? "Creating account…" : "Create account"}
                </button>
              </form>

              <div style={betaStyle}>
                <strong>Beta note:</strong> During early registration, MyHelperPro is not facilitating bookings,
                payments, or introductions between customers and providers. Additional features will be added
                after official launch.
              </div>
            </div>

            {/* SUPPORTING CARD (WHY JOIN) */}
            <div
              style={{
                boxSizing: "border-box",
                width: "100%",
                maxWidth: "100%",

                // ✅ FIX 3: higher-quality color + depth
                background: "linear-gradient(180deg, #FFFFFF 0%, #F4FAF5 100%)",
                border: "1px solid #DDE7DF",
                borderRadius: "28px",
                padding: "22px",
                boxShadow: "0 14px 34px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: 900, color: "#1F3B25" }}>
                Early provider perks
              </div>

              <div style={{ marginTop: "10px", fontSize: "13px", color: "#3F5144", lineHeight: "19px" }}>
                Join early to help shape a trusted, community centered platform and position your business for a
                strong start at launch.
              </div>

              <div
                style={{
                  marginTop: "14px",
                  background: "#FFFFFF",
                  border: "1px solid #DDE7DF",
                  borderRadius: "18px",
                  padding: "14px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 900, color: "#1F3B25" }}>
                  What you gain by registering early
                </div>

                <ul style={{ margin: "10px 0 0", paddingLeft: "18px", color: "#3F5144", fontSize: "13px" }}>
                  <li style={{ marginBottom: "6px" }}>Priority consideration for featured placement at launch</li>
                  <li style={{ marginBottom: "6px" }}>Profile review before public release</li>
                  <li style={{ marginBottom: "6px" }}>Early visibility when listings open</li>
                  <li style={{ marginBottom: "6px" }}>Direct updates as features roll out</li>
                  <li>Founding provider recognition</li>
                </ul>
              </div>

              <div style={{ marginTop: "14px", fontSize: "13px", color: "#4B5B50", lineHeight: "19px" }}>
                Want updates as we build? Join the mailing list and we will email you as we release new features.
              </div>

              <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link
                  href="/newsletter"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "42px",
                    padding: "0 16px",
                    borderRadius: "999px",
                    background: "#2B4A2F",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 900,
                    textDecoration: "none",
                    boxShadow: "0 10px 18px rgba(0,0,0,0.10)",
                  }}
                >
                  Join mailing list
                </Link>

                <Link
                  href="/providers"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "42px",
                    padding: "0 16px",
                    borderRadius: "999px",
                    background: "#FFFFFF",
                    border: "1px solid #DDE7DF",
                    color: "#2B4A2F",
                    fontSize: "13px",
                    fontWeight: 900,
                    textDecoration: "none",
                  }}
                >
                  Browse providers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: "90px" }} />
    </div>
  );
}

const inputStyle = {
  // ✅ FIX 2: clamp widths so inputs never overflow card
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "100%",
  borderRadius: "999px",
  border: "1px solid #D8CFC4",
  padding: "12px 14px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
};

const buttonStyle = {
  height: "48px",
  borderRadius: "999px",
  border: "none",
  background: "#2B4A2F",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 900,
  cursor: "pointer",
  boxShadow: "0 14px 30px rgba(0,0,0,0.12)",
};

const betaStyle = {
  marginTop: "14px",
  background: "#F7F2EA",
  border: "1px solid #E6DED3",
  borderRadius: "18px",
  padding: "12px 12px",
  color: "#5C544E",
  fontSize: "12.5px",
  lineHeight: "18px",
};
