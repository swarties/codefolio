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
            repo_option: data.repo_option ?? true
          });
        }
      } catch (error) {
        console.error("Error loading profile data", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "repo_option" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (formDataObj) => {
    await userForm(formDataObj);

    console.log("submit update was successful");
  };

  if (isLoading) {
    return <p>Form is loading...</p>;
  }

  return (
    <Form action={handleSubmit}>
      <label htmlFor="bgColor">Background Color</label>
      <br />
      <input
        type="color"
        name="bgColor"
        id="bgColor"
        value={formData.bgColor}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="bio">Bio</label>
      <br />
      <input
        type="text"
        name="bio"
        id="bio"
        value={formData.bio}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="repo_option">Displayed repositories</label>
      <br />
      <select name="repo_option" id="repo_option" onChange={handleChange} value={String(formData.repo_option)}>
        <option value="true">5 latest repositories</option>
        <option value="false">5 most starred repositories</option>
      </select>
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
