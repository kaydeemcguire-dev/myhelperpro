"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase-browser";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSessionAndMessages = async () => {
      // Get session safely
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("SESSION ERROR:", error);
        setLoading(false);
        return;
      }

      const currentSession = data?.session || null;
      setSession(currentSession);

      // Only fetch messages if user is logged in
      if (currentSession?.user?.id) {
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select("*")
          .or(
            `sender_auth_id.eq.${currentSession.user.id},receiver_auth_id.eq.${currentSession.user.id}`
          )
          .order("created_at", { ascending: true });

        if (messagesError) {
          console.error("MESSAGES ERROR:", messagesError);
        } else {
          setMessages(messagesData || []);
        }
      }

      setLoading(false);
    };

    getSessionAndMessages();
  }, []);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Messages</h1>

      <div
        style={{
          marginTop: "15px",
          padding: "15px",
          background: "#fff3cd",
          border: "1px solid #ffeeba",
          color: "#856404",
          borderRadius: "8px",
        }}
      >
        <strong>Messaging is disabled during Beta.</strong>
        <br />
        You may browse message history, but sending new messages is currently unavailable.
      </div>

      <div style={{ marginTop: "20px" }}>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {messages.map((msg) => (
              <li
                key={msg.id}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  background: "#f5f5f5",
                  borderRadius: "6px",
                }}
              >
                <strong>
                  {msg.sender_auth_id === session?.user?.id
                    ? "You"
                    : "Provider/Customer"}
                </strong>
                :
                <br />
                {msg.message_text}
                <br />
                <small>
                  {new Date(msg.created_at).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <textarea
          placeholder="Messaging disabled during Beta"
          disabled
          style={{
            width: "100%",
            height: "80px",
            borderRadius: "6px",
            padding: "10px",
            background: "#eee",
            cursor: "not-allowed",
          }}
        />
        <button
          disabled
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#ccc",
            cursor: "not-allowed",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}