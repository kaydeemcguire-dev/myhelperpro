"use client";

import Link from "next/link";

export default function FounderPage() {
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
            backgroundImage: "url('/images/hero-founder-california.jpg')",
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
              Meet the founder
            </h1>
            <p
              style={{
                margin: "14px 0 0",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "650px",
                opacity: 0.95,
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              }}
            >
              MyHelperPro was created in California with a simple intention: make it easier for families to discover trusted local professionals while giving providers a clean space to be seen for the quality of their work.
            </p>

            <div style={{ marginTop: "18px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/providers"
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
                Browse providers
              </Link>

              <Link
                href="/contact"
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
                Contact
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
            A calm place for connection
          </h2>
          <p style={{ margin: "10px 0 0", color: "#4B5563", fontSize: "14px", lineHeight: "22px" }}>
            MyHelperPro was designed to feel different from the pressure found on many other platforms. It is a place to browse, make connections, and support your neighbors and community.

The goal is simple: bring opportunity back into local homes and neighborhoods.

During beta, messaging and booking are turned off while we finish building. Full features will open when we officially launch.
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
                title: "Community first",
                text: "We are a community first platform connecting providers and families in a simple, straightforward way.",
              },
              {
                title: "Local community",
                text: "We believe connection goes beyond services. We support local providers, families, and the events and spaces that bring neighbors together..",
              },
              {
                title: "Built responsibly",
                text: "Beta is discovery-only. Features like messaging and payments come later.",
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
            <strong>Beta compliance note:</strong> Providers are independent and responsible for their own services.
            MyHelperPro does not employ providers and does not provide payments or bookings during beta.
          </div>
        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}
