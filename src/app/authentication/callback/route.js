import { NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.URL);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    next = "/";
  }
}
