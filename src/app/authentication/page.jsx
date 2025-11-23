"use client";

import { Button } from "@/components/ui/button";
import loginHandler from "./loginHandler";

function ButtonOutline({ onClick }) {
  return (
    <Button variant="outline" onClick={onClick}>
      Login
    </Button>
  );
}

export default function Auth() {
  return (
    <>
      <p>Please sign in using the button bellow.</p>
      <br />
      <ButtonOutline onClick={loginHandler} />
    </>
  );
}
