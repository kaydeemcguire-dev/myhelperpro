"use client";

import Link from "next/link";

export default function NewsletterSuccessPage() {
  return (
    <div style={{ width: "100%", background: "#FAF6F1", minHeight: "100vh" }}>

      {/* CENTERED SUCCESS CARD */}
      <section
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
            background: "#ffffff",
            border: "1px solid #E6DED3",
            borderRadius: "28px",
            padding: "48px 42px",
            textAlign: "center",
            boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: 800,
              color: "#2B4A2F",
              letterSpacing: "-0.4px",
            }}
          >
            You're subscribed
          </h1>

          <p
            style={{
              marginTop: "18px",
              fontSize: "15px",
              lineHeight: "24px",
              color: "#5C544E",
            }}
          >
            Thank you for joining our mailing list.  
            We’ll send thoughtful updates as MyHelperPro grows and new features launch.
          </p>

          <div style={{ marginTop: "36px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "52px",
                padding: "0 34px",
                borderRadius: "999px",
                background: "#2B4A2F",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 18px 36px rgba(0,0,0,0.14)",
              }}
            >
              Return home
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}