"use server";

import updateDB from "./updateDB";
import { createClient } from "@/lib/supabase/server";
import GetUser from "./getUser";

export default async function userForm(formData) {
  const rawFormData = {
    bgColor: await formData.get("bgColor"),
    bio: await formData.get("bio"),
  };

  await updateDB(rawFormData);
}

export async function initData() {
  const supabase = await createClient();

  const [ user, user_id ] = await GetUser();

  if (!user_id) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user_id)
    .single();

  if (error) {
    console.error("error fetching user data:", error.message || error);
    throw error;
  }

  return profile;
}
