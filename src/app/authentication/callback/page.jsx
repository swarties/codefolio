"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: false,
      });
      if (error) {
        console.error("getSessionFromUrl error", error);
        return;
      }
      const session = data?.session;
      if (!session) {
        console.error("No session found in URL");
        return;
      }
      await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
        }),
      });
      router.replace("/");
    })();
  }, [router]);

  return <div>Signing you in…</div>;
}
