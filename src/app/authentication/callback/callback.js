import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async () => {
      const { data, error } = await supabase.auth.getSessionFromURL({
        storeSession: false,
      });
      if (error || !data?.session) {
        console.log("OAuth Error :", error)
        return;
      }

      const response = await fetch("/api/auth/set-cookie", {
        method: "POST"
      })
    };
  });
}
