"use client";

import { useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name || !email || !message) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        subject,
        message,
      });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
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
      <section style={{ padding: "0 24px", marginTop: "18px" }}>
        <div
          style={{
            position: "relative",
            maxWidth: "1120px",
            margin: "0 auto",
            height: "420px",
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
            <h1 style={{ margin: 0, fontSize: "44px", fontWeight: 800 }}>
              Contact us
            </h1>
            <p style={{ marginTop: "14px", fontSize: "15px", lineHeight: "22px" }}>
              Questions, partnerships, or beta feedback — we’d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: "1120px", margin: "36px auto 0", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* FORM CARD */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #E6DED3",
              borderRadius: "28px",
              padding: "26px",
              boxShadow: "0 18px 44px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
              Send a message
            </h2>

            <p style={{ marginTop: "10px", color: "#5C544E", fontSize: "13px" }}>
              We review all messages carefully and respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "grid", gap: "16px" }}>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={inputStyle}
              />

              <textarea
                placeholder="Message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={textareaStyle}
              />

              {error && (
                <div style={{ color: "#B91C1C", fontSize: "13px" }}>{error}</div>
              )}

              {success && (
                <div style={{ color: "#2B4A2F", fontSize: "13px", fontWeight: 700 }}>
                  Message sent successfully.
                </div>
              )}

              <button style={buttonStyle} disabled={loading}>
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>

          {/* SIDE CARD */}
          <div
            style={{
              background: "#F7F2EA",
              border: "1px solid #E6DED3",
              borderRadius: "28px",
              padding: "26px",
              boxShadow: "0 18px 44px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ fontSize: "17px", fontWeight: 900, color: "#2B4A2F" }}>
              Beta information
            </h3>

            <p style={{ marginTop: "14px", color: "#5C544E", fontSize: "13px", lineHeight: "20px" }}>
              MyHelperPro is currently in beta and focused on provider discovery.
              Messaging, booking, and payments are not yet enabled.
              Providers remain independent businesses.
            </p>

            <div
              style={{
                marginTop: "22px",
                background: "#ffffff",
                border: "1px solid #E6DED3",
                borderRadius: "24px",
                padding: "20px",
              }}
            >
              <div style={{ fontWeight: 900, fontSize: "15px", color: "#2B4A2F" }}>
                Common inquiries
              </div>

              <ul
                style={{
                  marginTop: "12px",
                  paddingLeft: "18px",
                  fontSize: "13px",
                  lineHeight: "22px",
                  color: "#4B5563",
                }}
              >
                <li>Partnerships</li>
                <li>Provider onboarding</li>
                <li>Press inquiries</li>
                <li>Platform feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: "90px" }} />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: "50px",
  borderRadius: "999px",
  border: "1px solid #E2D8CC",
  background: "#ffffff",
  padding: "0 20px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle = {
  width: "100%",
  borderRadius: "22px",
  border: "1px solid #E2D8CC",
  background: "#ffffff",
  padding: "16px 18px",
  fontSize: "14px",
  outline: "none",
  resize: "vertical",
  boxSizing: "border-box",
};

const buttonStyle = {
  height: "52px",
  borderRadius: "999px",
  background: "#2B4A2F",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 16px 34px rgba(0,0,0,0.14)",
};
