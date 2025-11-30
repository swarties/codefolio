import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { starGetter, lastGetter } from "./repoGetter";
import { Suspense } from "react";

async function Repos({ repo_option, uID }) {
  const repoOption = repo_option;
  const user_id = uID;
  console.log(user_id);

  const objectTest = await lastGetter(user_id);
  console.log(objectTest);

  if (repoOption) {
    // latest 5 repos
    return <p>oh...</p>;
  }
  // top 5 starred repos
  return <p>Ah...</p>;
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
  const userID = await serverAns.data[0].github_id;

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
      <div>
        <p>{userData.username}</p>
        <p>Bio : {userData.bio}</p>
        <Image
          src={userData.avatar_url}
          alt="User Avatar"
          width={100}
          height={100}
        ></Image>
        <Suspense fallback={<><p>Loading repos</p></>}>
          <Repos repo_option={repoOption} uID={userID}></Repos>
        </Suspense>
      </div>
    </>
  );
}
