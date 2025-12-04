import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { starGetter, lastGetter } from "./repoGetter";
import { Suspense } from "react";
import React from "react";

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
        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
      />
      <path
        fillRule="evenodd"
        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
      />
    </svg>
  );
}

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
    <>
      <h1 className="text-[22px] md:text-[26px]">{text}</h1>
      <br />
      {repos.map((repo, index) => (
        <a
          key={index}
          href={repo[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline h-full"
        >
          <div className=" bg-[#141616] mb-2 pl-3 pr-3 pt-1 rounded-2xl 
          text-white border-[#a8afb5] border-solid border-2 
          box-shadow:0_0_1px_#a8afb5] hover:[box-shadow:0_0_3px_#a8afb5] 
          transition-all ease-in-out duration-150"
          // bg-[#141616] mb-2 pl-3 pr-3 pt-1 rounded-2xl text-white border-[#a8afb5] border-solid border-2 box-shadow:0_0_1px_#a8afb5] hover:[box-shadow:0_0_3px_#a8afb5] transition-all ease-in-out duration-150 DARKMODE
          // bg-[rgba(121,130,133,1)] mb-2 pl-3 pr-3 pt-1 rounded-2xl text-black border-[#141616] border-solid border-2 [box-shadow:0_0_1px_#141616] hover:[box-shadow:0_0_3px_#141616] transition-all ease-in-out duration-150 LIGHTMODE
          
          >
            <p key={index} className="inline-flex items-center gap-1">
              {repo[0]}
              <RedirectSVG></RedirectSVG>
            </p>
            <p>{repo[1]}</p>
            <br></br>
          </div>
        </a>
      ))}
    </>
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
      <div
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start md:items-center
      
      bg-[linear-gradient(to_top,#232526,#2b2d2e)] rounded-md p-[2em] text-white border-[#a8afb5] border-solid border-2 [box-shadow:0_0_6px_#a8afb5] hover:[box-shadow:0_0_15px_#a8afb5] transition-all ease-in-out duration-300"
        // bg-[linear-gradient(to_top,#232526,#2b2d2e)] rounded-md p-[2em] text-white border-[#a8afb5] border-solid border-2 [box-shadow:0_0_6px_#a8afb5] hover:[box-shadow:0_0_15px_#a8afb5] transition-all ease-in-out duration-300 darkmode
        // bg-[linear-gradient(90deg,rgba(121,130,133,1)_0%,rgba(204,203,177,1)_100%)] rounded-lg p-[2em] text-black border-[#3f4042] border-solid border-2 [box-shadow:0_0_8px_#353738] hover:[box-shadow:0_0_15px_#353738] transition-all ease-in-out duration-300 lightmode
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
