import { supabaseAdmin } from "@/lib/supabaseAdmin";
import ProfileClient, { NoUser } from "./ProfileClient";
import { lastGetter, starGetter } from "./repoGetter";

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
    return <NoUser />;
  }

  const userData = serverAns.data[0];
  const repoOption = userData.repo_option;

  // server repo fetchingg
  let repos = [];
  let repoTitle = "";

  if (repoOption) {
    // latest 5 repos
    if (userID) {
      repos = await lastGetter(userID);
      repoTitle = `Top ${repos.length} latest repositories :`;
    }
  } else {
    // top 5 starred repos
    if (userID) {
      repos = await starGetter(userID);
      repoTitle = `Top ${repos.length} starred repositories :`;
    }
  }
  if (repos.length === 0) {
    repoTitle = null;
  }

  return (
    <ProfileClient userData={userData} repos={repos} repoTitle={repoTitle} />
  );
}
