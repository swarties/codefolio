import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function Page({ params }) {
  const { username } = await params;
  async function CheckUserandFetchData() {
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

  const serverAns = await CheckUserandFetchData();

  if (!serverAns.dUE) {
    return (
      <>
        <p>User Doesn&lsquo;t exit</p>
      </>
    );
  }

  const userData = serverAns.data[0];
  console.log(userData); // github_id ; username ; bio ; bg_color ; avatar_url ; repo_option

  return (<>
    <div>
      <p>{userData.username}</p>
      <p>Bio : {userData.bio}</p>
      <Image src={userData.avatar_url} alt="User Avatar" width={100} height={100}></Image>
    </div></>
  );
}
