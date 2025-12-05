"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CheckSignedIn from "@/lib/checkSession";
import SignOut from "@/lib/signOut";
import userForm, { initData } from "./userForm";
import ThemeToggle from "@/lib/ThemeToggle";
import Loading from "./loading";
import Image from "next/image";

function SuccessSVG() {
  return (
    <svg
      className="w-6 h-6 text-white fill-current"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 3.333C10.8 3.333 3.333 10.8 3.333 20c0 9.2 7.467 16.667 16.667 16.667 9.2 0 16.667-7.467 16.667-16.667C36.667 10.8 29.2 3.333 20 3.333zm-3.333 25L8.333 20l2.35-2.35 5.984 5.967 12.65-12.65 2.35 2.366-15 15z" />
    </svg>
  );
}

function SuccessToast({ show, isDark }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`flex w-full max-w-sm overflow-hidden rounded-lg shadow-md ${
          isDark
            ? "bg-[linear-gradient(to_top,#232526,#2b2d2e)]"
            : "bg-[linear-gradient(to_top,#cfd9df_0%,#e2ebf0_100%)]"
        }`}
      >
        <div className="flex items-center justify-center w-12 bg-emerald-500">
          <SuccessSVG />
        </div>

        <div className="px-4 py-2 -mx-3">
          <div className="mx-3">
            <span
              className={`font-semibold ${
                isDark ? "text-emerald-400" : "text-emerald-500"
              }`}
            >
              Success
            </span>
            <p
              className={`text-sm ${
                isDark ? "text-gray-200" : "text-gray-600"
              }`}
            >
              Your profile was updated!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

async function GetUData() {
  const data = await initData();
  return data;
}

function ProfileForm({ initialData, isDark, onUpdate, onSuccess }) {
  const [formData, setFormData] = useState({
    bgColor: initialData.bg_color || "#363636",
    bio: initialData.bio || "",
    repo_option: initialData.repo_option ? "last" : "star",
  });

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

    onUpdate({
      bio: formData.bio,
      bg_color: formData.bgColor,
      repo_option: formData.repo_option,
    });

    onSuccess();

    console.log("submit update was successful");
  };

  const inputClasses = `w-full px-3 py-2 rounded-md border text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
    isDark
      ? "bg-[#141616] border-gray-600 text-white placeholder:text-gray-500"
      : "bg-white border-gray-300 text-black placeholder:text-gray-400"
  }`;

  const labelClasses = "block text-sm font-medium mb-1.5 ml-1 select-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto md:mx-0">

      {/* Color Picker */}
            <div>
        <label htmlFor="bgColor" className={labelClasses}>
          Background Color
        </label>
        <div className={`flex items-center gap-3 p-2 border rounded-md border-transparent transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-black/5" }`}>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-500 shadow-sm shrink-0">
            <input
              type="color"
              name="bgColor"
              id="bgColor"
              value={formData.bgColor}
              onChange={handleChange}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer"
            />
          </div>
          <span className={`text-sm font-mono ${isDark ? "text-gray-300" : "text-gray-600"} select-none `}>
            {formData.bgColor}
          </span>
        </div>
      </div>

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

function UserAndImage({ userData }) {
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
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUData();
        if (data) {
          setUserData({
            username: data.username,
            avatar_url: data.avatar_url,
            bg_color: data.bg_color || "#363636",
            bio: data.bio || "",
            repo_option: data.repo_option,
          });
        }
      } catch (error) {
        console.error("Error loading profile data", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  function SignUserOut() {
    SignOut();
    router.push("../");
  }

  const handleProfileUpdate = (updatedFields) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (isLoading || !userData) {
    return <Loading />;
  }

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
      <SuccessToast show={showToast} isDark={isDark} />

      <div
        className={`relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start md:items-center ${
          isDark ? cardStyles.dark : cardStyles.light
        }`}
      >
        <Button
          variant="outline"
          onClick={SignUserOut}
          className={`${isDark ? TextBG.dark : `${TextBG.light} border-black`} h-max absolute top-4 left-4 `}
        >
          Log Out
        </Button>

        <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
        <div className="mt-8 md:mt-0">
          <UserAndImage userData={userData} />
        </div>
        <div>
          <ProfileForm
            initialData={userData}
            isDark={isDark}
            onUpdate={handleProfileUpdate}
            onSuccess={handleShowToast}
          />
          <br />
          <br />
          <div className="flex flex-col gap-4 items-center md:flex-row md:justify-around">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className={`${isDark ? TextBG.dark : `${TextBG.light} border-black`} h-max w-full md:w-auto md:scale-125 md:hover:scale-[130%]`}
            >
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/profile/${userData.username}`)}
              className={` ${isDark ? TextBG.dark : `${TextBG.light} border-black`} h-max w-full md:w-auto md:scale-125 md:hover:scale-[130%]`}
            >
              Profile Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <CheckSignedIn redirectTo="../authentication" pageContent={pageContent} />
  );
}
