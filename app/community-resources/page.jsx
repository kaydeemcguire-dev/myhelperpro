"use client";

import Link from "next/link";

export default function CommunityResourcesPage() {
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

      {/* HEADER */}
      <section style={{ padding: "36px 24px 0" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            Community Resources
          </h1>

          <p
            style={{
              marginTop: "14px",
              fontSize: "15px",
              lineHeight: "24px",
              maxWidth: "760px",
              color: "#5C544E",
            }}
          >
            Supporting families and providers across the Central Valley.
            These public resources are shared for informational purposes only.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: "1120px", margin: "36px auto 0", padding: "0 24px 80px" }}>

        {/* FOR FAMILIES */}
        <ResourceSection
          title="For Families"
          items={[
            {
              name: "Second Harvest of the Greater Valley",
              description: "Food distribution and hunger relief services across Stanislaus and San Joaquin counties.",
              link: "https://localfoodbank.org/",
            },
            {
              name: "WIC California",
              description: "Nutrition support for women, infants, and children.",
              link: "https://www.cdph.ca.gov",
            },
            {
              name: "CalFresh",
              description: "California’s supplemental food assistance program.",
              link: "https://www.getcalfresh.org/",
            },
            {
              name: "988 Crisis Lifeline",
              description: "Confidential mental health and crisis support.",
              link: "https://988lifeline.org/",
            },
          ]}
        />

        {/* FOR PROVIDERS */}
        <ResourceSection
          title="For Providers"
          items={[
            {
              name: "California Secretary of State",
              description: "Business registration and entity information.",
              link: "https://bizfileonline.sos.ca.gov/",
            },
            {
              name: "California Department of Consumer Affairs",
              description: "License lookup and regulatory resources.",
              link: "https://www.dca.ca.gov/",
            },
            {
              name: "Central Valley SBDC",
              description: "Small business advising and development support.",
              link: "https://www.centralvalleysbdc.com/",
            },
            {
              name: "SCORE Central California",
              description: "Free small business mentoring and workshops.",
              link: "https://www.score.org/",
            },
          ]}
        />

        {/* DISCLAIMER */}
        <div
          style={{
            marginTop: "40px",
            fontSize: "12.5px",
            color: "#6B6258",
            lineHeight: "18px",
            background: "#F7F2EA",
            border: "1px solid #E6DED3",
            borderRadius: "18px",
            padding: "16px",
          }}
        >
          Resource listings are provided for general information only.
          MyHelperPro does not manage, endorse, or guarantee third-party services.
        </div>
      </section>
    </div>
  );
}

/* REUSABLE SECTION COMPONENT */

function ResourceSection({ title, items }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 900,
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {items.map((item) => (
          <div
            key={item.name}
            style={{
              background: "#fff",
              border: "1px solid #E6DED3",
              borderRadius: "18px",
              padding: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontWeight: 900, color: "#2B4A2F" }}>
              {item.name}
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "13px",
                color: "#5C544E",
                lineHeight: "18px",
              }}
            >
              {item.description}
            </div>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "12px",
                fontSize: "13px",
                fontWeight: 800,
                color: "#2B4A2F",
                textDecoration: "none",
              }}
            >
              Visit website →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
