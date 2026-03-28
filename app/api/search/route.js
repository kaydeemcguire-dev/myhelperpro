import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term") || "";

    // Prevent unnecessary queries
    if (term.trim().length < 2) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabase
      .from("providers")
      .select("id, name, service_type")
      .ilike("name", `%${term}%`);

    if (error) {
      console.error("SEARCH ERROR:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json([]);
  }
}