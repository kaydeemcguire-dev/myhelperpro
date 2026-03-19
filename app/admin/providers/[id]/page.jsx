"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function AdminProviderDetailPage() {
  const { id } = useParams(); // providers.auth_id
  const router = useRouter();

  const [provider, setProvider] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ----------------------------------
  // Load provider + documents
  // ----------------------------------
  useEffect(() => {
    async function loadData() {
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // 🔐 ADMIN ASSUMPTION
      // You are the only admin in beta
      // No role check needed yet

      const { data: providerData, error: providerError } = await supabase
        .from("providers")
        .select("*")
        .eq("auth_id", id)
        .single();

      if (providerError) {
        setError("Provider not found.");
        setLoading(false);
        return;
      }

      const { data: docs } = await supabase
        .from("provider_documents")
        .select("*")
        .eq("provider_id", id)
        .order("created_at", { ascending: false });

      setProvider(providerData);
      setDocuments(docs || []);
      setLoading(false);
    }

    loadData();
  }, [id, router]);

  // ----------------------------------
  // Update document status
  // ----------------------------------
  async function updateDocumentStatus(docId, status) {
    const { error } = await supabase
      .from("provider_documents")
      .update({
        status,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", docId);

    if (error) {
      alert("Failed to update document.");
      return;
    }

    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, status } : d
      )
    );
  }

  // ----------------------------------
  // Loading / error
  // ----------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] text-[#3A302A]">
        Loading provider…
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "Error loading provider"}
      </div>
    );
  }

  // ----------------------------------
  // Page
  // ----------------------------------
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">
            Provider Review
          </h1>

          <button
            onClick={() => router.push("/admin/providers")}
            className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            ← Back to Providers
          </button>
        </div>

        {/* Provider Info */}
        <section className="bg-white rounded-2xl p-6 shadow space-y-3">
          <h2 className="text-xl font-medium">
            {provider.full_name}
          </h2>

          <p className="text-sm opacity-80">
            {provider.city || "City not listed"}
          </p>

          <p className="text-sm">
            <strong>Services:</strong>{" "}
            {provider.services || "Not listed"}
          </p>

          <p className="text-sm">
            <strong>Experience:</strong>{" "}
            {provider.experience
              ? `${provider.experience} years`
              : "Not listed"}
          </p>
        </section>

        {/* Documents */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium">
            Submitted Documents
          </h2>

          {documents.length === 0 ? (
            <p className="opacity-70">
              No documents uploaded yet.
            </p>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl p-4 shadow space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {doc.type}
                      </p>
                      <p className="text-xs opacity-70">
                        Uploaded{" "}
                        {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full capitalize ${
                        doc.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {doc.status || "pending"}
                    </span>
                  </div>

                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline"
                  >
                    View document
                  </a>

                  {doc.status === "pending" && (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() =>
                          updateDocumentStatus(doc.id, "approved")
                        }
                        className="px-4 py-2 rounded-full bg-green-600 text-white text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateDocumentStatus(doc.id, "rejected")
                        }
                        className="px-4 py-2 rounded-full bg-gray-300 text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
