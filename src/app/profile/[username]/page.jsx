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
      <h1 style={{ fontSize: "25px" }}>{text}</h1>
      <br />
      <hr />
      {repos.map((repo, index) => (
        <div key={index}>
          <p key={index}>
            <a href={repo[2]} target="_blank" rel="noopener noreferrer">
              {repo[0]}
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
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: userData.bg_color,
          height: "100vh",
        }}
      >
        <Image
          src={userData.avatar_url}
          alt="User Avatar"
          width={100}
          height={100}
          style={{
            borderRadius: "50%",
            marginTop: "2em",
            borderWidth: "1px",
            borderColor: "black",
            borderStyle: "solid",
            backgroundColor: "white",
          }}
        ></Image>
        <p style={{ marginBottom: "1em" }}>{userData.username}</p>
        {userData.bio === "" ? null : (
          <div>
            {/* <p>Bio :</p> // will probably encadre this*/}
            <p> {userData.bio}</p>
          </div>
        )}

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
    </>
  );
}
