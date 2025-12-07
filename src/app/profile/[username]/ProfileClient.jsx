"use client";

import React, { useState } from "react";
import Image from "next/image";
import ThemeToggle from "@/lib/ThemeToggle";
import Link from "next/link";

function RedirectSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="bi bi-box-arrow-up-right inline sm:-translate-y-0.5 md:-translate-y-0.75"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h-2a.5.5 0 0 1 0-1h2z"
      />
      <path
        fillRule="evenodd"
        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
      />
    </svg>
  );
}

export function NoUser() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className={` ${isDark ? " text-white bg-black " : " text-black bg-white"} flex flex-col h-full items-center justify-center gap-6`}
    >
      <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      <p>User doesn&lsquo;t exist...</p>

      <Link
        href={"/"}
        className={` ${isDark ? " hover:decoration-white " : "hover:decoration-black"} gap-6 text-left underline decoration-transparent transition-all duration-300 ease-in-out`}
      >
        Return to homepage
      </Link>
    </div>
  );
}

export default function ProfileClient({ userData, repos, repoTitle }) {
  const [isDark, setIsDark] = useState(true);

  // Styles definitions
  const cardStyles = {
    dark: "bg-[linear-gradient(to_top,#232526,#2b2d2e)] rounded-md p-[2em] text-white border-[#a8afb5] border-solid border-2 [box-shadow:0_0_6px_#a8afb5] hover:[box-shadow:0_0_15px_#a8afb5] transition-all duration-300",
    light:
      "bg-[linear-gradient(to_top,#cfd9df_0%,#e2ebf0_100%)] rounded-lg p-[2em] text-black border-[#3f4042] border-solid border-2 [box-shadow:0_0_6px_#3f4042] hover:[box-shadow:0_0_15px_#3f4042] transition-all duration-300",
  };

  const repoStyles = {
    dark: "bg-[#141616] mb-2 pl-3 pr-3 pt-1 rounded-2xl text-white border-[#a8afb5] border-solid border-2 [box-shadow:0_0_1px_#a8afb5] hover:[box-shadow:0_0_3px_#a8afb5] transition-all ease-in-out duration-350",
    light:
      "bg-[#C1C9CF] mb-2 pl-3 pr-3 pt-1 rounded-2xl text-black border-[#141616] border-solid border-2 [box-shadow:0_0_1px_#141616] hover:[box-shadow:0_0_3px_#141616] transition-all ease-in-out duration-350",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundColor: userData.bg_color,
      }}
    >
      <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      <div
        className={`w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start md:items-center ${
          isDark ? cardStyles.dark : cardStyles.light
        }`}
        style={{ gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }}
      >
        {/* Left Column: Profile Info */}
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

        {/* Right Column: Repositories */}
        <div className="w-full">
          <h1 className="text-[22px] md:text-[26px] select-none">
            {repoTitle}
          </h1>
          <br />
          {repos.map((repo, index) => (
            <a
              key={index}
              href={repo[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline h-full"
            >
              <div className={isDark ? repoStyles.dark : repoStyles.light}>
                <p key={index} className="inline-flex items-center gap-1">
                  {repo[0]}
                  <RedirectSVG />
                </p>
                <p>{repo[1]}</p>
                <br />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
