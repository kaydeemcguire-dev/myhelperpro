// functions/messaging-send/index.ts

import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";

serve(async (req) => {
  try {
    // ------------------------------
    // LOAD ENVIRONMENT VARIABLES
    // ------------------------------
    // These MUST match .env file exactly:
    //
    // supabaseUrl=http://127.0.0.1:54321
    // serviceRoleKey=sb_secret_...
    //
    const supabaseUrl = Deno.env.get("supabaseUrl");
    const serviceRoleKey = Deno.env.get("serviceRoleKey");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing environment variables:", { supabaseUrl, serviceRoleKey });
      return new Response(
        JSON.stringify({ error: "Server misconfiguration: Missing supabaseUrl or serviceRoleKey" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // -----------------------------------
    // VALIDATE METHOD
    // -----------------------------------
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Only POST requests allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // -----------------------------------
    // PARSE REQUEST BODY
    // -----------------------------------
    const { sender_id, recipient_id, content } = await req.json();

    if (!sender_id || !recipient_id || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // -----------------------------------
    // INSERT MESSAGE INTO DATABASE
    // -----------------------------------
    const { error } = await supabase
      .from("messages")
      .insert({
        sender_id,
        recipient_id,
        content,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // -----------------------------------
    // SUCCESS
    // -----------------------------------
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message stored successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Unexpected server error:", err);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
