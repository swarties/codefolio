"use client";

import { Button } from "@/components/ui/button";
import SignOut from "@/lib/signOut";
import { useRouter } from "next/navigation";

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
  const RouterOut = useRouter();

  function SignUserOut() {
    SignOut();
    RouterOut.push("../");
  }

  return <ButtonOutline onClick={SignUserOut} />;
}
