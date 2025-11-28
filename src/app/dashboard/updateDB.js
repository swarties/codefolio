"use server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import GetUser from "./getUser";

export default async function updateDB(userFormData) {
  const newBgColor = userFormData.bgColor;
  const newBio = userFormData.bio;

  const [user, userid] = await GetUser();

  if (!userid) {
    console.error('no userid found');
    return;
  }

  console.log([user, userid]);

  const { error } = await supabaseAdmin.from("profiles").update({
    bio: newBio,
    bg_color: newBgColor,
  }).eq('auth_user_id', userid);

  if (error) {
    console.error("error updating db:", error.message || error);
    throw error;
  }
}
