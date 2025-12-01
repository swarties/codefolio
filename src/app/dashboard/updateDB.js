"use server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import GetUser from "./getUser";

export default async function updateDB(userFormData) {
  const newBgColor = userFormData.bgColor;
  const newBio = userFormData.bio;
  const newRepoOption = userFormData.repo_option === "last";


  const [user, userid] = await GetUser();

  if (!userid) {
    console.error("no userid found");
    return;
  }


  const { error } = await supabaseAdmin
    .from("profiles")
    .update({
      bio: newBio,
      bg_color: newBgColor,
      repo_option: newRepoOption,
    })
    .eq("auth_user_id", userid);

  if (error) {
    console.error("error updating db:", error.message || error);
    throw error;
  }
}
