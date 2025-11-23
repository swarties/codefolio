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
        console.log("[callback] session loaded:", {
          sessionUserId: data.session.user?.id,
          userMetadata: data.session.user?.user_metadata,
        });
      } else {
        router.push("../");
      }
    }

    getSession();
  }, [router]);

  // console.log(sessionData);

  useEffect(() => {
    async function upsertUserRow(userData) {
      console.log("[callback] upsert payload:", {
        github_id: userData.user_metadata?.sub,
        username: userData.user_metadata?.user_name,
        auth_user_id: userData.id,
        avatar_url: userData.user_metadata?.avatar_url,
      });

      const { error } = await supabase.from("profiles").upsert(
        [
          {
            github_id: userData.user_metadata?.sub,
            username: userData.user_metadata?.user_name,
            auth_user_id: userData.id,
            avatar_url: userData.user_metadata?.avatar_url,
          },
        ],
        { onConflict: "github_id" }
      );
      if (error) {
        console.error("error inserting/updating db row: ", error.message);
        return;
      }

      router.push("../../dashboard");
    }

    if (sessionData?.user) {
      upsertUserRow(sessionData.user);
    }
  });
  return (
    <div>
      <h1>Signing you in...</h1>
    </div>
  );
}
