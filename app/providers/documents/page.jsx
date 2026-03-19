"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function ProviderDocumentsPage() {
  const router = useRouter();

  const [documentType, setDocumentType] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setUploading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("You must be logged in.");
      setUploading(false);
      return;
    }

    if (!file) {
      setError("Please select a file.");
      setUploading(false);
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("provider-documents")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      setError("File upload failed.");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("provider-documents")
      .getPublicUrl(filePath);

    const fileUrl = urlData.publicUrl;

    const { data: provider } = await supabase
  .from("providers")
  .select("id")
  .eq("auth_user_id", user.id)
  .single();

const { error: insertError } = await supabase
  .from("provider_documents")
  .insert({
    provider_auth_id: user.id,
    document_type: documentType,
    file_url: fileUrl,
    document_key: filePath,
    notes: notes || null,
  });

    if (insertError) {
      console.error(insertError);
      setError("Failed to save document metadata.");
      setUploading(false);
      return;
    }

    setUploading(false);
    setSuccess(true);
    setDocumentType("");
    setNotes("");
    setFile(null);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAF6F1", padding: "40px 24px" }}>
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
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
            Verification Documents
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              lineHeight: "22px",
              color: "rgba(58,48,42,0.70)",
            }}
          >
            Upload certifications, licenses, or verification documents to
            strengthen your profile. During beta, documents are stored securely
            but not yet publicly displayed.
          </p>

          {error && (
            <div
              style={{
                marginTop: "18px",
                padding: "12px",
                borderRadius: "14px",
                background: "#FDECEC",
                border: "1px solid #F5C2C2",
                color: "#B42318",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                marginTop: "18px",
                padding: "12px",
                borderRadius: "14px",
                background: "#EEF7F0",
                border: "1px solid #CDE4D2",
                color: "#2B4A2F",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Document uploaded successfully.
            </div>
          )}

          <form
            onSubmit={handleUpload}
            style={{ marginTop: "28px", display: "grid", gap: "18px" }}
          >
            <div>
              <label style={labelStyle}>Document Type</label>
              <input
                type="text"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                placeholder="Example: CPR Certification"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add details about this document"
                rows={4}
                style={textareaStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Select File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
                style={{ fontSize: "13px" }}
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              style={{
                height: "50px",
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
              {uploading ? "Uploading…" : "Upload Document"}
            </button>
          </form>

          <div
            style={{
              marginTop: "26px",
              fontSize: "12.5px",
              color: "rgba(58,48,42,0.60)",
              lineHeight: "18px",
            }}
          >
            Documents are used for verification and trust-building purposes.
            Providers remain independent businesses. Uploaded materials may be
            reviewed before launch.
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "12px",
  fontWeight: 800,
  color: "#3A302A",
};

const inputStyle = {
  width: "100%",
  height: "48px",
  borderRadius: "999px",
  border: "1px solid #E2D8CC",
  padding: "0 18px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle = {
  width: "100%",
  borderRadius: "18px",
  border: "1px solid #E2D8CC",
  padding: "14px 16px",
  fontSize: "14px",
  outline: "none",
  resize: "vertical",
  boxSizing: "border-box",
};