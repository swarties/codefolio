"use server";
  
import { createClient } from "@/lib/supabase/server";

export default async function GetUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: usererror,
  } = await supabase.auth.getUser();

  if (usererror) {
    console.error("Error fetching user:", usererror.message || usererror);
    return [null, null];
  }

  if (!user) {
    console.log("User probably isnt logged in");
    return [null, null];
  }
  const userid = user.id;

  return [user, userid];
}
