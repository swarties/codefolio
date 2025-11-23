"use client";

import { Button } from "@/components/ui/button";
import SignOut from "@/lib/signOut";
import Router, { useRouter } from "next/router";

function ButtonOutline({ onClick }) {
  return (
    <Button variant="outline" onClick={onClick}>
      Sign Out
    </Button>
  );
}

function SignUserOut() {
  const RouterOut = useRouter();
  SignOut();
  RouterOut.push("../");
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
  return <ButtonOutline onClick={SignUserOut} />;
}
