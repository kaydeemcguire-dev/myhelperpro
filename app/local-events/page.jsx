"use client";

import Link from "next/link";

export default function LocalEventsPage() {
  const events = [
    {
      title: "Community Market Meetup (Beta)",
      date: "Coming soon",
      location: "Central Valley, CA",
      note: "A small local meet-and-greet for providers and families. Details will be emailed to subscribers.",
    },
    {
      title: "Provider Orientation (Online)",
      date: "Coming soon",
      location: "Virtual",
      note: "Quick walkthrough of profiles, categories, and how beta visibility works.",
    },
    {
      title: "Local Partner Spotlight",
      date: "Coming soon",
      location: "Turlock / Modesto area",
      note: "Highlighting local organizations and small businesses we love.",
    },
  ];

  return (
    <div style={{ width: "100%", background: "#FAF6F1" }}>

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
            height: "420px",
            borderRadius: "28px",
            overflow: "hidden",
            backgroundImage: "url('/images/hero-local-events-market.jpg')",
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
                "linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.18) 100%)",
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
              Local events & community
            </h1>
            <p
              style={{
                margin: "14px 0 0",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "620px",
                opacity: 0.95,
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              }}
            >
              We’re building something warm and community-first. In beta, we’ll share small local events,
              provider spotlights, and announcements as they launch.
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
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.20)",
                }}
              >
                Stay informed
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
                Explore providers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: "1120px", margin: "36px auto 0", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
            alignItems: "stretch",
          }}
        >
          {events.map((e) => (
            <div
              key={e.title}
              style={{
                background: "#fff",
                border: "1px solid #E6DED3",
                borderRadius: "22px",
                padding: "18px 18px 16px",
                boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: 900 }}>{e.title}</div>
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#6B7280" }}>
                {e.date} • {e.location}
              </div>
              <div style={{ marginTop: "10px", fontSize: "13px", color: "#4B5563", lineHeight: "18px" }}>
                {e.note}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "18px",
            background: "#F7F2EA",
            border: "1px solid #E6DED3",
            borderRadius: "18px",
            padding: "14px 14px",
            color: "#5C544E",
            fontSize: "12.5px",
            lineHeight: "18px",
          }}
        >
          <strong>Beta note:</strong> MyHelperPro is currently a directory and early-access experience.
          Providers are independent businesses. MyHelperPro does not employ providers and does not provide
          payment processing or bookings during beta.
        </div>
      </section>

      {/* IMAGE STRIP */}
      <section style={{ maxWidth: "1120px", margin: "34px auto 0", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gap: "14px",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {[
            { src: "/images/section-community-vendors.jpg", alt: "Local vendors" },
            { src: "/images/section-community-love.jpg", alt: "Community" },
            { src: "/images/section-volunteer-impact.jpg", alt: "Volunteer impact" },
          ].map((img) => (
            <div
              key={img.src}
              style={{
                borderRadius: "22px",
                overflow: "hidden",
                border: "1px solid #E6DED3",
                background: "#fff",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  objectPosition:
                    img.alt === "Volunteer impact" ? "center 40%" : "center",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}
