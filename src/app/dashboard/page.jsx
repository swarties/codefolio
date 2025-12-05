"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CheckSignedIn from "@/lib/checkSession";
import SignOut from "@/lib/signOut";
import userForm, { initData } from "./userForm";
import ThemeToggle from "@/lib/ThemeToggle";
import { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";

async function GetUData() {
  const data = await initData();

  return data;
}

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
        const data = await GetUData();
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

function useUserData() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: "username",
    avatar_url: "",
    bg_color: "#363636",
    bio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUData();
        if (data) {
          setUserData({
            username: data.username,
            avatar_url: data.avatar_url,
            bg_color: data.bg_color,
            bio: data.bio,
          });
        }
      } catch (error) {
        console.error("Error loading profile data", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { userData, isLoading };
}

function UserAndImage({ userData, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center text-center md:text-center md:justify-center md:items-center">
      <Image
        src={userData.avatar_url}
        alt="User Avatar"
        width={200}
        height={200}
        className="mb-6 w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full border border-black bg-white object-cover"
        sizes="(max-width: 768px) 100px, 200px"
      />
      <p className="text-[32px] md:text-[54px] font-bold mb-4">
        {userData.username}
      </p>
      {userData.bio && (
        <div className="text-lg max-w-md wrap-break-word break-all">
          <p>{userData.bio}</p>
        </div>
      )}
    </div>
  );
}

export default function Auth() {
  const router = useRouter();
  function SignUserOut() {
    SignOut();
    router.push("../");
  }

  const [isDark, setIsDark] = useState(true);
  const { userData, isLoading } = useUserData();

  const cardStyles = {
    dark: "bg-[linear-gradient(to_top,#232526,#2b2d2e)] rounded-md p-[2em] text-white border-[#a8afb5] border-solid border-2 [box-shadow:0_0_6px_#a8afb5] hover:[box-shadow:0_0_15px_#a8afb5] transition-all duration-300",
    light:
      "bg-[linear-gradient(to_top,#cfd9df_0%,#e2ebf0_100%)] rounded-lg p-[2em] text-black border-[#3f4042] border-solid border-2 [box-shadow:0_0_6px_#3f4042] hover:[box-shadow:0_0_15px_#3f4042] transition-all duration-300",
  };

  const TextBG = {
    dark: "bg-[#141616] text-white",
    light: "bg-[#798285] text-black",
  };

  const pageContent = (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundColor: userData.bg_color,
      }}
    >
      <div
        className={`relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start md:items-center ${
          isDark ? cardStyles.dark : cardStyles.light
        }`}
      >
        {/* Log Out Button - Absolute positioned top-left */}
        <Button
          variant="outline"
          onClick={SignUserOut}
          className={`${isDark ? TextBG.dark : `${TextBG.light} border-black`} h-max absolute top-4 left-4 `}
        >
          Log Out
        </Button>

        <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
        <div className="mt-8 md:mt-0">
          <UserAndImage userData={userData} isLoading={isLoading} />
        </div>
        <div>
          <ProfileForm></ProfileForm>
          <br />
          <br />
          {/* Fixed button container for mobile */}
          <div className="flex flex-col gap-4 items-center md:flex-row md:justify-around">
            <Button
              variant="outline"
              onClick={() => router.push(`/profile/${userData.username}`)}
              disabled={isLoading}
              className={`${isDark ? TextBG.dark : `${TextBG.light} border-black`} h-max w-full md:w-auto md:scale-125 md:hover:scale-[130%]`}
            >
              Profile Page
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className={`${isDark ? TextBG.dark : `${TextBG.light} border-black`} h-max w-full md:w-auto md:scale-125 md:hover:scale-[130%]`}
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <CheckSignedIn redirectTo="../authentication" pageContent={pageContent} />
    </>
  );
}
