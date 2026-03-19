"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function EditProviderProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [services, setServices] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setError("");
      setLoading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      const { data: provider, error } = await supabase
        .from("providers")
        .select("full_name, city, services, experience, bio")
        .eq("auth_user_id", user.id)
        .single();

      if (error || !provider) {
        setError(
          "Your provider profile could not be found. Please return to the dashboard."
        );
        setLoading(false);
        return;
      }

      setFullName(provider.full_name || "");
      setCity(provider.city || "");
      setServices(provider.services || "");
      setExperience(provider.experience || "");
      setBio(provider.bio || "");

      setLoading(false);
    }

    loadProfile();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    const { error } = await supabase
      .from("providers")
      .update({
        full_name: fullName,
        city,
        services,
        experience,
        bio,
        updated_at: new Date().toISOString(),
      })
      .eq("auth_user_id", user.id);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF6F1" }}>
        Loading profile…
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAF6F1", padding: "40px 24px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        
        <Link
          href="/providers/dashboard"
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#2B4A2F",
            textDecoration: "none",
          }}
        >
          ← Back to dashboard
        </Link>

        <div
          style={{
            marginTop: "24px",
            background: "#ffffff",
            border: "1px solid #E6DED3",
            borderRadius: "28px",
            padding: "36px",
            boxShadow: "0 22px 60px rgba(0,0,0,0.06)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "30px", fontWeight: 900 }}>
            Edit Your Profile
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              lineHeight: "22px",
              color: "rgba(58,48,42,0.70)",
            }}
          >
            Complete and refine your profile to improve visibility when search launches.
            Profiles with clear descriptions and experience details will be prioritized.
          </p>

          {error && (
            <div
              style={{
                marginTop: "20px",
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
                marginTop: "20px",
                padding: "12px",
                borderRadius: "14px",
                background: "#EEF7F0",
                border: "1px solid #CDE4D2",
                color: "#2B4A2F",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Profile updated successfully.
            </div>
          )}

          <form
            onSubmit={handleSave}
            style={{
              marginTop: "30px",
              display: "grid",
              gap: "18px",
            }}
          >
            <input
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="City or service area"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Services offered (ex: House cleaning, Babysitting)"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Years of experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Short professional bio"
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={textareaStyle}
            />

            <button
              type="submit"
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
              }}
            >
              Save Profile
            </button>
          </form>

          <div
            style={{
              marginTop: "24px",
              fontSize: "12.5px",
              color: "rgba(58,48,42,0.60)",
              lineHeight: "18px",
            }}
          >
            Providers remain independent businesses. Profile information may be reviewed
            before public visibility at launch.
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: "50px",
  borderRadius: "999px",
  border: "1px solid #E2D8CC",
  padding: "0 18px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle = {
  width: "100%",
  borderRadius: "20px",
  border: "1px solid #E2D8CC",
  padding: "14px 16px",
  fontSize: "14px",
  outline: "none",
  resize: "vertical",
  boxSizing: "border-box",
};