"use client";

import Link from "next/link";

export default function HowItWorksPage() {
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
            backgroundImage: "url('/images/how-it-works-hero.jpg')",
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
              How MyHelperPro Works
            </h1>

            <p
              style={{
                margin: "14px 0 0",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "640px",
                opacity: 0.95,
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              }}
            >
              MyHelperPro is currently in early beta.

Messaging, booking, and payments are unavailable at this time.

You can explore provider profiles and learn about services as we continue building.

Join our Priority Access list to be the first to know when we go live.
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
            padding: "22px 22px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
            Three simple steps
          </h2>

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
                title: "1. Browse",
                text: "Explore trusted local professionals in your area.",
              },
              {
                title: "2. See What’s Coming",
                text: "Get a preview of features launching soon.",
              },
              {
                title: "3. Join the Waitlist",
                text: "Receive updates when messaging and booking open.",
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
                <div style={{ fontWeight: 900, fontSize: "14px", color: "#2B4A2F" }}>
                  {b.title}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    color: "#5C544E",
                    lineHeight: "18px",
                  }}
                >
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
            During beta, MyHelperPro facilitates discovery only. Providers are independent
            and responsible for their own services.
          </div>
        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}
