"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function ProviderPublicProfilePage() {
  const { auth_id } = useParams();

  const [provider, setProvider] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    async function load() {

      const { data: providerData } = await supabase
        .from("providers")
        .select("full_name, city, bio, avatar_path, status")
        .eq("auth_user_id", auth_id)
        .maybeSingle();

      if (!providerData || providerData.status !== "active") {
        setBlocked(true);
        setLoading(false);
        return;
      }

      const { data: photoData } = await supabase
        .from("provider_photos")
        .select("id, path")
        .eq("auth_user_id", auth_id)
        .order("created_at", { ascending: false });

      setProvider(providerData);
      setPhotos(photoData || []);
      setLoading(false);
    }

    if (auth_id) load();

  }, [auth_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Profile not available</h2>
        <Link href="/providers" className="underline text-sm">
          ← Back to providers
        </Link>
      </div>
    );
  }

  let avatarUrl = null;

  if (provider.avatar_path) {
    const { data } = supabase.storage
      .from("providers-avatars")
      .getPublicUrl(provider.avatar_path);

    avatarUrl = data.publicUrl;
  }

  return (
    <div
      style={{
        background: "#FAF6F1",
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >

        {/* Back */}
        <div style={{ marginBottom: "28px" }}>
          <Link href="/providers" style={{ fontSize: "14px", textDecoration: "underline" }}>
            ← Back to providers
          </Link>
        </div>

        {/* Profile Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "28px",
            border: "1px solid #E6DED3",
            padding: "48px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
          }}
        >

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              gap: "36px",
              alignItems: "start",
            }}
          >

            {/* Avatar */}
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "999px",
                overflow: "hidden",
                background: "#EEE",
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={provider.full_name}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    opacity: 0.6,
                  }}
                >
                  No photo
                </div>
              )}
            </div>

            {/* Profile Content */}
            <div>

              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  marginBottom: "6px",
                  color: "#3A302A",
                }}
              >
                {provider.full_name}
              </h1>

              {provider.city && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "#7A6E66",
                    marginBottom: "16px",
                  }}
                >
                  {provider.city}
                </p>
              )}

              {provider.bio && (
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.7",
                    color: "#3A302A",
                    maxWidth: "620px",
                  }}
                >
                  {provider.bio}
                </p>
              )}

              {/* Divider */}
              {photos.length > 0 && (
                <div
                  style={{
                    marginTop: "32px",
                    paddingTop: "24px",
                    borderTop: "1px solid #EFE7DD",
                  }}
                >

                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "600",
                      marginBottom: "18px",
                    }}
                  >
                    Work Examples
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, 180px)",
                      gap: "18px",
                    }}
                  >
                    {photos.map((photo) => {

                      const { data } = supabase.storage
                        .from("providers-work")
                        .getPublicUrl(photo.path);

                      return (
                        <div
                          key={photo.id}
                          style={{
                            width: "180px",
                            height: "180px",
                            borderRadius: "18px",
                            overflow: "hidden",
                            border: "1px solid #E6DED3",
                            background: "#FFF",
                          }}
                        >
                          <img
                            src={data.publicUrl}
                            alt="Work example"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      );

                    })}
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}