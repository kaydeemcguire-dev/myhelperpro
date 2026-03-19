"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function ProviderAvatarPage() {

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // --------------------------------------------------
  // Load provider
  // --------------------------------------------------

  useEffect(() => {

    async function load() {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/providers/login");
        return;
      }

      setUser(session.user);

      const { data, error } = await supabase
        .from("providers")
        .select("id, avatar_path")
        .eq("auth_user_id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setError("Could not load provider profile.");
        return;
      }

      setProvider(data || null);

      if (data?.avatar_path) {

        const { data: urlData } = supabase.storage
          .from("providers-avatars")
          .getPublicUrl(data.avatar_path);

        setPreview(urlData.publicUrl);
      }

    }

    load();

  }, [router]);

  // --------------------------------------------------
  // Resize image before upload
  // --------------------------------------------------

  async function resizeImage(file) {

    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const objectUrl = URL.createObjectURL(file);

    return new Promise((resolve) => {

      img.onload = () => {

        const MAX_SIZE = 512;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg", 0.85);

      };

      img.src = objectUrl;

    });

  }

  // --------------------------------------------------
  // File selection
  // --------------------------------------------------

  async function handleFileChange(e) {

    const selected = e.target.files?.[0];
    if (!selected) return;

    const resized = await resizeImage(selected);

    const resizedFile = new File(
      [resized],
      "avatar.jpg",
      { type: "image/jpeg" }
    );

    setFile(resizedFile);
    setPreview(URL.createObjectURL(resizedFile));

  }

  // --------------------------------------------------
  // Upload avatar
  // --------------------------------------------------

  async function handleUpload(e) {

    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!file || !user || !provider) {
      setError("Missing file or user.");
      return;
    }

    setUploading(true);

    const filePath = `${user.id}/avatar.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("providers-avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      setError("Upload failed.");
      setUploading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("providers")
      .update({ avatar_path: filePath })
      .eq("auth_user_id", user.id);

    if (updateError) {
      console.error(updateError);
      setError("Failed to save avatar.");
      setUploading(false);
      return;
    }

    setUploading(false);
    setSuccess(true);

  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div style={{ minHeight: "100vh", background: "#FAF6F1", padding: "40px 24px" }}>

      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        <button
          onClick={() => router.push("/providers/dashboard")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            marginBottom: "24px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#2B4A2F",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #E6DED3",
            borderRadius: "28px",
            padding: "32px",
            boxShadow: "0 22px 60px rgba(0,0,0,0.06)",
          }}
        >

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 900,
              color: "#3A302A",
            }}
          >
            Profile Photo
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              lineHeight: "22px",
              color: "rgba(58,48,42,0.70)",
            }}
          >
            Upload a professional profile photo. This image will appear on your
            public provider profile.
          </p>

          {error && (
            <div style={{
              marginTop: "18px",
              padding: "12px",
              borderRadius: "14px",
              background: "#FDECEC",
              border: "1px solid #F5C2C2",
              color: "#B42318",
              fontSize: "13px"
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              marginTop: "18px",
              padding: "12px",
              borderRadius: "14px",
              background: "#EEF7F0",
              border: "1px solid #CDE4D2",
              color: "#2B4A2F",
              fontSize: "13px",
              fontWeight: 700
            }}>
              Profile photo updated successfully.
            </div>
          )}

          <div style={{ marginTop: "26px", textAlign: "center" }}>

            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "999px",
                overflow: "hidden",
                margin: "0 auto 18px",
                border: "1px solid #E6DED3",
                background: "#fff",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  opacity: 0.5
                }}>
                  No photo
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: "16px" }}
            />

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              style={{
                height: "48px",
                padding: "0 22px",
                borderRadius: "999px",
                background: "#2B4A2F",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 900,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 16px 34px rgba(0,0,0,0.14)",
                opacity: uploading ? 0.7 : 1,
              }}
            >
              {uploading ? "Uploading…" : "Save Photo"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}