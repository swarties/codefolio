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

  const { data, error: updateError } = await supabase
    .from("profiles")
    .update({
      bio: newBio,
      bg_color: newBgColor,
    })
    .eq("auth_user_id", user.id)
    .select();

  if (updateError) {
    console.error("error updating profile:", updateError.message || updateError);
  } else {
    console.log("updated profile:", data);
  }
}
