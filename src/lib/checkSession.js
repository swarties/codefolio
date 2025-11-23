"use client";

import { supabase } from "./supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckSignedIn({
  redirectTo = "../app/authentication", pageContent
}) {
  const router = useRouter();
  const [verifState, setVerifState] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push(redirectTo);
        return;
      }
      setVerifState(false);
      setSignedIn(true);
    }
    checkSession();
  }, [router, redirectTo]);

  if (verifState) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return pageContent;
}
