"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import Link from "next/link";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function subscribe(e) {
    e.preventDefault();
    setStatus("");

    if (!email.includes("@")) {
      setStatus("Please enter a valid email address.");
      return;
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    if (error) {
      console.error("Newsletter insert error:", error);
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setEmail("");
    window.location.href = "/newsletter/success";
  }

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

      {/* HERO SECTION */}
      <section
        style={{
          padding: "0 24px",
          marginTop: "24px",
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: "1120px",
            margin: "0 auto",
            height: "360px",
            borderRadius: "28px",
            overflow: "hidden",
            backgroundImage: "url('/images/section-office-workspace.jpg')",
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
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.18) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "56px",
              right: "56px",
              top: "90px",
              maxWidth: "720px",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "42px",
                lineHeight: "48px",
                fontWeight: 800,
                letterSpacing: "-0.4px",
                textShadow: "0 2px 12px rgba(0,0,0,0.45)",
              }}
            >
              Stay connected
            </h1>

            <p
              style={{
                margin: "14px 0 0",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "520px",
                opacity: 0.95,
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              }}
            >
              Join our mailing list for updates on beta milestones,
              provider highlights, and new features as they launch.
            </p>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section
        style={{
          maxWidth: "640px",
          margin: "36px auto 0",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #E6DED3",
            borderRadius: "24px",
            padding: "28px 26px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 900,
              textAlign: "center",
              color: "#3A302A",
            }}
          >
            Join the MyHelperPro newsletter
          </h2>

          <p
            style={{
              margin: "10px 0 24px",
              textAlign: "center",
              fontSize: "14px",
              color: "#5C544E",
              lineHeight: "20px",
            }}
          >
            We are currently in beta. Emails will include early access announcements,
            local event invitations, and platform updates.
          </p>

          <form onSubmit={subscribe}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  minWidth: "220px",
                  height: "48px",
                  borderRadius: "999px",
                  border: "1px solid #E2D8CC",
                  background: "#F7F2EA",
                  padding: "0 18px",
                  fontSize: "14px",
                }}
              />

              <button
                type="submit"
                style={{
                  height: "48px",
                  padding: "0 24px",
                  borderRadius: "999px",
                  background: "#2B4A2F",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </div>
          </form>

          {status && (
            <p
              style={{
                marginTop: "16px",
                textAlign: "center",
                color: "#B91C1C",
                fontSize: "13px",
              }}
            >
              {status}
            </p>
          )}

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              href="/"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#2B4A2F",
                textDecoration: "none",
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}
