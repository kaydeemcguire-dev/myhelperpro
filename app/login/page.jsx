"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div style={{ width: "100%" }}>

      {/* TOP BAR — ADDED ONLY */}
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

      {/* ORIGINAL HERO — UNCHANGED */}
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
              Log in
            </h1>
            <p style={{ margin: "14px 0 0", fontSize: "15px", lineHeight: "22px", maxWidth: "650px" }}>
              Beta access is focused on provider profiles and discovery. Sign-in can be connected when you’re ready.
            </p>
          </div>
        </div>
      </section>

      {/* ORIGINAL FORM SECTION — UNCHANGED */}
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
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900 }}>Welcome back</h2>
          <p style={{ margin: "10px 0 0", color: "#4B5563", fontSize: "13px", lineHeight: "18px" }}>
            This page is styled to match the site. Authentication wiring can be added later.
          </p>

          <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
            <input placeholder="Email" style={inputStyle} />
            <input placeholder="Password" type="password" style={inputStyle} />

            <button style={buttonStyle}>Log in</button>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/providers/signup" style={linkStyle}>
                Create a provider profile
              </Link>
              <Link href="/contact" style={linkStyle}>
                Need help?
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
