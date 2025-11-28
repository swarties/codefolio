"use server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function updateDB(formData) {
  const newBgColor = formData.bgColor;
  const newBio = formData.bio;
  const { data: user, usererror } = await supabaseAdmin.auth.getUser();
  if (usererror) {
    console.error("Error fetching user:", error.message || error);
  }

  if (!user) {
    console.log("User probably isnt logged in");
  }
  const userid = user.id;

  const { error } = await supabaseAdmin.from("profiles").update({
    bio: newBio,
    bg_color: newBgColor,
  }).eq('auth_user_id', userid).select();

  if (error) {
    console.error('error updating db:', error.message || error);
    throw error;
  }
}
