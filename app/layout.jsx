import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "MyHelperPro",
  description: "Trusted, warm, professional connections for home services.",
};

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="no-underline hover:text-[#2B4A2F]"
      style={{
        color: "#6B6258",
        textDecoration: "none",
        fontWeight: 700,
        lineHeight: "20px",
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#FAF6F1] text-[#3A302A] antialiased">
        {/* ================= HEADER (UNCHANGED) ================= */}
        <div className="w-full bg-[#F4F1EC] pt-10 pb-12 px-6 border-b border-[#E6E0D8]">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <img
                src="/logos/myhelperpro-beta-mark.svg"
                alt="MyHelperPro Beta Notice"
                className="mx-auto"
              />
            </div>

            <h2 className="text-[13px] tracking-[0.15em] font-semibold text-[#2B4A2F] uppercase flex items-center justify-center gap-2">
              <span>🍃</span>
              Beta Notice
              <span>🍃</span>
            </h2>

            <p className="mt-5 text-[15.5px] text-[#5C544E] leading-relaxed max-w-3xl mx-auto">
              Early provider registration and platform exploration are now
              available. Booking, messaging, and secure transactions will launch
              soon.
            </p>

            <p className="mt-3 text-[14.5px] text-[#7A6F66]">
              Join our mailing list for priority access and feature announcements.
            </p>
          </div>
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <div className="min-h-screen">{children}</div>

        {/* ================= FOOTER ================= */}
        <footer className="bg-[#F1ECE4] mt-28 border-t border-[#E6DED3]">
          <div
            className="mx-auto px-6 py-20"
            style={{ maxWidth: 1120 }}
          >
            {/* Priority Access Bar */}
            <div style={{ maxWidth: 720, margin: "0 auto 64px", textAlign: "center" }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.65)",
                  border: "1px solid #E6DED3",
                  borderRadius: 24,
                  padding: "22px 18px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: "#2B4A2F",
                    letterSpacing: "0.02em",
                    margin: 0,
                  }}
                >
                  Priority Access List
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    color: "#6B6258",
                    marginTop: 8,
                    marginBottom: 0,
                    lineHeight: "20px",
                  }}
                >
                  Subscribe now for priority help after launch and early feature announcements.
                </p>

                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    style={{
                      width: 360,
                      maxWidth: "100%",
                      padding: "12px 16px",
                      borderRadius: 999,
                      border: "1px solid #D6CFC5",
                      background: "#fff",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      padding: "12px 18px",
                      borderRadius: 999,
                      border: "none",
                      background: "#2B4A2F",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 900,
                      cursor: "pointer",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>

            {/* Brand Statement */}
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: "#2B4A2F", margin: 0 }}>
                Rooted in community.
              </h3>
              <p style={{ fontSize: 20, fontWeight: 900, color: "#3A302A", marginTop: 6, marginBottom: 0 }}>
                Built for trust.
              </p>
            </div>

            {/* Columns (auto-fit: stays horizontal on desktop) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 48,
                alignItems: "start",
              }}
            >
              {/* Customers */}
              <div>
                <h4 style={{ fontWeight: 900, color: "#3A302A", marginBottom: 14 }}>
                  Customers
                </h4>
                <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
                  <FooterLink href="/providers">Browse Providers</FooterLink>
                  <FooterLink href="/how-it-works">How It Works</FooterLink>
                  <FooterLink href="/customers/login">Make an Account / Login</FooterLink>
                </div>
              </div>

              {/* Providers */}
              <div>
                <h4 style={{ fontWeight: 900, color: "#3A302A", marginBottom: 14 }}>
                  Providers
                </h4>
                <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
                  <FooterLink href="/providers/signup">Create Profile</FooterLink>
                  <FooterLink href="/providers/login">Provider Login</FooterLink>
                  <FooterLink href="/plans">Plans & Pricing</FooterLink>
                </div>
              </div>

              {/* Community */}
              <div>
                <h4 style={{ fontWeight: 900, color: "#3A302A", marginBottom: 14 }}>
                  Community
                </h4>
                <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
                  <FooterLink href="/local-events">Community Events</FooterLink>
                  <FooterLink href="/founder">Meet the Founder</FooterLink>
                  <FooterLink href="/mission">Our Mission</FooterLink>
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 style={{ fontWeight: 900, color: "#3A302A", marginBottom: 14 }}>
                  Support
                </h4>
                <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
                  <FooterLink href="/contact">Contact</FooterLink>
                  <FooterLink href="/faqs">FAQs</FooterLink>
                  <FooterLink href="/terms">Terms & Conditions</FooterLink>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div
              style={{
                marginTop: 56,
                paddingTop: 18,
                borderTop: "1px solid #E6DED3",
                textAlign: "center",
                fontSize: 13,
                color: "#8A8178",
              }}
            >
              © 2026 MyHelperPro. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
