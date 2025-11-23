import { supabase } from "./supabaseClient";
import Router from "next/router";

export default async function SignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out user: ", error.message);
    return;
  }
}
