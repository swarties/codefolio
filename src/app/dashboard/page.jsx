"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CheckSignedIn from "@/lib/checkSession";
import SignOut from "@/lib/signOut";
import Form from 'next/form';
import { supabase } from "@/lib/supabaseClient";

function ButtonOutline({ onClick }) {
  return (
    <Button variant="outline" onClick={onClick}>
      Sign Out
    </Button>
  );
}

function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await SignOut();
    router.push("../");
  }
  return <button onClick={handleSignOut}>Sign Out</button>;
}

export default function Auth() {
  const router = useRouter();
  function SignUserOut() {
    SignOut();
    router.push("../");
  }

  const pageContent = (
    <>
      <ButtonOutline onClick={SignUserOut} />
      <br />
      <br />
      <a href="../">Go home</a>
    </>
  );

  return (
    <>
      <CheckSignedIn redirectTo="../authentication" pageContent={pageContent} />
    </>
  );
}
