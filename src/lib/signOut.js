import { createClient } from "./supabase/client";
import Router from "next/router";

export default async function SignOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = "/";
}
