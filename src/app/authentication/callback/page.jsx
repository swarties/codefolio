"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session data,", error.message);
        return;
      }
      if (data.session) {
        setSessionData(data.session);
      } else {
        router.push("../");
      }
    }

    getSession();
  }, [router]);

  // console.log(sessionData);

  async function insertUserRow(userData) {
    const { data, error } = await supabase.from("profiles").insert([
      {
        github_id: userData.user_metadata.sub,
        username: userData.user_metadata.name,
        auth_user_id: userData.id,
        avatar_url: userData.user_metadata.avatar_url,
      },
    ]);
    if (error) {
      console.error("error inserting into db", error.message);
      return;
    }

    router.push("../../dashboard");
  }

  useEffect(() => {
    if (sessionData?.user) {
      insertUserRow(sessionData.user);
    }
  }, [sessionData]);

  return (
    <>
      <h1>Signing you in...</h1>
      <p>woooooooooooo</p>
    </>
  );
}
