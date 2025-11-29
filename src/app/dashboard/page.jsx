"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CheckSignedIn from "@/lib/checkSession";
import SignOut from "@/lib/signOut";
import Form from "next/form";
import React from "react";
import userForm, { initData } from "./userForm";

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

function ProfileForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    bgColor: "#363636",
    bio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await initData();

        if (data) {
          setFormData({
            bgColor: data.bg_color || "#363636",
            bio: data.bio || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile data", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Form is loading...</p>;
  }

  return (
    <Form action={userForm}>
      <label htmlFor="bgColor">Background Color</label>
      <br />
      <input
        type="color"
        name="bgColor"
        id="bgColor"
        defaultValue={formData.bgColor}
      />
      <br />

      <label htmlFor="bio">Bio</label>
      <br />
      <input type="text" name="bio" id="bio" defaultValue={formData.bio} />
      <br />

      <button type="submit">Submit</button>
    </Form>
  );
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
      <ProfileForm></ProfileForm>
    </>
  );

  return (
    <>
      <CheckSignedIn redirectTo="../authentication" pageContent={pageContent} />
    </>
  );
}
