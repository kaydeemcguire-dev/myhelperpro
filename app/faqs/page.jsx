"use client";

import Link from "next/link";

export default function FAQsPage() {
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
            backgroundImage: "url('/images/faqs-hero.jpg')",
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
              Frequently asked questions
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
              Clear answers about how MyHelperPro works and what to expect during beta.
            </p>
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
            padding: "32px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
            display: "grid",
            gap: "32px",
          }}
        >

          {/* GENERAL */}
          <div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
              General
            </h2>

            <div style={{ marginTop: "18px", display: "grid", gap: "18px" }}>
              <FAQItem
                title="Is MyHelperPro an employer?"
                text="No. Providers listed on MyHelperPro are independent professionals. They operate their own businesses and are responsible for their services."
              />

              <FAQItem
                title="Does MyHelperPro guarantee services?"
                text="No. The platform supports discovery. Service agreements are made directly between customers and providers."
              />

              <FAQItem
                title="Are payments handled through the platform?"
                text="Not during beta. Messaging, booking, and payments will launch later once the platform is fully released."
              />
            </div>
          </div>

          {/* BETA */}
          <div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
              Beta phase
            </h2>

            <div style={{ marginTop: "18px", display: "grid", gap: "18px" }}>
              <FAQItem
                title="What can I do during beta?"
                text="Customers can browse providers and explore categories. Providers can create and refine their profiles."
              />

              <FAQItem
                title="Why are messaging and booking disabled?"
                text="We are focusing first on profile quality and documentation. Full features will open once the platform officially launches."
              />

              <FAQItem
                title="Is there any cost during beta?"
                text="No. There are no subscriptions or fees during beta."
              />
            </div>
          </div>

          {/* PROVIDERS */}
          <div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
              Providers
            </h2>

            <div style={{ marginTop: "18px", display: "grid", gap: "18px" }}>
              <FAQItem
                title="How are providers listed?"
                text="Providers create structured profiles that allow families to browse by category and location."
              />

              <FAQItem
                title="Are providers ranked by advertising spend?"
                text="No. Profiles are structured clearly and fairly. Providers are valued for their work and reputation within the community."
              />

              <FAQItem
                title="When will subscriptions begin?"
                text="Subscription options will launch once booking and payments are enabled after beta."
              />
            </div>
          </div>

        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}

function FAQItem({ title, text }) {
  return (
    <div
      style={{
        background: "#F7F2EA",
        border: "1px solid #E6DED3",
        borderRadius: "18px",
        padding: "18px",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: "15px", color: "#2B4A2F" }}>
        {title}
      </div>

      <div
        style={{
          marginTop: "8px",
          fontSize: "14px",
          color: "#5C544E",
          lineHeight: "20px",
        }}
      >
        {text}
      </div>
    </div>
  );
}
