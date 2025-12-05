"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CheckSignedIn from "@/lib/checkSession";
import SignOut from "@/lib/signOut";
import userForm, { initData } from "./userForm";
import ThemeToggle from "@/lib/ThemeToggle";

function ProfileForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [formData, setFormData] = useState({
    bgColor: "#363636",
    bio: "",
    repo_option: "last",
  });

  useEffect(() => {
    if (hasFetched) return;

    const fetchData = async () => {
      try {
        const data = await initData();
        // console.log("Fetched data:", data);

        if (data) {
          setFormData({
            bgColor: data.bg_color || "#363636",
            bio: data.bio || "",
            repo_option: data.repo_option ? "last" : "star",
          });
        }
        setHasFetched(true);
      } catch (error) {
        console.error("Error loading profile data", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [hasFetched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    await userForm(formDataObj);
    console.log("submit update was successful");
  };

  if (isLoading) {
    return <p>Form is loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <fieldset>
        <legend>Displayed repositories</legend>
        <label>
          <input
            type="radio"
            name="repo_option"
            value="last"
            checked={formData.repo_option === "last"}
            onChange={handleChange}
          />
          5 latest repositories
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="repo_option"
            value="star"
            checked={formData.repo_option === "star"}
            onChange={handleChange}
          />
          5 most starred repositories
        </label>
      </fieldset>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

function UserAndImage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [uData, setUData] = useState({
    username: "username",
    avatar_url: "",
  });

  useEffect(() => {
    if (hasFetched) return;

    const fetchData = async () => {
      try {
        const data = await initData();
        // console.log("Fetched data:", data);

        if (data) {
          setUData({
            username: data.username,
            avatar_url: data.avatar_url,
          });
        }
        setHasFetched(true);
      } catch (error) {
        console.error("Error loading profile data", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [hasFetched]);

  if (isLoading) {
    return <p>BLABLABLA</p>;
  }
}

export default function Auth() {
  const router = useRouter();
  function SignUserOut() {
    SignOut();
    router.push("../");
  }

  const [isDark, setIsDark] = useState(true);

  const TextBG = {
    dark: "bg-black text-white",
    light: "bg-white text-black",
  };

  const pageContent = (
    <div
      className={` ${isDark ? " text-white bg-black " : " text-black bg-white"} h-full `}
    >
      <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <Button
        variant="outline"
        onClick={SignUserOut}
        className={`${isDark ? TextBG.dark : `${TextBG.light} border-black`} h-max scale-125 hover:scale-[130%]  `}
      >
        Log Out
      </Button>
      <br />
      <br />
      <a href="../">Go home</a>
      <ProfileForm></ProfileForm>
    </div>
  );

  return (
    <>
      <CheckSignedIn redirectTo="../authentication" pageContent={pageContent} />
    </>
  );
}
