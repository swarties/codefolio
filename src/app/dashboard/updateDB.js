"use server";
import { supabase } from "@/lib/supabaseClient";

export default async function updateDB(formData) {
  const newBgColor = formData.get("NewBgColor");
  const newBio = formData.get("NewBio");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("error fetching user:", error.message || error);
  }

  if (!user) {
    return null;
  }

  const { data, fetcherror } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();
}
