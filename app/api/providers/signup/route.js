import supabase from "@/lib/supabase";

export async function POST(req) {
  try {
    // Parse JSON body from the signup form
    const body = await req.json();

    const {
      full_name,
      email,
      phone,
      city,
      services,
      experience,
      password,
    } = body;

    // Basic validation
    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // 1️⃣ Create user in Supabase Auth
    const { data: auth, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Auth Error:", authError);
      return Response.json({ error: authError.message }, { status: 400 });
    }

    // 2️⃣ Insert provider profile into the database
    const { error: dbError } = await supabase.from("providers").insert({
      auth_id: auth.user.id,
      full_name: full_name || "",
      email,
      phone: phone || "",
      city: city || "",
      services: services || null,
      experience: experience || "",
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("Database Insert Error:", dbError);
      return Response.json({ error: dbError.message }, { status: 400 });
    }

    // 3️⃣ Success response
    return Response.json({ success: true });
  } catch (err) {
    console.error("Unexpected Server Error:", err);
    return Response.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
