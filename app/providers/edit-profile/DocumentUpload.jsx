"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function DocumentUpload() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("license");
  const [loading, setLoading] = useState(false);

  async function loadDocuments() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("provider_documents")
      .select("id, document_type, status, review_notes, file_url")
      .eq("provider_id", user.id)
      .order("created_at", { ascending: false });

    setDocuments(data || []);
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("provider-documents")
      .upload(filePath, file);

    if (error) {
      alert("Upload failed.");
      setLoading(false);
      return;
    }

    await supabase.from("provider_documents").insert({
      provider_id: user.id,
      file_url: filePath,
      document_type: docType,
      status: "pending",
    });

    setFile(null);
    setLoading(false);
    loadDocuments();
  }

  async function deleteDocument(id, path) {
    await supabase.storage
      .from("provider-documents")
      .remove([path]);

    await supabase
      .from("provider_documents")
      .delete()
      .eq("id", id);

    loadDocuments();
  }

  return (
    <section className="mt-10 rounded-2xl border border-black/10 bg-white p-6 space-y-5">
      <h2 className="text-lg font-medium">
        Documents
      </h2>

      <form onSubmit={handleUpload} className="space-y-3">
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="license">License</option>
          <option value="certification">Certification</option>
          <option value="insurance">Insurance</option>
          <option value="other">Other</option>
        </select>

        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-full bg-[#2B4A2F] text-white text-sm disabled:opacity-50"
        >
          {loading ? "Uploading…" : "Upload Document"}
        </button>
      </form>

      {documents.length > 0 && (
        <div className="space-y-3 pt-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-lg px-4 py-3 text-sm space-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="capitalize font-medium">
                  {doc.document_type}
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    STATUS_STYLES[doc.status]
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              {doc.review_notes && (
                <p className="text-xs opacity-80">
                  <strong>Admin note:</strong> {doc.review_notes}
                </p>
              )}

              <button
                onClick={() => deleteDocument(doc.id, doc.file_url)}
                className="text-xs text-red-600 hover:underline mt-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
