import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSessionFromURL({
        storeSession: false,
      });
      if (error || !data?.session) {
        console.log("OAuth Error :", error);
        return;
      }

      const response = await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        }),
      });

      if (response.ok) {
        router.replace("../../");
      } else {
        console.error("Error setting cookie");
      }
    })();
  }, [router]);

  return <div>Signing you in...</div>;
}
