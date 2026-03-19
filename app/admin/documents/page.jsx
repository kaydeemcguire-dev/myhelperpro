"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { isAdmin } from "@/lib/admin";

export default function AdminDocumentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isAdmin(user)) {
        router.push("/");
        return;
      }

      const { data } = await supabase
        .from("provider_documents")
        .select(`
          id,
          provider_id,
          document_type,
          file_url,
          status,
          review_notes,
          created_at
        `)
        .order("created_at", { ascending: false });

      setDocuments(data || []);

      // preload notes
      const map = {};
      (data || []).forEach((d) => {
        map[d.id] = d.review_notes || "";
      });
      setNotes(map);

      setLoading(false);
    }

    load();
  }, [router]);

  async function viewDocument(path) {
    const { data, error } = await supabase.storage
      .from("provider-documents")
      .createSignedUrl(path, 60);

    if (error) {
      alert("Could not load document.");
      return;
    }

    window.open(data.signedUrl, "_blank");
  }

  async function updateDocument(id, status) {
    await supabase
      .from("provider_documents")
      .update({
        status,
        review_notes: notes[id] || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, status, review_notes: notes[id] }
          : doc
      )
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin documents…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        <h1 className="text-3xl font-semibold">
          Admin — Provider Documents
        </h1>

        {documents.length === 0 ? (
          <p>No documents uploaded yet.</p>
        ) : (
          <div className="space-y-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl p-5 shadow space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium capitalize">
                      {doc.document_type}
                    </p>
                    <p className="text-xs opacity-60">
                      Provider ID: {doc.provider_id}
                    </p>
                    <p className="text-xs opacity-60">
                      Status: {doc.status}
                    </p>
                  </div>

                  <button
                    onClick={() => viewDocument(doc.file_url)}
                    className="px-3 py-1 text-sm rounded bg-slate-600 text-white"
                  >
                    View
                  </button>
                </div>

                <textarea
                  placeholder="Admin notes (optional)"
                  value={notes[doc.id] || ""}
                  onChange={(e) =>
                    setNotes({ ...notes, [doc.id]: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => updateDocument(doc.id, "approved")}
                    className="px-4 py-1 text-sm rounded bg-green-600 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateDocument(doc.id, "rejected")}
                    className="px-4 py-1 text-sm rounded bg-red-600 text-white"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
