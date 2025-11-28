"use client";

import { createClient } from "./supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckSignedIn({
  redirectTo = "../app/authentication",
  pageContent,
}) {
  const router = useRouter();
  const [verifState, setVerifState] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  const supabase = createClient();

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
  }, [router, redirectTo, supabase.auth]);

  if (verifState) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return pageContent;
}
