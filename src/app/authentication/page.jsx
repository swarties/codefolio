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
  return <ButtonOutline onClick={loginHandler} />;
}
