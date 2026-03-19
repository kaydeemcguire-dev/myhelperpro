"use client";

import Link from "next/link";

export default function ProvidersHowItWorksPage() {
  return (
    <div style={{ width: "100%", background: "#FAF6F1", minHeight: "100vh" }}>
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
              maxWidth: "820px",
              color: "rgba(255,255,255,0.94)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "44px",
                lineHeight: "50px",
                fontWeight: 800,
                letterSpacing: "-0.4px",
                textShadow: "0 2px 12px rgba(0,0,0,0.45)",
              }}
            >
              How MyHelperPro works for providers
            </h1>

            <p
              style={{
                margin: "14px 0 0",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "720px",
                opacity: 0.95,
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              }}
            >
              A professional space where your reputation and quality of work can speak for themselves.

During beta, you can create your profile and prepare for full launch. Messaging, booking, and subscription features will be introduced later.
            </p>

            <div style={{ marginTop: "18px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/providers/signup"
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
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.20)",
                }}
              >
                Create provider profile
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
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                Browse providers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section style={{ maxWidth: "1120px", margin: "36px auto 0", padding: "0 24px" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #E6DED3",
            borderRadius: "22px",
            padding: "20px 20px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
            A clear path to launch
          </h2>
          <p style={{ margin: "10px 0 0", color: "#4B5563", fontSize: "14px", lineHeight: "22px" }}>
            We are currently in beta as we shape the platform carefully. This stage is focused on profile quality, documentation, and building trust before messaging and booking features are enabled.
          </p>

          <div
            style={{
              marginTop: "16px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "14px",
            }}
          >
            {[
              {
                title: "1. Build your profile",
                text:
                  "Create a complete profile that reflects your services, experience, and location. .",
              },
              {
                title: "2. Prepare for launch",
                text:
                  "Upload and organize documentation, add portfolio photos, and ensure your profile details are accurate and up to date.",
              },
              {
                title: "3. Connect when we go live",
                text:
                  "Once messaging opens, customers will be able to contact you directly. Additional tools may become available as features are enabled.",
              },
            ].map((b) => (
              <div
                key={b.title}
                style={{
                  background: "#F7F2EA",
                  border: "1px solid #E6DED3",
                  borderRadius: "18px",
                  padding: "14px 14px",
                }}
              >
                <div style={{ fontWeight: 900, fontSize: "14px", color: "#2B4A2F" }}>{b.title}</div>
                <div style={{ marginTop: "8px", fontSize: "13px", color: "#5C544E", lineHeight: "18px" }}>
                  {b.text}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "16px",
              fontSize: "12.5px",
              color: "#6B6258",
              lineHeight: "18px",
              background: "#FAF6F1",
              border: "1px solid #E6DED3",
              borderRadius: "16px",
              padding: "12px 12px",
            }}
          >
            <strong>Provider note:</strong> MyHelperPro is a marketplace platform and does not employ providers.
            Providers are independent and responsible for their own services, pricing, licensing, insurance, and
            compliance with local regulations.
          </div>
        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}
