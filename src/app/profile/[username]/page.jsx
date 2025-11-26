import { supabaseAdmin } from "@/lib/supabaseAdmin";
import fetchUserData from "./userDataFetcher";

export default async function Page({ params }) {
  const { username } = await params;
  
  var debugVal = await searchUsername(username);
  console.log("username exists?", debugVal);
  return (
    <div>
      <p>{username}</p>
    </div>
  );
}
