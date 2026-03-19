"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function ProvidersListPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("providers")
        .select("auth_user_id, full_name, city, avatar_path")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      setProviders(data || []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center text-[#3A302A]">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1]">

      {/* ================= TOP BAR (LOGO + HOME) ================= */}
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "24px 24px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ display: "inline-block" }}>
          <img
            src="/logos/myhelperpro-logo-light-v2.svg"
            alt="MyHelperPro"
            style={{ height: "42px" }}
          />
        </Link>

        <Link
          href="/"
          style={{
            padding: "10px 18px",
            borderRadius: "999px",
            background: "#2B4A2F",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Home
        </Link>
      </div>

      {/* ================= HERO ================= */}
      <section style={{ padding: "0 24px", marginTop: "24px" }}>
        <div
          style={{
            position: "relative",
            maxWidth: "1120px",
            margin: "0 auto",
            height: "420px",
            borderRadius: "28px",
            overflow: "hidden",
            backgroundImage: "url('/images/hero-find-providers.jpg')",
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
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.12) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "56px",
              right: "56px",
              top: "110px",
              maxWidth: "720px",
              color: "rgba(255,255,255,0.95)",
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
              Find trusted local providers
            </h1>

            <p
              style={{
                marginTop: "16px",
                fontSize: "15px",
                lineHeight: "22px",
                maxWidth: "620px",
                opacity: 0.95,
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              }}
            >
              MyHelperPro is currently open for early registration and platform exploration during beta.
              Messaging, booking, and other features will become available after our official launch.
              Join our mailing list to receive updates and priority access when we go live.
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
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.20)",
                }}
              >
                Join mailing list
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROVIDER GRID ================= */}
      <section
        style={{
          maxWidth: "1120px",
          margin: "48px auto 0",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "28px",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {providers.map((provider) => {
            let avatarUrl = null;

            if (provider.avatar_path) {
              const { data } = supabase.storage
                .from("providers-avatars")
                .getPublicUrl(provider.avatar_path);

              avatarUrl = data.publicUrl;
            }

            return (
              <Link
                key={provider.auth_user_id}
                href={`/providers/${provider.auth_user_id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "24px",
                    border: "1px solid #E6DED3",
                    padding: "22px",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.05)",
                    transition: "transform 160ms ease, box-shadow 160ms ease",
                  }}
                >
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div
                      style={{
                        width: "84px",
                        height: "84px",
                        borderRadius: "999px",
                        overflow: "hidden",
                        background: "#EEE7DE",
                        border: "1px solid #E6DED3",
                        flexShrink: 0,
                      }}
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={`${provider.full_name} avatar`}
                          style={{
                            width: "84px",
                            height: "84px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "84px",
                            height: "84px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            color: "#7A6E66",
                            fontWeight: 600,
                          }}
                        >
                          No photo
                        </div>
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h2
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "#3A302A",
                        }}
                      >
                        {provider.full_name}
                      </h2>

                      {provider.city && (
                        <p
                          style={{
                            marginTop: "6px",
                            fontSize: "14px",
                            color: "#6B625B",
                          }}
                        >
                          {provider.city}
                        </p>
                      )}

                      <div
                        style={{
                          marginTop: "12px",
                          fontSize: "13px",
                          fontWeight: 800,
                          color: "#2B4A2F",
                        }}
                      >
                        View profile →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div style={{ height: "80px" }} />
    </div>
  );
}
