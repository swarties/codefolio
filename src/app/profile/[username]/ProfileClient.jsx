"use client";

import React, { useState } from "react";
import Image from "next/image";

function RedirectSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="bi bi-box-arrow-up-right inline"
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

function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 left-6 p-3 rounded-full shadow-lg transition-all duration-300 z-50 border-2 ${
        isDark
          ? "bg-white text-black border-gray-200 hover:bg-gray-200"
          : "bg-[#232526] text-white border-[#3f4042] hover:bg-black"
      }`}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        // Sun Icon for Dark Mode (Switch to Light)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </svg>
      ) : (
        // Moon Icon for Light Mode (Switch to Dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
        </svg>
      )}
    </button>
  );
}

export default function ProfileClient({ userData, repos, repoTitle }) {
  const [isDark, setIsDark] = useState(true);

  // Styles definitions
  const cardStyles = {
    dark: "bg-[linear-gradient(to_top,#232526,#2b2d2e)] rounded-md p-[2em] text-white border-[#a8afb5] border-solid border-2 [box-shadow:0_0_6px_#a8afb5] hover:[box-shadow:0_0_15px_#a8afb5] transition-all duration-300",
    light: "bg-[linear-gradient(90deg,rgba(121,130,133,1)_0%,rgba(204,203,177,1)_100%)] rounded-lg p-[2em] text-black border-[#3f4042] border-solid border-2 [box-shadow:0_0_6px_#3f4042] hover:[box-shadow:0_0_15px_#3f4042] transition-all duration-300",
  };

  const repoStyles = {
    dark: "bg-[#141616] mb-2 pl-3 pr-3 pt-1 rounded-2xl text-white border-[#a8afb5] border-solid border-2 [box-shadow:0_0_1px_#a8afb5] hover:[box-shadow:0_0_3px_#a8afb5] transition-all ease-in-out duration-350",
    light: "bg-[rgba(121,130,133,1)] mb-2 pl-3 pr-3 pt-1 rounded-2xl text-black border-[#141616] border-solid border-2 [box-shadow:0_0_1px_#141616] hover:[box-shadow:0_0_3px_#141616] transition-all ease-in-out duration-350",
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
          <h1 className="text-[22px] md:text-[26px]">{repoTitle}</h1>
          <br />
          {repos.map((repo, index) => (
            <a
              key={index}
              href={repo[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline h-full"
            >
              <div
                className={isDark ? repoStyles.dark : repoStyles.light}
              >
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