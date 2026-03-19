"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function ProviderPhotosPage() {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [confirmed, setConfirmed] = useState(false);
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/providers/login");
        return;
      }

      setUserId(session.user.id);
      await loadPhotos(session.user.id);
    }

    load();
  }, [router]);

  async function loadPhotos(uid) {
    const { data } = await supabase
      .from("provider_photos")
      .select("*")
      .eq("auth_user_id", uid)
      .order("created_at", { ascending: false });

    setPhotos(data || []);
  }

  async function handleUpload() {
    if (!file) {
      setError("Please choose a photo first.");
      return;
    }

    if (!confirmed) {
      setError("Please confirm the upload terms.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    const path = `${userId}/${Date.now()}-${crypto.randomUUID()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("providers-work")
      .upload(path, file);

    if (uploadError) {
      setError("Upload failed. Please try again.");
      setUploading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("provider_photos")
      .insert({
        auth_user_id: userId,
        path,
      });

    if (insertError) {
      setError("Database error.");
      setUploading(false);
      return;
    }

    await loadPhotos(userId);

    setUploading(false);
    setConfirmed(false);
    setFile(null);
    setSuccess(true);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function deletePhoto(id, path) {
    await supabase.storage.from("providers-work").remove([path]);
    await supabase.from("provider_photos").delete().eq("id", id);
    loadPhotos(userId);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAF6F1", padding: "48px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <Link
          href="/providers/dashboard"
          style={{
            fontSize: "14px",
            textDecoration: "underline",
            color: "#3A302A",
          }}
        >
          ← Back to dashboard
        </Link>

        <h1
          style={{
            fontSize: "34px",
            fontWeight: 900,
            marginTop: "28px",
            color: "#3A302A",
          }}
        >
          Portfolio Photos
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "rgba(58,48,42,0.70)",
            marginTop: "12px",
            maxWidth: "620px",
          }}
        >
          Upload professional images of your work. Photos may be reviewed before appearing publicly.
        </p>

        {/* Upload Card */}
        <div
          style={{
            marginTop: "28px",
            background: "#ffffff",
            border: "1px solid #E6DED3",
            borderRadius: "28px",
            padding: "32px",
            boxShadow: "0 22px 60px rgba(0,0,0,0.06)",
          }}
        >

          {error && (
            <div
              style={{
                backgroundColor: "#FCEAEA",
                color: "#7A1F1F",
                padding: "14px 18px",
                borderRadius: "16px",
                marginBottom: "20px",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                backgroundColor: "#E9F7EF",
                color: "#1F6F3E",
                padding: "14px 18px",
                borderRadius: "16px",
                marginBottom: "20px",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Photo uploaded successfully.
            </div>
          )}

          {/* File Input */}
          <label
            style={{
              display: "inline-block",
              padding: "12px 22px",
              borderRadius: "999px",
              border: "1px solid #E6DED3",
              background: "#F7F2EA",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: "18px",
            }}
          >
            Choose Photo
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </label>

          {/* Confirmation */}
          <div
            style={{
              background: "#F7F2EA",
              border: "1px solid #E6DED3",
              borderRadius: "22px",
              padding: "22px",
              fontSize: "13px",
              lineHeight: "21px",
              color: "#5C544E",
              marginBottom: "22px",
            }}
          >
            <label style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                style={{
                  width: "18px",
                  height: "18px",
                  marginTop: "4px",
                  accentColor: "#2B4A2F",
                }}
              />

              <span>
                By checking this box, I confirm that these images do not contain identifiable
                information of individuals or private property without written consent,
                do not include personal data, and do not contain photos of minors.
              </span>
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={!confirmed || uploading || !file}
            style={{
              height: "52px",
              padding: "0 28px",
              borderRadius: "999px",
              background: confirmed && file ? "#2B4A2F" : "#D6CEC4",
              color: "#fff",
              fontWeight: 800,
              border: "none",
              cursor: confirmed && file ? "pointer" : "not-allowed",
              boxShadow: confirmed && file
                ? "0 16px 40px rgba(0,0,0,0.15)"
                : "none",
              fontSize: "14px",
            }}
          >
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>

        {/* Photo Grid */}
        <div style={{ marginTop: "40px" }}>
          {photos.length > 0 ? (
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
                      position: "relative",
                      backgroundColor: "#FFF",
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

                    <button
                      onClick={() => deletePhoto(photo.id, photo.path)}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "50%",
                        width: "26px",
                        height: "26px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ fontSize: "14px", opacity: 0.6, marginTop: "18px" }}>
              No portfolio photos yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}