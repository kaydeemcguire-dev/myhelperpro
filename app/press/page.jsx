"use client";

import Link from "next/link";

export default function PressPage() {
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
          }}
        >
          <Link href="/" style={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src="/logos/myhelperpro-logo-light-v2.svg"
              alt="MyHelperPro"
              style={{ height: "46px", width: "auto", display: "block" }}
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
            backgroundImage: "url('/images/section-press-professional.jpg')",
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
              }}
            >
              Press & Updates
            </h1>

            <p
              style={{
                marginTop: "14px",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "640px",
              }}
            >
              Official announcements, beta updates, and brand information.
            </p>

            <div style={{ marginTop: "20px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link
                href="/newsletter"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "46px",
                  padding: "0 22px",
                  borderRadius: "999px",
                  background: "#2B4A2F",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.18)",
                }}
              >
                Subscribe for updates
              </Link>

              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "46px",
                  padding: "0 22px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.92)",
                  color: "#2B4A2F",
                  fontSize: "14px",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                Press contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section style={{ maxWidth: "1120px", margin: "48px auto 0", padding: "0 24px" }}>

        {/* BRAND SUMMARY */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #E6DED3",
            borderRadius: "28px",
            padding: "36px",
            boxShadow: "0 18px 44px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 900 }}>
            About MyHelperPro
          </h2>

          <p
            style={{
              marginTop: "16px",
              fontSize: "15px",
              lineHeight: "24px",
              color: "#5C544E",
              maxWidth: "760px",
            }}
          >
            MyHelperPro is a community first platform designed to help families
            discover independent local service providers. During beta, the
            platform is focused on structured profiles and visibility.
            Booking, messaging, and payment features will launch in a phased
            and compliant rollout.
          </p>
        </div>

        {/* SECONDARY SECTION */}
        <div
          style={{
            marginTop: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {/* PRESS INQUIRIES */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #E6DED3",
              borderRadius: "28px",
              padding: "28px",
              boxShadow: "0 14px 34px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: "18px" }}>
              Press inquiries
            </div>

            <p
              style={{
                marginTop: "12px",
                fontSize: "14px",
                lineHeight: "22px",
                color: "#5C544E",
              }}
            >
              For interviews, partnerships, or local feature stories,
              please contact us and include “Press” in your subject line.
            </p>

            <div style={{ marginTop: "20px" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "46px",
                  padding: "0 22px",
                  borderRadius: "999px",
                  background: "#2B4A2F",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 16px 32px rgba(0,0,0,0.14)",
                }}
              >
                Contact press
              </Link>
            </div>
          </div>

          {/* BETA NOTE */}
          <div
            style={{
              background: "#F7F2EA",
              border: "1px solid #E6DED3",
              borderRadius: "28px",
              padding: "28px",
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: "18px",
                color: "#2B4A2F",
              }}
            >
              Beta status
            </div>

            <p
              style={{
                marginTop: "12px",
                fontSize: "14px",
                lineHeight: "22px",
                color: "#5C544E",
              }}
            >
              Providers listed on MyHelperPro are independent businesses.
              The platform does not employ providers and does not process
              payments or bookings during beta.
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: "90px" }} />
    </div>
  );
}