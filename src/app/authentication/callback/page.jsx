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

  return (
    <div>
      <h1>Signing you in...</h1>
      <h1>OAuth Callback</h1>
      {sessionData ? (
        <pre>{JSON.stringify(sessionData, null, 2)}</pre>
      ) : (
        <p>Loading session data...</p>
      )}
    </div>
  );
}
