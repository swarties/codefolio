import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { starGetter, lastGetter } from "./repoGetter";
import { Suspense } from "react";
import React from "react";

async function Repos({ repo_option, uID }) {
  const repoOption = repo_option;
  const user_id = uID;

  if (!user_id) return;

  var repos;
  var text;

  if (repoOption) {
    // latest 5 repos
    text = "Top 5 latest repositories :";
    repos = await lastGetter(user_id);
  } else {
    // top 5 starred repos
    text = "Top 5 starred repositories :";
    repos = await starGetter(user_id);
  }
  // display logic here with the var repos

  return (
    <ul>
      <h1 className="text-[22px] md:text-[26px]">{text}</h1>
      <br />
      <hr />
      {repos.map((repo, index) => (
        <div key={index}>
          <p key={index}>
            <a
              href={repo[2]}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline" }}
            >
              {repo[0]}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                />
                <path
                  fillRule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                />
              </svg>
            </a>
          </p>
          <p>{repo[1]}</p>
          <br></br>
          <hr></hr>
        </div>
      ))}
    </ul>
  );
}

async function CheckUserandFetchData(username) {
  let dUE = false;
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("username", username);

  if (error) {
    console.log("Error contacting database:", error.message || error);
    return { dUE, data: "nodata" };
  }
  if (Array.isArray(data) && data.length > 0) {
    dUE = true;
    return { dUE, data };
  } else {
    return { dUE, data };
  }
}

export default async function Page({ params }) {
  const { username } = await params;
  const serverAns = await CheckUserandFetchData(username);
  const serverData = serverAns.dUE
    ? await serverAns.data[0]
    : { github_id: false };
  const userID = serverData.github_id;

  if (!serverAns.dUE) {
    return (
      <>
        <p>User Doesn&lsquo;t exit</p>
      </>
    );
  }

  const userData = serverAns.data[0];
  //console.log(userData); github_id ; username ; bio ; bg_color ; avatar_url ; repo_option

  const repoOption = userData.repo_option;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundColor: userData.bg_color,
      }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start md:items-center">
        {/* Left Column: Profile Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          
          <Image
            src={userData.avatar_url}
            alt="User Avatar"
            width={200}
            height={200}
            sizes=""
            style={{
              borderRadius: "50%",
              borderWidth: "1px",
              borderColor: "black",
              borderStyle: "solid",
              backgroundColor: "white",
            }}
            className="mb-6"
          />
          <p className="text-[32px] md:text-[54px] font-bold mb-4">
            {userData.username}
          </p>
          {userData.bio && (
            <div className="text-lg max-w-md">
              <p>{userData.bio}</p>
            </div>
          )}
        </div>

        {/* Right Column: Repositories */}
        <div className="w-full">
          <Suspense
            fallback={
              <>
                <p>Loading repos</p>
              </>
            }
          >
            <Repos repo_option={repoOption} uID={userID}></Repos>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
